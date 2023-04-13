import { createContext, useMemo } from "react";
import { db } from "firebaseConfig";
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

import { doc, setDoc } from "firebase/firestore";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  console.log("process.env", process.env);
  const isAdmin = useMemo(() => {
    return Boolean(user?.email === process.env.REACT_APP_ADMIN_EMAIL);
  }, [user?.email]);

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
      const response = await signInWithPopup(auth, facebookAuthprovider);
      const user = response.user;
      // await updateProfile(user, {
      //   displayName: `${name} ${surname}`,
      // });
      const { displayName, uid, email: userEmail } = user;
      // Add a new document in collection "users"
      await setDoc(doc(db, "users", uid), {
        uid,
        displayName,
        email: userEmail,
        role: "facebook user",
        country: "USA",
      });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("eror facebook", error);
    }
  };

  const handleSubmitWithGoogle = async () => {
    console.log("google");
    try {
      const response = await signInWithPopup(auth, googleAuthProvider);
      const user = response.user;
      // await updateProfile(user, {
      //   displayName: `${name} ${surname}`,
      // });
      const { displayName, uid, email: userEmail } = user;
      // Add a new document in collection "users"
      await setDoc(doc(db, "users", uid), {
        uid,
        displayName,
        email: userEmail,
        role: "user",
        country: "USA",
      });
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
      const { displayName, uid, email: userEmail } = user;
      // Add a new document in collection "users"
      await setDoc(doc(db, "users", uid), {
        uid,
        displayName,
        email: userEmail,
        role: "user",
        country: "Ukraine",
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
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
