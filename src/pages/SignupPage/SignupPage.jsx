import { Link } from "react-router-dom";
import { LOGIN_ROUTE } from "utils/contants";
import AuthForm from "components/AuthForm/AuthForm";
import { useAuth } from "hooks/useAuth";

const SignupPage = () => {
  const { handleSignup } = useAuth();

  return (
    <div className="container-sm d-flex flex-column justify-content-center align-items-center app">
      <h5>To get started please create account</h5>
      <AuthForm isSignup={true} onSubmitWithEmail={handleSignup} />

      <Link to={LOGIN_ROUTE}>Log in your account</Link>
    </div>
  );
};

export default SignupPage;
