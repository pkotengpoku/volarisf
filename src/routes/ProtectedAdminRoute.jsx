import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const { loading, isAuthenticated,user } = useSelector((state) => state.user);
  if (loading === false) {
    if (!isAuthenticated) {
      <Navigate to="/login" replace />
      return ;
    } else if(user.role !== "Admin"){
        return <Navigate to="/" replace />;
    }
    return children;
  }
};

export default ProtectedAdminRoute;
