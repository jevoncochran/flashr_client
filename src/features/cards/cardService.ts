import axios from "axios";
import formatTokenHeader from "../../utils/formatTokenHeader";
import { DeckCard, GuessResult } from "../../Types";

// Get cards
const getCards = async (categoryId: string, token: string) => {
  const response = await axios.get(
    `/categories/${categoryId}/cards`,
    formatTokenHeader(token)
  );

  return response.data;
};

// Logs the result of card guesses: "correct" or "incorrect"
// Updates the consecutive_corrects field of card
const logGuessResult = async (
  categoryId: string,
  cardId: string,
  cardInfo: DeckCard,
  guessResult: GuessResult,
  token: string
) => {
  const getConsecutiveCorrects = (guessData: GuessResult) => {
    // When user guesses incorrectly, consecutive_corrects value is set to 0
    if (guessData === "incorrect") {
      return 0;
    } else {
      // If user gueses correctly and consecutive_corrects value was null or 0 before, new value is set to 1
      if (!cardInfo.consecutive_corrects) {
        return 1;
      } else {
        // If user guesses correctly and consecutive_corrects values was number, add 1 to that number
        return cardInfo.consecutive_corrects + 1;
      }
    }
  };

  const response = await axios.put(
    `/categories/${categoryId}/cards/${cardId}`,
    {
      front: cardInfo.front,
      back: cardInfo.back,
      archived: cardInfo.archived,
      consecutive_corrects: getConsecutiveCorrects(guessResult),
    },
    formatTokenHeader(token)
  );

  return response.data;
};

const cardService = { getCards, logGuessResult };

export default cardService;
