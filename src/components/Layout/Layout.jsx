import { signOut } from "firebase/auth";
import { Outlet } from "react-router-dom";
import { useAuth } from "hooks/useAuth";
import { auth } from "firebaseConfig";

const Layout = () => {
  const { user } = useAuth();

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="col p-3">
      {user && (
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={signOutUser}
          >
            Sign out
          </button>
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default Layout;
