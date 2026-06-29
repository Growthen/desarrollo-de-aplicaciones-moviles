import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, SafeAreaView, Pressable, ActivityIndicator, Platform, TouchableOpacity} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "@/shared";
import { useNavigation, useRoute } from "@react-navigation/native";
import api from "@/features/auth/services/auth";

export default function DetalleCursoScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { courseId } = route.params ?? {};

  const [loading, setLoading] = useState(true);
  const [courseDetails, setCourseDetails] = useState<any>(null);

useEffect(() => {
    // Fetch detalles del curso
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/classes/${courseId}`);
        if (response.data?.data) {
          setCourseDetails(response.data.data);
        }
      } catch (error) {
        console.error("Error cargando detalles del curso:", error);
      } finally {
        setLoading(false);
      }
    };

    // Carga inicial
    fetchCourseDetails();

    // Recargar al enfocar
    const unsubscribe = navigation.addListener('focus', () => {
      fetchCourseDetails();
    });

    return unsubscribe;
  }, [courseId, navigation]); 
  

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header (TopBar) */}
<View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalle del Curso</Text>
        
        {/* Botón de edición */}
<TouchableOpacity 
  style={styles.backButton} 
onPress={() => {
  console.log("Botón presionado, courseDetails:", courseDetails);
  console.log("navigation state:", JSON.stringify(navigation.getState()));
  if (courseDetails) {
    navigation.navigate("CoordinadorEditarCurso" as never, { curso: courseDetails } as never);
  }
}}
>
  <MaterialIcons name="edit" size={24} color={COLORS.primary} />
</TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Cargando información...</Text>
        </View>
      ) : !courseDetails ? (
        <View style={styles.centerContainer}>
          <MaterialIcons name="error-outline" size={48} color={COLORS.error} />
          <Text style={styles.errorText}>No se pudo cargar el curso.</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Tarjeta Principal del Curso */}
          <View style={styles.mainCard}>
            <View style={styles.courseIcon}>
              <MaterialIcons name="class" size={32} color={COLORS.onPrimary} />
            </View>
            <Text style={styles.courseName}>{courseDetails.name || "Curso Sin Nombre"}</Text>
            <Text style={styles.courseId}>ID: {courseDetails.id}</Text>
          </View>

{/* Sección del Profesor */}
          <Text style={styles.sectionTitle}>Profesor Asignado</Text>
          <View style={styles.personCard}>
            <View style={[styles.avatar, { backgroundColor: COLORS.secondaryContainer }]}>
              <MaterialIcons name="person" size={24} color={COLORS.onSecondaryContainer} />
            </View>
            <View style={styles.personInfo}>
              <Text style={styles.personName}>
                {courseDetails.teacherName || "Sin Asignar"}
              </Text>
              <Text style={styles.personRole}>Docente</Text>
            </View>
          </View>

{/* Sección de Alumnos */}
          <Text style={styles.sectionTitle}>Alumnos Inscritos ({courseDetails.students?.length || 0})</Text>
          {courseDetails.students && courseDetails.students.length > 0 ? (
            courseDetails.students.map((student: any) => (
              <View key={student.id} style={styles.personCard}>
                <View style={[styles.avatar, { backgroundColor: COLORS.tertiaryContainer }]}>
                  <MaterialIcons name="face" size={24} color={COLORS.onTertiaryContainer} />
                </View>
                <View style={styles.personInfo}>
                  <Text style={styles.personName}>{student.fullName}</Text>
                  <Text style={styles.personRole}>Código: {student.studentCode || "N/A"}</Text>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No hay alumnos inscritos en este curso aún.</Text>
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.surface },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, paddingVertical: 16, backgroundColor: COLORS.surface, borderBottomWidth: 1, borderBottomColor: COLORS.surfaceContainerHigh },
  backButton: { padding: 8, borderRadius: 20 },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: COLORS.primary, fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto' },
  centerContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 12, color: COLORS.onSurfaceVariant },
  errorText: { marginTop: 12, color: COLORS.error, fontSize: 16 },
  scrollContent: { padding: 16, paddingBottom: 40 },
  mainCard: { alignItems: "center", backgroundColor: COLORS.surfaceContainerLowest, padding: 24, borderRadius: 16, marginBottom: 32, shadowColor: COLORS.onSurface, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 },
  courseIcon: { width: 64, height: 64, borderRadius: 32, backgroundColor: COLORS.primary, justifyContent: "center", alignItems: "center", marginBottom: 12 },
  courseName: { fontSize: 24, fontWeight: "bold", color: COLORS.onSurface, textAlign: "center", marginBottom: 4 },
  courseId: { fontSize: 14, color: COLORS.onSurfaceVariant },
  sectionTitle: { fontSize: 18, fontWeight: "600", color: COLORS.onSurface, marginBottom: 16, marginTop: 8 },
  personCard: { flexDirection: "row", alignItems: "center", backgroundColor: COLORS.surfaceContainerLowest, padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: COLORS.surfaceContainerHigh },
  avatar: { width: 48, height: 48, borderRadius: 24, justifyContent: "center", alignItems: "center", marginRight: 16 },
  personInfo: { flex: 1 },
  personName: { fontSize: 16, fontWeight: "600", color: COLORS.onSurface, marginBottom: 4 },
  personRole: { fontSize: 13, color: COLORS.onSurfaceVariant },
  emptyState: { padding: 24, alignItems: "center", backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 12, borderStyle: 'dashed', borderWidth: 1, borderColor: COLORS.surfaceVariant },
  emptyText: { color: COLORS.onSurfaceVariant, textAlign: "center" },
});