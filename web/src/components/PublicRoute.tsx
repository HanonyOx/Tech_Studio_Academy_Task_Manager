import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const [hasToken, setHasToken] = useState(
    () => Boolean(localStorage.getItem("token")),
  );

  useEffect(() => {
    const updateAuthStatus = () => {
      setHasToken(Boolean(localStorage.getItem("token")));
    };

    window.addEventListener("authChanged", updateAuthStatus);

    return () => {
      window.removeEventListener("authChanged", updateAuthStatus);
    };
  }, []);

  if (hasToken) {
    return <Navigate to="/tasks" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;