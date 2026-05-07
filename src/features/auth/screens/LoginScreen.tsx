import {
  ActivityIndicator,
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

/* ─── Importacion de Custom Hooks y Hooks─── */
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { useFonts } from "expo-font";

/* ─── Importacion de font, iconos y materiales que se usaran para la screen ─── */
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from "@expo-google-fonts/plus-jakarta-sans";
import {
  Manrope_400Regular,
  Manrope_600SemiBold,
  Manrope_700Bold,
} from "@expo-google-fonts/manrope";


/* ─── Importacion de Colores Globales ─── */
import { COLORS } from "../../../shared/constants/colors";

type Role = "padre" | "docente" | "admin";

type MaterialIconName = React.ComponentProps<typeof MaterialIcons>["name"];

/* ─── Roles existentes ─── */
const ROLES: { key: Role; label: string; icon: MaterialIconName }[] = [
  { key: "padre", label: "Padre", icon: "family-restroom" },
  { key: "docente", label: "Docente", icon: "local-library" },
  { key: "admin", label: "Admin", icon: "admin-panel-settings" },
];

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function LoginScreen() {
  const { login } = useAuth();

  const [fontsLoaded] = useFonts({
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
    Manrope_400Regular,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });

  const [selectedRole, setSelectedRole] = useState<Role>("padre");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleLogin = () => {
    login();
  };

  if (!fontsLoaded) {
    return (
      <View style={[styles.root, styles.loadingContainer]}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

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
              <MaterialIcons name="school" size={32} color={COLORS.primary} />
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
                    <MaterialIcons
                      name={role.icon}
                      size={22}
                      color={
                        isActive ? COLORS.primary : COLORS.onSurfaceVariant
                      }
                    />
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
              <View
                style={[
                  styles.inputWrapper,
                  focusedField === "email" && styles.inputWrapperFocused,
                ]}
              >
                <MaterialIcons
                  name="mail-outline"
                  size={20}
                  color={COLORS.outline}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="tu@correo.com"
                  placeholderTextColor={COLORS.outline}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>

            {/* Password Field */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Contraseña</Text>
              <View
                style={[
                  styles.inputWrapper,
                  focusedField === "password" && styles.inputWrapperFocused,
                ]}
              >
                <MaterialIcons
                  name="lock-outline"
                  size={20}
                  color={COLORS.outline}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, styles.inputPassword]}
                  placeholder="••••••••"
                  placeholderTextColor={COLORS.outline}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoComplete="password"
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                />
                <Pressable
                  onPress={() => setShowPassword((prev) => !prev)}
                  style={styles.eyeButton}
                  hitSlop={8}
                >
                  <MaterialIcons
                    name={showPassword ? "visibility" : "visibility-off"}
                    size={20}
                    color={COLORS.outline}
                  />
                </Pressable>
              </View>
            </View>

            {/* Submit Button — Gradient */}
            <Pressable
              onPress={handleLogin}
              style={({ pressed }) => [pressed && styles.submitButtonPressed]}
            >
              <LinearGradient
                colors={[COLORS.primary, COLORS.primaryContainer]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.submitButton}
              >
                <Text style={styles.submitText}>Ingresar</Text>
                <MaterialIcons
                  name="arrow-forward"
                  size={18}
                  color={COLORS.onPrimary}
                />
              </LinearGradient>
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

/* ─── Estilos ─── */
const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  root: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  /* Decorative blobs */
  blobTopRight: {
    position: "absolute",
    top: -SCREEN_WIDTH * 0.2,
    right: -SCREEN_WIDTH * 0.1,
    width: SCREEN_WIDTH * 0.6,
    height: SCREEN_WIDTH * 0.6,
    borderRadius: 9999,
    backgroundColor: COLORS.primaryFixed,
    opacity: 0.2,
  },
  blobBottomLeft: {
    position: "absolute",
    bottom: -SCREEN_WIDTH * 0.2,
    left: -SCREEN_WIDTH * 0.1,
    width: SCREEN_WIDTH * 0.5,
    height: SCREEN_WIDTH * 0.5,
    borderRadius: 9999,
    backgroundColor: COLORS.secondaryFixed,
    opacity: 0.2,
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
  brandTitle: {
    fontSize: 36,
    fontFamily: "PlusJakartaSans_800ExtraBold",
    color: COLORS.primary,
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  brandSubtitle: {
    fontSize: 15,
    fontFamily: "Manrope_400Regular",
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
    gap: 24,
  },

  /* ─── Role Selector ─── */
  roleRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 4,
  },
  roleItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: `${COLORS.outlineVariant}33`,
    backgroundColor: COLORS.surface,
    gap: 4,
  },
  roleItemActive: {
    backgroundColor: `${COLORS.primary}0D`,
    borderColor: `${COLORS.primary}4D`,
  },
  roleLabel: {
    fontSize: 12,
    fontFamily: "Manrope_600SemiBold",
    color: COLORS.onSurfaceVariant,
  },
  roleLabelActive: {
    color: COLORS.primary,
  },

  /* ─── Input Fields ─── */
  fieldGroup: {
    gap: 4,
  },
  label: {
    fontSize: 14,
    fontFamily: "Manrope_600SemiBold",
    color: COLORS.onSurfaceVariant,
    marginLeft: 4,
    marginBottom: 2,
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
  inputWrapperFocused: {
    borderColor: COLORS.primary,
    borderWidth: 1.5,
  },
  inputIcon: {
    marginLeft: 16,
    width: 24,
    textAlign: "center",
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Manrope_400Regular",
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
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 9999,
    gap: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 6,
  },
  submitButtonPressed: {
    opacity: 0.9,
    transform: [{ translateY: 1 }],
  },
  submitText: {
    fontSize: 16,
    fontFamily: "Manrope_700Bold",
    color: COLORS.onPrimary,
  },

  /* ─── Forgot Password ─── */
  forgotContainer: {
    marginTop: 32,
    paddingVertical: 4,
  },
  forgotText: {
    fontSize: 14,
    fontFamily: "Manrope_600SemiBold",
    color: COLORS.secondary,
  },
});
