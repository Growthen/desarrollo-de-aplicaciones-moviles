import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "@/shared";
import { useNavigation } from "@react-navigation/native";
import {
  createStudent,
  createUser,
  getParents,
} from "@/features/coordinador/services/coordinadorService";

export default function RegistrarUsuarioScreen() {
  const navigation = useNavigation<any>();
  const [role, setRole] = useState<"padre" | "profesor" | "alumno">("padre");
  const [showPassword, setShowPassword] = useState(false);

  const [fullName, setFullName] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [parents, setParents] = useState<any[]>([]);
  const [selectedParentId, setSelectedParentId] = useState<number | null>(null);
  const [showParentDropdown, setShowParentDropdown] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchParents = async () => {
      try {
        const data = await getParents();
        setParents(data);
      } catch (error) {
        console.error("Error fetching parents:", error);
      }
    };

    const unsubscribe = navigation.addListener("focus", () => {
      // Fetch parents to get the latest list in real-time
      fetchParents();
      // Reset form states so that it starts clean on every new entry
      setFullName("");
      setDni("");
      setEmail("");
      setPassword("");
      setRole("padre");
      setSelectedParentId(null);
      setShowParentDropdown(false);
    });

    fetchParents();

    return unsubscribe;
  }, [navigation]);

  const handleSave = async () => {
    if (!fullName.trim() || !dni.trim()) {
      Alert.alert("Error", "Nombre Completo y DNI son campos obligatorios");
      return;
    }

    if (dni.trim().length !== 8) {
      Alert.alert("Error", "El DNI debe tener 8 dígitos");
      return;
    }

    try {
      setSubmitting(true);
      if (role === "alumno") {
        if (!selectedParentId) {
          Alert.alert(
            "Error",
            "Debe vincular un padre o madre para registrar un alumno",
          );
          return;
        }

        // Split name into first and last name
        const parts = fullName.trim().split(" ");
        const firstName = parts[0] || "";
        const lastName = parts.slice(1).join(" ") || "Pérez";

        await createStudent({
          firstName,
          lastName,
          dni,
          parentId: selectedParentId,
        });
      } else {
        if (!email.trim() || !password.trim()) {
          Alert.alert("Error", "Correo y contraseña son obligatorios");
          return;
        }

        await createUser({
          email,
          name: fullName,
          dni,
          password,
          role: role === "padre" ? "PADRE" : "PROFESOR",
        });
      }

      Alert.alert("Éxito", "Usuario registrado correctamente", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error: any) {
      const errMsg =
        error.response?.data?.message ||
        "Ocurrió un error al registrar el usuario";
      Alert.alert("Error", errMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />

      {/* TopAppBar */}
      <View style={styles.header}>
        <Pressable
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color={COLORS.primary} />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          TRILCE
        </Text>
        <View style={styles.profileIcon}>
          <MaterialIcons
            name="person"
            size={24}
            color={COLORS.onSurfaceVariant}
          />
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View style={styles.pageHeader}>
            <Text style={styles.title}>Registrar Nuevo Usuario</Text>
            <Text style={styles.subtitle}>
              Plataforma de gestión académica para coordinadores de TRILCE
            </Text>
          </View>

          {/* Form Area */}
          <View style={styles.formContainer}>
            {/* Personal Info Block */}
            <View style={styles.blockContainer}>
              <Text style={styles.blockTitle}>Información Personal</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nombre Completo</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ej. Juan Pérez"
                  placeholderTextColor="rgba(91, 64, 56, 0.5)"
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>DNI</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Número de documento"
                  placeholderTextColor="rgba(91, 64, 56, 0.5)"
                  keyboardType="numeric"
                  value={dni}
                  onChangeText={setDni}
                  maxLength={8}
                />
              </View>
            </View>

            {/* Parent Association Block for Alumnos */}
            {role === "alumno" && (
              <View style={styles.blockContainer}>
                <Text style={styles.blockTitle}>Vincular Padre/Madre</Text>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Seleccionar Padre</Text>
                  <Pressable
                    style={styles.inputContainerDropdown}
                    onPress={() => setShowParentDropdown(!showParentDropdown)}
                  >
                    <Text
                      style={[
                        styles.inputText,
                        !selectedParentId && styles.placeholderText,
                      ]}
                    >
                      {selectedParentId
                        ? parents.find((p) => p.id === selectedParentId)?.name
                        : "Seleccionar un padre de familia"}
                    </Text>
                    <MaterialIcons
                      name="keyboard-arrow-down"
                      size={24}
                      color={COLORS.onSurfaceVariant}
                    />
                  </Pressable>

                  {showParentDropdown && (
                    <View style={styles.dropdownList}>
                      <ScrollView
                        nestedScrollEnabled={true}
                        style={{ maxHeight: 150 }}
                      >
                        {parents.map((p) => (
                          <Pressable
                            key={p.id}
                            style={styles.dropdownItem}
                            onPress={() => {
                              setSelectedParentId(p.id);
                              setShowParentDropdown(false);
                            }}
                          >
                            <Text style={styles.dropdownItemText}>
                              {p.name} (DNI: {p.dni})
                            </Text>
                          </Pressable>
                        ))}
                      </ScrollView>
                    </View>
                  )}
                </View>
              </View>
            )}

            {/* Account Info Block (Only for Padres and Profesores) */}
            {role !== "alumno" && (
              <View style={styles.blockContainer}>
                <Text style={styles.blockTitle}>Datos de Acceso</Text>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Correo electrónico</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="correo@ejemplo.com"
                    placeholderTextColor="rgba(91, 64, 56, 0.5)"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Contraseña</Text>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={styles.passwordInput}
                      placeholder="••••••••"
                      placeholderTextColor="rgba(91, 64, 56, 0.5)"
                      secureTextEntry={!showPassword}
                      value={password}
                      onChangeText={setPassword}
                    />
                    <Pressable
                      style={styles.visibilityIcon}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <MaterialIcons
                        name={showPassword ? "visibility-off" : "visibility"}
                        size={20}
                        color={COLORS.onSurfaceVariant}
                      />
                    </Pressable>
                  </View>
                </View>
              </View>
            )}

            {/* Role Selector Block */}
            <View style={styles.blockContainer}>
              <Text style={styles.blockTitle}>Asignación de Rol</Text>

              <View style={styles.roleGrid}>
                {/* Padre Option */}
                <Pressable
                  style={[
                    styles.roleCard,
                    role === "padre" && styles.roleCardActive,
                  ]}
                  onPress={() => setRole("padre")}
                >
                  <MaterialIcons
                    name="family-restroom"
                    size={28}
                    color={
                      role === "padre"
                        ? COLORS.primary
                        : COLORS.onSurfaceVariant
                    }
                  />
                  <Text
                    style={[
                      styles.roleText,
                      role === "padre" && styles.roleTextActive,
                    ]}
                  >
                    PADRE
                  </Text>
                </Pressable>

                {/* Profesor Option */}
                <Pressable
                  style={[
                    styles.roleCard,
                    role === "profesor" && styles.roleCardActive,
                  ]}
                  onPress={() => setRole("profesor")}
                >
                  <MaterialIcons
                    name="school"
                    size={28}
                    color={
                      role === "profesor"
                        ? COLORS.primary
                        : COLORS.onSurfaceVariant
                    }
                  />
                  <Text
                    style={[
                      styles.roleText,
                      role === "profesor" && styles.roleTextActive,
                    ]}
                  >
                    PROFESOR
                  </Text>
                </Pressable>

                {/* Alumno Option */}
                <Pressable
                  style={[
                    styles.roleCard,
                    role === "alumno" && styles.roleCardActive,
                  ]}
                  onPress={() => setRole("alumno")}
                >
                  <MaterialIcons
                    name="face"
                    size={28}
                    color={
                      role === "alumno"
                        ? COLORS.primary
                        : COLORS.onSurfaceVariant
                    }
                  />
                  <Text
                    style={[
                      styles.roleText,
                      role === "alumno" && styles.roleTextActive,
                    ]}
                  >
                    ALUMNO
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* Action Button */}
            <View style={styles.actionContainer}>
              <Pressable
                style={styles.saveButton}
                onPress={handleSave}
                disabled={submitting}
              >
                {submitting ? (
                  <ActivityIndicator size="small" color={COLORS.onPrimary} />
                ) : (
                  <>
                    <MaterialIcons
                      name="save"
                      size={20}
                      color={COLORS.onPrimary}
                    />
                    <Text style={styles.saveButtonText}>Guardar Usuario</Text>
                  </>
                )}
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLORS.surface,
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.primary,
    flex: 1,
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  profileIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.surfaceContainerHigh,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(228, 190, 178, 0.3)",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    paddingTop: 16,
  },
  pageHeader: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    color: COLORS.onSurface,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.onSurfaceVariant,
  },
  formContainer: {
    gap: 24,
  },
  blockContainer: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 12,
    padding: 24,
    shadowColor: COLORS.onSurface,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
    gap: 16,
  },
  blockTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.onSurface,
    marginBottom: 4,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.onSurface,
  },
  input: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: "rgba(228, 190, 178, 0.2)",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.onSurface,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: "rgba(228, 190, 178, 0.2)",
    borderRadius: 8,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.onSurface,
  },
  visibilityIcon: {
    padding: 12,
  },
  roleGrid: {
    flexDirection: "row",
    gap: 16,
  },
  roleCard: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "rgba(228, 190, 178, 0.2)",
    alignItems: "center",
    gap: 8,
  },
  roleCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.surfaceContainer,
  },
  roleText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.onSurfaceVariant,
  },
  roleTextActive: {
    color: COLORS.primary,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    gap: 8,
    shadowColor: COLORS.onSurface,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    color: COLORS.onPrimary,
    fontSize: 14,
    fontWeight: "600",
  },
  inputContainerDropdown: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(228, 190, 178, 0.2)",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputText: {
    fontSize: 16,
    color: COLORS.onSurface,
  },
  placeholderText: {
    color: "rgba(91, 64, 56, 0.5)",
  },
  dropdownList: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: "rgba(228, 190, 178, 0.2)",
    borderRadius: 8,
    marginTop: 4,
    padding: 8,
    zIndex: 100,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(228, 190, 178, 0.1)",
  },
  dropdownItemText: {
    fontSize: 14,
    color: COLORS.onSurface,
  },
});
