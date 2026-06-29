import api from "@/features/auth/services/auth";
import type { ApiResponse } from "../types/Padre.types";
import type { AuthRole } from "@/features/auth/types/auth.types";

export type UserResponse = {
  id: number;
  name: string;
  username: string;
  email: string;
  role: AuthRole;
  imageUrl?: string | null;
};

export async function ObtenerUsuarioActual(): Promise<UserResponse> {
  const rpta = await api.get<ApiResponse<UserResponse>>("/api/users/me");
  return rpta.data.data;
}

export async function ActualizarFotoPerfil(imageUrl: string): Promise<UserResponse> {
  const rpta = await api.patch<ApiResponse<UserResponse>>("/api/users/me/image-url", { imageUrl });
  return rpta.data.data;
}
