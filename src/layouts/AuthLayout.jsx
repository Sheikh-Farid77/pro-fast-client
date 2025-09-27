import { Outlet } from "react-router";
import Image from "../assets/authImage.png";
import Logo from "../components/Logo";

export default function AuthLayout() {
  return (
    <div className=" md:w-full md:h-screen bg-slate-100 flex justify-center items-center gap-">
      <div className="container mx-auto">
        <Logo />
        <div className="hero-content flex-col items-center justify-center lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <img src={Image} alt="" />
          </div>
          <div className="card w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
