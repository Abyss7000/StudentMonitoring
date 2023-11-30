import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext";

const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  console.log("user role", user?.role);
  if (!user) return <Navigate to="/login" state={{ from: location }} />;
  if (user.role === "admin") {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }}></Navigate>;
};

export default AdminRoute;
