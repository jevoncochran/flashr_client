import axios from "axios";
import { RegistrationData, LoginData } from "./authTypes";

// Register user
const register = async (registrationData: RegistrationData) => {
  const response = await axios.post("/auth/register", registrationData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (loginData: LoginData) => {
  const response = await axios.post("/auth/login", loginData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("showDeck");
  localStorage.removeItem("selectedCategory");
};

const authService = { register, login, logout };

export default authService;
