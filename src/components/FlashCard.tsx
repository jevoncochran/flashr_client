import { Card, CardBody, Text } from "@chakra-ui/react";

interface FlashCardProps {
  children: JSX.Element;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const FlashCard = ({ children, onClick }: FlashCardProps) => {
  return (
    <Card width="450px" height="300px" onClick={onClick}>
      <CardBody>{children}</CardBody>
    </Card>
  );
};

export default FlashCard;
