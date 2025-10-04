import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const { id } = useParams();
  const api = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate();

  const getParcel = async () => {
    const response = await api.get(`/parcels/${id}`);
    return response.data.data;
  };

  const {
    data: parcel = {},
    error,
    isLoading,
  } = useQuery({
    queryKey: ["parcel", id],
    queryFn: getParcel,
    retry: false,
  });

  const costInCent = parcel.cost * 100;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setLoading(true);

    try {
      // create payment method
      const { error } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (error) {
        setErrors(error.message);
        return; // stop flow here
      }

      // create payment intent
      const response = await api.post("/create-payment-intent", {
        costInCent,
        id,
      });
      const clientSecret = response.data.clientSecret;

      // confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user?.displayName || "Customer",
            email: user?.email,
          },
        },
      });

      if (result.error) {
        setErrors(result.error.message);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        // save payment info
        const paymentData = {
          parcelId: id,
          cost: parcel.cost,
          email: user.email,
          transactionId: result.paymentIntent.id,
          paymentMethod: result.paymentIntent.payment_method_types[0],
        };

        const paymentRes = await api.post("/payments", paymentData);
        if (paymentRes.data.insertedId) {
          console.log("Payment info saved");
        }

        const updateParcelRes = await api.patch(
          `/parcels/${id}/payment-status`,
          {
            status: "paid",
          }
        );

        if (updateParcelRes.data.success) {
          console.log("Parcel status updated");
        }

         Swal.fire({
    title: "Payment Successful!",
    text: `Your payment of $${parcel.cost} was completed.`,
    icon: "success",
    confirmButtonText: "Go to Dashboard",
  }).then(() => {
    navigate("/dashboard"); // redirect to dashboard
  });
      }
    } catch (err) {
      console.error("Payment error:", err);
      setErrors("Something went wrong, please try again.");
    } finally {
      setLoading(false); // ✅ always reset
    }
  };

  if (isLoading)
    return <p className="text-center text-red-800">Loading data</p>;
  if (error)
    return <p className="text-center text-red-800">Data fetching error</p>;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 px-4 w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-xl mx-auto"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Secure Payment
        </h2>

        {/* Full-width CardElement */}
        <div className="border rounded-lg px-3 py-4 mb-4 bg-gray-50 w-full">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "18px",
                  color: "#32325d",
                  fontFamily: "system-ui, sans-serif",
                  "::placeholder": {
                    color: "#a0aec0",
                  },
                },
                invalid: {
                  color: "#e53e3e",
                },
              },
            }}
          />
        </div>

        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer font-medium py-3 rounded-lg transition duration-200"
        >
          {loading ? "Processing..." : `Pay  $${parcel?.cost}`}
        </button>
      </form>
      {errors && <p className="text-center text-red-800">{errors}</p>}
    </div>
  );
}
