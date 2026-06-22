import axios from "axios"; // 1. Cambiamos la forma de importar
import type {
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  VerifyResetCodeRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  UpdateUserRequest,
  AuthResponse,
} from "../types/auth.types";
import { getToken } from "./token";

// 2. IMPORTANTE: Cambia "192.168.1.X" por la IP real de tu laptop (la que sacas con ipconfig)
const API_BASE_URL = "http://10.0.2.2:8080";

// 3. Agregamos "axios." antes del create
const api = axios.create({
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

export const changePasswordService = async (
  data: ChangePasswordRequest,
): Promise<AuthResponse> => {
  const response = await api.patch<AuthResponse>(
    "/api/users/me/change-password",
    data,
  );
  return response.data;
};

export const updateUserService = async (
  data: UpdateUserRequest,
): Promise<AuthResponse> => {
  const response = await api.put<AuthResponse>("/api/users/me/update", data);
  return response.data;
};

export default api;
