import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ThemedText from "@/shared/components/ThemedText";
import { COLORS } from "@/shared/constants/colors";
import { useAuth } from "@/features/auth";

import { useTeacherCourses } from "../hooks/useTeacherCourses";
import { useTeacherIncidences } from "../hooks/useTeacherIncidences";
import CourseSummaryCard from "../components/CourseSummaryCard";
import IncidentCard from "../components/IncidentCard";
import StatCard from "../components/StatCard";

export default function ProfesorScreen() {
  const navigation = useNavigation<any>();
  const { user } = useAuth();
  const { courses } = useTeacherCourses();
  const { incidences } = useTeacherIncidences();

  // Calcular estadísticas
  const totalClasses = courses.length;
  const totalStudents = courses.reduce(
    (total, course) => total + (course.students?.length || 0),
    0,
  );
  const totalIncidents = incidences.length;
  const unreadIncidents = incidences.filter((incident) => {
    const statusUpper = incident.status.toUpperCase();
    return (
      statusUpper === "NO_LEIDA" ||
      statusUpper === "NO LEÍDA" ||
      statusUpper === "NO LEIDA"
    );
  }).length;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View>
          <ThemedText type="brandTitle" style={styles.greetingTitle}>
            Hola, {user?.name || "Profesor"}
          </ThemedText>
        </View>

        {/* Dashboard de Estadísticas */}
        <View style={styles.statsSection}>
          <View style={styles.statsGrid}>
            <View style={styles.statCol}>
              <StatCard
                label="Aulas"
                value={totalClasses}
                icon="school"
                color={COLORS.primary}
              />
            </View>
            <View style={styles.statCol}>
              <StatCard
                label="Alumnos"
                value={totalStudents}
                icon="people"
                color={COLORS.tertiary}
              />
            </View>
          </View>
          <View style={styles.statsGrid}>
            <View style={styles.statCol}>
              <StatCard
                label="Incidencias"
                value={totalIncidents}
                icon="warning"
                color={COLORS.secondary}
              />
            </View>
            <View style={styles.statCol}>
              <StatCard
                label="No leídas"
                value={unreadIncidents}
                icon="notifications"
                color={COLORS.error}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="button" style={styles.sectionTitle}>
            Clases asignadas
          </ThemedText>

          {courses.slice(0, 3).map((item) => (
            <CourseSummaryCard
              key={item.id}
              course={item}
              onPress={() => navigation.navigate("ProfesorClases")}
            />
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
          {incidences.slice(0, 3).map((incident) => (
            <IncidentCard
              key={incident.id}
              incident={incident}
              maxDescriptionLength={90}
              onPress={() =>
                navigation.navigate("IncidenceDetail", { incident })
              }
            />
          ))}
          <Pressable onPress={() => navigation.navigate("IncidencesHistory")}>
            <ThemedText type="label" style={styles.viewMore}>
              Ver todas las incidencias
            </ThemedText>
          </Pressable>
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
  statsSection: {
    gap: 12,
  },
  statsGrid: {
    flexDirection: "row",
    gap: 12,
  },
  statCol: {
    flex: 1,
  },
  section: {
    gap: 12,
  },
  greetingTitle: {
    fontSize: 38,
    lineHeight: 46,
  },
  sectionTitle: {
    marginBottom: 8,
    color: COLORS.primary,
    fontSize: 20,
    fontFamily: "PlusJakartaSans_700Bold",
  },
  viewMore: {
    color: COLORS.primary,
    textAlign: "center",
    marginTop: 6,
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
});
