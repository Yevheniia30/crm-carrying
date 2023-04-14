import { Link } from "react-router-dom";
import { SIGNUP_ROUTE } from "utils/contants";
import { useAuth } from "hooks/useAuth";
import AuthForm from "components/AuthForm/AuthForm";

const LoginPage = () => {
  const { handleLogin } = useAuth();

  return (
    <div className="container-sm d-flex flex-column justify-content-center align-items-center app">
      <h5>To get started please sign in</h5>
      <AuthForm onSubmitWithEmail={handleLogin} />
      <Link to={SIGNUP_ROUTE}>Create account</Link>
    </div>
  );
};

export default LoginPage;
