
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, isLogged }) => {
    
    if (!isLogged) {
      return <Navigate to="/login" replace />;
    }
  
    return children;
};