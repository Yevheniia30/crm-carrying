import { Link } from "react-router-dom";
import { SIGNUP_ROUTE } from "utils/contants";
import AuthForm from "components/AuthForm/AuthForm";

import { useAuth } from "hooks/useAuth";

const LoginPage = () => {
  const {
    handleLogin,
    handleSubmitWithGoogle,
    handleSubmitWithFacebook,
    handleSubmitWithPhone,
  } = useAuth();

  return (
    <div className="container-sm d-flex flex-column justify-content-center align-items-center app">
      <h5>To get started please sign in</h5>
      <AuthForm
        onSubmitWithEmail={handleLogin}
        onSubmitWithGoogle={handleSubmitWithGoogle}
        onSubmitWithFacebook={handleSubmitWithFacebook}
        onSubmitWithPhone={handleSubmitWithPhone}
      />
      <Link to={SIGNUP_ROUTE}>Create account</Link>
    </div>
  );
};

export default LoginPage;
