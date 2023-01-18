import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

// Consider moving this to a types file
interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export default authSlice.reducer;
