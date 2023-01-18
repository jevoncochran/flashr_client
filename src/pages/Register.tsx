import { useState, useEffect } from "react";
import { RegistrationData } from "../features/auth/authTypes";
import { Box, Text, Stack, Input, Button } from "@chakra-ui/react";

interface UserData extends RegistrationData {
  password2: string;
}

const Register = () => {
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
  };

  useEffect(() => {
    console.log("userData: ", userData);
  }, [userData]);

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
              name="password"
              placeholder="Password"
              value={userData.password}
              onChange={onChange}
            />
            <Input
              variant="outline"
              size="md"
              width="60%"
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
    </Box>
  );
};

export default Register;
