import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function PrivateRoute() {
  const isAuthenticated = true;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? <Outlet /> : null;
}
