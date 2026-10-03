import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  email: string;
  username: string;
  name?: string | null;
  avatarUrl?: string | null;
}

export type AuthStatus =
  | "idle"
  | "loading"
  | "authenticated"
  | "unauthenticated";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  status: AuthStatus;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  status: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthLoading: (state) => {
      state.status = "loading";
    },
    setCredentials: (state, action: PayloadAction<{ user: User }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.status = "authenticated";
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.status = "unauthenticated";
    },
  },
});

export const { setAuthLoading, setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
