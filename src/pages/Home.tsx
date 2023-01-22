import { useState, useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import axios from "axios";
import { SimpleGrid } from "@chakra-ui/react";
import FlashCard from "../components/FlashCard";
import CategoryBody from "../components/CategoryBody";
import { useNavigate } from "react-router-dom";

interface Category {
  id: string;
  title: string;
}

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const [categories, setCategories] = useState<Category[]>([]);

  const onCardClick = (category: Category) => {
    localStorage.setItem("selectedCategory", JSON.stringify(category));
    navigate("/cards");
  };

  useEffect(() => {
    axios
      .get("/categories", {
        headers: {
          // Added this conditional logic because without it, the token part of authorization was being set as 'undefined' (i.e. a string value) when token is undefined
          // That was problematic because the backend logic expects an undefined value in this case
          Authorization: user?.token ? `Bearer ${user?.token}` : `Bearer `,
        },
      })
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <>
      <SimpleGrid columns={3} spacing="40px">
        {categories.map((category) => (
          <FlashCard key={category.id} onClick={() => onCardClick(category)}>
            <CategoryBody category={category.title} />
          </FlashCard>
        ))}
      </SimpleGrid>
    </>
  );
};

export default Home;
