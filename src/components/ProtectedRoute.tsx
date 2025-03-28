
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

export const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();
  const { toast } = useToast();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};

export const AdminRoute = () => {
  const { user, isAdmin, isLoading, profile, profileError } = useAuth();
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
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // If we have a profile error but user exists, allow access to avoid completely blocking the user
  // The UI can handle specific permissions internally
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Only redirect if we're certain user is not an admin (no profile error)
  if (!isAdmin && !profileError) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
