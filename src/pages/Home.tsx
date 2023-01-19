import { useState, useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import axios from "axios";
import { SimpleGrid } from "@chakra-ui/react";
import FlashCard from "../components/FlashCard";
import CategoryBody from "../components/CategoryBody";

interface Category {
  id: string;
  title: string;
}

const Home = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios
      .get("/categories", {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h1>Home Page</h1>
      <SimpleGrid columns={3} spacing="40px">
        {categories.map((category) => (
          <FlashCard key={category.id}>
            <CategoryBody category={category.title} />
          </FlashCard>
        ))}
      </SimpleGrid>
    </>
  );
};

export default Home;
