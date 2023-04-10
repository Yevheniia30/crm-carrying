import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { SIGNUP_ROUTE } from "utils/contants";
import AuthForm from "components/AuthForm/AuthForm";
// import { login } from "redux/users/usersOperations";

// import { useAuthState } from "react-firebase-hooks/auth";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithEmailAndPassword,
  // getAuth,
} from "firebase/auth";
import { auth } from "firebaseConfig";

const LoginPage = () => {
  // const dispatch = useDispatch();
  const handleSubmit = async ({ email, password }) => {
    // dispatch(login({ email, password }));
    // const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div className="container-sm d-flex flex-column justify-content-center align-items-center app">
      <h5>To get started please sign in</h5>
      <AuthForm onSubmit={handleSubmit} />
      <Link to={SIGNUP_ROUTE}>Create account</Link>
    </div>
  );
};

export default LoginPage;
