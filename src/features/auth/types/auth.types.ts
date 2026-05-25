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

export type ForgotPasswordRequest = {
  email: string;
};

export type VerifyResetCodeRequest = {
  email: string;
  code: string;
};

export type ResetPasswordRequest = {
  email: string;
  newPassword: string;
  confirmPassword: string;
};

export type AuthRole = "COORDINADOR" | "PROFESOR" | "PADRE";

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
