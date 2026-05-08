import { createContext } from "react";

export type Role = "padre" | "docente" | "admin";

export type User = {
  id: string;
  name: string;
  role: Role;
};

export type AuthContextType = {
  user: User | null;
  login: (role: Role) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);
