import { Text, View, StyleSheet, ScrollView, Image } from "react-native";

import { useAuth } from "@/features/auth";
import { useState } from "react";

import { COLORS, ThemedText } from "@/shared";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CardInciHijos from "../components/CardInciHijos";
import { MOCK_HIJOS } from "../mockIncidencias";
import type { Incidencia } from "../mockIncidencias";

export default function PadreHijosScreen(){

    const { user} = useAuth();
   
    //estado central, inicializa desde el mock, temporal
    //para el backend seria useeffect
    const [incixHijo, setIncixHijo] = useState<Record<number, Incidencia[]>>(
      () => Object.fromEntries(MOCK_HIJOS.map((h) => [h.id, h.inci]))
    );

    //totales para los badges del header
    const inciTotales= Object.values(incixHijo).flat();
    const pendingTotal= inciTotales.filter((i) => i.estado === "NO_LEIDA").length;
    const solvedTotal= inciTotales.filter((i) => i.estado === "LEIDA").length;

    //ligado al onestadocambiado de cardincihijoshist, sube y actualiza
    function handleStatusCambio(hijoId: number, inciId: number, nuevoStatus: "NO_LEIDA" | "LEIDA"){
      setIncixHijo((prev) => ({
        ...prev, [hijoId]: prev[hijoId].map((i) => i.id === inciId ? {...i, estado: nuevoStatus} : i)
      }));
    }

    return(
        <View style={styles.root}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/*header */}
                <View style={styles.headerpadre}>
                    <View style={styles.headercontenido}>

                        <MaterialIcons name="account-circle" size={100} color={COLORS.primary} />

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
                        {MOCK_HIJOS.map((hijo) => {
                          const inciDeNHijo= incixHijo[hijo.id] ?? [];
                          const pending= inciDeNHijo.filter((i) => i.estado === "NO_LEIDA").length;
                          const solved= inciDeNHijo.filter((i) => i.estado === "LEIDA").length;

                          return(
                            <CardInciHijos key={hijo.id}
                                icon="account-circle"
                                iconbgcolor="rgba(167,51,0,0.1)"
                                iconcolor={COLORS.primary}
                                alum_nom={hijo.alum_nom}
                                alum_grado={hijo.alum_grado}
                                alum_code={hijo.alum_code}
                                pending_alum={pending}
                                solved_alum={solved}
                                inci={inciDeNHijo}
                                totalhijos={MOCK_HIJOS.length}
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
    flex: 1,
    flexDirection: 'row',
    marginBottom: 12,
    gap: 8,
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

  contenidoReportes: {
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: 16,
    padding: 14,
    marginBottom: 20,
    gap: 22,
  },
  contenidoReportesHeader: {
    flex: 1,
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
})