import axios from "axios";
import formatTokenHeader from "../../utils/formatTokenHeader";

// Get categories
const getCategories = async (token: string) => {
  const response = await axios.get("/categories", formatTokenHeader(token));

  return response.data;
};

// Create category
const createCategory = async (newCategoryTitle: string, token: string) => {
  const response = await axios.post(
    "/categories",
    { title: newCategoryTitle },
    formatTokenHeader(token)
  );

  return response.data;
};

const categoryService = { getCategories, createCategory };

export default categoryService;
