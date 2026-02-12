import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth/auth-store";

const PublicRoute = () => {
  const token = useAuthStore((state) => state.token);

  // Kalau sudah login, redirect ke home (/)
  if (token) {
    return <Navigate to="/" replace />;
  }

  // Kalau belum login, render route anaknya
  return <Outlet />;
};

export default PublicRoute;
