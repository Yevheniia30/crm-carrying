import { createContext } from "react";
import { auth } from "firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
