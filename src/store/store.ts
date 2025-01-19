// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState> // exporta el tipo de estado global para usar en los hooks
export default store;