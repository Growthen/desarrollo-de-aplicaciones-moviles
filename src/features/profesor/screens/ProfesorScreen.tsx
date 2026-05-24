import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ThemedText from "@/shared/components/ThemedText";
import { COLORS } from "@/shared/constants/colors";
import { useAuth } from "@/features/auth";

const mockClasses = [
  { id: "1", title: "Matemáticas - 1A", subtitle: "25 alumnos" },
  { id: "2", title: "Ciencias - 2B", subtitle: "22 alumnos" },
  { id: "3", title: "Historia - 3C", subtitle: "18 alumnos" },
];

const mockIncidences = [
  {
    id: "i1",
    title: "Retraso en la clase",
    description:
      "El alumno llegó tarde a clase y pidió permiso después de que la clase ya había comenzado.",
    course: "Matemáticas - 1A",
    student: "Juan Pérez",
    timestamp: "2026-05-20T08:15:00Z",
    status: "No leída",
  },
  {
    id: "i2",
    title: "Falta de tarea",
    description:
      "María no entregó la tarea de fin de semana en la materia de ciencias. Se le pedirá que la entregue mañana.",
    course: "Ciencias - 2B",
    student: "María Gómez",
    timestamp: "2026-05-19T17:40:00Z",
    status: "Leída",
  },
  {
    id: "i3",
    title: "Comportamiento en el aula",
    description:
      "Se observó que hay comportamiento disruptivo durante la explicación del tema. El alumno interrumpe con comentarios y risas constantes.",
    course: "Historia - 3C",
    student: "Ana Torres",
    timestamp: "2026-05-18T10:30:00Z",
    status: "No leída",
  },
];

function truncateText(text: string, maxLength: number) {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

export default function ProfesorScreen() {
  const navigation = useNavigation<any>();
  const { user } = useAuth();

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

          {mockClasses.slice(0, 3).map((item) => (
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
          {mockIncidences.map((incident) => (
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
