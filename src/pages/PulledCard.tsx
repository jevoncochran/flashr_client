import { useState, useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Icon, Button, Stack } from "@chakra-ui/react";
import {
  IoCaretBackCircleSharp,
  IoCaretForwardCircleSharp,
} from "react-icons/io5";
import FlashCard from "../components/FlashCard";
import DeckCardBody from "../components/DeckCardBody";
import { DeckCard } from "../types";

export type Side = "front" | "back";

// Fisher-Yates shuffle which randomizes card order
const shuffle = (array: []) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const PulledCard = () => {
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);

  // Get necessary data from local storage
  const storedCategory = localStorage.getItem("selectedCategory");
  const category = storedCategory ? JSON.parse(storedCategory) : null;

  const storedShowDeckVal = localStorage.getItem("showDeck");
  const showDeckVal = storedShowDeckVal ? JSON.parse(storedShowDeckVal) : false;

  const [deck, setDeck] = useState<DeckCard[]>([]);
  const [side, setSide] = useState<Side>("front");
  const [index, setIndex] = useState(0);
  const [showDeck, setShowDeck] = useState(showDeckVal);

  const getNextCard = () => {
    if (index === deck.length - 1) return;
    setIndex(index + 1);
    setSide("front");
  };

  const getPrevCard = () => {
    if (index === 0) return;
    setIndex(index - 1);
    setSide("front");
  };

  useEffect(() => {
    if (!category) {
      navigate("/");
    }

    axios
      .get(`/categories/${category.id}/cards`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((res) => {
        const shuffledDeck = shuffle(res.data);
        setDeck(shuffledDeck);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (showDeck) {
      localStorage.setItem("showDeck", JSON.stringify(true));
    } else {
      localStorage.setItem("showDeck", JSON.stringify(false));
    }
  }, [showDeck]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <>
      <Box
        height="100vh"
        // border="2px solid red"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {!showDeck && (
          <Stack spacing={8}>
            <Button onClick={() => setShowDeck(true)}>BEGIN</Button>
            <Button>ADD CARDS</Button>
          </Stack>
        )}
        {showDeck && (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            //   border="1px dashed black"
            width="600px"
          >
            <Icon
              as={IoCaretBackCircleSharp}
              boxSize={10}
              onClick={getPrevCard}
            />
            {deck.length > 0 ? (
              <FlashCard
                transform={
                  side === "back"
                    ? "rotateY(180deg) perspective(1000px)"
                    : "rotateY(0deg)"
                }
                transition="300ms"
              >
                <DeckCardBody
                  cardInfo={deck[index]}
                  side={side}
                  setSide={setSide}
                />
              </FlashCard>
            ) : (
              <p>Retrieving cards...</p>
            )}
            <Icon
              as={IoCaretForwardCircleSharp}
              boxSize={10}
              onClick={getNextCard}
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default PulledCard;
