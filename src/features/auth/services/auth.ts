import { create } from "axios";
import type {
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  VerifyResetCodeRequest,
  ResetPasswordRequest,
  AuthResponse,
} from "../types/auth.types";
import { getToken } from "./token";

const API_BASE_URL = "http://10.0.2.2:8080";

const api = create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const loginService = async (
  data: LoginRequest,
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/api/auth/login", data);
  return response.data;
};

export const RegisterService = async (
  data: RegisterRequest,
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/api/auth/register", data);
  return response.data;
};

export const forgotPasswordService = async (
  data: ForgotPasswordRequest,
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    "/api/auth/forgot-password",
    data,
  );
  return response.data;
};

export const verifyResetCodeService = async (
  data: VerifyResetCodeRequest,
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    "/api/auth/verify-reset-code",
    data,
  );
  return response.data;
};

export const resetPasswordService = async (
  data: ResetPasswordRequest,
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    "/api/auth/reset-password",
    data,
  );
  return response.data;
};

export default api;
