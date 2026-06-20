import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ThemedText from "@/shared/components/ThemedText";
import { COLORS } from "@/shared/constants/colors";
import { useAuth } from "@/features/auth";

import { useTeacherCourses } from "../hooks/useTeacherCourses";
import { useTeacherIncidences } from "../hooks/useTeacherIncidences";
import CourseSummaryCard from "../components/CourseSummaryCard";
import IncidentCard from "../components/IncidentCard";

export default function ProfesorScreen() {
  const navigation = useNavigation<any>();
  const { user } = useAuth();
  const { courses } = useTeacherCourses();
  const { incidences } = useTeacherIncidences();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View>
          <ThemedText type="brandTitle">
            Hola, {user?.name || "Profesor"}
          </ThemedText>
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
          {incidences.map((incident) => (
            <IncidentCard
              key={incident.id}
              incident={incident}
              maxDescriptionLength={90}
              onPress={() =>
                navigation.navigate("IncidenceDetail", { incident })
              }
            />
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
