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

export default function EmailRestoreScreen() {
  const navigation = useNavigation();
  const [newEmail, setNewEmail] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

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
              Actualizar Correo
            </ThemedText>
            <ThemedText type="body" style={styles.subtitle}>
              Mantén un medio de recuperación secundario
            </ThemedText>
          </View>

          {/* Form Card */}
          <View style={styles.formContainer}>
            {/* Current Email (Read Only) */}
            <View style={styles.fieldGroup}>
              <ThemedText type="label" style={styles.uppercaseLabel}>
                Correo Actual
              </ThemedText>
              <View style={styles.readOnlyEmailBox}>
                <MaterialIcons name="email" size={20} color={COLORS.secondary} />
                <ThemedText type="body" style={styles.currentEmailText}>
                  estudiante.trilce@universidad.edu.pe
                </ThemedText>
              </View>
              <ThemedText type="body" style={styles.helperText}>
                Este es tu correo institucional principal.
              </ThemedText>
            </View>

            {/* New Email Input */}
            <View style={styles.fieldGroup}>
              <ThemedText type="label" style={styles.uppercaseLabel}>
                Correo Nuevo
              </ThemedText>
              <View
                style={[
                  styles.inputWrapper,
                  focusedField === "newEmail" && styles.inputWrapperFocused,
                ]}
              >
                <MaterialIcons
                  name="mark-email-read"
                  size={20}
                  color={
                    focusedField === "newEmail"
                      ? COLORS.primary
                      : COLORS.outline
                  }
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="ejemplo@correo.com"
                  placeholderTextColor={"rgba(91, 64, 56, 0.4)"} // onSurfaceVariant opacity
                  value={newEmail}
                  onChangeText={setNewEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onFocus={() => setFocusedField("newEmail")}
                  onBlur={() => setFocusedField(null)}
                />
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
                  name="sync-alt"
                  size={20}
                  color={COLORS.onPrimary}
                  style={styles.submitIcon}
                />
              </LinearGradient>
            </Pressable>
          </View>

          {/* Info Section */}
          <View style={styles.infoSection}>
            <View style={styles.securityCard}>
              <MaterialIcons
                name="security"
                size={24}
                color={COLORS.secondary}
                style={styles.infoIcon}
              />
              <View style={styles.infoContent}>
                <ThemedText type="label" style={styles.securityTitle}>
                  Seguridad
                </ThemedText>
                <ThemedText type="body" style={styles.infoText}>
                  Te enviaremos un código de verificación para validar la nueva
                  dirección.
                </ThemedText>
              </View>
            </View>
            <View style={styles.importantCard}>
              <MaterialIcons
                name="info"
                size={24}
                color={COLORS.primary}
                style={styles.infoIcon}
              />
              <View style={styles.infoContent}>
                <ThemedText type="label" style={styles.importantTitle}>
                  Importante
                </ThemedText>
                <ThemedText type="body" style={styles.infoText}>
                  Solo podrás cambiar tu correo secundario una vez cada 30 días.
                </ThemedText>
              </View>
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
    borderColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: COLORS.primaryFixed,
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
    marginBottom: 8,
  },
  subtitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.8,
  },
  formContainer: {
    backgroundColor: COLORS.surfaceContainerLowest,
    padding: 24,
    borderRadius: 16,
    gap: 28,
    shadowColor: COLORS.onSurface,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 32,
    elevation: 2,
  },
  fieldGroup: {
    gap: 10,
  },
  uppercaseLabel: {
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  readOnlyEmailBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(228, 190, 178, 0.2)",
  },
  currentEmailText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 16,
    color: COLORS.onSurface,
    flexShrink: 1,
  },
  helperText: {
    fontSize: 12,
    color: "rgba(91, 64, 56, 0.6)", // onSurfaceVariant with opacity
    fontStyle: "italic",
    paddingHorizontal: 4,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(228, 190, 178, 0.2)",
    paddingLeft: 12,
    paddingRight: 16,
    height: 56,
  },
  inputWrapperFocused: {
    borderColor: COLORS.primary,
    borderWidth: 2,
    backgroundColor: COLORS.surfaceBright,
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
  submitButtonContainer: {
    marginTop: 8,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 6,
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    borderRadius: 30,
    gap: 12,
  },
  submitIcon: {
    marginLeft: 4,
  },
  infoSection: {
    marginTop: 24,
    gap: 16,
  },
  securityCard: {
    backgroundColor: "rgba(105, 75, 255, 0.1)", // secondary container 0.1
    padding: 20,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
  },
  importantCard: {
    backgroundColor: COLORS.surfaceContainerHigh,
    padding: 20,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
  },
  infoIcon: {
    marginTop: 2,
  },
  infoContent: {
    flex: 1,
  },
  securityTitle: {
    fontSize: 14,
    color: COLORS.secondary,
    marginBottom: 4,
  },
  importantTitle: {
    fontSize: 14,
    color: COLORS.onSurface,
    marginBottom: 4,
  },
  infoText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    lineHeight: 18,
  },
});