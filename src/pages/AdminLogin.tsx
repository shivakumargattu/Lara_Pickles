
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { user, isAdmin, isLoading } = useAuth();

  useEffect(() => {
    console.log('AdminLogin - Auth state:', { user: user?.email, isAdmin, isLoading });
    
    if (!isLoading) {
      if (!user) {
        // Redirect to login page if not authenticated
        console.log('No user, redirecting to login');
        navigate('/login');
      } else if (user && !isAdmin) {
        // User is logged in but not admin, redirect to home
        console.log('User is not admin, redirecting to home');
        navigate('/');
      } else if (user && isAdmin) {
        // User is admin, redirect to admin dashboard
        console.log('User is admin, redirecting to admin dashboard');
        navigate('/admin');
      }
    }
  }, [user, isAdmin, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-lg text-gray-600">Redirecting...</div>
      </div>
    </div>
  );
};

export default AdminLogin;
