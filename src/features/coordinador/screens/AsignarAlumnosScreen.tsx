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
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "@/shared";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  createClass,
  getStudents,
  updateClassStudents,
} from "@/features/coordinador/services/coordinadorService";

export default function AsignarAlumnosScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { courseName, teacherId, courseId, existingStudentIds } =
    route.params || {};

  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
    // Carga inicial
    fetchStudents();

    // Recargar al enfocar
    const unsubscribe = navigation.addListener('focus', () => {
      console.log("Recargando lista de alumnos...");
      fetchStudents();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (existingStudentIds) {
      setSelectedIds(existingStudentIds);
    } else {
      setSelectedIds([]);
    }
  }, [existingStudentIds]);

  const toggleStudent = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((studentId) => studentId !== id)
        : [...prev, id],
    );
  };

  const getInitials = (firstName: string, lastName: string) => {
    const first = firstName ? firstName[0] : "";
    const last = lastName ? lastName[0] : "";
    return (first + last).toUpperCase() || "A";
  };

  const filteredStudents = students.filter((s) => {
    const fullName = `${s.firstName || ""} ${s.lastName || ""}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  const handleSave = async () => {
    if (!courseName) {
      Alert.alert("Error", "Información del curso incompleta.");
      return;
    }

    if (selectedIds.length === 0) {
      Alert.alert(
        "Error",
        "Debe seleccionar al menos un alumno para matricular en este curso.",
      );
      return;
    }

    try {
      setSaving(true);
      if (courseId) {
        // Edit existing class student list
        await updateClassStudents(courseId, selectedIds);

        Alert.alert("Éxito", "Matrícula de alumnos actualizada correctamente", [
          { text: "OK", onPress: () => navigation.goBack() }
        ]);
      } else {
        // Create new class
        if (!teacherId) {
          Alert.alert("Error", "Debe asignar un profesor.");
          return;
        }
        await createClass({
          name: courseName,
          teacherId: teacherId,
          studentIds: selectedIds,
        });

        Alert.alert(
          "Éxito",
          "Curso creado e inscripciones registradas correctamente",
          [
            { 
              text: "OK", 
              onPress: () => navigation.navigate("CoordinadorDashboard") 
            }
          ]
        );
      }
    } catch (error: any) {
      const errMsg =
        error.response?.data?.message ||
        "Ocurrió un error al guardar las inscripciones";
      Alert.alert("Error", errMsg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />

      {/* TopAppBar */}
      <View style={styles.header}>
        <Pressable style={styles.iconButton}>
          <MaterialIcons
            name="menu"
            size={24}
            color={COLORS.onSurfaceVariant}
          />
        </Pressable>
        <Text style={styles.headerTitle}>TRILCE</Text>
        <View style={styles.profileIcon}>
          <MaterialIcons name="person" size={24} color={COLORS.primary} />
        </View>
      </View>

      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.pageHeader}>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={18} color={COLORS.primary} />
            <Text style={styles.backButtonText}>Atrás</Text>
          </Pressable>
          <Text style={styles.title}>Asignar Alumnos al Curso</Text>
          <Text style={styles.subtitle}>
            Selecciona los estudiantes para inscribirlos en este nuevo grupo.
          </Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <MaterialIcons
            name="search"
            size={24}
            color={COLORS.onSurfaceVariant}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar alumnos..."
            placeholderTextColor="rgba(91, 64, 56, 0.5)"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Students List */}
        {loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : filteredStudents.length === 0 ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <MaterialIcons
              name="group-off"
              size={48}
              color={COLORS.onSurfaceVariant}
            />
            <Text
              style={{
                marginTop: 16,
                color: COLORS.onSurfaceVariant,
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              No se encontraron alumnos
            </Text>
          </View>
        ) : (
          <ScrollView
            style={styles.listContainer}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          >
            {filteredStudents.map((student, index) => {
              const isChecked = selectedIds.includes(student.id);
              const fullName = `${student.firstName} ${student.lastName}`;
              return (
                <Pressable
                  key={student.id}
                  style={[
                    styles.studentCard,
                    index % 2 === 0
                      ? { marginLeft: 0, marginRight: 16 }
                      : { marginLeft: 16, marginRight: 0 },
                  ]}
                  onPress={() => toggleStudent(student.id)}
                >
                  <View style={styles.checkboxContainer}>
                    <View
                      style={[
                        styles.checkbox,
                        isChecked && styles.checkboxChecked,
                      ]}
                    >
                      {isChecked && (
                        <MaterialIcons
                          name="check"
                          size={16}
                          color={COLORS.onPrimary}
                        />
                      )}
                    </View>
                  </View>

                  <View style={[styles.avatarContainer, styles.avatarInitials]}>
                    <Text style={styles.initialsText}>
                      {getInitials(student.firstName, student.lastName)}
                    </Text>
                  </View>

                  <View style={styles.studentInfo}>
                    <Text
                      style={[
                        styles.studentName,
                        isChecked && { color: COLORS.primary },
                      ]}
                    >
                      {fullName}
                    </Text>
                    <Text style={styles.studentGrade}>
                      Código: {student.studentCode || "S/C"}
                    </Text>
                    <Text
                      style={[
                        styles.studentGrade,
                        { fontSize: 12, color: COLORS.tertiary, marginTop: 1 },
                      ]}
                    >
                      DNI: {student.dni}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>
        )}
      </View>

      {/* Bottom Action Area */}
      <View style={styles.bottomActionArea}>
        <Pressable
          style={styles.saveButton}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator size="small" color={COLORS.onPrimary} />
          ) : (
            <>
              <Text style={styles.saveButtonText}>
                Guardar e Inscribir Alumnos
              </Text>
              <MaterialIcons
                name="check-circle"
                size={20}
                color={COLORS.onPrimary}
              />
            </>
          )}
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
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surfaceContainerHigh,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  pageHeader: {
    marginTop: 8,
    marginBottom: 24,
    marginLeft: 8,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primary,
    marginLeft: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    color: COLORS.onSurface,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.onSurfaceVariant,
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(228, 190, 178, 0.2)",
    paddingHorizontal: 12,
    marginBottom: 24,
    shadowColor: COLORS.onSurface,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 32,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: COLORS.onSurface,
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 100, // Space for the bottom button
  },
  studentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(228, 190, 178, 0.15)",
    shadowColor: COLORS.onSurface,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 32,
    elevation: 1,
  },
  checkboxContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "rgba(228, 190, 178, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginLeft: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
  },
  avatarInitials: {
    backgroundColor: COLORS.surfaceContainerHigh,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  initialsText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  studentInfo: {
    flex: 1,
    marginLeft: 16,
  },
  studentName: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.onSurface,
  },
  studentGrade: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
  },
  badgeContainer: {
    backgroundColor: COLORS.surfaceContainer,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.onSurfaceVariant,
  },
  bottomActionArea: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: Platform.OS === "ios" ? 34 : 24,
    backgroundColor: "rgba(254, 248, 241, 0.95)",
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    gap: 8,
    width: "100%",
    maxWidth: 400,
    shadowColor: COLORS.onSurface,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 32,
    elevation: 8,
  },
  saveButtonText: {
    color: COLORS.onPrimary,
    fontSize: 14,
    fontWeight: "600",
  },
});
