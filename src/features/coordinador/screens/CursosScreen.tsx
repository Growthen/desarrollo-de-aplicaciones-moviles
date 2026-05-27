import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, Pressable, Image, SafeAreaView, Platform, StatusBar, Switch, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "@/shared";
import { useNavigation } from "@react-navigation/native";
import api from "@/features/auth/services/auth";

export default function CursosScreen() {
  const navigation = useNavigation<any>();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeStates, setActiveStates] = useState<Record<number, boolean>>({});

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/classes");
      if (res.data?.data) {
        setCourses(res.data.data);
        // Initialize all fetched courses as active in the UI
        const states: Record<number, boolean> = {};
        res.data.data.forEach((c: any) => {
          states[c.id] = true;
        });
        setActiveStates(states);
      }
    } catch (error) {
      console.error("Error fetching courses list:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Add listener to reload courses when focusing this screen
    const unsubscribe = navigation.addListener("focus", () => {
      fetchCourses();
    });
    fetchCourses();
    return unsubscribe;
  }, [navigation]);

  const toggleCourse = (id: number) => {
    setActiveStates(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />
      
      {/* Header Mobile Only */}
      <View style={styles.header}>
        <Pressable style={styles.iconButton}>
          <MaterialIcons name="menu" size={24} color={COLORS.primary} />
        </Pressable>
        <Text style={headerTitleStyle(styles)}>TRILCE</Text>
        <View style={styles.profileIcon}>
          <MaterialIcons name="person" size={24} color={COLORS.primary} />
        </View>
      </View>
 
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Page Header Section */}
          <View style={styles.pageHeader}>
            <Text style={styles.title}>Cursos</Text>
            <Text style={styles.subtitle}>Gestione su oferta académica y el profesorado asignado.</Text>
            
            <Pressable 
              style={styles.primaryButton}
              onPress={() => navigation.navigate('CoordinadorCrearCurso')}
            >
              <MaterialIcons name="add" size={20} color={COLORS.onPrimary} />
              <Text style={styles.primaryButtonText}>Crear Nuevo Curso</Text>
            </Pressable>
          </View>
  
          {/* Course Cards Grid */}
          <View style={styles.cardsContainer}>
            {courses.length === 0 ? (
              <View style={{ padding: 32, alignItems: 'center' }}>
                <MaterialIcons name="menu-book" size={48} color={COLORS.onSurfaceVariant} />
                <Text style={{ marginTop: 16, color: COLORS.onSurfaceVariant, fontSize: 16, fontWeight: '600', textAlign: 'center' }}>
                  No hay cursos registrados todavía
                </Text>
              </View>
            ) : (
              courses.map((course) => {
                const isActive = !!activeStates[course.id];
                return (
                  <View key={course.id} style={[styles.card, !isActive && styles.cardInactive]}>
                    <View style={[styles.cardIndicator, { backgroundColor: isActive ? COLORS.secondary : COLORS.surfaceVariant }]} />
                    
                    <View style={styles.cardHeader}>
                      <View style={[styles.statusBadge, { backgroundColor: isActive ? COLORS.primaryFixed : COLORS.surfaceContainerHigh }]}>
                        {isActive && <View style={[styles.statusDot, { backgroundColor: COLORS.primary }]} />}
                        <Text style={[styles.statusText, { color: isActive ? COLORS.onPrimaryFixed : COLORS.onSurfaceVariant }]}>
                          {isActive ? "CURSO ACTIVO" : "INACTIVO"}
                        </Text>
                      </View>
                      <Switch 
                        value={isActive} 
                        onValueChange={() => toggleCourse(course.id)} 
                        trackColor={{ false: COLORS.surfaceVariant, true: COLORS.secondary }}
                        thumbColor="#ffffff"
                      />
                    </View>
  
                    <Text style={styles.courseTitle}>{course.name}</Text>
  
                    <View style={styles.cardFooter}>
                      <Text style={styles.footerLabel}>Profesor Asignado</Text>
                      <View style={styles.teacherRow}>
                        <View style={[styles.teacherAvatar, { backgroundColor: COLORS.surfaceContainer, justifyContent: 'center', alignItems: 'center' }]}>
                          <MaterialIcons name="person" size={20} color={COLORS.primary} />
                        </View>
                        <View>
                          <Text style={styles.teacherName}>{course.teacherName || "Sin Asignar"}</Text>
                          <Text style={styles.teacherDept}>Profesor del Curso</Text>
                        </View>
                      </View>
                      
                      <Text style={[styles.footerLabel, { marginTop: 12, marginBottom: 4 }]}>
                        Alumnos Inscritos: {course.students ? course.students.length : 0}
                      </Text>
                    </View>
                  </View>
                );
              })
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

function headerTitleStyle(styles: any) {
  return styles.headerTitle;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceContainerHigh,
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surfaceContainerHigh,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    paddingTop: 16,
  },
  pageHeader: {
    marginBottom: 32,
  },
  title: {
    fontSize: 56,
    fontWeight: "bold",
    color: COLORS.onSurface,
    marginBottom: 8,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.onSurfaceVariant,
    marginBottom: 32,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    gap: 8,
    shadowColor: COLORS.onSurface,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  primaryButtonText: {
    color: COLORS.onPrimary,
    fontSize: 14,
    fontWeight: "600",
  },
  cardsContainer: {
    gap: 24,
  },
  card: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 12,
    padding: 24,
    overflow: "hidden",
    position: "relative",
    shadowColor: COLORS.onSurface,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  cardInactive: {
    backgroundColor: COLORS.surface,
    opacity: 0.8,
  },
  cardIndicator: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.onSurface,
    marginBottom: 24,
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: "rgba(228, 190, 178, 0.3)", // Outline Variant
    paddingTop: 16,
  },
  footerLabel: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    marginBottom: 8,
  },
  teacherRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  teacherAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(228, 190, 178, 0.4)",
  },
  teacherName: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.onSurface,
  },
  teacherDept: {
    fontSize: 12,
    color: COLORS.tertiary,
  },
});
