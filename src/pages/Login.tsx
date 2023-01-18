import { useState, useEffect } from "react";
import { Box, Text, Stack, Input, Button } from "@chakra-ui/react";

export default function Login() {
  const [credentials, setCredentials] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });

  useEffect(() => {
    console.log("credentials: ", credentials);
  }, [credentials]);

  return (
    <Box
      display="flex"
      alignItems="center"
      w="100%"
      h="100vh"
      //   border="2px solid red"
    >
      <Box
        width="50%"
        height="100%"
        // border="1px dashed black"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Text fontSize="6xl">flashR</Text>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="50%"
        height="100%"
        // border="1px dashed black"
      >
        <Stack
          spacing={3}
          width="100%"
          //   border="1px dashed red"
          //   display="flex"
          align="center"
        >
          <Input
            variant="outline"
            size="md"
            width="60%"
            placeholder="Username"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
          />
          <Input
            variant="outline"
            size="md"
            width="60%"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
          <Box
            // border="1px dashed black"
            width="60%"
            display="flex"
            justifyContent="flexStart"
          >
            <Button
              colorScheme="teal"
              variant="solid"
              borderRadius={0}
              width="100%"
            >
              LOGIN
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
