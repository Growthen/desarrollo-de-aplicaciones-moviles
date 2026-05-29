import { Pressable, Text, View, StyleSheet, ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import type { PadreHijosStackParams } from "../navigation/PadreHijosStack";


import { COLORS, ThemedText } from "@/shared";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

//tipos
type navi= NativeStackNavigationProp<PadreHijosStackParams, "inciDetail">;
type route= RouteProp<PadreHijosStackParams, "inciDetail">;

export default function PadreInciHijoDetail(){
    const navigator = useNavigation<navi>();
    const route = useRoute<route>();
    const {incidencia} = route.params;

    if (!route.params?.incidencia) {
        return (
            <View style={styles.notfoundContainer}>
                <ThemedText type="brandTitle">Incidencia No Encontrada</ThemedText>
                <Pressable onPress={() => navigator.goBack()} style={styles.flechaBack} >
                    <Text style={styles.backButtonText}>{"<"}</Text>
                </Pressable>
            </View>
        );
    }

    return(
        <SafeAreaView style={styles.root} edges={["top", "bottom"]}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface}/>

            {/*header con flecha*/}
            <View style={styles.detHeader}>
                <View style={styles.detHeaderRowOne}>
                    <Pressable style={styles.flechaBack} onPress={() => navigator.goBack()}>
                        <MaterialIcons name="arrow-back" size={20} color={COLORS.primary} />
                    </Pressable>

                    <ThemedText type="body"
                        style={[styles.headerTitle, { color: COLORS.primary }]}>
                        Detalles de Incidencia
                    </ThemedText>
                </View>
                <View style={styles.imgPerfil}>
                    <MaterialIcons name="person" size={20} color={COLORS.primary} />
                </View>
            </View>

            {/*contenido */}
            <ScrollView contentContainerStyle={styles.scrollableCont} showsVerticalScrollIndicator={false} >
                    {/*Incidencia details */}
                    <View style={styles.detContenido}>
                        {/*header */}
                        <View style={styles.detContHeader}>
                            <View style={[styles.detContHeaderIcon, {backgroundColor: incidencia.iconbgcolor}]}>
                                <MaterialIcons name={incidencia.icon} size={35} color={incidencia.iconcolor}/>
                            </View>
                            

                            <ThemedText type="brandTitle" style={[styles.detContHeaderTitle, {color: incidencia.iconcolor}]}>
                                {incidencia.titulo}
                            </ThemedText>

                            <View style={[styles.detContBadge, {backgroundColor: incidencia.estado === "LEIDA" ? 
                                  COLORS.onSurfaceVariant : COLORS.primary}]}>
                                <ThemedText type="roleLabel" color="onSecondary" style={styles.detBadgeTexto}>
                                    {incidencia.estado === "LEIDA" ? "Leído" : "No Leído"}
                                </ThemedText>
                            </View>
                        </View>
                        {/*fin header */}

                        {/*mas info fecha prof */}
                        <View style={styles.detContmasinfo}>
                            <ThemedText type="label" color="onSurfaceVariant" style={styles.detContinfoText}>
                                Fecha: {incidencia.fecha}
                            </ThemedText>

                            <ThemedText type="label" color="onSurfaceVariant" style={styles.detContinfoText}>
                                Prof: {incidencia.profesor}
                            </ThemedText>

                            <ThemedText type="label" color="onSurfaceVariant" style={styles.detContinfoText}>
                              Alumno: {incidencia.nombre_alumno}
                            </ThemedText>
                        </View>
                        {/*mas info fecha prof fin*/}
                        <View style={[styles.accentBar, { backgroundColor: incidencia.iconcolor }]} />

                        {/*desc */}
                        <View style={styles.detContdesc}>
                            <ThemedText type="body" color="onSurfaceVariant" style={styles.detContdescText}>
                                {incidencia.descripcion}
                            </ThemedText>
                            
                        </View>
                        {/*fin desc */}

                        
                    </View>

            </ScrollView>

            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    //
  root: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  notfoundContainer: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: 20,
        paddingTop: 60,
  },
  backButtonText: {
        fontSize: 28,
        color: COLORS.primary,
        fontFamily: "Manrope_700Bold",
  },
  //
  
  detHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 64,
  },
  detHeaderRowOne: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flexWrap: 'wrap',
    
  },
  flechaBack: {
    padding: 8,
    borderRadius: 999,
    backgroundColor: "rgba(228, 190, 178, 0.2)",
  },
  headerTitle: {
    fontFamily: "PlusJakartaSans_700ExtraBold",
    fontSize: 20,
    fontWeight: "700",
    flexWrap: "wrap",
  },
  imgPerfil: {
    width: 38,
    height: 38,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: COLORS.primaryFixed,
  },

  //
  scrollableCont: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 48,
    
  },

  detContenido: {
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: 16,
    padding: 14,
    marginBottom: 20,
    gap: 22,
  },
  detContHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flex: 1, //borrar
    flexWrap: 'wrap',
  },
  detContHeaderIcon: {
    width: 40,
    height: 40,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",   
  },
  detContHeaderTitle: {
    fontSize: 26,
    flex: 1,
    flexShrink: 1,
    flexWrap: "wrap",
  },
  detContBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    boxShadow: '0px 1px 4px rgb(194, 83, 31)',

  },
  detBadgeTexto: {
    fontSize: 11,
    fontFamily: "Manrope_700Bold",
  },

  detContmasinfo: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 4,
    flex: 1,
    flexShrink: 1,
    marginVertical: 12,
  },
  detContinfoText: {
    fontSize: 14,
    letterSpacing: 2,
  },

  accentBar: {
    width: 240,
    height: 1,
    alignSelf: 'center',
    borderRadius: 9999,
    backgroundColor: COLORS.primary,
  },
  detContdesc: {
    flexDirection: 'column',
    marginBottom: 3,
  },
  detContdescText: {
    fontSize: 18,
    fontFamily: "Manrope_300Bold",
    marginBottom: 8,
  },

})