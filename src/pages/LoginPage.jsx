import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { Link } from "react-router";
import FieldSet from "../components/form/FieldSet";
import Field from "../components/form/Field";
import { useForm } from "react-hook-form";
import Social from "../components/socialLogin/Social";

export default function LoginPage() {
  const [open, setOpen] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitForm = (formData) => {
    console.log(formData);
  };
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
                    value: 6,
                    message: "Your password is must be at least 6 characters",
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
            className="btn btn-primary w-full mt-6 rounded-lg text-white font-semibold"
          >
            Login
          </button>
        </Field>
      </form>
      <Social />
    </div>
  );
}
