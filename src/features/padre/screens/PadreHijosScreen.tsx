import { Text, View, StyleSheet, ScrollView, Image, TextInput, Pressable } from "react-native";
import { useAuth } from "@/features/auth";
import { useCallback, useEffect, useState } from "react";
import { COLORS, ThemedText } from "@/shared";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CardInciHijos from "../components/CardInciHijos";
import { ActuInciaLeida } from "../services/Incident.service";
import { useloadDatos } from "../hooks/CargarDatos";
import { useFocusEffect } from "@react-navigation/native";
import { ObtenerUsuarioActual } from "../services/User.service";

export default function PadreHijosScreen() {
  const { user } = useAuth();
  const { hijos, IncidenciasxHijo, loading, error, cargarDatos } = useloadDatos();
  const [searchText, setSearchText] = useState("");
  const [profileUrl, setProfileUrl] = useState<string | null>(null);

  useFocusEffect(useCallback(() => {
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
  }, [cargarDatos]));

  // Totales de incidencias filtradas
  const getFilteredIncidents = (studentId: number) => {
    const allIncidents = IncidenciasxHijo[studentId] ?? [];
    if (!searchText.trim()) return allIncidents;

    const query = searchText.toLowerCase();
    return allIncidents.filter(inci =>
      inci.titulo.toLowerCase().includes(query) ||
      inci.descripcion.toLowerCase().includes(query)
    );
  };

  // Calcular totales generales basados en el filtro actual
  const allFilteredIncidents = hijos.flatMap(hijo => getFilteredIncidents(hijo.id));
  const pendingTotal = allFilteredIncidents.filter((i) => i.estado === "NO_LEIDA").length;
  const solvedTotal = allFilteredIncidents.filter((i) => i.estado === "LEIDA").length;

  async function handleStatusCambio(hijoId: number, inciId: number, nuevoStatus: "NO_LEIDA" | "LEIDA") {
    if (nuevoStatus !== "LEIDA") return;
    try {
      await ActuInciaLeida(inciId);
    } catch (error) {
      console.log(error);
    }
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
                  <ThemedText type="roleLabel" color="onSecondary" style={styles.readBadgeText} >
                    {pendingTotal} Pendiente{pendingTotal !== 1 ? "s" : ""}
                  </ThemedText>
                </View>

                <View style={styles.badgeSolved}>
                  <ThemedText type="roleLabel" color="onSecondary" style={styles.readBadgeText} >
                    {solvedTotal} Resuelto{solvedTotal !== 1 ? "s" : ""}
                  </ThemedText>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.accentBar}></View>
        </View>
        {/*fin header */}

        {/* Search Filter input */}
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={20} color={COLORS.outline} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por título o descripción..."
            placeholderTextColor={COLORS.outline}
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <Pressable onPress={() => setSearchText("")} style={styles.clearButton}>
              <MaterialIcons name="close" size={20} color={COLORS.outline} />
            </Pressable>
          )}
        </View>

        {/*contenido */}
        <View style={styles.contenidoReportes}>
          <View style={styles.contenidoReportesHeader}>
            <MaterialIcons name="child-care" size={30} color={COLORS.onSurface} />
            <ThemedText type="body" style={[styles.headerTitle, { color: COLORS.onSurface }]}>
              Hijos
            </ThemedText>
          </View>

          {/*tarjetas dependiendo si son uno o dos hijos */}
          <View style={styles.contHijos}>
            {hijos.map((hijo) => {
              const filteredInci = getFilteredIncidents(hijo.id);
              const pending = filteredInci.filter((i) => i.estado === "NO_LEIDA").length;
              const solved = filteredInci.filter((i) => i.estado === "LEIDA").length;

              return (
                <CardInciHijos
                  key={hijo.id}
                  icon="account-circle"
                  iconbgcolor="rgba(167,51,0,0.1)"
                  iconcolor={COLORS.primary}
                  alum_nom={`${hijo.firstName} ${hijo.lastName}`}
                  alum_grado=""
                  alum_code={hijo.studentCode}
                  pending_alum={pending}
                  solved_alum={solved}
                  inci={filteredInci}
                  totalhijos={hijos.length}
                  onEstadoCambiado={(inciId, nuevoStatus) =>
                    handleStatusCambio(hijo.id, inciId, nuevoStatus)
                  }
                />
              );
            })}
          </View>
        </View>
        {/*fin contenido */}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },

  scrollContent: {
    paddingHorizontal: 17,
    paddingTop: 28,
    paddingBottom: 48,
  },

  headerpadre: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  headercontenido: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 8,
    alignItems: 'center',
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
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  headercontenidobadge: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
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
    boxShadow: '0px 1px 4px rgb(194, 83, 31)',
  },
  badgeSolved: {
    backgroundColor: COLORS.tertiaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    boxShadow: '0px 1px 4px rgb(41, 116, 182)',
  },
  readBadgeText: {
    fontSize: 11,
    fontFamily: "Manrope_700Bold",
  },

  headerTitle: {
    fontFamily: "PlusJakartaSans_800ExtraBold",
    fontSize: 20,
    fontWeight: "700",
  },

  /* Search Input styles */
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: COLORS.onSurface,
    fontSize: 14,
    fontFamily: "Manrope_300Bold",
  },
  clearButton: {
    padding: 4,
  },

  contenidoReportes: {
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: 16,
    padding: 14,
    marginBottom: 20,
    gap: 22,
  },
  contenidoReportesHeader: {
    flexDirection: 'row',
    marginBottom: 2,
    gap: 4,
  },
  textoContHeader: {
    fontFamily: "PlusJakartaSans_800ExtraBold",
    fontSize: 22,
    fontWeight: "700",
  },

  contHijos: {
    gap: 8,
  }
});