import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute() {
  const auth = useSelector((state) => state.auth.isAuthenticated);
  return auth ? (
    <Outlet />
  ) : localStorage.getItem("token") ? (
    <Navigate to="/" />
  ) : (
    <Navigate to="/login" />
  );
}
