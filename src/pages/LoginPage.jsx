import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { Link } from "react-router";
import FieldSet from "../components/form/FieldSet";
import Field from "../components/form/Field";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const [open, setOpen] = useState(false);

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm();
  const submitForm = (formData) =>{
    console.log(formData)

  }
  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-4">
        <FieldSet label="Login with ProFast">
          <Field label="Email" error={errors.email}>
            <input
              {...register("email", { required: "Email is required" })}
              className={`p-2 border text-black border-box w-full rounded-md ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
            />
          </Field>
          <Field label="Password">
            <div className="relative w-full">
              <input
                {...register("password", {
                  required: "Password id required",
                  minLength: {
                    value: 8,
                    message: "Your password is must be at least 8 characters",
                  },
                })}
                className={`p-2 text-black border border-box w-full rounded-md ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
                type={open ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter your password"
              />
              <span
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer z-50"
                onClick={() => setOpen(!open)}
              >
                {open ? <IoIosEyeOff size={22} /> : <IoMdEye size={22} />}
              </span>
            </div>
          </Field>
        </FieldSet>
          <div>{errors?.root?.random?.message}</div>

        {/* Links */}
        <div className="flex items-center justify-between text-sm mt-2">
          <p>
            No account?{" "}
            <Link
              className="text-blue-600 font-semibold hover:underline"
              to="/register"
            >
              Register
            </Link>
          </p>
          <Link to="/reset" className="text-gray-500 hover:text-blue-500">
            Forgot password?
          </Link>
        </div>

        {/* Buttons */}
     <Field>
         <button
          type="submit"
          className="btn btn-neutral w-full mt-6 rounded-lg text-white font-semibold"
        >
          Login
        </button>
     </Field>
        <button className="btn w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2">
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
          >
            <path
              fill="#fff"
              d="M44.5 20H24v8.5h11.8C34.8 34.5 30.1 38 24 38c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 3.1l6-6C34.6 5.5 29.7 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.8 0 20-7.9 20-21 0-1.3-.1-2.3-.5-4z"
            />
          </svg>
          Login with Google
        </button>
      </form>
    </div>
  );
}
