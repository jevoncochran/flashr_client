import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cardService from "./cardService";
import { DeckCard } from "../../types";

interface CardState {
  cards: DeckCard[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

const initialState: CardState = {
  cards: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getCards = createAsyncThunk(
  "/cards/getCards",
  async (categoryId: string, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token;
      return await cardService.getCards(categoryId, token);
    } catch (error) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkApi.rejectWithValue(message);
    }
  }
);

export const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCards.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCards.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.cards = action.payload;
    });
    builder.addCase(getCards.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export default cardSlice.reducer;
