import { Pressable, Text, View, StyleSheet, ScrollView, Image, ActivityIndicator } from "react-native";
import { useAuth } from "@/features/auth";
import { COLORS, ThemedText } from "@/shared";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CardInciDash from "../components/CardInciDash";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { PadreDashStackParams } from "../navigation/PadreDashStack";
import { useloadDatos } from "../hooks/CargarDatos";
import { ActuInciaLeida, Incidencia } from "../services/Incident.service";
import { ObtenerUsuarioActual } from "../services/User.service";

const card_inci_dash = 4;

export default function PadreScreen() {
  const { user } = useAuth();
  const truncateText = (text: string, maxLength: number): string => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };
  const navigator = useNavigation<NativeStackNavigationProp<PadreDashStackParams>>();
  const { hijos, IncidenciasxHijo, loading, error, cargarDatos } = useloadDatos();
  
  const [profileUrl, setProfileUrl] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      cargarDatos();
      async function loadProfilePhoto() {
        try {
          const userData = await ObtenerUsuarioActual();
          if (userData.imageUrl) {
            setProfileUrl(userData.imageUrl);
          } else {
            setProfileUrl(null);
          }
        } catch (e) {
          console.log(e);
        }
      }
      loadProfilePhoto();
    }, [cargarDatos])
  );

  const inciTotalesD = Object.values(IncidenciasxHijo).flat();
  const pendingTotalD = inciTotalesD.filter((i) => i.estado === "NO_LEIDA").length;
  const solvedTotalD = inciTotalesD.filter((i) => i.estado === "LEIDA").length;

  const inciVisiDash = [...inciTotalesD]
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
    .slice(0, card_inci_dash);

  async function handleStatusCambioDash(inci: Incidencia) {
    if (inci.estado === "NO_LEIDA") {
      try {
        await ActuInciaLeida(inci.id);
      } catch (error) {
        console.log(error);
      }
    }
    navigator.navigate("inciDetail", {
      incidencia: {
        ...inci,
        estado: "LEIDA",
      },
    });
  }

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/*header */}
        <View style={styles.headerpadre}>
          <View style={styles.headercontenido}>
            {profileUrl ? (
              <Image source={{ uri: profileUrl }} style={styles.profileAvatar} />
            ) : (
              <MaterialIcons name="account-circle" size={100} color={COLORS.primary} />
            )}

            <View style={styles.headercontenidocolumna}>
              <ThemedText type="brandTitle" color="onSurface" style={styles.sectionTitle}>
                <Text>{user?.username || "usuario"}</Text>
              </ThemedText>

              <View style={styles.headercontenidobadge}>
                <View style={styles.badgePending}>
                  <ThemedText type="roleLabel" color="onSecondary" style={styles.readBadgeText}>
                    {pendingTotalD} Pendiente{pendingTotalD !== 1 ? "s" : ""}
                  </ThemedText>
                </View>

                <View style={styles.badgeSolved}>
                  <ThemedText type="roleLabel" color="onSecondary" style={styles.readBadgeText}>
                    {solvedTotalD} Resuelto{solvedTotalD !== 1 ? "s" : ""}
                  </ThemedText>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.accentBar}></View>
        </View>

        {/* Dashboard Statistics section */}
        <View style={styles.statsSection}>
          <ThemedText type="body" style={[styles.headerTitle, { color: COLORS.onSurface, marginBottom: 12 }]}>
            Estadísticas
          </ThemedText>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <MaterialIcons name="child-care" size={24} color={COLORS.primary} />
              <ThemedText type="brandTitle" color="primary" style={styles.statNumber}>
                {hijos.length}
              </ThemedText>
              <ThemedText type="label" color="onSurfaceVariant" style={styles.statLabel}>
                Hijos
              </ThemedText>
            </View>

            <View style={styles.statCard}>
              <MaterialIcons name="assignment" size={24} color={COLORS.secondary} />
              <ThemedText type="brandTitle" color="secondary" style={styles.statNumber}>
                {inciTotalesD.length}
              </ThemedText>
              <ThemedText type="label" color="onSurfaceVariant" style={styles.statLabel}>
                Total Incidencias
              </ThemedText>
            </View>
          </View>

          <View style={[styles.statsContainer, { marginTop: 12 }]}>
            <View style={styles.statCard}>
              <MaterialIcons name="mark-email-unread" size={24} color="#d32f2f" />
              <ThemedText type="brandTitle" style={[styles.statNumber, { color: "#d32f2f" }]}>
                {pendingTotalD}
              </ThemedText>
              <ThemedText type="label" color="onSurfaceVariant" style={styles.statLabel}>
                No Abiertas
              </ThemedText>
            </View>

            <View style={styles.statCard}>
              <MaterialIcons name="drafts" size={24} color="#388e3c" />
              <ThemedText type="brandTitle" style={[styles.statNumber, { color: "#388e3c" }]}>
                {solvedTotalD}
              </ThemedText>
              <ThemedText type="label" color="onSurfaceVariant" style={styles.statLabel}>
                Leídas
              </ThemedText>
            </View>
          </View>
        </View>

        {/*contenido cards incidentes */}
        <View style={styles.contenidoReportes}>
          <View style={styles.contenidoheader}>
            <MaterialIcons name="assignment" size={30} color={COLORS.primary} />
            <ThemedText type="body" style={[styles.headerTitle, { color: COLORS.primary }]}>
              Reportes Recientes
            </ThemedText>
          </View>

          <View style={styles.contenidoCont}>
            {inciVisiDash.length === 0 ? (
              <ThemedText type="body" color="onSurface" style={styles.inciDashNotFoundText}>
                No hay incidentes registrados.
              </ThemedText>
            ) : (
              inciVisiDash.map((inci) => (
                <CardInciDash
                  key={inci.id}
                  icon={inci.icon}
                  iconcolor={inci.iconcolor}
                  iconbgcolor={inci.iconbgcolor}
                  titulo={inci.titulo}
                  fecha={inci.fecha}
                  profesor={inci.profesor}
                  descripcion={truncateText(inci.descripcion, 102)}
                  estado={inci.estado}
                  nombre_alumno={inci.nombre_alumno}
                  onPress={() => handleStatusCambioDash(inci)}
                />
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

/*styles*/
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },

  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 28,
    paddingBottom: 48,
  },

  headerpadre: {
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  headercontenido: {
    flexDirection: "row",
    marginBottom: 12,
    gap: 8,
    alignItems: "center",
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  headercontenidocolumna: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  headercontenidobadge: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  sectionTitle: {
    fontSize: 26,
    lineHeight: 38,
    marginBottom: 12,
  },
  accentBar: {
    width: 310,
    height: 3,
    borderRadius: 9999,
    backgroundColor: COLORS.primary,
  },

  badgePending: {
    backgroundColor: COLORS.primaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    boxShadow: "0px 1px 4px rgb(194, 83, 31)",
  },
  badgeSolved: {
    backgroundColor: COLORS.tertiaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    boxShadow: "0px 1px 4px rgb(41, 116, 182)",
  },
  readBadgeText: {
    fontSize: 11,
    fontFamily: "Manrope_700Bold",
  },

  headerTitle: {
    fontFamily: "PlusJakartaSans_800ExtraBold",
    fontSize: 22,
    fontWeight: "700",
  },

  /* Statistics Dashboard */
  statsSection: {
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: 16,
    padding: 15,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.05)",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 11,
    fontFamily: "Manrope_700Bold",
    textAlign: "center",
  },

  contenidoReportes: {
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: 16,
    padding: 15,
    marginBottom: 28,
    gap: 24,
  },
  contenidoheader: {
    flexDirection: "row",
    marginBottom: 2,
    gap: 2,
  },
  contenidoCont: {
    gap: 4,
    marginBottom: 8,
  },
  inciDashNotFoundText: {
    fontSize: 12,
    fontStyle: "italic",
    opacity: 0.6,
    paddingVertical: 8,
    alignSelf: "center",
  },
});
