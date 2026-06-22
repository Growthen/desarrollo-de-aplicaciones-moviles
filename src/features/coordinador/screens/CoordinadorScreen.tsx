import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, Pressable, SafeAreaView, Platform, StatusBar, ActivityIndicator, Modal, Animated, TouchableWithoutFeedback } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "@/shared";
import useAuth from "@/features/auth/hooks/useAuth";
import { useNavigation, useRoute } from "@react-navigation/native";
import api from "@/features/auth/services/auth";

export default function CoordinadorScreen() {
  const { user } = useAuth();
  const navigation = useNavigation<any>();
  const route = useRoute();
  
  const [metrics, setMetrics] = useState({
    students: 0,
    teachers: 0,
    parents: 0,
  });
  
  // 1. Estado para guardar los cursos
  const [recentCourses, setRecentCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // --- LÓGICA DEL MENÚ HAMBURGUESA PERSONALIZADO ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const slideAnim = React.useRef(new Animated.Value(-300)).current; 

  const toggleMenu = () => {
    if (isMenuOpen) {
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 250,
        useNativeDriver: true,
      }).start(() => setIsMenuOpen(false));
    } else {
      setIsMenuOpen(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  };
  // --------------------------------------------------

  const getScreenTitle = () => {
    switch (route.name) {
      case 'CoordinadorDashboard': return 'Inicio';
      case 'CoordinadorCursos': return 'Cursos';
      case 'CoordinadorUsuarios': return 'Usuarios';
      default: return 'TRILCE';
    }
  };

  // 2. useEffect actualizado para traer métricas Y cursos juntos
useEffect(() => {
    const fetchMetricsAndCourses = async () => {
      try {
        setLoading(true);

        // 🛡️ Función escudo: Si una ruta falla en el backend, atrapa el error y devuelve un arreglo vacío
        const safeGet = async (url: string) => {
          try {
            return await api.get(url);
          } catch (error) {
            console.log(`⚠️ El backend falló en la ruta: ${url}`);
            return { data: { data: [] } };
          }
        };

        // Ahora usamos nuestra función segura en lugar de api.get directamente
        const [studentsRes, teachersRes, parentsRes, coursesRes] = await Promise.all([
          safeGet("/api/students"),
          safeGet("/api/users/teachers"),
          safeGet("/api/users/parents"),
          safeGet("/api/classes"),
        ]);

        setMetrics({
          students: studentsRes.data?.data ? studentsRes.data.data.length : 0,
          teachers: teachersRes.data?.data ? teachersRes.data.data.length : 0,
          parents: parentsRes.data?.data ? parentsRes.data.data.length : 0,
        });

        if (coursesRes.data?.data) {
          setRecentCourses(coursesRes.data.data);
        }
      } catch (error) {
        console.error("Error general en el dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = navigation.addListener("focus", () => {
      fetchMetricsAndCourses();
    });

    fetchMetricsAndCourses();

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />
      
      {/* Top Bar */}
      <View style={styles.header}>
        <Pressable style={styles.iconButton} onPress={toggleMenu}>
          <MaterialIcons name="menu" size={24} color={COLORS.primary} />
        </Pressable>
        <Text style={styles.headerTitle}>{getScreenTitle()}</Text>
        
        <Pressable 
          style={styles.profileIcon}
          onPress={() => navigation.navigate('Configuration')}
        >
          <MaterialIcons name="person" size={24} color={COLORS.primary} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.title}>Dashboard del Coordinador</Text>
          <Text style={styles.subtitle}>
            Resumen General: Métricas clave de tu gestión académica
          </Text>
        </View>

        {/* Metrics Grid */}
        <View style={styles.metricsContainer}>
          <View style={[styles.metricCard, styles.metricCardPrimary]}>
            <View
              style={[
                styles.cardIndicator,
                { backgroundColor: COLORS.primary },
              ]}
            />
            <View style={styles.metricCardContent}>
              <View>
                <Text style={styles.metricLabel}>ALUMNOS MATRICULADOS</Text>
                {loading ? (
                  <ActivityIndicator
                    size="small"
                    color={COLORS.primary}
                    style={{ marginTop: 8, alignSelf: "flex-start" }}
                  />
                ) : (
                  <Text style={styles.metricValueLarge}>
                    {metrics.students}
                  </Text>
                )}
              </View>
              <View
                style={[
                  styles.metricIconContainer,
                  { backgroundColor: COLORS.primaryContainer },
                ]}
              >
                <MaterialIcons
                  name="groups"
                  size={28}
                  color={COLORS.onPrimaryContainer}
                />
              </View>
            </View>
          </View>

          <View style={styles.metricCard}>
            <View
              style={[
                styles.cardIndicator,
                { backgroundColor: COLORS.secondary },
              ]}
            />
            <View style={styles.metricCardContentSmall}>
              <View
                style={[
                  styles.metricIconContainerSmall,
                  { backgroundColor: COLORS.secondaryContainer },
                ]}
              >
                <MaterialIcons
                  name="school"
                  size={20}
                  color={COLORS.onSecondaryContainer}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 16 }}>
                {loading ? (
                  <ActivityIndicator
                    size="small"
                    color={COLORS.secondary}
                    style={{ alignSelf: "flex-start" }}
                  />
                ) : (
                  <Text style={styles.metricValueSmall}>
                    {metrics.teachers}
                  </Text>
                )}
                <Text style={styles.metricLabel}>PROFESORES ACTIVOS</Text>
              </View>
            </View>
          </View>

          <View style={styles.metricCard}>
            <View
              style={[
                styles.cardIndicator,
                { backgroundColor: COLORS.tertiaryContainer },
              ]}
            />
            <View style={styles.metricCardContentSmall}>
              <View
                style={[
                  styles.metricIconContainerSmall,
                  { backgroundColor: COLORS.tertiaryContainer },
                ]}
              >
                <MaterialIcons
                  name="family-restroom"
                  size={20}
                  color={COLORS.onTertiaryContainer}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 16 }}>
                {loading ? (
                  <ActivityIndicator
                    size="small"
                    color={COLORS.onTertiaryContainer}
                    style={{ alignSelf: "flex-start" }}
                  />
                ) : (
                  <Text style={styles.metricValueSmall}>{metrics.parents}</Text>
                )}
                <Text style={styles.metricLabel}>PADRES ACTIVOS</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions Section */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Accesos Rápidos</Text>
          <View style={styles.actionsRow}>
            <Pressable
              style={[styles.actionButton, { backgroundColor: COLORS.primary }]}
              onPress={() => navigation.navigate("CoordinadorCrearCurso")}
            >
              <MaterialIcons name="add" size={20} color={COLORS.onPrimary} />
              <Text
                style={[styles.actionButtonText, { color: COLORS.onPrimary }]}
              >
                Crear Curso
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.actionButton,
                { backgroundColor: COLORS.secondary },
              ]}
              onPress={() => navigation.navigate("CoordinadorRegistrarUsuario")}
            >
              <MaterialIcons
                name="person-add"
                size={20}
                color={COLORS.onSecondary}
              />
              <Text
                style={[styles.actionButtonText, { color: COLORS.onSecondary }]}
              >
                Crear Usuario
              </Text>
            </Pressable>
          </View>
        </View>

        {/* 3. NUEVA SECCIÓN: LISTA DE CURSOS EN EL DASHBOARD */}
        <View style={styles.coursesSection}>
          <Text style={styles.sectionTitle}>Cursos Activos</Text>
          
          {loading ? (
            <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 20 }} />
          ) : recentCourses.length === 0 ? (
            <View style={styles.emptyState}>
              <MaterialIcons name="school" size={48} color={COLORS.surfaceVariant} />
              <Text style={styles.emptyStateText}>No hay cursos registrados aún.</Text>
            </View>
          ) : (
            recentCourses.map((course) => (
              <Pressable 
                key={course.id} 
                style={styles.courseItem}
                onPress={() => {
                  console.log("Navegar a detalle del curso:", course.id);
                  
                  navigation.navigate('CoordinadorDetalleCurso', { courseId: course.id });
                }}
              >
                <View style={styles.courseIcon}>
                  <MaterialIcons name="class" size={24} color={COLORS.primary} />
                </View>
                <View style={styles.courseInfo}>
                  <Text style={styles.courseName} numberOfLines={1}>{course.name}</Text>
                  <Text style={styles.courseId}>ID del Curso: {course.id}</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color={COLORS.onSurfaceVariant} />
              </Pressable>
            ))
          )}
        </View>

      </ScrollView>

      {/* MENÚ HAMBURGUESA PERSONALIZADO */}
      <Modal visible={isMenuOpen} transparent={true} animationType="none" onRequestClose={toggleMenu}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={toggleMenu}>
            <View style={styles.modalBackground} />
          </TouchableWithoutFeedback>
          
          <Animated.View style={[styles.drawerMenu, { transform: [{ translateX: slideAnim }] }]}>
            <View style={styles.drawerHeader}>
              <Text style={styles.drawerTitle}>TRILCE Menú</Text>
              <Text style={styles.drawerSubtitle}>Gestión Académica</Text>
            </View>
            
            <Pressable 
              style={styles.drawerItem} 
              onPress={() => { toggleMenu(); navigation.navigate('Configuration'); }}
            >
              <MaterialIcons name="settings" size={24} color={COLORS.primary} />
              <Text style={styles.drawerItemText}>Configuración del Sistema</Text>
            </Pressable>
          </Animated.View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.surface },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, paddingVertical: 16, backgroundColor: COLORS.surface, borderBottomWidth: 1, borderBottomColor: COLORS.surfaceContainerHigh },
  iconButton: { padding: 8, borderRadius: 20 },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: COLORS.primary, fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto' },
  profileIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.surfaceContainerHigh, justifyContent: "center", alignItems: "center" },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 32, paddingTop: 24 },
  sectionHeader: { marginBottom: 32 },
  title: { fontSize: 32, fontWeight: "600", color: COLORS.onSurface, marginBottom: 8 },
  subtitle: { fontSize: 16, color: COLORS.onSurfaceVariant },
  metricsContainer: { flexDirection: "column", gap: 16, marginBottom: 48 },
  metricCard: { backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 12, padding: 20, overflow: "hidden", position: "relative", shadowColor: COLORS.onSurface, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 3 },
  metricCardPrimary: { paddingVertical: 24 },
  cardIndicator: { position: "absolute", left: 0, top: 0, bottom: 0, width: 4 },
  metricCardContent: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  metricLabel: { fontSize: 12, fontWeight: "600", color: COLORS.onSurfaceVariant, letterSpacing: 1, marginBottom: 4 },
  metricValueLarge: { fontSize: 56, fontWeight: "bold", color: COLORS.onSurface, letterSpacing: -1 },
  metricIconContainer: { width: 48, height: 48, borderRadius: 24, justifyContent: "center", alignItems: "center" },
  metricCardContentSmall: { flexDirection: "row", alignItems: "center" },
  metricIconContainerSmall: { width: 40, height: 40, borderRadius: 20, justifyContent: "center", alignItems: "center" },
  metricValueSmall: { fontSize: 24, fontWeight: "bold", color: COLORS.onSurface },
  quickActionsSection: { marginBottom: 48 },
  sectionTitle: { fontSize: 20, fontWeight: "600", color: COLORS.onSurface, marginBottom: 24 },
  actionsRow: { flexDirection: "row", gap: 16 },
  actionButton: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 16, paddingHorizontal: 16, borderRadius: 30, shadowColor: COLORS.onSurface, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4, gap: 8 },
  actionButtonText: { fontSize: 14, fontWeight: "600" },
  
  // Estilos del Menú Hamburguesa Custom (NO BORRAR)
  modalOverlay: { flex: 1, flexDirection: 'row' },
  modalBackground: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
  drawerMenu: { width: 280, backgroundColor: COLORS.surface, height: '100%', paddingTop: Platform.OS === 'ios' ? 50 : 30, paddingHorizontal: 20, elevation: 10, shadowColor: '#000', shadowOffset: { width: 5, height: 0 }, shadowOpacity: 0.3, shadowRadius: 10 },
  drawerHeader: { borderBottomWidth: 1, borderBottomColor: COLORS.surfaceVariant, paddingBottom: 20, marginBottom: 20, marginTop: 20 },
  drawerTitle: { fontSize: 24, fontWeight: 'bold', color: COLORS.primary },
  drawerSubtitle: { fontSize: 14, color: COLORS.onSurfaceVariant, marginTop: 5 },
  drawerItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  drawerItemText: { fontSize: 16, marginLeft: 15, color: COLORS.onSurface, fontWeight: '500' },

  // Estilos de la Nueva Lista de Cursos
  coursesSection: { marginBottom: 40 },
  courseItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surfaceContainerLowest, padding: 16, borderRadius: 12, marginBottom: 12, shadowColor: COLORS.onSurface, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  courseIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: COLORS.primaryContainer, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  courseInfo: { flex: 1 },
  courseName: { fontSize: 16, fontWeight: 'bold', color: COLORS.onSurface, marginBottom: 4 },
  courseId: { fontSize: 12, color: COLORS.onSurfaceVariant },
  emptyState: { alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 12, borderStyle: 'dashed', borderWidth: 1, borderColor: COLORS.surfaceVariant },
  emptyStateText: { marginTop: 12, fontSize: 14, color: COLORS.onSurfaceVariant, textAlign: 'center' },
});
