import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getCards } from "../features/cards/cardSlice";
import { useNavigate } from "react-router-dom";
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
const shuffle = (array: DeckCard[]) => {
  const arrayCopy = [...array];
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [arrayCopy[currentIndex], arrayCopy[randomIndex]] = [
      arrayCopy[randomIndex],
      arrayCopy[currentIndex],
    ];
  }

  return arrayCopy;
};

const PulledCard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);
  const { cards, isLoading } = useAppSelector((state) => state.cards);

  // Get necessary data from local storage
  const storedCategory = localStorage.getItem("selectedCategory");
  const category = storedCategory ? JSON.parse(storedCategory) : null;

  const storedShowDeckVal = localStorage.getItem("showDeck");
  const showDeckVal = storedShowDeckVal ? JSON.parse(storedShowDeckVal) : false;

  const [side, setSide] = useState<Side>("front");
  const [index, setIndex] = useState(0);
  const [shuffledDeck, setShuffledDeck] = useState<DeckCard[]>([]);
  const [showDeck, setShowDeck] = useState(showDeckVal);

  const getNextCard = () => {
    if (index === shuffledDeck.length - 1) return;
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

    dispatch(getCards(category.id));
  }, []);

  useEffect(() => {
    setShuffledDeck(shuffle(cards));
  }, [cards]);

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
            {!isLoading ? (
              <FlashCard
                transform={
                  side === "back"
                    ? "rotateY(180deg) perspective(1000px)"
                    : "rotateY(0deg)"
                }
                transition="300ms"
              >
                <DeckCardBody
                  cardInfo={shuffledDeck[index]}
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
