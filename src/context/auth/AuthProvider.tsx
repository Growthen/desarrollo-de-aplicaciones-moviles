import { ReactNode, useState } from "react";
import { AuthContext, User } from "./AuthContext";
import { loginService } from "@/features/auth/services/auth.service";
import { saveToken, deleteToken } from "@/features/auth/services/token.service";
import type { AuthRole } from "@/features/auth/types/auth.types";

type Props = {
  children: ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await loginService({ username, password });
      const { accessToken, userId, username: userUsername, email, role } = response.data;
      await saveToken(accessToken);
      setUser({
        id: userId,
        username: userUsername,
        email,
        role: role as AuthRole,
        accessToken,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Credenciales invalidas");
      } else {
        setError("Credenciales invalidas");
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await deleteToken();
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
