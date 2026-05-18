import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
  Alert,
} from "react-native";

import useAuth from "@/features/auth/hooks/useAuth";
import { useState } from "react";

import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { COLORS, ThemedText } from "@/shared";

type MaterialIconName = React.ComponentProps<typeof MaterialIcons>["name"];

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function LoginScreen() {
  const { login, isLoading, error } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }
    if (password.length < 8) {
      Alert.alert("Error", "La contraseña debe tener al menos 8 caracteres");
      return;
    }
    try {
      await login(username.trim(), password);
    } catch {
      Alert.alert("Error", error || "Credenciales invalidas");
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />

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
          <View style={styles.brandContainer}>
            <View style={styles.iconBox}>
              <MaterialIcons name="school" size={32} color={COLORS.primary} />
            </View>

            <ThemedText type="brandTitle">Trilce</ThemedText>
            <ThemedText type="brandSubtitle">
              Gestion Academica e Incidentes
            </ThemedText>
          </View>

          <View style={styles.card}>
            <View style={styles.fieldGroup}>
              <ThemedText type="label">Codigo Personal</ThemedText>
              <View
                style={[
                  styles.inputWrapper,
                  focusedField === "username" && styles.inputWrapperFocused,
                ]}
              >
                <MaterialIcons
                  name="done-outline"
                  size={20}
                  color={COLORS.outline}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="C001234567"
                  placeholderTextColor={COLORS.outline}
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  autoComplete="off"
                  onFocus={() => setFocusedField("username")}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <ThemedText type="label">Contraseña</ThemedText>
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

            <Pressable
              onPress={handleLogin}
              disabled={isLoading}
              style={({ pressed }) => [
                pressed && !isLoading && styles.submitButtonPressed,
                isLoading && styles.submitButtonDisabled,
              ]}
            >
              <LinearGradient
                colors={[COLORS.primary, COLORS.primaryContainer]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.submitButton}
              >
                {isLoading ? (
                  <ThemedText type="button">Ingresando...</ThemedText>
                ) : (
                  <>
                    <ThemedText type="button">Ingresar</ThemedText>
                    <MaterialIcons
                      name="arrow-forward"
                      size={18}
                      color={COLORS.onPrimary}
                    />
                  </>
                )}
              </LinearGradient>
            </Pressable>
          </View>

          <Pressable style={styles.forgotContainer}>
            <ThemedText type="link">¿Olvidaste tu contraseña?</ThemedText>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  root: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },

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
    paddingTop: 24,
    paddingBottom: 48,
  },

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

  fieldGroup: {
    gap: 4,
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
  submitButtonDisabled: {
    opacity: 0.6,
  },

  forgotContainer: {
    marginTop: 32,
    paddingVertical: 4,
  },
});
