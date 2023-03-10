import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import { Box, Text, Stack, Input, Button } from "@chakra-ui/react";
import { login, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth
  );

  const [credentials, setCredentials] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(login(credentials));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

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
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="50%"
          height="100%"
          // border="1px dashed black"
        >
          <form onSubmit={onSubmit} style={{ width: "100%" }}>
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
                placeholder="Email"
                type="text"
                name="email"
                value={credentials.email}
                onChange={onChange}
              />
              <Input
                variant="outline"
                size="md"
                width="60%"
                type="password"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={onChange}
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
                  type="submit"
                >
                  LOGIN
                </Button>
              </Box>
            </Stack>
          </form>
        </Box>
      )}
    </Box>
  );
}
