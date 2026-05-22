import {
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
import { useNavigation } from "@react-navigation/native";

export default function PasswordRestoreScreen() {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [focusedField, setFocusedField] = useState<string | null>(null);

  // No logic requested, just UI states.
  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  return (
    <SafeAreaView style={styles.root} edges={["top", "bottom"]}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />

      {/* TopAppBar */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color={COLORS.primary} />
          </Pressable>
          <ThemedText
            type="body"
            style={[styles.headerTitle, { color: COLORS.primary }]}
          >
            Gestión Académica
          </ThemedText>
        </View>
        <View style={styles.profileBox}>
          <MaterialIcons name="person" size={24} color={COLORS.primary} />
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
          {/* Main Content Header */}
          <View style={styles.pageHeader}>
            <ThemedText type="brandTitle" style={styles.title}>
              Actualizar Contraseña
            </ThemedText>
            <ThemedText type="body" style={styles.subtitle}>
              Protege tu cuenta con una credencial segura para mantener tu información
              académica a salvo.
            </ThemedText>
          </View>

          {/* Form Container */}
          <View style={styles.formContainer}>
            <View style={styles.fieldGroup}>
              <ThemedText type="label">Contraseña Actual</ThemedText>
              <View
                style={[
                  styles.inputWrapper,
                  focusedField === "current" && styles.inputWrapperFocused,
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
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  secureTextEntry={!showPassword}
                  onFocus={() => setFocusedField("current")}
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

            <View style={styles.dividerSpacing} />

            <View style={styles.fieldGroup}>
              <ThemedText type="label">Nueva Contraseña</ThemedText>
              <View
                style={[
                  styles.inputWrapper,
                  focusedField === "new" && styles.inputWrapperFocused,
                ]}
              >
                <MaterialIcons
                  name="shield"
                  size={20}
                  color={COLORS.outline}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Crea una clave fuerte"
                  placeholderTextColor={COLORS.outline}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry
                  onFocus={() => setFocusedField("new")}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <ThemedText type="label">Confirmar Contraseña</ThemedText>
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
                  style={styles.input}
                  placeholder="Repite tu nueva clave"
                  placeholderTextColor={COLORS.outline}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  onFocus={() => setFocusedField("confirm")}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>

            {/* Strength Meter */}
            <View style={styles.strengthContainer}>
              <View style={styles.strengthHeaderRow}>
                <ThemedText style={styles.strengthLabel}>
                  SEGURIDAD DE CONTRASEÑA
                </ThemedText>
                <ThemedText style={styles.strengthValue}>Media</ThemedText>
              </View>
              <View style={styles.strengthBarsRow}>
                <View style={[styles.strengthBar, styles.strengthBarActive]} />
                <View style={[styles.strengthBar, styles.strengthBarActive]} />
                <View style={styles.strengthBar} />
                <View style={styles.strengthBar} />
              </View>
            </View>

            {/* Action Button */}
            <Pressable
              style={({ pressed }) => [
                styles.submitButtonContainer,
                pressed && { transform: [{ scale: 0.98 }] },
              ]}
            >
              <LinearGradient
                colors={[COLORS.primary, COLORS.primaryContainer]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.submitButton}
              >
                <ThemedText type="button">Confirmar Cambio</ThemedText>
                <MaterialIcons
                  name="check-circle"
                  size={20}
                  color={COLORS.onPrimary}
                  style={styles.submitIcon}
                />
              </LinearGradient>
            </Pressable>
          </View>

          {/* Tip Card */}
          <View style={styles.tipCard}>
            <MaterialIcons
              name="info"
              size={24}
              color={COLORS.secondary}
              style={styles.tipIcon}
            />
            <View style={styles.tipContent}>
              <ThemedText type="label" style={styles.tipTitle}>
                Recomendación
              </ThemedText>
              <ThemedText type="body" style={styles.tipText}>
                Usa una combinación de letras mayúsculas, minúsculas, números y
                caracteres especiales (como @, #, $) para una mayor seguridad.
              </ThemedText>
            </View>
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
    backgroundColor: "rgba(228, 190, 178, 0.2)", // outlineVariant opacity
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
  dividerSpacing: {
    height: 4,
  },
  strengthContainer: {
    marginTop: 8,
    gap: 8,
  },
  strengthHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  strengthLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.onSurfaceVariant,
    letterSpacing: 1,
  },
  strengthValue: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.primary,
  },
  strengthBarsRow: {
    flexDirection: "row",
    gap: 4,
    height: 6,
  },
  strengthBar: {
    flex: 1,
    backgroundColor: COLORS.surfaceVariant,
    borderRadius: 4,
  },
  strengthBarActive: {
    backgroundColor: COLORS.primary,
  },
  submitButtonContainer: {
    marginTop: 16,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
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
  tipCard: {
    marginTop: 32,
    backgroundColor: "rgba(105, 75, 255, 0.1)", // secondary container 0.1
    borderWidth: 1,
    borderColor: "rgba(80, 41, 230, 0.1)", // secondary 0.1
    padding: 24,
    borderRadius: 16,
    flexDirection: "row",
    gap: 16,
  },
  tipIcon: {
    marginTop: 2,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    color: COLORS.onSurface,
    marginBottom: 4,
  },
  tipText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 14,
    lineHeight: 20,
  },
});