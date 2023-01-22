import axios from "axios";

// Get cards
const getCards = async (categoryId: string, token: string) => {
  const response = await axios.get(`/categories/${categoryId}/cards`, {
    headers: { Authorization: token ? `Bearer ${token}` : `Bearer ` },
  });

  return response.data;
};

const cardService = { getCards };

export default cardService;
