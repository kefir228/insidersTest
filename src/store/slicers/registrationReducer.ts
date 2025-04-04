'use client'

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  email: string;
  password: string;
  confirmPass: string;
  user: { email: string; uid: string } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  email: '',
  password: '',
  confirmPass: '',
  user: null,
  loading: false,
  error: null,
};

const registartionSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setConfirmPass: (state, action: PayloadAction<string>) => {
      state.confirmPass = action.payload;
    },
    setUser: (state, action: PayloadAction<{ email: string; uid: string }>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setEmail, setPassword, setConfirmPass, setUser, setLoading, setError } = registartionSlice.actions;
export default registartionSlice.reducer;
