
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { AuthLoader } from "./AuthLoader";

export const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <AuthLoader />;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};
