import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";

function ProtectedRoute() {
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
