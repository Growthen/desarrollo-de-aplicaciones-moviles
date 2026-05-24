import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable, ScrollView, SafeAreaView, Platform, StatusBar, KeyboardAvoidingView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "@/shared";
import { useNavigation } from "@react-navigation/native";

export default function RegistrarUsuarioScreen() {
  const navigation = useNavigation<any>();
  const [role, setRole] = useState<"padre" | "profesor" | "alumno">("padre");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />
      
      {/* TopAppBar */}
      <View style={styles.header}>
        <Pressable 
          style={styles.iconButton} 
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color={COLORS.primary} />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>TRILCE</Text>
        <View style={styles.profileIcon}>
          <MaterialIcons name="person" size={24} color={COLORS.onSurfaceVariant} />
        </View>
      </View>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header Section */}
          <View style={styles.pageHeader}>
            <Text style={styles.title}>Registrar Nuevo Usuario</Text>
            <Text style={styles.subtitle}>Plataforma de gestión académica para coordinadores de TRILCE</Text>
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
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>DNI</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Número de documento"
                  placeholderTextColor="rgba(91, 64, 56, 0.5)"
                  keyboardType="numeric"
                />
              </View>
            </View>

            {/* Account Info Block */}
            <View style={styles.blockContainer}>
              <Text style={styles.blockTitle}>Datos de Acceso</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nombre de usuario</Text>
                <TextInput
                  style={styles.input}
                  placeholder="nombre.apellido"
                  placeholderTextColor="rgba(91, 64, 56, 0.5)"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Correo electrónico</Text>
                <TextInput
                  style={styles.input}
                  placeholder="correo@ejemplo.com"
                  placeholderTextColor="rgba(91, 64, 56, 0.5)"
                  keyboardType="email-address"
                  autoCapitalize="none"
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

            {/* Role Selector Block */}
            <View style={styles.blockContainer}>
              <Text style={styles.blockTitle}>Asignación de Rol</Text>
              
              <View style={styles.roleGrid}>
                {/* Padre Option */}
                <Pressable 
                  style={[styles.roleCard, role === "padre" && styles.roleCardActive]}
                  onPress={() => setRole("padre")}
                >
                  <MaterialIcons 
                    name="family-restroom" 
                    size={28} 
                    color={role === "padre" ? COLORS.primary : COLORS.onSurfaceVariant} 
                  />
                  <Text style={[styles.roleText, role === "padre" && styles.roleTextActive]}>PADRE</Text>
                </Pressable>

                {/* Profesor Option */}
                <Pressable 
                  style={[styles.roleCard, role === "profesor" && styles.roleCardActive]}
                  onPress={() => setRole("profesor")}
                >
                  <MaterialIcons 
                    name="school" 
                    size={28} 
                    color={role === "profesor" ? COLORS.primary : COLORS.onSurfaceVariant} 
                  />
                  <Text style={[styles.roleText, role === "profesor" && styles.roleTextActive]}>PROFESOR</Text>
                </Pressable>

                {/* Alumno Option */}
                <Pressable 
                  style={[styles.roleCard, role === "alumno" && styles.roleCardActive]}
                  onPress={() => setRole("alumno")}
                >
                  <MaterialIcons 
                    name="face" 
                    size={28} 
                    color={role === "alumno" ? COLORS.primary : COLORS.onSurfaceVariant} 
                  />
                  <Text style={[styles.roleText, role === "alumno" && styles.roleTextActive]}>ALUMNO</Text>
                </Pressable>
              </View>
            </View>

            {/* Action Button */}
            <View style={styles.actionContainer}>
              <Pressable 
                style={styles.saveButton}
                onPress={() => {
                  // TODO: Save user and navigate back
                  navigation.goBack();
                }}
              >
                <MaterialIcons name="save" size={20} color={COLORS.onPrimary} />
                <Text style={styles.saveButtonText}>Guardar Usuario</Text>
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
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
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
});
