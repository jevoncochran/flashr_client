import axios from "axios";

// Get categories
const getCategories = async (token: string) => {
  const response = await axios.get("/categories", {
    headers: { Authorization: token ? `Bearer ${token}` : `Bearer ` },
  });

  return response.data;
};

const categoryService = { getCategories };

export default categoryService;
