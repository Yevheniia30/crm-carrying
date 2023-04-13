import { useState } from "react";

import { Link } from "react-router-dom";

import { LOGIN_ROUTE } from "utils/contants";
import AuthForm from "components/AuthForm/AuthForm";
import { useAuth } from "hooks/useAuth";

const SignupPage = () => {
  const {
    handleSignup,
    handleSubmitWithGoogle,
    handleSubmitWithFacebook,
    handleSubmitWithPhone,
  } = useAuth();

  return (
    <div className="container-sm d-flex flex-column justify-content-center align-items-center app">
      <h5>To get started please create account</h5>
      <AuthForm
        isSignup={true}
        onSubmitWithEmail={handleSignup}
        onSubmitWithGoogle={handleSubmitWithGoogle}
        onSubmitWithFacebook={handleSubmitWithFacebook}
        onSubmitWithPhone={handleSubmitWithPhone}
      />

      <Link to={LOGIN_ROUTE}>Log in your account</Link>
    </div>
  );
};

export default SignupPage;
