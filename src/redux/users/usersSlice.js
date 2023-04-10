import { createSlice } from "@reduxjs/toolkit";
import { login, signup } from "./usersOperations";

const initialState = {
  email: "",
  accessToken: null,
  uid: null,
  isAuth: false,
  refreshToken: null,
  role: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (store, { payload }) => {
        store.email = payload.userEmail;
        store.accessToken = payload.accessToken;
        store.uid = payload.uid;
        store.isAuth = true;
        store.refreshToken = payload.refreshToken;
      })
      .addCase(login.fulfilled, (store, { payload }) => {
        store.email = payload.userEmail;
        store.accessToken = payload.accessToken;
        store.uid = payload.uid;
        store.isAuth = true;
        store.refreshToken = payload.refreshToken;
      });
  },
});

export default userSlice.reducer;
export const { setUser, unsetUser } = userSlice.actions;
