import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import ThemedText from "@/shared/components/ThemedText";
import { COLORS } from "@/shared/constants/colors";
import { useAuth } from "@/features/auth";

import { Course, Incidence } from "../types/types";
import { getTeacherCourses } from "../services/courseService";
import { getIncidences } from "../services/incidenceService";
function truncateText(text: string, maxLength: number) {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

export default function ProfesorScreen() {
  const navigation = useNavigation<any>();
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [incidences, setIncidences] = useState<Incidence[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );

  async function loadData() {
    try {
      const coursesData = await getTeacherCourses();
      const incidencesData = await getIncidences();

      setCourses(coursesData);
      setIncidences(incidencesData);
    } catch (error) {
      console.error("Error cargando dashboard:", error);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View>
          <ThemedText type="brandTitle">
            Hola, {user?.username || "Profesor"}
          </ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText type="button" style={styles.sectionTitle}>
            Clases asignadas
          </ThemedText>

          {courses.slice(0, 3).map((item) => (
            <View key={item.id} style={styles.courseCard}>
              <View style={styles.courseBadge}>
                <ThemedText type="label" color="onPrimary">
                  Curso
                </ThemedText>
              </View>

              <ThemedText type="button" style={styles.courseTitle}>
                {item.title}
              </ThemedText>

              <ThemedText type="body" style={styles.courseSubtitle}>
                {item.subtitle}
              </ThemedText>
            </View>
          ))}

          <Pressable onPress={() => navigation.navigate("ProfesorClases")}>
            <ThemedText type="label" style={styles.viewMore}>
              Ver todos los cursos
            </ThemedText>
          </Pressable>
        </View>

        <View style={styles.section}>
          <ThemedText type="button" style={styles.sectionTitle}>
            Historial de incidencias
          </ThemedText>
          {incidences.map((incident) => (
            <Pressable
              key={incident.id}
              style={styles.incidentCard}
              onPress={() =>
                navigation.navigate("IncidenceDetail", { incident })
              }
            >
              <View style={styles.incidentHeader}>
                <ThemedText type="button" style={styles.incidentTitle}>
                  {incident.title}
                </ThemedText>
                <ThemedText type="label" style={styles.incidentStatus}>
                  {incident.status}
                </ThemedText>
              </View>
              <ThemedText type="body" style={styles.incidentDescription}>
                {truncateText(incident.description, 90)}
              </ThemedText>
              <View style={styles.incidentFooter}>
                <ThemedText type="label">{incident.course}</ThemedText>
                <ThemedText type="label">{incident.student}</ThemedText>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <Pressable
        style={styles.fab}
        onPress={() => navigation.navigate("IncidenceForm")}
      >
        <ThemedText type="button" color="onPrimary">
          + Crear incidencia
        </ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 20,
    gap: 22,
    paddingBottom: 160,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    marginBottom: 8,
    color: COLORS.primary,
  },
  viewMore: {
    color: COLORS.primary,
    textAlign: "center",
    marginTop: 6,
  },
  incidentCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.surfaceContainerHigh,
    gap: 10,
  },
  incidentHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  incidentTitle: {
    flex: 1,
    color: COLORS.onSurface,
    marginRight: 10,
  },
  incidentStatus: {
    color: COLORS.secondary,
    fontSize: 12,
  },
  incidentDescription: {
    color: COLORS.onSurfaceVariant,
    lineHeight: 20,
  },
  incidentFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 24,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 999,
    elevation: 4,
  },
  logout: {
    position: "absolute",
    left: 20,
    bottom: 24,
  },
  courseCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.surfaceContainerHigh,
    gap: 10,
  },

  courseBadge: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },

  courseTitle: {
    color: COLORS.onSurface,
  },

  courseSubtitle: {
    color: COLORS.onSurfaceVariant,
  },
});
