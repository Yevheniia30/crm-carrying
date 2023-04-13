import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { useContext } from "react";
import {
  LOGIN_ROUTE,
  SIGNUP_ROUTE,
  MAIN_ROUTE,
  USERS_ROUTE,
} from "utils/contants";
import Navbar from "./components/Navbar/Navbar";
import PrivateRoute from "components/PrivateRoute/PrivateRoute";
import PublicRoute from "components/PublicRoute/PublicRoute";
import MainPage from "pages/MainPage/MainPage";
import UsersPage from "pages/UsersPage/UsersPage";
import SignupPage from "pages/SignupPage/SignupPage";
import LoginPage from "pages/LoginPage/LoginPage";
import { useAuth } from "hooks/useAuth";
import Layout from "components/Layout/Layout";
import Loader from "components/Loader/Loader";

const App = () => {
  const { user, loading, isAdmin } = useAuth();
  // console.log("user", user);
  return (
    <div className={user ? "container-fluid d-flex p-0" : "container-fluid"}>
      {user && !loading && <Navbar />}
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path={MAIN_ROUTE} element={<Layout />}>
            <Route element={<PrivateRoute redirectTo={LOGIN_ROUTE} />}>
              <Route index element={<MainPage />} />
              {isAdmin && <Route path={USERS_ROUTE} element={<UsersPage />} />}
            </Route>
            <Route element={<PublicRoute redirectTo={MAIN_ROUTE} />}>
              <Route path={SIGNUP_ROUTE} element={<SignupPage />} />
              <Route path={LOGIN_ROUTE} element={<LoginPage />} />
            </Route>
          </Route>
          <Route
            path="*"
            element={<Navigate to={user ? MAIN_ROUTE : LOGIN_ROUTE} />}
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
