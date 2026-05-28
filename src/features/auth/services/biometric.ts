import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";

const BIOMETRIC_KEY_PREFIX = "biometric_enabled_";

/**
 * Verifica si la biometría está disponible y configurada en el dispositivo.
 */
export const isBiometricAvailable = async (): Promise<boolean> => {
  try {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) return false;

    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    return isEnrolled;
  } catch (error) {
    console.error("Error al verificar disponibilidad de biometría:", error);
    return false;
  }
};

/**
 * Lanza el prompt nativo para autenticación biométrica.
 */
export const authenticateWithBiometrics = async (
  reason: string = "Inicia sesión con tu biometría",
): Promise<{ success: boolean; error?: string }> => {
  try {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: reason,
      fallbackLabel: "Usar PIN/Patrón",
      disableDeviceFallback: false,
    });

    if (result.success) {
      return { success: true };
    } else {
      return { success: false, error: result.error };
    }
  } catch (error) {
    console.error("Error durante la autenticación biométrica:", error);
    return { success: false, error: "unknown" };
  }
};

/**
 * Guarda en SecureStore si la biometría está activa para un usuario específico.
 */
export const setBiometricEnabled = async (
  userId: number,
  enabled: boolean,
): Promise<void> => {
  try {
    const key = `${BIOMETRIC_KEY_PREFIX}${userId}`;
    await SecureStore.setItemAsync(key, enabled ? "true" : "false");
  } catch (error) {
    console.error("Error al guardar preferencia de biometría:", error);
  }
};

/**
 * Obtiene de SecureStore si la biometría está activa para un usuario específico.
 */
export const isBiometricEnabled = async (userId: number): Promise<boolean> => {
  try {
    const key = `${BIOMETRIC_KEY_PREFIX}${userId}`;
    const value = await SecureStore.getItemAsync(key);
    return value === "true";
  } catch (error) {
    console.error("Error al obtener preferencia de biometría:", error);
    return false;
  }
};
