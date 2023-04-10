import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "hooks/useAuth";

const PublicRoute = ({ redirectTo }) => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to={redirectTo} />;
  }
  return <Outlet />;
};

export default PublicRoute;
