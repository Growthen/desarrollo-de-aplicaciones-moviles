import { createContext } from "react";
import type { AuthRole } from "@/features/auth/types/auth.types";

export type User = {
  id: number;
  name: string;
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
  updateUserEmail: (email: string) => Promise<void>;
  devLogin?: (role: AuthRole) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  isBiometricEnabled: boolean;
  isBiometricAvailable: boolean;
  needsBiometricUnlock: boolean;
  toggleBiometric: () => Promise<boolean>;
  unlockWithBiometrics: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);
