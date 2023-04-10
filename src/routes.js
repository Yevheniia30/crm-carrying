import SignupPage from "pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import UsersPage from "./pages/UsersPage/UsersPage";
import {
  LOGIN_ROUTE,
  MAIN_ROUTE,
  SIGNUP_ROUTE,
  USERS_ROUTE,
} from "./utils/contants";

export const routes = [
  {
    path: LOGIN_ROUTE,
    Component: LoginPage,
  },
  {
    path: SIGNUP_ROUTE,
    Component: SignupPage,
  },
  {
    path: MAIN_ROUTE,
    Component: MainPage,
  },
  {
    path: USERS_ROUTE,
    Component: UsersPage,
  },
];
export const privateRoutes = [
  {
    path: MAIN_ROUTE,
    Component: MainPage,
  },
  {
    path: USERS_ROUTE,
    Component: UsersPage,
  },
];
