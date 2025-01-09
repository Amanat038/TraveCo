import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, isAdmin }) => {
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  return element;
};

export default ProtectedRoute;