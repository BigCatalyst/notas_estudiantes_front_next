import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  token: string | null;
  user: {
    id: number;
    username: string,
    email: string,
    role: string,
     // ... otras propiedades del usuario
   } | null;
    isAuthenticated: boolean;
}

const initialState: UserState = {
  token: null,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ token: string, user:any }>) {
      state.token = action.payload.token;
        state.user = action.payload.user;
         state.isAuthenticated = true
      localStorage.setItem('authToken', action.payload.token)
    },
    logout(state) {
      state.token = null;
      state.user = null;
       state.isAuthenticated = false
      localStorage.removeItem('authToken')
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;