import { Pressable, Text, View, StyleSheet, ScrollView } from "react-native";
import { useAuth } from "@/features/auth";

import { COLORS, ThemedText } from "@/shared";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CardInciDash from "../components/CardInciDash";
import { useCallback } from "react";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { PadreDashStackParams } from "../navigation/PadreDashStack";

import { useloadDatos } from "../hooks/CargarDatos";
import { ActuInciaLeida, Incidencia } from "../services/Incident.service";


const card_inci_dash= 4;

export default function PadreScreen() {
  const { user, logout } = useAuth();
  const truncateText = (text: string, maxLength: number): string => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };
  //navigator
  const navigator= useNavigation<NativeStackNavigationProp<PadreDashStackParams>>();
  //ahora si backend, 
  const {IncidenciasxHijo, loading, error, cargarDatos} = useloadDatos();

  useFocusEffect( useCallback( () => {
    cargarDatos();},
    [cargarDatos]
  ));
  

  //totales para los badges
  const inciTotalesD= Object.values(IncidenciasxHijo).flat();
  const pendingTotalD= inciTotalesD.filter((i) => i.estado === "NO_LEIDA").length;
  const solvedTotalD= inciTotalesD.filter((i) => i.estado === "LEIDA").length;

  //incidencias de todos, ordenadas por fecha descendente y cortadas a las primeras 4
  const inciVisiDash= [...inciTotalesD].sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
                      .slice(0, card_inci_dash);

  async function handleStatusCambioDash(inci: Incidencia){
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

            <MaterialIcons name="account-circle" size={100} color={COLORS.primary} />

            <View style={styles.headercontenidocolumna}> 
              
              <ThemedText type="brandTitle" color="onSurface" style={styles.sectionTitle}>
                <Text>{user?.username || "usuario"}</Text>
              </ThemedText>

              <View style={styles.headercontenidobadge}>
                <View style={styles.badgePending}>
                  <ThemedText type="roleLabel" color="onSecondary" style={styles.readBadgeText} >
                    {pendingTotalD} Pendiente{pendingTotalD !== 1 ? "s" : ""}
                  </ThemedText>
                </View>

                <View style={styles.badgeSolved}>
                  <ThemedText type="roleLabel" color="onSecondary" style={styles.readBadgeText} >
                    {solvedTotalD} Resuelto{solvedTotalD !== 1 ? "s" : ""}
                  </ThemedText>
                </View>
              </View>
              
            </View> 
          </View>

          <View style={styles.accentBar}></View>
          
        </View>
        {/*fin header todo: comentar coso*/}

        {/*contenido cards incidentes */}
        <View style={styles.contenidoReportes}>
          <View style={styles.contenidoheader}>

            <MaterialIcons name="assignment" size={30} color={COLORS.primary} />
            <ThemedText type="body" style={[styles.headerTitle, { color: COLORS.primary }]}>
              Reportes Recientes
            </ThemedText>

          </View>
          {/*cards incidencias recientes 2 por n hijos, 4 por 1 hijo
          {() => navigator.navigate("inciDetail", {incidencia: inci})}*/}
          <View style={styles.contenidoCont}>
            {inciVisiDash.length === 0 ? (
              <ThemedText type="body" color="onSurface" style={styles.inciDashNotFoundText}>
                No hay incidentes registrados.
              </ThemedText>
            ) : (
              inciVisiDash.map((inci) => (
                <CardInciDash key={inci.id}
                  icon={inci.icon} iconcolor={inci.iconcolor} iconbgcolor={inci.iconbgcolor}
                  titulo={inci.titulo}
                  fecha={inci.fecha}
                  profesor={inci.profesor}
                  descripcion={truncateText(inci.descripcion, 102)}
                  estado= {inci.estado}
                  nombre_alumno={inci.nombre_alumno}
                  
                  onPress={() => handleStatusCambioDash(inci)}/>
              ))
            )}

            

          </View>
          
          
          
        </View>

        {/*fin contenido cards incidentes `${inci.nombre_alumno}-${inci.id}`*/}

        
        
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
  sectionTag: {
    fontSize: 11,
    letterSpacing: 2,
    fontFamily: "Manrope_700Bold",
    marginBottom: 8,
    marginLeft: 0,
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
    fontSize: 22,
    fontWeight: "700",
  },

  contenidoReportes: {
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: 16,
    padding: 15,
    marginBottom: 28,
    gap: 24,
  },
  contenidoheader: {
    flex: 1,
    flexDirection: 'row',
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
  

})
