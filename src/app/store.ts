import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import categoryReducer from "../features/categories/categorySlice";
import cardReducer from "../features/cards/cardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    cards: cardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
