import { Navigate, Outlet, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute({children}) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <p className="text-center text-red-800">Loading...</p>;
  }

  return user ? children : <Navigate state={{from: location.pathname}} to="/login" />;
}