// import { useState } from "react";
// import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "firebaseConfig";
// import { useSelector } from "react-redux";
import { LOGIN_ROUTE } from "utils/contants";
import AuthForm from "components/AuthForm/AuthForm";
// import { setUser } from "redux/users/usersSlice";
// import { signup } from "redux/users/usersOperations";

const SignupPage = () => {
  // const dispatch = useDispatch();

  const handleSubmit = async ({ name, surname, email, password }) => {
    // dispatch(signup({ email, password }));

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateProfile(user, {
          displayName: `${name} ${surname}`,
          // photoURL: "https://example.com/jane-q-user/profile.jpg",
        })
          .then(() => {
            // Profile updated!
            // ...
          })
          .catch((error) => {
            // An error occurred
            // ...
          });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorMassage", errorMessage);
      });
  };

  return (
    <div className="container-sm d-flex flex-column justify-content-center align-items-center app">
      <h5>To get started please create account</h5>
      <AuthForm isSignup={true} onSubmit={handleSubmit} />
      <Link to={LOGIN_ROUTE}>Log in your account</Link>
    </div>
  );
};

export default SignupPage;
