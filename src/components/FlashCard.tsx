import { Card, CardBody, Text } from "@chakra-ui/react";

interface FlashCardProps {
  transform?: string;
  transition?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  children: JSX.Element;
}

const FlashCard = ({
  transform,
  transition,
  onClick,
  children,
}: FlashCardProps) => {
  return (
    <Card
      width="450px"
      height="300px"
      onClick={onClick}
      transform={transform}
      transition={transition}
    >
      <CardBody>{children}</CardBody>
    </Card>
  );
};

export default FlashCard;
