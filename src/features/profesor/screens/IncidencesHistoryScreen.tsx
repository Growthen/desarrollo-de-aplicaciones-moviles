import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import BackButton from "@/shared/components/BackButton";
import ThemedText from "@/shared/components/ThemedText";
import { COLORS } from "@/shared/constants/colors";
import { useTeacherCourses } from "../hooks/useTeacherCourses";
import { useTeacherIncidences } from "../hooks/useTeacherIncidences";
import { getStudentsByClassId } from "../services/courseService";
import IncidentCard from "../components/IncidentCard";
import SelectOptionModal from "../components/SelectOptionModal";
import { Course, Student } from "../types/types";

export default function IncidencesHistoryScreen() {
  const navigation = useNavigation<any>();
  const { courses } = useTeacherCourses();
  const { incidences, loading, refreshIncidences } = useTeacherIncidences();

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [courseModalVisible, setCourseModalVisible] = useState(false);
  const [studentDniMap, setStudentDniMap] = useState<Record<number, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Cargar alumnos de todas las clases para mapear su DNI
  useEffect(() => {
    const fetchStudentsDni = async () => {
      try {
        const map: Record<number, string> = {};
        await Promise.all(
          courses.map(async (course) => {
            const studentsList = await getStudentsByClassId(course.id);
            studentsList.forEach((s: Student) => {
              map[s.id] = s.dni;
            });
          })
        );
        setStudentDniMap(map);
      } catch (error) {
        console.error("Error al cargar los alumnos para el mapa de DNI:", error);
      }
    };

    if (courses.length > 0) {
      fetchStudentsDni();
    }
  }, [courses]);

  // Refrescar incidencias cuando se enfoca la pantalla
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      refreshIncidences();
    });
    return unsubscribe;
  }, [navigation, refreshIncidences]);

  // Filtrar incidencias
  const filteredIncidents = useMemo(() => {
    return incidences.filter((incident) => {
      // Filtrar por curso
      if (selectedCourse && incident.classId !== selectedCourse.id) {
        return false;
      }

      // Buscar por alumno
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const matchesName = incident.student.toLowerCase().includes(query);
        const studentDni = incident.studentId ? studentDniMap[incident.studentId] : null;
        const matchesDni = studentDni ? studentDni.toLowerCase().includes(query) : false;

        if (!matchesName && !matchesDni) {
          return false;
        }
      }

      return true;
    });
  }, [incidences, selectedCourse, searchQuery, studentDniMap]);

  // Cálculo de la paginación
  const totalPages = Math.ceil(filteredIncidents.length / itemsPerPage) || 1;

  // Ajustar la página si la página actual excede el número total de páginas después de filtrar
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [filteredIncidents, totalPages, currentPage]);

  const paginatedIncidents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredIncidents.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredIncidents, currentPage]);

  const handleIncidentPress = (incident: any) => {
    navigation.navigate("IncidenceDetail", { incident });
  };

  const renderFooter = () => {
    if (totalPages <= 1) return <View style={{ height: 40 }} />;

    return (
      <View style={styles.paginationContainer}>
        <Pressable
          disabled={currentPage === 1}
          onPress={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          style={[styles.pageButton, currentPage === 1 && styles.pageButtonDisabled]}
        >
          <ThemedText
            type="link"
            style={currentPage === 1 ? styles.disabledText : styles.activeText}
          >
            Anterior
          </ThemedText>
        </Pressable>

        <ThemedText type="label" style={styles.pageIndicator}>
          Pág. {currentPage} de {totalPages}
        </ThemedText>

        <Pressable
          disabled={currentPage === totalPages}
          onPress={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
          style={[styles.pageButton, currentPage === totalPages && styles.pageButtonDisabled]}
        >
          <ThemedText
            type="link"
            style={currentPage === totalPages ? styles.disabledText : styles.activeText}
          >
            Siguiente
          </ThemedText>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <BackButton />

      <View style={styles.header}>
        <ThemedText type="brandTitle" style={styles.title}>
          Historial de incidencias
        </ThemedText>
      </View>

      <FlatList
        data={paginatedIncidents}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View style={styles.filtersSection}>
            <ThemedText type="label" style={styles.filterLabel}>
              Curso
            </ThemedText>
            <Pressable
              onPress={() => setCourseModalVisible(true)}
              style={styles.selector}
            >
              <ThemedText style={selectedCourse ? styles.selectorSelected : styles.selectorPlaceholder}>
                {selectedCourse ? selectedCourse.title : "Todos los cursos"}
              </ThemedText>
            </Pressable>

            <SelectOptionModal
              visible={courseModalVisible}
              title="Selecciona un curso"
              items={[
                { id: "all", label: "Todos los cursos", value: null as any },
                ...courses.map((item) => ({
                  id: item.id,
                  label: item.title,
                  value: item,
                })),
              ]}
              onSelect={(course) => {
                setSelectedCourse(course);
                setCourseModalVisible(false);
              }}
              onClose={() => setCourseModalVisible(false)}
              emptyStateLabel="No hay cursos disponibles"
            />

            <ThemedText type="label" style={styles.filterLabel}>
              Buscar alumno
            </ThemedText>
            <TextInput
              placeholder="Nombre o DNI del alumno"
              placeholderTextColor={COLORS.onSurfaceVariant}
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        )}
        renderItem={({ item }) => (
          <IncidentCard
            incident={item}
            maxDescriptionLength={90}
            onPress={() => handleIncidentPress(item)}
          />
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            {loading ? (
              <ActivityIndicator size="large" color={COLORS.primary} />
            ) : (
              <ThemedText type="body" style={styles.emptyText}>
                No se encontraron incidencias.
              </ThemedText>
            )}
          </View>
        )}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    lineHeight: 40,
  },
  listContent: {
    paddingHorizontal: 20,
    gap: 14,
    paddingBottom: 60,
  },
  filtersSection: {
    gap: 12,
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 14,
    color: COLORS.primary,
    marginTop: 8,
  },
  selector: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: COLORS.surfaceContainerHigh,
    justifyContent: "center",
  },
  selectorPlaceholder: {
    color: COLORS.onSurfaceVariant,
  },
  selectorSelected: {
    color: COLORS.onSurface,
  },
  searchInput: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: COLORS.onSurface,
    fontFamily: "Manrope_400Regular",
    borderWidth: 1,
    borderColor: COLORS.surfaceContainerHigh,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyText: {
    color: COLORS.onSurfaceVariant,
    textAlign: "center",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    paddingVertical: 10,
  },
  pageButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: COLORS.surfaceContainerHigh,
    minWidth: 90,
    alignItems: "center",
  },
  pageButtonDisabled: {
    opacity: 0.5,
  },
  disabledText: {
    color: COLORS.onSurfaceVariant,
  },
  activeText: {
    color: COLORS.primary,
  },
  pageIndicator: {
    fontSize: 14,
    color: COLORS.onSurface,
  },
});
