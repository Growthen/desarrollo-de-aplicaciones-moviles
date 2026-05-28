import { ReactNode, useState, useEffect } from "react";
import { AuthContext, User } from "./AuthContext";
import { loginService, RegisterService } from "@/features/auth/services/auth";
import { saveToken, deleteToken } from "@/features/auth/services/token";
import type { AuthRole } from "@/features/auth/types/auth.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  isBiometricAvailable as checkBiometricAvailable,
  isBiometricEnabled as checkBiometricEnabled,
  setBiometricEnabled,
  authenticateWithBiometrics,
} from "@/features/auth/services/biometric";

type Props = {
  children: ReactNode;
};

const USER_STORAGE_KEY = "@auth_user";

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBiometricEnabledState, setIsBiometricEnabledState] = useState(false);
  const [isBiometricAvailableState, setIsBiometricAvailableState] =
    useState(false);
  const [needsBiometricUnlock, setNeedsBiometricUnlock] = useState(false);

  useEffect(() => {
    const loadStoredUser = async () => {
      try {
        const available = await checkBiometricAvailable();
        setIsBiometricAvailableState(available);

        const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser) as User;
          const bioEnabled = await checkBiometricEnabled(parsedUser.id);
          setIsBiometricEnabledState(bioEnabled);

          if (bioEnabled) {
            setNeedsBiometricUnlock(true);
          }
          setUser(parsedUser);
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
      const bioEnabled = await checkBiometricEnabled(userId);
      setIsBiometricEnabledState(bioEnabled);
      setNeedsBiometricUnlock(false);
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
      const bioEnabled = await checkBiometricEnabled(userId);
      setIsBiometricEnabledState(bioEnabled);
      setNeedsBiometricUnlock(false);
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
    setIsBiometricEnabledState(false);
    setNeedsBiometricUnlock(false);
  };

  const devLogin = async (role: AuthRole) => {
    setIsLoading(true);
    setError(null);
    try {
      const mockToken = `mock_dev_token_${role.toLowerCase()}`;
      await saveToken(mockToken);
      const mockUser: User = {
        id: 9999,
        username: `dev_${role.toLowerCase()}`,
        email: `dev_${role.toLowerCase()}@trilce.edu.pe`,
        role,
        accessToken: mockToken,
      };
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mockUser));
      const bioEnabled = await checkBiometricEnabled(9999);
      setIsBiometricEnabledState(bioEnabled);
      setNeedsBiometricUnlock(false);
      setUser(mockUser);
    } catch (err: unknown) {
      console.error("Error setting dev login:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleBiometric = async (): Promise<boolean> => {
    if (!user) return false;
    const targetState = !isBiometricEnabledState;

    if (targetState) {
      const result = await authenticateWithBiometrics(
        "Confirma tu huella para activar la biometría",
      );
      if (result.success) {
        await setBiometricEnabled(user.id, true);
        setIsBiometricEnabledState(true);
        return true;
      }
      return false;
    } else {
      await setBiometricEnabled(user.id, false);
      setIsBiometricEnabledState(false);
      return true;
    }
  };

  const unlockWithBiometrics = async () => {
    if (!user) return;
    const result = await authenticateWithBiometrics("Desbloquea tu sesión");
    if (result.success) {
      setNeedsBiometricUnlock(false);
    } else {
      throw new Error(result.error || "Autenticación fallida");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        Register,
        logout,
        devLogin,
        isLoading,
        error,
        isBiometricEnabled: isBiometricEnabledState,
        isBiometricAvailable: isBiometricAvailableState,
        needsBiometricUnlock,
        toggleBiometric,
        unlockWithBiometrics,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
