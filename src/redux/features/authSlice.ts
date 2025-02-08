/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { User } from "@/services/Types";

interface Tokens {
  access: string;
  refresh: string;
}

export interface InitialState {
  isAuthenticated: boolean;
  user: User | null;
  tokens: Tokens | null;
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  isAuthenticated: false,
  user: null,
  tokens: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      // Actualiza el estado con los datos del usuario
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.tokens = {
        access: action.payload.access,
        refresh: action.payload.refresh,
      };
      state.loading = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.tokens = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
