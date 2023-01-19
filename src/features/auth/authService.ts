import axios from "axios";
import { RegistrationData, LoginData } from "./authTypes";

const register = async (registrationData: RegistrationData) => {
  const response = await axios.post("/auth/register", registrationData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const login = async (loginData: LoginData) => {
  const response = await axios.post("/auth/login", loginData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const authService = { register, login };

export default authService;
