import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  Platform,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "@/shared";
import useAuth from "@/features/auth/hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { getCoordinatorMetrics } from "@/features/coordinador/services/coordinadorService";

export default function CoordinadorScreen() {
  const { user } = useAuth();
  const navigation = useNavigation<any>();
  const [metrics, setMetrics] = useState({
    students: 0,
    teachers: 0,
    parents: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const data = await getCoordinatorMetrics();
        setMetrics(data);
      } catch (error) {
        console.error("Error fetching coordinator metrics:", error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = navigation.addListener("focus", () => {
      fetchMetrics();
    });

    fetchMetrics();

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />

      {/* TopAppBar Custom */}
      <View style={styles.header}>
        <Pressable
          style={styles.iconButton}
          onPress={() => {
            /* TODO: Open Drawer or Menu */
          }}
        >
          <MaterialIcons name="menu" size={24} color={COLORS.primary} />
        </Pressable>
        <Text style={styles.headerTitle}>TRILCE</Text>
        <View style={styles.profileIcon}>
          <MaterialIcons name="person" size={24} color={COLORS.primary} />
        </View>
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
          {/* Alumnos Matriculados */}
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

          {/* Profesores Activos */}
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

          {/* Padres Activos */}
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.surface,
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
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
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
    paddingTop: 24,
  },
  sectionHeader: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    color: COLORS.onSurface,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.onSurfaceVariant,
  },
  metricsContainer: {
    flexDirection: "column",
    gap: 16,
    marginBottom: 48,
  },
  metricCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 12,
    padding: 20,
    overflow: "hidden",
    position: "relative",
    shadowColor: COLORS.onSurface,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  metricCardPrimary: {
    paddingVertical: 24,
  },
  cardIndicator: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  metricCardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  metricLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.onSurfaceVariant,
    letterSpacing: 1,
    marginBottom: 4,
  },
  metricValueLarge: {
    fontSize: 56,
    fontWeight: "bold",
    color: COLORS.onSurface,
    letterSpacing: -1,
  },
  metricIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  metricCardContentSmall: {
    flexDirection: "row",
    alignItems: "center",
  },
  metricIconContainerSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  metricValueSmall: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.onSurface,
  },
  quickActionsSection: {
    marginBottom: 48,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.onSurface,
    marginBottom: 24,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 16,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 30,
    shadowColor: COLORS.onSurface,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    gap: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  imageContainer: {
    width: "100%",
    height: 192,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
    marginBottom: 32,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    opacity: 0.6,
  },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    backgroundColor: COLORS.surface,
    opacity: 0.3,
  },
});
