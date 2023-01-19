import { Text } from "@chakra-ui/react";

interface CategoryBodyProps {
  category: string;
}

const CategoryBody = ({ category }: CategoryBodyProps) => {
  return <Text>{category}</Text>;
};

export default CategoryBody;
