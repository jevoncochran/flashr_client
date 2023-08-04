import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cardService from "./cardService";
import { DeckCard, GuessResult } from "../../Types";

interface CardState {
  cards: DeckCard[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

interface GuessResultData {
  categoryId: string;
  cardId: string;
  cardInfo: DeckCard;
  guessResult: GuessResult;
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

export const logGuessResult = createAsyncThunk(
  "/cards/logGuessResult",
  async (guessResultData: GuessResultData, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token;
      return await cardService.logGuessResult(
        guessResultData.categoryId,
        guessResultData.cardId,
        guessResultData.cardInfo,
        guessResultData.guessResult,
        token
      );
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
