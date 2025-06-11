
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { user, isAdmin, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // Redirect to login page
        navigate('/login');
      } else if (user && !isAdmin) {
        // User is logged in but not admin, redirect to home
        navigate('/');
      } else if (user && isAdmin) {
        // User is admin, redirect to admin dashboard
        navigate('/admin');
      }
    }
  }, [user, isAdmin, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return null;
};

export default AdminLogin;
