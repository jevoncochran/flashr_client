import axios from "axios";

// Get categories
const getCategories = async (token: string) => {
  const response = await axios.get("/categories", {
    headers: { Authorization: token ? `Bearer ${token}` : `Bearer ` },
  });

  return response.data;
};

// Create category
const createCategory = async (newCategoryTitle: string, token: string) => {
  const response = await axios.post(
    "/categories",
    { title: newCategoryTitle },
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : `Bearer `,
      },
    }
  );

  return response.data;
};

const categoryService = { getCategories, createCategory };

export default categoryService;
