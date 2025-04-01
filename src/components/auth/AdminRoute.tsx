
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { AuthLoader } from "./AuthLoader";

export const AdminRoute = () => {
  const { user, isAdmin, isLoading, profileError } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (profileError) {
      toast({
        title: "Admin access issue",
        description: "There was a problem verifying your admin status. Some features may be limited.",
        variant: "destructive",
      });
    }
  }, [profileError, toast]);

  if (isLoading) {
    return <AuthLoader />;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!isAdmin && !profileError) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
