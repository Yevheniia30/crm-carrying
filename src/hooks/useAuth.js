import { useContext } from "react";
import { AuthContext } from "components/AuthProvider/AuthProvider";

export const useAuth = () => {
  const {
    user,
    loading,
    error,
    handleSignup,
    handleLogin,
    handleSubmitWithGoogle,
    handleSubmitWithFacebook,
    handleSubmitWithPhone,
    isAdmin,
  } = useContext(AuthContext);
  return {
    user,
    loading,
    error,
    handleSignup,
    handleLogin,
    handleSubmitWithGoogle,
    handleSubmitWithFacebook,
    handleSubmitWithPhone,
    isAdmin,
  };
};
