import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import { RegistrationData } from "../features/auth/authTypes";
import { Box, Text, Stack, Input, Button } from "@chakra-ui/react";
import { register, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";

interface UserData extends RegistrationData {
  password2?: string;
}

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth
  );

  const [userData, setUserData] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userData.password2 === "") {
      toast.error("Please confirm password");
    } else if (userData.password !== userData.password2) {
      toast.error("Passwords do not match");
    } else {
      delete userData.password2;
      dispatch(register(userData));
    }
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
                placeholder="First Name"
                name="firstName"
                value={userData.firstName}
                onChange={onChange}
              />
              <Input
                variant="outline"
                size="md"
                width="60%"
                placeholder="Last Name"
                name="lastName"
                value={userData.lastName}
                onChange={onChange}
              />
              <Input
                variant="outline"
                size="md"
                width="60%"
                placeholder="Email"
                name="email"
                value={userData.email}
                onChange={onChange}
              />
              <Input
                variant="outline"
                size="md"
                width="60%"
                type="password"
                name="password"
                placeholder="Password"
                value={userData.password}
                onChange={onChange}
              />
              <Input
                variant="outline"
                size="md"
                width="60%"
                type="password"
                placeholder="Confirm password"
                name="password2"
                value={userData.password2}
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
                  SIGN UP
                </Button>
              </Box>
            </Stack>
          </form>
        </Box>
      )}
    </Box>
  );
};

export default Register;
