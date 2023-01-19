import { Text, Box } from "@chakra-ui/react";

interface CategoryBodyProps {
  category: string;
}

const CategoryBody = ({ category }: CategoryBodyProps) => {
  return (
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
    >
      <Text textAlign="center">{category}</Text>
    </Box>
  );
};

export default CategoryBody;
