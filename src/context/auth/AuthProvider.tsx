import { ReactNode, useState, useEffect } from "react";
import { AuthContext, User } from "./AuthContext";
import { loginService, RegisterService } from "@/features/auth/services/auth";
import { saveToken, deleteToken } from "@/features/auth/services/token";
import type { AuthRole } from "@/features/auth/types/auth.types";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  children: ReactNode;
};

const USER_STORAGE_KEY = "@auth_user";

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStoredUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error("Error cargando el usuario almacenado:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadStoredUser();
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await loginService({ username, password });
      const {
        accessToken,
        userId,
        username: userUsername,
        email,
        role,
      } = response.data;
      await saveToken(accessToken);
      const newUser = {
        id: userId,
        username: userUsername,
        email,
        role: role as AuthRole,
        accessToken,
      };
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
      setUser(newUser);
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
  const Register = async (
    name: string,
    email: string,
    dni: string,
    password: string,
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await RegisterService({ name, email, dni, password });
      const {
        accessToken,
        userId,
        username: userUsername,
        email: userEmail,
        role,
      } = response.data;
      await saveToken(accessToken);
      const newUser = {
        id: userId,
        username: userUsername,
        email: userEmail,
        role: role as AuthRole,
        accessToken,
      };
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
      setUser(newUser);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "No se pudo registrar el usuario");
      } else {
        setError("No se pudo registrar el usuario");
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await deleteToken();
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        Register,
        logout,
        isLoading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
