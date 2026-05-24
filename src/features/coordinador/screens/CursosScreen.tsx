import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, Pressable, Image, SafeAreaView, Platform, StatusBar, Switch } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "@/shared";
import { useNavigation } from "@react-navigation/native";

export default function CursosScreen() {
  const navigation = useNavigation<any>();
  // Dummy state for the toggle switches
  const [activeCourse1, setActiveCourse1] = useState(true);
  const [activeCourse2, setActiveCourse2] = useState(true);
  const [activeCourse3, setActiveCourse3] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />
      
      {/* Header Mobile Only (Similar to Dashboard but mostly hidden since tabs are at the bottom) */}
      <View style={styles.header}>
        <Pressable style={styles.iconButton}>
          <MaterialIcons name="menu" size={24} color={COLORS.primary} />
        </Pressable>
        <Text style={styles.headerTitle}>TRILCE</Text>
        <View style={styles.profileIcon}>
          <MaterialIcons name="person" size={24} color={COLORS.primary} />
        </View>
      </View>

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
          
          {/* Card 1 */}
          <View style={[styles.card, !activeCourse1 && styles.cardInactive]}>
            <View style={[styles.cardIndicator, { backgroundColor: activeCourse1 ? COLORS.secondary : COLORS.surfaceVariant }]} />
            
            <View style={styles.cardHeader}>
              <View style={[styles.statusBadge, { backgroundColor: activeCourse1 ? COLORS.primaryFixed : COLORS.surfaceContainerHigh }]}>
                {activeCourse1 && <View style={[styles.statusDot, { backgroundColor: COLORS.primary }]} />}
                <Text style={[styles.statusText, { color: activeCourse1 ? COLORS.onPrimaryFixed : COLORS.onSurfaceVariant }]}>
                  {activeCourse1 ? "CURSO ACTIVO" : "INACTIVO"}
                </Text>
              </View>
              <Switch 
                value={activeCourse1} 
                onValueChange={setActiveCourse1} 
                trackColor={{ false: COLORS.surfaceVariant, true: COLORS.secondary }}
                thumbColor="#ffffff"
              />
            </View>

            <Text style={styles.courseTitle}>Matemáticas 101</Text>

            <View style={styles.cardFooter}>
              <Text style={styles.footerLabel}>Profesor Asignado</Text>
              <View style={styles.teacherRow}>
                <Image 
                  source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlmDx4g-MXGv8QrhUiUvYRfKgZKfXvNvihVJGRNOkzCePmggaEdHIDm2GhlV9u9D9pxUuPTS2NDEpGqZnzlcy8Gf5kDc6okA8Qge89Fdc5wK8RgmoSDveH65fFD4xR97mgCLJj2zILw6ROmNqqByxxJu8YfSFI3eEdKjrJnjGYoqDK-eiGCItHvPUXG2PfqlxqTQLtnSzGHStDXJHZMcFOR7gRtsZ1KYJ6_9rED1pGCdQobGh1uy-3mAkMKKqhAD2QBQPu9lftHGQ" }} 
                  style={styles.teacherAvatar} 
                />
                <View>
                  <Text style={styles.teacherName}>Dr. Roberto Silva</Text>
                  <Text style={styles.teacherDept}>Departamento de Ciencias</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Card 2 */}
          <View style={[styles.card, !activeCourse2 && styles.cardInactive]}>
            <View style={[styles.cardIndicator, { backgroundColor: activeCourse2 ? COLORS.secondary : COLORS.surfaceVariant }]} />
            
            <View style={styles.cardHeader}>
              <View style={[styles.statusBadge, { backgroundColor: activeCourse2 ? COLORS.primaryFixed : COLORS.surfaceContainerHigh }]}>
                {activeCourse2 && <View style={[styles.statusDot, { backgroundColor: COLORS.primary }]} />}
                <Text style={[styles.statusText, { color: activeCourse2 ? COLORS.onPrimaryFixed : COLORS.onSurfaceVariant }]}>
                  {activeCourse2 ? "CURSO ACTIVO" : "INACTIVO"}
                </Text>
              </View>
              <Switch 
                value={activeCourse2} 
                onValueChange={setActiveCourse2} 
                trackColor={{ false: COLORS.surfaceVariant, true: COLORS.secondary }}
                thumbColor="#ffffff"
              />
            </View>

            <Text style={styles.courseTitle}>Literatura II</Text>

            <View style={styles.cardFooter}>
              <Text style={styles.footerLabel}>Profesor Asignado</Text>
              <View style={styles.teacherRow}>
                <Image 
                  source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdIzy5ZNJpv8BckeaE7y7gaZH7e1-uj_g0NYRdjG2wwE-OCo8xOozACx_Vbl14Y2or6SVyEzrQzfw42-iaRIJDpZkp5sVNY5HPenk1W4GxwESYWpG8v-hiY8d3yXaZktF5nOINATfrVHOKpIF1AAlhu7eyPos8uzK3LejD-qH1oukJY-kwN5Jd6xnnM7khHvK0Evw40hh1aae1RNIz8hpK2dDxOIktQvFGDU2DYT6G8QbgCAH8DnRkplyz3bIiAl4tX7KhFNOwtkY" }} 
                  style={styles.teacherAvatar} 
                />
                <View>
                  <Text style={styles.teacherName}>Dra. Elena Vargas</Text>
                  <Text style={styles.teacherDept}>Facultad de Letras</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Card 3 (Inactive) */}
          <View style={[styles.card, !activeCourse3 && styles.cardInactive]}>
            <View style={[styles.cardIndicator, { backgroundColor: activeCourse3 ? COLORS.secondary : COLORS.surfaceVariant }]} />
            
            <View style={styles.cardHeader}>
              <View style={[styles.statusBadge, { backgroundColor: activeCourse3 ? COLORS.primaryFixed : COLORS.surfaceContainerHigh }]}>
                {activeCourse3 && <View style={[styles.statusDot, { backgroundColor: COLORS.primary }]} />}
                <Text style={[styles.statusText, { color: activeCourse3 ? COLORS.onPrimaryFixed : COLORS.onSurfaceVariant }]}>
                  {activeCourse3 ? "CURSO ACTIVO" : "INACTIVO"}
                </Text>
              </View>
              <Switch 
                value={activeCourse3} 
                onValueChange={setActiveCourse3} 
                trackColor={{ false: COLORS.surfaceVariant, true: COLORS.secondary }}
                thumbColor="#ffffff"
              />
            </View>

            <Text style={styles.courseTitle}>Historia Contemporánea</Text>

            <View style={styles.cardFooter}>
              <Text style={styles.footerLabel}>Profesor Asignado</Text>
              <View style={styles.teacherRow}>
                <View style={[styles.teacherAvatar, { backgroundColor: COLORS.surfaceContainer, justifyContent: 'center', alignItems: 'center' }]}>
                  <MaterialIcons name="person" size={20} color={COLORS.onSurfaceVariant} />
                </View>
                <View>
                  <Text style={[styles.teacherName, { color: COLORS.onSurfaceVariant, fontStyle: 'italic', fontWeight: '400' }]}>Pendiente de Asignación</Text>
                </View>
              </View>
            </View>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
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
