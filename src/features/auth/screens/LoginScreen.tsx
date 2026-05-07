import { useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import useAuth from "../hooks/useAuth";

/* ─── Design System Colors ─── */
const COLORS = {
  primary: "#a73300",
  primaryContainer: "#d24300",
  secondary: "#5029e6",
  surface: "#fef8f1",
  surfaceContainerLowest: "#ffffff",
  surfaceContainerLow: "#f9f3ec",
  surfaceContainer: "#f3ede6",
  onSurface: "#1d1b17",
  onSurfaceVariant: "#5b4038",
  outline: "#907066",
  outlineVariant: "#e4beb2",
  onPrimary: "#ffffff",
  primaryFixed: "#ffdbd0",
  secondaryFixed: "#e5deff",
};

type Role = "padre" | "docente" | "admin";

const ROLES: { key: Role; label: string; icon: string }[] = [
  { key: "padre", label: "Padre", icon: "👨👩👧" },
  { key: "docente", label: "Docente", icon: "📚" },
  { key: "admin", label: "Admin", icon: "⚙️" },
];

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function LoginScreen() {
  const { login } = useAuth();

  const [selectedRole, setSelectedRole] = useState<Role>("padre");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    login();
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />

      {/* ─── Decorative Background Blobs ─── */}
      <View style={styles.blobTopRight} />
      <View style={styles.blobBottomLeft} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ─── Brand / Header ─── */}
          <View style={styles.brandContainer}>
            <View style={styles.iconBox}>
              <Text style={styles.schoolIcon}>🎓</Text>
            </View>

            <Text style={styles.brandTitle}>Trilce</Text>
            <Text style={styles.brandSubtitle}>
              Gestión Académica e Incidentes
            </Text>
          </View>

          {/* ─── Login Card ─── */}
          <View style={styles.card}>
            {/* Role Selector */}
            <View style={styles.roleRow}>
              {ROLES.map((role) => {
                const isActive = selectedRole === role.key;
                return (
                  <Pressable
                    key={role.key}
                    style={[styles.roleItem, isActive && styles.roleItemActive]}
                    onPress={() => setSelectedRole(role.key)}
                  >
                    <Text style={styles.roleIcon}>{role.icon}</Text>
                    <Text
                      style={[
                        styles.roleLabel,
                        isActive && styles.roleLabelActive,
                      ]}
                    >
                      {role.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {/* Email Field */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Correo Electrónico</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputIconText}>✉️</Text>
                <TextInput
                  style={styles.input}
                  placeholder="tu@correo.com"
                  placeholderTextColor={COLORS.outline}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
              </View>
            </View>

            {/* Password Field */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Contraseña</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputIconText}>🔒</Text>
                <TextInput
                  style={[styles.input, styles.inputPassword]}
                  placeholder="••••••••"
                  placeholderTextColor={COLORS.outline}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoComplete="password"
                />
                <Pressable
                  onPress={() => setShowPassword((prev) => !prev)}
                  style={styles.eyeButton}
                  hitSlop={8}
                >
                  <Text style={{ fontSize: 16 }}>
                    {showPassword ? "👁️" : "🙈"}
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* Submit Button */}
            <Pressable
              onPress={handleLogin}
              style={({ pressed }) => [
                styles.submitButton,
                pressed && styles.submitButtonPressed,
              ]}
            >
              <Text style={styles.submitText}>Iniciar Sesión</Text>
              <Text style={styles.arrowIcon}>→</Text>
            </Pressable>
          </View>

          {/* ─── Forgot Password Link ─── */}
          <Pressable style={styles.forgotContainer}>
            <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

/* ─── Styles ─── */
const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  root: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },

  /* Decorative blobs */
  blobTopRight: {
    position: "absolute",
    top: -SCREEN_WIDTH * 0.2,
    right: -SCREEN_WIDTH * 0.2,
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_WIDTH * 0.8,
    borderRadius: 9999,
    backgroundColor: COLORS.primaryFixed,
    opacity: 0.3,
  },
  blobBottomLeft: {
    position: "absolute",
    bottom: -SCREEN_WIDTH * 0.2,
    left: -SCREEN_WIDTH * 0.2,
    width: SCREEN_WIDTH * 0.7,
    height: SCREEN_WIDTH * 0.7,
    borderRadius: 9999,
    backgroundColor: COLORS.secondaryFixed,
    opacity: 0.3,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 48,
  },

  /* ─── Brand ─── */
  brandContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: COLORS.surfaceContainerLowest,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: COLORS.onSurface,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 32,
    elevation: 4,
  },
  schoolIcon: {
    fontSize: 30,
  },
  brandTitle: {
    fontSize: 36,
    fontWeight: "800",
    color: COLORS.primary,
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  brandSubtitle: {
    fontSize: 15,
    color: COLORS.onSurfaceVariant,
    textAlign: "center",
    maxWidth: 280,
  },

  /* ─── Card ─── */
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 24,
    paddingHorizontal: 28,
    paddingVertical: 32,
    shadowColor: COLORS.onSurface,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.04,
    shadowRadius: 48,
    elevation: 3,
    gap: 22,
  },

  /* ─── Role Selector ─── */
  roleRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 4,
  },
  roleItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: `${COLORS.outlineVariant}33`,
    backgroundColor: COLORS.surface,
    gap: 6,
  },
  roleItemActive: {
    backgroundColor: `${COLORS.primary}0D`,
    borderColor: `${COLORS.primary}4D`,
  },
  roleIcon: {
    fontSize: 20,
  },
  roleLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.onSurfaceVariant,
  },
  roleLabelActive: {
    color: COLORS.primary,
  },

  /* ─── Input Fields ─── */
  fieldGroup: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.onSurfaceVariant,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: `${COLORS.outlineVariant}33`,
    borderRadius: 12,
    shadowColor: COLORS.onSurface,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  inputIconText: {
    fontSize: 16,
    marginLeft: 16,
    width: 24,
    textAlign: "center",
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: COLORS.onSurface,
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  inputPassword: {
    paddingRight: 48,
  },
  eyeButton: {
    position: "absolute",
    right: 14,
    padding: 4,
  },

  /* ─── Submit Button ─── */
  submitButton: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 9999,
    gap: 8,
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 6,
  },
  submitButtonPressed: {
    opacity: 0.85,
    transform: [{ translateY: 1 }],
  },
  submitText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.onPrimary,
  },
  arrowIcon: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.onPrimary,
  },

  /* ─── Forgot Password ─── */
  forgotContainer: {
    marginTop: 28,
    paddingVertical: 4,
  },
  forgotText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.secondary,
  },
});
