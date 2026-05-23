import React, { useState, useMemo } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import ThemedText from "@/shared/components/ThemedText";
import { COLORS } from "@/shared/constants/colors";
import { useAuth } from "@/features/auth";

export default function IncidenceForm() {
  const navigation = useNavigation();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [student, setStudent] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState<string | null>(null);

  const [courseModalVisible, setCourseModalVisible] = useState(false);
  const [studentModalVisible, setStudentModalVisible] = useState(false);
  const [studentQuery, setStudentQuery] = useState("");

  // Mock courses and students (front-end only)
  const mockCourses = [
    { id: "1", title: "Matemáticas - 1A" },
    { id: "2", title: "Ciencias - 2B" },
    { id: "3", title: "Historia - 3C" },
  ];

  const mockStudentsByCourse: Record<
    string,
    { id: string; name: string; dni: string }[]
  > = {
    "1": [
      { id: "s1", name: "Juan Pérez", dni: "12345678" },
      { id: "s2", name: "María Gómez", dni: "87654321" },
    ],
    "2": [
      { id: "s3", name: "Carlos Ruiz", dni: "11223344" },
      { id: "s4", name: "Lucía Díaz", dni: "44332211" },
    ],
    "3": [{ id: "s5", name: "Ana Torres", dni: "55667788" }],
  };

  const availableStudents = useMemo(() => {
    if (!course) return [];
    return mockStudentsByCourse[course] ?? [];
  }, [course]);

  const filteredStudents = useMemo(() => {
    const q = studentQuery.trim().toLowerCase();
    if (!q) return availableStudents;
    return availableStudents.filter(
      (s) => s.name.toLowerCase().includes(q) || s.dni.includes(q),
    );
  }, [availableStudents, studentQuery]);

  function onSave() {
    if (!title || !student || !description || !course) {
      Alert.alert(
        "Faltan datos",
        "Completa todos los campos antes de guardar.",
      );
      return;
    }

    const incidence = {
      title,
      student,
      course,
      description,
      createdBy: user?.username ?? "",
      createdAt: new Date().toISOString(),
      status: "PENDIENTE",
    };

    // Aquí iría la llamada al servicio real para persistir la incidencia.
    console.log("Incidence saved (mock):", incidence);

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
        <ThemedText type="brandTitle">Nueva incidencia</ThemedText>

        <ThemedText type="label" style={{ marginTop: 12 }}>
          Curso
        </ThemedText>
        <Pressable
          onPress={() => setCourseModalVisible(true)}
          style={[styles.input, { justifyContent: "center" }]}
        >
          <Text
            style={{
              color: course ? COLORS.onSurface : COLORS.onSurfaceVariant,
            }}
          >
            {course
              ? mockCourses.find((c) => c.id === course)?.title
              : "Selecciona un curso"}
          </Text>
        </Pressable>

        <Modal visible={courseModalVisible} animationType="slide" transparent>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalContent}>
              <ThemedText type="brandSubtitle">Selecciona un curso</ThemedText>
              <FlatList
                data={mockCourses}
                keyExtractor={(c) => c.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setCourse(item.id);
                      setCourseModalVisible(false);
                      setStudent("");
                      setStudentQuery("");
                    }}
                    style={styles.modalItem}
                  >
                    <ThemedText type="body">{item.title}</ThemedText>
                  </TouchableOpacity>
                )}
              />
              <Pressable
                onPress={() => setCourseModalVisible(false)}
                style={styles.modalClose}
              >
                <ThemedText type="link">Cancelar</ThemedText>
              </Pressable>
            </View>
          </View>
        </Modal>

        <ThemedText type="label" style={{ marginTop: 12 }}>
          Alumno (Nombre o DNI)
        </ThemedText>
        <Pressable
          onPress={() => {
            if (course) setStudentModalVisible(true);
          }}
          style={[
            styles.input,
            { justifyContent: "center" },
            !course && { opacity: 0.5 },
          ]}
        >
          <Text
            style={{
              color: student ? COLORS.onSurface : COLORS.onSurfaceVariant,
            }}
          >
            {student ||
              (course ? "Selecciona un alumno" : "Elige un curso primero")}
          </Text>
        </Pressable>

        <Modal visible={studentModalVisible} animationType="slide" transparent>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalContent}>
              <TextInput
                placeholder="Buscar por nombre o DNI"
                placeholderTextColor={COLORS.onSurfaceVariant}
                value={studentQuery}
                onChangeText={setStudentQuery}
                style={[styles.input, { marginBottom: 8 }]}
              />
              <FlatList
                data={filteredStudents}
                keyExtractor={(s) => s.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setStudent(`${item.name} (${item.dni})`);
                      setStudentModalVisible(false);
                      setStudentQuery("");
                    }}
                    style={styles.modalItem}
                  >
                    <ThemedText type="body">{item.name}</ThemedText>
                    <ThemedText type="label">{item.dni}</ThemedText>
                  </TouchableOpacity>
                )}
                ListEmptyComponent={() => (
                  <ThemedText type="body">
                    No se encontraron alumnos.
                  </ThemedText>
                )}
              />
              <Pressable
                onPress={() => setStudentModalVisible(false)}
                style={styles.modalClose}
              >
                <ThemedText type="link">Cerrar</ThemedText>
              </Pressable>
            </View>
          </View>
        </Modal>
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
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>{"<"}</Text>
        </Pressable>
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

  backButtonText: {
    fontSize: 28,
    color: COLORS.primary,
    fontFamily: "Manrope_700Bold",
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
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: COLORS.surfaceContainerLowest,
    padding: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    maxHeight: "60%",
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceContainerHigh,
  },
  modalClose: {
    marginTop: 8,
    alignItems: "center",
  },
});
