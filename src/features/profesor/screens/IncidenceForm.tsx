import React from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Text,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import BackButton from "@/shared/components/BackButton";
import ThemedText from "@/shared/components/ThemedText";
import { COLORS } from "@/shared/constants/colors";
import { useAuth } from "@/features/auth";

import SelectOptionModal from "../components/SelectOptionModal";
import { useIncidenceForm } from "../hooks/useIncidenceForm";
import { Course, Student } from "../types/types";
import { createIncidence } from "../services/incidenceService";

export default function IncidenceForm() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { user } = useAuth();

  const selectedCourse = route.params?.course;
  const selectedStudent = route.params?.student;

  const {
    title,
    setTitle,
    description,
    setDescription,
    course,
    student,
    courses,
    filteredStudents,
    courseModalVisible,
    setCourseModalVisible,
    studentModalVisible,
    setStudentModalVisible,
    studentQuery,
    setStudentQuery,
    selectCourse,
    selectStudent,
  } = useIncidenceForm(selectedCourse, selectedStudent);

  async function onSave() {
    if (!title || !student || !description || !course) {
      Alert.alert(
        "Faltan datos",
        "Completa todos los campos antes de guardar.",
      );
      return;
    }

    const incidence = {
      title,
      description,
      studentId: Number(student.id),
      classId: Number(course.id),
    };

    await createIncidence(incidence);

    Alert.alert("Guardado", "La incidencia se ha guardado correctamente.", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <BackButton />
        <ThemedText type="brandTitle">Nueva incidencia</ThemedText>

        <ThemedText type="label" style={{ marginTop: 12 }}>
          Curso
        </ThemedText>
        <Pressable
          disabled={!!selectedCourse}
          onPress={() => setCourseModalVisible(true)}
          style={[
            styles.input,
            { justifyContent: "center" },
            selectedCourse && { opacity: 0.7 },
          ]}
        >
          <Text
            style={{
              color: course ? COLORS.onSurface : COLORS.onSurfaceVariant,
            }}
          >
            {course ? course.title : "Selecciona un curso"}
          </Text>
        </Pressable>

        <SelectOptionModal
          visible={courseModalVisible}
          title="Selecciona un curso"
          items={courses.map((item) => ({
            id: item.id,
            label: item.title,
            subtitle: item.subtitle ?? "",
            value: item,
          }))}
          onSelect={selectCourse}
          onClose={() => setCourseModalVisible(false)}
          emptyStateLabel="No hay cursos disponibles"
        />

        <ThemedText type="label" style={{ marginTop: 12 }}>
          Alumno (Nombre o DNI)
        </ThemedText>
        <Pressable
          disabled={!!selectedStudent || !course}
          onPress={() => {
            if (course) setStudentModalVisible(true);
          }}
          style={[
            styles.input,
            { justifyContent: "center" },
            !course && { opacity: 0.5 },
            selectedStudent && { opacity: 0.7 },
          ]}
        >
          <Text
            style={{
              color: student ? COLORS.onSurface : COLORS.onSurfaceVariant,
            }}
          >
            {student
              ? `${student.name} (${student.dni})`
              : course
                ? "Selecciona un alumno"
                : "Elige un curso primero"}
          </Text>
        </Pressable>

        <SelectOptionModal
          visible={studentModalVisible}
          title="Selecciona un alumno"
          items={filteredStudents.map((item) => ({
            id: item.id,
            label: item.name,
            subtitle: item.dni,
            value: item,
          }))}
          onSelect={selectStudent}
          onClose={() => setStudentModalVisible(false)}
          searchValue={studentQuery}
          onSearchChange={setStudentQuery}
          placeholder="Buscar por nombre o DNI"
          emptyStateLabel="No se encontraron alumnos."
        />

        <ThemedText type="label" style={{ marginTop: 12 }}>
          Título
        </ThemedText>
        <TextInput
          placeholder="Ej: Falta de puntualidad"
          placeholderTextColor={COLORS.onSurfaceVariant}
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />

        <ThemedText type="label" style={{ marginTop: 12 }}>
          Descripción
        </ThemedText>
        <TextInput
          placeholder="Describe la incidencia..."
          placeholderTextColor={COLORS.onSurfaceVariant}
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <Pressable style={styles.saveButton} onPress={onSave}>
          <ThemedText type="button" color="onPrimary">
            Guardar incidencia
          </ThemedText>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 20,
    paddingTop: 60,
    gap: 12,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  input: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: COLORS.onSurface,
    fontFamily: "Manrope_400Regular",
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: "top",
  },
  saveButton: {
    marginTop: 18,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 12,
  },
});
