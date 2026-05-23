import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAdminUser } from "./useAdminUser";
import Loader from "@/components/ui/Loader";

function AdminProtectedRoute() {
  const { isAdmin, isLoading } = useAdminUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      // Redirect to home if they are not an admin
      navigate("/", { replace: true });
    }
  }, [isAdmin, isLoading, navigate]);

  if (isLoading) {
    return (
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Loader />
      </div>
    );
  }

  if (isAdmin) {
    return <Outlet />;
  }

  return null;
}

export default AdminProtectedRoute;
