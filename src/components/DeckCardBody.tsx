import { Box, Text, Icon } from "@chakra-ui/react";
import { HiOutlineArrowUturnRight } from "react-icons/hi2";
import { DeckCard } from "../Types";
import { Side } from "../pages/PulledCard";

interface DeckCardBodyProps {
  cardInfo: DeckCard;
  side: Side;
  setSide: React.Dispatch<React.SetStateAction<Side>>;
}

const DeckCardBody = ({ cardInfo, side, setSide }: DeckCardBodyProps) => {
  return (
    <Box
      // border="1px dashed black"
      height="100%"
      position="relative"
    >
      <Box
        position="absolute"
        height="100px"
        width="200px"
        top="50%"
        left="50%"
        margin="-50px 0 0 -100px"
        //   border="1px dashed black"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ backfaceVisibility: "hidden", transformStyle: "preserve-3d" }}
        transform={side === "back" ? "rotateY(180deg)" : "rotateY(0deg)"}
        transition="300ms"
      >
        <Text textAlign="center">{cardInfo.front}</Text>
      </Box>
      <Box
        position="absolute"
        height="100px"
        width="200px"
        top="50%"
        left="50%"
        margin="-50px 0 0 -100px"
        //   border="1px dashed black"
        display="flex"
        justifyContent="center"
        alignItems="center"
        transform={
          side === "front" ? "rotateY(180deg)" : "rotateY(0deg) scaleX(-1)"
        }
        transition="300ms"
        sx={{ backfaceVisibility: "hidden", transformStyle: "preserve-3d" }}
      >
        <Text textAlign="center">{cardInfo.back}</Text>
      </Box>
      <Icon
        as={HiOutlineArrowUturnRight}
        position="absolute"
        left="50%"
        bottom="0"
        // border="1px dashed black"
        transform={side === "front" ? "scaleY(-1)" : "scaleY(-1)"}
        boxSize={5}
        onClick={() => setSide(side === "front" ? "back" : "front")}
        sx={{ transformStyle: "preserve-3d" }}
      />
    </Box>
  );
};

export default DeckCardBody;
