import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./api/contextApi";


const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const {  user } = useAuth();
  const location = useLocation();

  if (!user ) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
