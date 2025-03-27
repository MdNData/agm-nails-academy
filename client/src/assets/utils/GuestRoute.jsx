import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const GuestRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Se incarca...</p>;
  if (user) return <Navigate to="/cont" replace />;

  return children;
};

export default GuestRoute;
