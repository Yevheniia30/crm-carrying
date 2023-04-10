import { useContext } from "react";
import { AuthContext } from "components/AuthProvider/AuthProvider";

export const useAuth = () => {
  const { user, loading, error } = useContext(AuthContext);
  return { user, loading, error };
};
