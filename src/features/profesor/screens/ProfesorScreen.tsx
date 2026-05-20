import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation, type NavigationProp } from "@react-navigation/native";
import { COLORS } from "@/shared";
import { useAuth } from "@/features/auth";
import {
  ClaseCard,
  IncidentRow,
  ProfesorHeader,
  StatsCard,
} from "@/features/profesor/components";

type ProfesorStackParamList = {
  ProfesorHome: undefined;
  ReportIncident: undefined;
};

const classes = [
  {
    title: "Álgebra Avanzada",
    schedule: "08:00",
    room: "Aula 302",
    grade: "11° - Sección A",
    students: 28,
  },
  {
    title: "Geometría Básica",
    schedule: "10:30",
    room: "Aula 305",
    grade: "9° - Sección C",
    students: 32,
  },
];

const incidents = [
  {
    title: "Conducta disruptiva",
    student: "Carlos Mendoza",
    detail: "11° - Sección A",
    priority: "Alta",
    timestamp: "Hoy, 08:45",
  },
  {
    title: "Tarea pendiente (x3)",
    student: "Lucía Gómez",
    detail: "9° - Sección C",
    priority: "Pendiente",
    timestamp: "Ayer",
  },
];

export default function ProfesorScreen() {
  const { user, logout } = useAuth();
  const navigation = useNavigation<NavigationProp<ProfesorStackParamList>>();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        📚 Pantalla del Profesor
      </Text>
      <Text>Hola, {user?.username || "usuario"}!</Text>
      <Text style={{ color: "#888" }}>Rol: {user?.role}</Text>
      <Pressable
        onPress={logout}
        style={{
          marginTop: 20,
          backgroundColor: "#E53935",
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 8,
        }}
      >
        <ProfesorHeader
          name={user?.name ?? "Docente"}
          classCount={classes.length}
          incidentCount={incidents.length}
          onReport={() => navigation.navigate("ReportIncident")}
        />

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Clases de hoy</Text>
            <Pressable>
              <Text style={styles.sectionLink}>Ver horario</Text>
            </Pressable>
          </View>

          {classes.map((item) => (
            <ClaseCard
              key={item.title}
              title={item.title}
              schedule={item.schedule}
              room={item.room}
              grade={item.grade}
              students={item.students}
              onAttendance={() => console.log("Asistencia", item.title)}
            />
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Incidentes recientes</Text>
            <Pressable>
              <Text style={styles.sectionLink}>Filtrar</Text>
            </Pressable>
          </View>

          {incidents.map((incident) => (
            <IncidentRow
              key={incident.title}
              title={incident.title}
              student={incident.student}
              detail={incident.detail}
              timestamp={incident.timestamp}
              priority={incident.priority}
            />
          ))}
        </View>

        <View style={styles.statsRow}>
          <StatsCard count={12} label="Incidentes resueltos" />
          <StatsCard count={3} label="Citas pendientes" />
        </View>

        <Pressable style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
        </Pressable>
      </ScrollView>
    </>
  );
}
