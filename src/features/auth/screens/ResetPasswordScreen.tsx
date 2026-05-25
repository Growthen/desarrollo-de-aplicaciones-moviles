import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { COLORS, ThemedText } from "@/shared";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { resetPasswordService } from "@/features/auth/services/auth";
import type { AxiosError } from "axios";

type RouteParams = {
  email?: string;
};

export default function ResetPasswordScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { email } = (route.params ?? {}) as RouteParams;
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getErrorMessage = (err: unknown, fallback: string) => {
    const axiosError = err as AxiosError<{ message?: string }>;
    return axiosError?.response?.data?.message ??
      (err instanceof Error ? err.message : fallback);
  };

  const handleTogglePassword = () => setShowPassword((prev) => !prev);
  const handleSubmit = async () => {
    const trimmedEmail = (email ?? "").trim();
    if (!trimmedEmail) {
      Alert.alert("Error", "No se encontro el correo.");
      return;
    }
    if (!newPassword || !confirmPassword) {
      Alert.alert("Error", "Completa todos los campos.");
      return;
    }
    if (newPassword.length < 8) {
      Alert.alert("Error", "La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    try {
      setIsSubmitting(true);
      await resetPasswordService({
        email: trimmedEmail,
        newPassword,
        confirmPassword,
      });
      Alert.alert("Listo", "La contraseña se actualizo correctamente.", [
        {
          text: "Ir a login",
          onPress: () => navigation.navigate("Login"),
        },
      ]);
    } catch (err: unknown) {
      const message = getErrorMessage(
        err,
        "No se pudo restablecer la contraseña.",
      );
      Alert.alert("Error", message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.root} edges={["bottom"]}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={24} color={COLORS.primary} />
          </Pressable>
          <ThemedText
            type="body"
            style={[styles.headerTitle, { color: COLORS.primary }]}
          >
            Restablecer
          </ThemedText>
        </View>
        <View style={styles.profileBox}>
          <MaterialIcons name="key" size={22} color={COLORS.primary} />
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.pageHeader}>
            <ThemedText type="brandTitle" style={styles.title}>
              Nueva contraseña
            </ThemedText>
            <ThemedText type="body" style={styles.subtitle}>
              Define una nueva clave para {email || "tu cuenta"}.
            </ThemedText>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.fieldGroup}>
              <ThemedText type="label">Nueva contraseña</ThemedText>
              <View
                style={[
                  styles.inputWrapper,
                  focusedField === "new" && styles.inputWrapperFocused,
                ]}
              >
                <MaterialIcons
                  name="lock"
                  size={20}
                  color={COLORS.outline}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, styles.inputPassword]}
                  placeholder="••••••••"
                  placeholderTextColor={COLORS.outline}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry={!showPassword}
                  onFocus={() => setFocusedField("new")}
                  onBlur={() => setFocusedField(null)}
                />
                <Pressable
                  onPress={handleTogglePassword}
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

            <View style={styles.fieldGroup}>
              <ThemedText type="label">Confirmar contraseña</ThemedText>
              <View
                style={[
                  styles.inputWrapper,
                  focusedField === "confirm" && styles.inputWrapperFocused,
                ]}
              >
                <MaterialIcons
                  name="verified-user"
                  size={20}
                  color={COLORS.outline}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, styles.inputPassword]}
                  placeholder="••••••••"
                  placeholderTextColor={COLORS.outline}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showPassword}
                  onFocus={() => setFocusedField("confirm")}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>

            <Pressable
              onPress={handleSubmit}
              disabled={isSubmitting}
              style={({ pressed }) => [
                styles.submitButtonContainer,
                isSubmitting && styles.submitButtonDisabled,
                pressed && { transform: [{ scale: 0.98 }] },
              ]}
            >
              <LinearGradient
                colors={[COLORS.primary, COLORS.primaryContainer]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.submitButton}
              >
                <ThemedText type="button">
                  {isSubmitting ? "Restableciendo..." : "Restablecer"}
                </ThemedText>
                {!isSubmitting && (
                  <MaterialIcons
                    name="check"
                    size={20}
                    color={COLORS.onPrimary}
                    style={styles.submitIcon}
                  />
                )}
              </LinearGradient>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 64,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 999,
    backgroundColor: "rgba(228, 190, 178, 0.2)",
  },
  headerTitle: {
    fontFamily: "PlusJakartaSans_800ExtraBold",
    fontSize: 18,
    fontWeight: "700",
  },
  profileBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.primaryFixed,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: COLORS.surfaceContainerHighest,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 48,
  },
  pageHeader: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    color: COLORS.onSurface,
    textAlign: "left",
    marginBottom: 12,
  },
  subtitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 16,
    lineHeight: 24,
  },
  formContainer: {
    backgroundColor: COLORS.surfaceContainerLow,
    padding: 24,
    borderRadius: 16,
    gap: 24,
  },
  fieldGroup: {
    gap: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(228, 190, 178, 0.2)",
    paddingHorizontal: 16,
    height: 56,
  },
  inputWrapperFocused: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontFamily: "Manrope_500Medium",
    fontSize: 15,
    color: COLORS.onSurface,
  },
  inputPassword: {
    paddingRight: 40,
  },
  eyeButton: {
    position: "absolute",
    right: 16,
  },
  submitButtonContainer: {
    marginTop: 8,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    borderRadius: 28,
    gap: 8,
  },
  submitIcon: {
    marginLeft: 4,
  },
});
