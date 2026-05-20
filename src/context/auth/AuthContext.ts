import { createContext } from "react";
import type { AuthRole } from "@/features/auth/types/auth.types";

export type User = {
  id: number;
  username: string;
  email: string;
  role: AuthRole;
  accessToken: string;
};

export type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  Register: (
    name: string,
    email: string,
    dni: string,
    password: string,
  ) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);
