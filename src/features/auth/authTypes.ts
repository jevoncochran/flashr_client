// Consider moving this to a types file
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  token: string;
}

export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}
