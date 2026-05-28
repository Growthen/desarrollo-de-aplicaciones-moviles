import { Alert, StyleSheet, Switch, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import useAuth from "@/features/auth/hooks/useAuth";
import ThemedText from "./ThemedText";
import { COLORS } from "../constants/colors";

export default function BiometricSwitch() {
  const { isBiometricAvailable, isBiometricEnabled, toggleBiometric } =
    useAuth();

  const handleToggle = async () => {
    const success = await toggleBiometric();
    if (success) {
      if (!isBiometricEnabled) {
        Alert.alert(
          "Biometría activada",
          "Se ha activado correctamente el acceso por biometría.",
        );
      } else {
        Alert.alert(
          "Biometría desactivada",
          "Se ha desactivado el acceso por biometría.",
        );
      }
    } else {
      Alert.alert(
        "Error",
        "No se pudo configurar la biometría. Verifica que tengas tu huella/rostro registrado en el dispositivo.",
      );
    }
  };

  const accentColor = COLORS.tertiary;
  const iconBgColor = `${COLORS.tertiary}1A`;
  const iconColor = COLORS.tertiary;

  return (
    <View style={[styles.container, { borderLeftColor: accentColor }]}>
      <View style={styles.content}>
        <View style={[styles.iconCircle, { backgroundColor: iconBgColor }]}>
          <MaterialIcons name="fingerprint" size={24} color={iconColor} />
        </View>

        <View style={styles.textGroup}>
          <ThemedText type="button" color="onSurface" style={styles.title}>
            Biometría Digital
          </ThemedText>
          <ThemedText
            type="body"
            color="onSurfaceVariant"
            style={styles.subtitle}
          >
            {isBiometricAvailable
              ? "Configura tu acceso seguro"
              : "No disponible en este dispositivo"}
          </ThemedText>
        </View>
      </View>

      <Switch
        value={isBiometricEnabled}
        onValueChange={handleToggle}
        disabled={!isBiometricAvailable}
        trackColor={{
          false: COLORS.surfaceContainerHigh,
          true: COLORS.tertiary,
        }}
        thumbColor={
          isBiometricEnabled ? COLORS.onTertiary : COLORS.outlineVariant
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.surfaceContainerLowest,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderLeftWidth: 4,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flex: 1,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
  },
  textGroup: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 16,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: "Manrope_400Regular",
  },
});
