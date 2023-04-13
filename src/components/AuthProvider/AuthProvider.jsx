import { createContext } from "react";
// import { auth } from "firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import {
  auth,
  facebookAuthprovider,
  googleAuthProvider,
  // recaptchaVerifier,
} from "firebaseConfig";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const handleSubmitWithPhone = (phone) => {
    console.log("phone", phone);
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, phone, recaptchaVerifier);
  };

  const handleSubmitWithFacebook = async () => {
    console.log("facebook");
    try {
      await signInWithPopup(auth, facebookAuthprovider);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("eror facebook", error);
    }
  };

  const handleSubmitWithGoogle = async () => {
    console.log("google");
    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };

  const handleSignup = async ({ name, surname, email, password }) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = response.user;
      await updateProfile(user, {
        displayName: `${name} ${surname}`,
      });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };

  const handleLogin = async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        handleSignup,
        handleLogin,
        handleSubmitWithGoogle,
        handleSubmitWithFacebook,
        handleSubmitWithPhone,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
