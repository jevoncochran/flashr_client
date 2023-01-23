import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getCategories } from "../features/categories/categorySlice";
import { SimpleGrid, Icon, Box, Text, Input } from "@chakra-ui/react";
import { MdAddBox } from "react-icons/md";
import FlashCard from "../components/FlashCard";
import CategoryBody from "../components/CategoryBody";
import { useNavigate } from "react-router-dom";
import { Category } from "../Types";

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);
  const { categories, isLoading, isSuccess } = useAppSelector(
    (state) => state.categories
  );

  const [isAddMode, setIsAddMode] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const onCardClick = (category: Category) => {
    localStorage.setItem("selectedCategory", JSON.stringify(category));
    navigate("/cards");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("User has pressed enter");
      setIsAddMode(false);
    }
  };

  useEffect(() => {
    // If there is no logged in user, navigate to login page
    if (!user) {
      navigate("/login");
    }

    // Ensure showDeck value is set to false when loading home page
    localStorage.setItem("showDeck", JSON.stringify(false));

    dispatch(getCategories());
  }, [user]);

  return (
    <>
      {!isLoading ? (
        <SimpleGrid columns={3} spacing="40px">
          <FlashCard>
            {!isAddMode ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                // border="1px dashed black"
                position="absolute"
                height="100px"
                width="200px"
                top="50%"
                left="50%"
                margin="-50px 0 0 -100px"
              >
                <Text marginRight="6px">Add Category</Text>
                <Icon as={MdAddBox} onClick={() => setIsAddMode(true)} />
              </Box>
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                // border="1px dashed black"
                position="absolute"
                height="100px"
                width="200px"
                top="50%"
                left="50%"
                margin="-50px 0 0 -100px"
              >
                <Input
                  type="text"
                  name="newCategory"
                  placeholder="New Category Title"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </Box>
            )}
          </FlashCard>
          {categories.map((category) => (
            <FlashCard key={category.id} onClick={() => onCardClick(category)}>
              <CategoryBody category={category.title} />
            </FlashCard>
          ))}
        </SimpleGrid>
      ) : (
        <Text>Loading...</Text>
      )}
    </>
  );
};

export default Home;
