export type LoginRequest = {
  username: string;
  password: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  dni: string;
  password: string;
};

export type AuthRole = "COORDINADOR" | "PROFESOR" | "PADRE" | "ADMIN";

export type AuthResponseData = {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  userId: number;
  username: string;
  email: string;
  role: AuthRole;
};

export type AuthResponse = {
  success: boolean;
  message: string;
  data: AuthResponseData;
};

export type AuthError = {
  message: string;
  error: string;
  status: number;
  path: string;
  method: string;
  timestamp: string;
};
