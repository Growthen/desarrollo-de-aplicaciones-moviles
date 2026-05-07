import { createContext } from "react";

export type User = {
  id: string;
  name: string;
};

export type AuthContextType = {
  user: User | null;
  login: () => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);
