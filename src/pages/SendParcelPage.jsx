import { useForm } from "react-hook-form";
import FieldSet from "../components/form/FieldSet";
import Field from "../components/form/Field";
import useAuth from "../hooks/useAuth";
import { useLoaderData } from "react-router";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddParcel() {
  const { loading } = useAuth();
  const [calculatedCost, setCalculatedCost] = useState(0);
  const serviceCenter = useLoaderData();
  const uniqueRegions = [...new Set(serviceCenter.map((item) => item.region))];
  const getDistrictByRegion = (region) => {
    return serviceCenter
      .filter((item) => item.region === region)
      .map((item) => item.district);
  };
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const parcelType = watch("type");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");


  // calculate delivery charge
  function calculateDeliveryCost(parcel) {
  const { type, weight, senderRegion, receiverRegion } = parcel;
  const w = parseFloat(weight) || 0;

  // Determine if it's within the same city/region
  const isWithinCity =
    senderRegion.trim().toLowerCase() === receiverRegion.trim().toLowerCase();

  let cost = 0;

  if (type === "document") {
    cost = isWithinCity ? 60 : 80;
  } else if (type === "non-document") {
    if (w <= 3) {
      cost = isWithinCity ? 110 : 150;
    } else {
      const extraWeight = w - 3;
      if (isWithinCity) {
        cost = 110 + extraWeight * 40;
      } else {
        cost = 150 + extraWeight * 40 + 40;
      }
    }
  }

  return Math.round(cost);
}


 const onSubmit = (data) => {
  const cost = calculateDeliveryCost(data);
  setCalculatedCost(cost); // keep this if you need to display elsewhere

  toast(
    (t) => (
      <div className="flex flex-col gap-3">
        <p className="font-semibold">Delivery Cost: ৳ {cost}</p>
        <button
          onClick={() => {
            const parcel = {
              ...data,
              creation_date: new Date().toISOString(),
              cost, // save cost with the parcel
            };
            console.log("Saved Parcel:", parcel); // save to DB here
            toast.dismiss(t.id);
            toast.success("Parcel Confirmed!");
            reset();
          }}
          className="bg-blue-600 text-white px-3 py-1 rounded-md"
        >
          Confirm
        </button>
      </div>
    ),
    { duration: 8000 }
  );
};

  if (loading) return <p className="text-center my-10 text-red-800">Loading</p>;

  return (
    <div className="bg-slate-100">
      <div className="container mx-auto p-6 bg-white">
        {/* Heading */}
        <h1 className="text-3xl text-gray-900 font-bold mb-2">
          Enter Your Parcel Details
        </h1>
        <p className="text-gray-600 mb-6">
          Provide parcel, sender, and receiver details to create a delivery
          order.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Parcel Info */}
          <FieldSet label="Parcel Information">
            <Field label="Parcel Type" error={errors.type}>
              <select
                {...register("type", { required: "Parcel type is required" })}
                className={`p-2 text-black border border-box w-full rounded-md ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
                name="type"
                id="type"
              >
                <option value="">Select Type</option>
                <option value="document">Document</option>
                <option value="non-document">Non-Document</option>
              </select>
            </Field>
            <Field label="Parcel Title" error={errors.title}>
              <input
                {...register("title", { required: "Title is required" })}
                className={`p-2 text-black border border-box w-full rounded-md ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
                type="text"
                name="title"
                id="title"
                placeholder="Enter parcel title"
              />
            </Field>

            {parcelType === "non-document" && (
              <Field label="Weight (kg)" error={errors.weight}>
                <input
                  {...register("weight")}
                  className={`p-2 text-black border border-box w-full rounded-md ${
                    errors.weight ? "border-red-500" : "border-gray-300"
                  }`}
                  type="number"
                  name="weight"
                  id="weight"
                  placeholder="Enter parcel weight"
                />
              </Field>
            )}
          </FieldSet>
          <div className="md:flex justify-between items-center">
            <div className="md:flex-1">
              {/* Sender Info */}
              <FieldSet label="Sender Information">
                <Field label="Name" error={errors.senderName}>
                  <input
                    {...register("senderName", {
                      required: "Sender name required",
                    })}
                    className={`p-2 text-black border border-box w-full rounded-md ${
                      errors.senderName ? "border-red-500" : "border-gray-300"
                    }`}
                    name="senderName"
                    id="senderName"
                    type="text"
                    defaultValue="John Doe" // Prefilled example
                  />
                </Field>

                <Field label="Contact" error={errors.senderContact}>
                  <input
                    {...register("senderContact", {
                      required: "Sender contact required",
                    })}
                    className={`p-2 text-black border border-box w-full rounded-md ${
                      errors.senderContact
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    name="senderContact"
                    id="senderContact"
                    type="number"
                    placeholder="Enter Phone Number"
                  />
                </Field>

                <Field label="Select Region" error={errors.senderRegion}>
                  <select
                    {...register("senderRegion", {
                      required: "Region required",
                    })}
                    className={`p-2 text-black border border-box w-full rounded-md ${
                      errors.senderRegion ? "border-red-500" : "border-gray-300"
                    }`}
                    name="senderRegion"
                    id="senderRegion"
                  >
                    <option value="">Select Region</option>
                    {uniqueRegions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field
                  label="Select Service Center"
                  error={errors.senderCenter}
                >
                  <select
                    {...register("senderCenter", {
                      required: "Service center required",
                    })}
                    className={`p-2 text-black border border-box w-full rounded-md ${
                      errors.senderCenter ? "border-red-500" : "border-gray-300"
                    }`}
                    name="senderCenter"
                    id="senderCenter"
                  >
                    <option value="">Select Service Center</option>
                    {getDistrictByRegion(senderRegion).map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Address" error={errors.senderAddress}>
                  <textarea
                    {...register("senderAddress", {
                      required: "Address required",
                    })}
                    className={`p-2 text-black border border-box w-full rounded-md ${
                      errors.senderAddress
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    name="senderAddress"
                    id="senderAddress"
                    placeholder="Enter pickup address"
                  />
                </Field>

                <Field
                  label="Pickup Instruction"
                  error={errors.pickupInstruction}
                >
                  <textarea
                    {...register("pickupInstruction", {
                      required: "Pickup instruction required",
                    })}
                    className={`p-2 text-black border border-box w-full rounded-md ${
                      errors.pickupInstruction
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    name="pickupInstruction"
                    id="pickupInstruction"
                    placeholder="Any special instructions"
                  />
                </Field>
              </FieldSet>
            </div>
            <div className="md:flex-1">
              {/* Receiver Info */}
              <FieldSet label="Receiver Information">
                <Field label="Name" error={errors.receiverName}>
                  <input
                    {...register("receiverName", {
                      required: "Receiver name required",
                    })}
                    className={`p-2 text-black border border-box w-full rounded-md ${
                      errors.receiverName ? "border-red-500" : "border-gray-300"
                    }`}
                    name="receiverName"
                    id="receiverName"
                    type="text"
                  />
                </Field>

                <Field label="Contact" error={errors.receiverContact}>
                  <input
                    {...register("receiverContact", {
                      required: "Receiver contact required",
                    })}
                    className={`p-2 text-black border border-box w-full rounded-md ${
                      errors.receiverContact
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    name="receiverContact"
                    id="receiverContact"
                    type="number"
                    placeholder="Enter Phone Number"
                  />
                </Field>

                <Field label="Select Region" error={errors.receiverRegion}>
                  <select
                    {...register("receiverRegion", {
                      required: "Region required",
                    })}
                    className={`p-2 text-black border border-box w-full rounded-md ${
                      errors.receiverRegion
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    name="receiverRegion"
                    id="receiverRegion"
                  >
                    <option value="">Select Region</option>
                    {uniqueRegions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field
                  label="Select Service Center"
                  error={errors.receiverCenter}
                >
                  <select
                    {...register("receiverCenter", {
                      required: "Service center required",
                    })}
                    className={`p-2 text-black border border-box w-full rounded-md ${
                      errors.receiverCenter
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    name="receiverCenter"
                    id="receiverCenter"
                  >
                    <option value="">Select Service Center</option>
                    {getDistrictByRegion(receiverRegion).map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Address" error={errors.receiverAddress}>
                  <textarea
                    {...register("receiverAddress", {
                      required: "Address required",
                    })}
                    className={`p-2 text-black border border-box w-full rounded-md ${
                      errors.receiverAddress
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    name="receiverAddress"
                    id="receiverAddress"
                    placeholder="Enter delivery address"
                  />
                </Field>

                <Field
                  label="Delivery Instruction"
                  error={errors.deliveryInstruction}
                >
                  <textarea
                    {...register("deliveryInstruction", {
                      required: "Delivery instruction required",
                    })}
                    className={`p-2 text-black border border-box w-full rounded-md ${
                      errors.deliveryInstruction
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    name="deliveryInstruction"
                    id="deliveryInstruction"
                    placeholder="Any special instructions"
                  />
                </Field>
              </FieldSet>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-md font-semibold"
            >
              Submit Parcel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
