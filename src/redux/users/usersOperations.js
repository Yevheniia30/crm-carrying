import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";

export const signup = createAsyncThunk(
  "users/signup",
  async ({ email, password }, { rejectWithValue }) => {
    const auth = getAuth();

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const {
        email: userEmail,
        accessToken,
        uid,
        refreshToken,
      } = response.user;
      return { userEmail, accessToken, uid, refreshToken };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "users/login",
  async ({ email, password }, { rejectWithValue }) => {
    const auth = getAuth();

    try {
      // setPersistence(auth, browserSessionPersistence);

      const response = await signInWithEmailAndPassword(auth, email, password);
      const {
        email: userEmail,
        accessToken,
        uid,
        refreshToken,
      } = response.user;
      return { userEmail, accessToken, uid, refreshToken };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
