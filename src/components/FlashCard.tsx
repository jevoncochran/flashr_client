import { Card, CardBody, Text } from "@chakra-ui/react";

interface FlashCardProps {
  children: JSX.Element;
}

const FlashCard = ({ children }: FlashCardProps) => {
  return (
    <Card width="450px" height="300px">
      <CardBody>{children}</CardBody>
    </Card>
  );
};

export default FlashCard;
