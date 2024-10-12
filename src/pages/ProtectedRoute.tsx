import { useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { Outlet, useNavigate } from "react-router-dom";

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) navigate("/");
  }, [isAuthenticated, isLoading, navigate]);

  return <Outlet />;
}
