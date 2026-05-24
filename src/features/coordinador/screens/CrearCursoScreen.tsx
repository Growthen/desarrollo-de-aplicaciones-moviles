import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable, ScrollView, SafeAreaView, Platform, StatusBar, KeyboardAvoidingView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "@/shared";
import { useNavigation } from "@react-navigation/native";

export default function CrearCursoScreen() {
  const navigation = useNavigation<any>();
  const [courseName, setCourseName] = useState("");
  // Simple state for placeholder dropdown
  const [teacher, setTeacher] = useState("");

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />
      
      {/* TopAppBar */}
      <View style={styles.header}>
        <Pressable 
          style={styles.iconButton} 
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="close" size={24} color={COLORS.primary} />
        </Pressable>
        <Text style={styles.headerTitle}>TRILCE</Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header Section */}
          <View style={styles.pageHeader}>
            <Text style={styles.title}>Crear Nuevo Curso</Text>
            <Text style={styles.subtitle}>Paso 1: Información del curso</Text>
            
            {/* Progress Indicator */}
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { backgroundColor: COLORS.primary }]} />
              <View style={[styles.progressBar, { backgroundColor: COLORS.surfaceVariant }]} />
            </View>
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
            {/* Abstract Background Element (Simulated with absolute positioning) */}
            <View style={styles.decorativeCircle} />

            {/* Course Name Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nombre del curso</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="ej: Introducción a la Programación"
                  placeholderTextColor="rgba(91, 64, 56, 0.5)" // onSurfaceVariant with opacity
                  value={courseName}
                  onChangeText={setCourseName}
                />
              </View>
            </View>

            {/* Teacher Select (Placeholder) */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Asignar Profesor</Text>
              <Pressable style={styles.inputContainer}>
                <Text style={[styles.inputText, !teacher && styles.placeholderText]}>
                  {teacher || "Seleccionar profesor"}
                </Text>
                <MaterialIcons name="keyboard-arrow-down" size={24} color={COLORS.onSurfaceVariant} style={styles.dropdownIcon} />
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Fixed Bottom Action Area */}
      <View style={styles.bottomActionArea}>
        <Pressable 
          style={styles.primaryButton}
          onPress={() => {
            navigation.navigate('CoordinadorAsignarAlumnos');
          }}
        >
          <Text style={styles.primaryButtonText}>Siguiente: Asignar Alumnos</Text>
          <MaterialIcons name="arrow-forward" size={20} color={COLORS.onPrimary} />
        </Pressable>
      </View>
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
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100, // Space for bottom action area
    paddingTop: 24,
  },
  pageHeader: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.onSurface,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.onSurfaceVariant,
  },
  progressContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: 16,
  },
  progressBar: {
    height: 4,
    flex: 1,
    borderRadius: 2,
  },
  formSection: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 12,
    padding: 24,
    shadowColor: COLORS.onSurface,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.04,
    shadowRadius: 32,
    elevation: 4,
    position: "relative",
    overflow: "hidden",
    gap: 24,
  },
  decorativeCircle: {
    position: "absolute",
    right: -64,
    top: -64,
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: COLORS.surfaceContainer,
    opacity: 0.5,
  },
  inputGroup: {
    gap: 8,
    zIndex: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.onSurface,
  },
  inputContainer: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(228, 190, 178, 0.2)", // ghost-border
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.onSurface,
    padding: 0,
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.onSurface,
  },
  placeholderText: {
    color: "rgba(91, 64, 56, 0.5)",
  },
  dropdownIcon: {
    marginLeft: 16,
  },
  bottomActionArea: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(254, 248, 241, 0.9)", // surface with opacity
    borderTopWidth: 1,
    borderTopColor: "rgba(228, 190, 178, 0.1)",
    padding: 16,
    paddingBottom: Platform.OS === "ios" ? 34 : 16, // Safe area bottom
    shadowColor: COLORS.onSurface,
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 8,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    gap: 8,
  },
  primaryButtonText: {
    color: COLORS.onPrimary,
    fontSize: 14,
    fontWeight: "600",
  },
});
