import { Pressable, Text, View, StyleSheet, ScrollView, Image } from "react-native";
import { useAuth } from "@/features/auth";

import { COLORS, ThemedText } from "@/shared";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CardInciDash from "../components/CardInciDash";


export default function PadreScreen() {
  const { user, logout } = useAuth();
  const truncateText = (text: string, maxLength: number): string => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

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
                    N° Pendientes
                  </ThemedText>
                </View>

                <View style={styles.badgeSolved}>
                  <ThemedText type="roleLabel" color="onSecondary" style={styles.readBadgeText} >
                    N° Resueltos
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
          {/*cards incidencias recientes 2 por n hijos, 4 por 1 hijo*/}
          <View style={styles.contenidoCont}>

            <CardInciDash icon="health-and-safety" iconcolor="#60bb70" iconbgcolor="#cfe1d3"
            titulo="Idk help"
            fecha="23/05/2026"
            profesor="Nana"
            descripcion={truncateText("El estudiante se raspo la rodilla durante el recreo, se le desinfecto la herida, se le dio un calmante y volvio a clase.", 102)}
            estado= {COLORS.tertiaryContainer}
            nombre_alumno="Mia luna, Apellido Apellido"
            />

            <CardInciDash icon="watch-later" iconcolor="#dac82b" iconbgcolor="#f0eab4"
            titulo="Tardanza de 20 minutos"
            fecha="23/05/2026"
            profesor="Prof. Hachi Kurumizawa"
            descripcion={truncateText("El estudiante llego 20 minutos tarde a la toma de asistencia matutina.", 102)}
            estado= {COLORS.tertiaryContainer}
            nombre_alumno="Ezio, Auditore da Firenze"
            />

            <CardInciDash icon="block-flipped" iconcolor="#d91d1d" iconbgcolor="#e1b2b2"
            titulo="Falta dia martes del mes abril del año 2025"
            fecha="23/05/2026"
            profesor="Prof. Hachi Kurumizawa"
            descripcion={truncateText("El estudiante no estuvo presente en las dos tomas de asistencia, asi mismo no se confirma su presencia en el centro de estudios.",102)}
            estado= {COLORS.tertiaryContainer}
            nombre_alumno="Ezio, Auditore da Firenze"
            />

            <CardInciDash icon="call" iconcolor={COLORS.primary} iconbgcolor="rgba(167,51,0,0.1)"
            titulo="Disturbio en el aula"
            fecha="23/05/2026"
            profesor="Prof. Hachi Kurumizawa"
            descripcion={truncateText("La estudiante causo disturbios en el aula A505 a mitad de la clase, hizo caso omiso a las advertencias previas y mostro un comportamiento faltoso hacia el docente y sus compañeros de aula.", 102)}
            estado= {COLORS.tertiaryContainer}
            nombre_alumno="Mia luna, Apellido Apellido"
            />

          </View>
          
          
          
        </View>

        {/*fin contenido cards incidentes */}

        
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
          <Text style={{ color: "#fff", fontWeight: "600" }}>Cerrar Sesión</Text>
        </Pressable>
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
  }
  

})
