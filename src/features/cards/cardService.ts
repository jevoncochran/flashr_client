import axios from "axios";
import formatTokenHeader from "../../utils/formatTokenHeader";

// Get cards
const getCards = async (categoryId: string, token: string) => {
  const response = await axios.get(
    `/categories/${categoryId}/cards`,
    formatTokenHeader(token)
  );

  return response.data;
};

const cardService = { getCards };

export default cardService;
