import { StyleSheet, View, Pressable } from "react-native";
import useAuth from "@/features/auth/hooks/useAuth";
import { COLORS, ThemedText } from "@/shared";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import type { AuthRole } from "@/features/auth/types/auth.types";

// Cambia a `false` si deseas ocultar por completo los botones de bypass incluso en modo de desarrollo (dev mode)
const ENABLE_DEV_BYPASS = true;

export default function DevBypassButtons() {
  // Solo se activa si la variable está activa y estamos en modo de desarrollo
  if (!ENABLE_DEV_BYPASS || !__DEV__) {
    return null;
  }

  const { devLogin, isLoading } = useAuth();

  const handleDevLogin = async (role: AuthRole) => {
    if (devLogin) {
      await devLogin(role);
    }
  };

  const bypassOptions: {
    role: AuthRole;
    label: string;
    icon: keyof typeof MaterialIcons.glyphMap;
    color: string;
    bg: string;
  }[] = [
    {
      role: "PROFESOR",
      label: "Ingresar como Profesor",
      icon: "school",
      color: COLORS.primary,
      bg: COLORS.primaryFixed,
    },
    {
      role: "PADRE",
      label: "Ingresar como Padre",
      icon: "family-restroom",
      color: COLORS.tertiary,
      bg: COLORS.tertiaryFixed,
    },
    {
      role: "COORDINADOR",
      label: "Ingresar como Coordinador",
      icon: "admin-panel-settings",
      color: COLORS.secondary,
      bg: COLORS.secondaryFixed,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.badge}>
          <ThemedText style={styles.badgeText}>DEV MODE</ThemedText>
        </View>
        <ThemedText type="label" style={styles.title}>
          Acceso Rápido de Desarrollo
        </ThemedText>
      </View>

      <View style={styles.buttonsContainer}>
        {bypassOptions.map((option) => (
          <Pressable
            key={option.role}
            disabled={isLoading}
            onPress={() => handleDevLogin(option.role)}
            style={({ pressed }) => [
              styles.button,
              { borderColor: `${option.color}33` },
              pressed && styles.buttonPressed,
            ]}
          >
            <View
              style={[styles.iconContainer, { backgroundColor: option.bg }]}
            >
              <MaterialIcons
                name={option.icon}
                size={20}
                color={option.color}
              />
            </View>
            <View style={styles.textContainer}>
              <ThemedText
                type="body"
                style={[styles.buttonText, { color: option.color }]}
              >
                {option.label}
              </ThemedText>
              <ThemedText type="roleLabel" style={styles.subtext}>
                Rol: {option.role}
              </ThemedText>
            </View>
            <MaterialIcons
              name="chevron-right"
              size={20}
              color={COLORS.outline}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: 20,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: COLORS.outline,
    padding: 16,
    marginTop: 24,
    gap: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  badge: {
    backgroundColor: COLORS.primaryFixed,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 9,
    fontFamily: "Manrope_700Bold",
    color: COLORS.onPrimaryFixedVariant,
  },
  title: {
    fontSize: 14,
    color: COLORS.onSurfaceVariant,
    marginLeft: 0,
    marginBottom: 0,
  },
  buttonsContainer: {
    gap: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surfaceContainerLowest,
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    gap: 12,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
  buttonText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 14,
  },
  subtext: {
    fontSize: 10,
    color: COLORS.outline,
  },
});
