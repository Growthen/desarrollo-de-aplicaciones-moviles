
import { COLORS, ThemedText } from "@/shared";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { Pressable, View, StyleSheet, Text } from "react-native";
import type { Incidencia } from "../mockIncidencias";
import CardInciHijosHist from "./CardInciHijosHist";


//card de un hijo: icon, nombre_alum, grado, badge pending, badge solved, componente de incidentes
//ya desplegada
//card de N hijos: card no desplegada pero mismo, icon, nombre_alum, grado, badge pending, badge solved, show more
//no desplegado, se enseñaran las cards en sucesion
//cargar mas tmb
//usar el mock :c
const card_inci: number= 4;
export type CardInciHijosProps = {
    icon: React.ComponentProps<typeof MaterialIcons>["name"];
    iconbgcolor: string;
    iconcolor: string;
    //accentcolor: string;

    alum_nom: string;
    alum_grado: string;
    alum_code: string;
    pending_alum: number;
    solved_alum: number;
    totalhijos: number;
    inci: Incidencia[]; //cambiar, mock array
    onPress?: () => void; //no devuelve nada 
    
}

export default function CardInciHijos({icon, iconbgcolor, iconcolor, alum_nom, alum_grado, alum_code, 
    pending_alum, solved_alum, onPress, totalhijos, inci} : CardInciHijosProps){
        {/*expandir o no la card de hijos incidencias(4), si no es uno es false y no se expande*/}
    const [cardExpandida, setCardExpandida] = useState(totalhijos === 1);
        {/*cantidad de incidencias visibles, empieza siempre en 4, puede ser cambiado */}
    const [visible, setVisible] = useState(card_inci);
        {/* las incidencias q se renderizan, slice "corta" desde la primera hasta la cuarta, si
            hubiesen mas solo se verian las primeras 4*/}
    const inciVisibles = inci.slice(0, visible);
        {/*ve si hay mas incidencias q las visibles en el historial, true si es q si las hay*/}
    const moreInci= visible < inci.length;
        {/*enseña mas pero evita pasarse si no es un multiplo de 4, si es el total de incidencias fuera menor
            enseña la diferencia*/}
    const showMore = () => {
        setVisible((prevVisi) => Math.min(prevVisi + card_inci, pending_alum + solved_alum));
    };
        {/*al colapsar, resetea acciones a la primera tanda de incidencias si estaba expandida sino nada,
            si estaba cerrada la abre !prev revierte el booleano*/}
    const toggleExpandida = () => {
        if (cardExpandida) {
            setVisible(card_inci);
        }
        setCardExpandida((prev) => !prev);
    }
    
    
    return(
        <Pressable onPress={onPress} style={({pressed}) => [styles.cardContenido, 
            { borderLeftColor: COLORS.primary, borderRightColor: COLORS.primary}, pressed && 
            styles.cardContenidoPressed
        ]}>
            {/*contenido */}
            <View style={styles.cardContenidoColumn}>
                {/*header */}
                <View style={styles.cardContenidoHeaderRow}>
                    <View style={styles.cardHeaderColumnOne}>
                        <View style={styles.imgHeader}>
                            <MaterialIcons name="account-circle" size={40} color={COLORS.onSurface}/>
                        </View>
                        
                        <ThemedText type="label" color="primary" style={styles.subtituloColumnOne}>
                            {alum_code}
                        </ThemedText>
                    </View>

                    <View style={styles.cardHeaderColumnTwo}>
                        <ThemedText type="button" color="onSurface" style={styles.cardHeaderNom}>
                            {alum_nom}
                        </ThemedText>

                        <ThemedText type="body" color="onSurfaceVariant" style={styles.cardHeaderGrade}>
                            {alum_grado}
                        </ThemedText>

                        <View style={styles.badgeContenidoRow}>
                            <View style={styles.badgePending}>
                                <ThemedText type="roleLabel" color="onSecondary" style={styles.readBadgeText} >
                                    <Text>{pending_alum} Pendiente</Text>
                                </ThemedText>
                            </View>
                            
                            <View style={styles.badgeSolved}>
                                <ThemedText type="roleLabel" color="onSecondary" style={styles.readBadgeText} >
                                    <Text>{solved_alum} Resuelto</Text>
                                </ThemedText>
                            </View>
                        </View>
                    </View>
                </View>
                {/*fin header */}

                {/*show more, */}
                {cardExpandida && (
                    <View style={styles.inciContenido}>
                        {/*mensaje vacio caso no haya incidencias */}
                        {inci.length === 0 ? (
                            <ThemedText type="body" color="onSurface" style={styles.inciContNoInciText}>
                                No existen incidencias registradas.
                            </ThemedText>
                        //mensaje vacio fin
                        ) : ( //todo lo demas si es q si hay incidencias
                            <>
                                {inciVisibles.map((ind) => (
                                    <CardInciHijosHist key={ind.id} icon={ind.icon} iconbgcolor={ind.iconbgcolor}
                                        iconcolor={ind.iconcolor} titulo={ind.titulo} fecha={ind.fecha} 
                                        profesor={ind.profesor} descripcion={ind.descripcion} estado={ind.estado} />
                                ))}

                                {/*show more */}
                                {moreInci && (
                                    <Pressable onPress={showMore} style={styles.inciShowMore}>
                                        <ThemedText type="label" color="onSurface" style={styles.inciShowMoreText}>
                                            Mostrar Mas
                                        </ThemedText>
                                        <MaterialIcons name="expand-more" size={16} color={COLORS.onSurface}/>
                                    </Pressable>
                                )}
                            </>
                        )}
                        {/*mensaje vacio caso no haya incidencias */}
                    </View>
                )}
                {/*fin show more */}

                {/*expansion toggle si hay n hijos*/}
                {totalhijos > 1 &&(
                    <Pressable onPress={toggleExpandida} style={styles.inciShowMoreHijoS}>
                        <ThemedText type="label" color="onSurface">
                            {cardExpandida ? "Mostrar menos" : "Mostrar más"}
                        </ThemedText>
                        <MaterialIcons name={cardExpandida ? "expand-less" : "expand-more"}
                            size={16} color={COLORS.onSurface}/>
                    </Pressable>
                )}

            </View>

        </Pressable>
    );
}

const styles = StyleSheet.create({
  cardContenido: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.surfaceContainerLowest,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    boxShadow: '0px 1px 4px rgb(131, 55, 20)',
    marginBottom: 10,
  },
  cardContenidoPressed: {
    backgroundColor: COLORS.surfaceContainerHigh,
    transform: [{ scale: 0.98 }],
    borderLeftColor: COLORS.inverseSurface,
    borderRightColor: COLORS.inverseSurface,
    boxShadow: '0px 1px 4px rgb(24, 22, 18)',
  },

  cardContenidoColumn: {
    flexDirection: "column",
    alignItems: "center",
    gap: 14,
    flex: 1,
  },
  imgHeader: {
    width: 50,
    height: 50,
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContenidoHeaderRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
    flex: 1,
  },
  
  cardHeaderColumnOne: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 3,
    flexShrink: 1,
  },
  subtituloColumnOne: {
    fontSize: 9,
    letterSpacing: 1,
    fontFamily: "Manrope_700Bold",
    marginBottom: 6,
    marginLeft: 0,
  },
  cardHeaderColumnTwo: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 2,
    flex: 1,
    flexShrink: 1,

  },
  cardHeaderNom: {
    fontSize: 14,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  cardHeaderGrade: {
    fontSize: 10,
    letterSpacing: 1,
  },
  badgeContenidoRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
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
    fontSize: 8,
    fontFamily: "Manrope_700Bold",
  },
  inciContenido: {
    // Contenedor de todas las incidencias del hijo
    width: "100%",
    gap: 0, // las CardInciDash ya tienen marginBottom: 10
  },
  inciContNoInciText: {
    fontSize: 12,
    fontStyle: "italic",
    opacity: 0.6,
    paddingVertical: 8,
    alignSelf: "center",
  },
  inciShowMore: {
    // Botón "show more" de incidencias — dentro del bloque de incidencias
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingVertical: 10,
    marginTop: 4,
  },
  inciShowMoreText: {
    fontSize: 11,
    letterSpacing: 1,
    fontFamily: "Manrope_700Bold",
  },
  inciShowMoreHijoS: {
    // Botón "show more" del hijo — en la parte inferior de la card
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    width: "100%",
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: COLORS.outlineVariant,
    opacity: 0.7,
  }

})