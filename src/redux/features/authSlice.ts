/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { User } from "@/services/Types";

export interface State {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  isAuthenticated: false,
  user: null,
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
      state.loading = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    updateProfileSuccess: (state, action) => {
      // Actualiza el estado con los datos del usuario
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.loading = false;
    },
  },
});

export const { loginSuccess, logout, updateProfileSuccess } = authSlice.actions;
export default authSlice.reducer;
