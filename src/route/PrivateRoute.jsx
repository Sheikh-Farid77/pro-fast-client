import { Navigate, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute({children}) {
  const { user, loading } = useAuth();

  if (loading) {
    return <p className="text-center text-red-800">Loading...</p>;
  }

  return user ? children : <Navigate to="/login" replace />;
}