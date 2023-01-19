import { useState, useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Card {
  id: string;
  front: string;
  back: string;
  archived: boolean;
}

const PulledCard = () => {
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);

  const storedCategory = localStorage.getItem("selectedCategory");
  const category = storedCategory ? JSON.parse(storedCategory) : null;
  console.log("category: ", category);

  const [deck, setDeck] = useState<Card[]>([]);

  useEffect(() => {
    if (!category) {
      navigate("/");
    }

    axios
      .get(`/categories/${category.id}/cards`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((res) => {
        console.log(res.data);
        setDeck(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <div>PulledCard</div>;
};

export default PulledCard;
