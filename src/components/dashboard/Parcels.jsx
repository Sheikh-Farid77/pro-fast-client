import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
import { Link } from "react-router";

export default function Parcels() {
  const { user } = useAuth();
  const api = useAxios();
  const queryClient = useQueryClient();

  const retrieveParcels = async () => {
    const response = await api.get(`/parcels?email=${user.email}`);
    return response.data;
  };

  const {
    data: parcels,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["my-parcels"],
    queryFn: retrieveParcels,
    retry: false,
  });

  // delete products

 const handleDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "This action cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      mutation.mutate(id); // ✅ this runs the mutation
    }
  });
};


 const mutation = useMutation({
  mutationFn: async (id) => {
    const res = await api.delete(`/parcels/${id}`);
    return res.data;
  },
  onSuccess: (data) => {
    if (data.success) {
      Swal.fire("Deleted!", data.message, "success");
      // ✅ Refetch parcels
      queryClient.invalidateQueries(["my-parcels"]);
    } else {
      Swal.fire("Error", data.message, "error");
    }
  },
  onError: () => {
    Swal.fire("Error", "Something went wrong", "error");
  },
});

  if (isLoading)
    return <p className="text-center text-red-800">Loading Parcels</p>;
  if (error)
    return <p className="text-center text-red-800">Data Fetching Error</p>;
  return (
    <div className="overflow-x-auto w-full text-gray-700">
      <table className="table table-zebra w-full">
        {/* Table Head */}
        <thead className="text-gray-800">
          <tr>
            <th>#</th>
            <th>Title</th>
            <th className="hidden sm:table-cell">Type</th>
            <th>Cost</th>
            <th className="hidden md:table-cell">Created At</th>
            <th>Payment</th>
            <th>Delivery</th>
            <th>Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {parcels.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center py-4 text-gray-500">
                No parcels found
              </td>
            </tr>
          ) : (
            parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td className="font-semibold">{parcel.title}</td>

                {/* hide type on extra-small devices */}
                <td className="hidden sm:table-cell">{parcel.type}</td>

                <td className="font-bold text-blue-600">৳ {parcel.cost}</td>

                {/* hide date on small screens */}
                <td className="hidden md:table-cell">
                  {new Date(parcel.creation_date).toLocaleDateString()}{" "}
                  <span className=" text-gray-500">
                    {new Date(parcel.creation_date).toLocaleTimeString()}
                  </span>
                </td>

                {/* Payment Status */}
                <td>
                  <span
                    className={`badge ${
                      parcel.payment_status === "paid"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {parcel.payment_status}
                  </span>
                </td>

                {/* Delivery Status */}
                <td>
                  <span
                    className={`badge ${
                      parcel.delivery_status === "delivered"
                        ? "badge-success"
                        : parcel.delivery_status === "in transit"
                        ? "badge-warning"
                        : "badge-neutral"
                    }`}
                  >
                    {parcel.delivery_status}
                  </span>
                </td>

                {/* Actions */}
                <td className="flex flex-wrap gap-1">
                  <button className="btn btn-info">View</button>
                  <button
                    onClick={() => handleDelete(parcel._id)}
                    className="btn btn-error"
                  >
                    Delete
                  </button>
                  {parcel.payment_status !== "paid" && (
                    <Link to={`/dashboard/payment/${parcel._id}`}>
                    <button className="btn btn-success">Pay</button>
                    </Link>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
