import { COLORS, ThemedText } from "@/shared";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, View, StyleSheet, Text } from "react-native";

import { useState } from "react";
import { formatFecha, type IconIncidencia } from "../mockIncidencias";

export type CardInciHijosHistProps = {
    icon: IconIncidencia;
    iconbgcolor: string;
    iconcolor: string;
    //accentcolor: string;

    id: number;
    titulo: string;
    fecha: string; //cambiar
    profesor: string;
    descripcion: string;
    estado: "NO_LEIDA" | "LEIDA"; //boolean? cambiar
    
    onPress?: () => void; //no devuelve nada 
    onEstadoCambiado?: (id: number, nuevoEstado: "NO_LEIDA" | "LEIDA") => void; //test para shadows y status y asi
    
};

function ObtenerShadowxStatus(estado: "NO_LEIDA" | "LEIDA"): string {
  return estado === "NO_LEIDA" ? "rgb(49, 130, 200)" : "rgb(120, 120, 120)"
}

function ObtenerBorderxStatus(estado: "NO_LEIDA" | "LEIDA"): string {
  return estado === "NO_LEIDA" ? "rgb(49, 130, 200)" : COLORS.onSurfaceVariant;
}

export default function CardInciHijosHist({icon, iconbgcolor, id, iconcolor, titulo, fecha, profesor, descripcion, 
  estado, onPress, onEstadoCambiado} : CardInciHijosHistProps){
    //estado local que viene con del componente padre (cardincihijos) permite cambios visuales sin backend
    //por el momento
    const [statusLocal, setEstatusLocal] = useState<"NO_LEIDA" | "LEIDA">(estado);

    const truncateText = (text: string, maxLength: number): string => {
        return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
    };

    function handleOnPress(){ //para q al presionar pase a leida
      if(statusLocal === "NO_LEIDA"){
        const newStatus= "LEIDA";
        setEstatusLocal(newStatus);
        //este estado hace q el componente padre actualice los contadores pending solved
        onEstadoCambiado?.(id, newStatus)
      }
      onPress?.();
    }

    return(
        <Pressable onPress={handleOnPress} style={({pressed}) => [styles.cardContenido, 
            { borderLeftColor: ObtenerBorderxStatus(statusLocal), 
              borderRightColor: ObtenerBorderxStatus(statusLocal),
              boxShadow: `0px 1px 4px ${ObtenerShadowxStatus(statusLocal)}`}, pressed && 
            styles.cardContenidoPressed
        ]}>
            <View style={styles.cardColumnContenido}> 
                {/*header*/}
                <View style={styles.cardHeader}>

                    <View style={[styles.imgbg, {backgroundColor: iconbgcolor}]}>
                        <MaterialIcons name={icon} size={40} color={iconcolor}/>
                    </View>
                    

                    <View style={styles.cardHeaderText}>
                        <ThemedText type="button" color="onSurface" style={[styles.cardHeaderTitle, 
                            {color: iconcolor} ]}>
                            {titulo}
                        </ThemedText>

                        <ThemedText type="body" color="onSurfaceVariant" style={styles.cardHeaderprof}>
                            {profesor} ⤷ {formatFecha(fecha)}
                        </ThemedText>

                    </View>
                    
                </View>
                <View style={[styles.accentBar, {backgroundColor: iconcolor}]}></View>
                {/*fin header*/}

                {/*desc*/}
                <View style={styles.cardDesc}>

                    <ThemedText type="body" color="onSurfaceVariant" style={styles.cardDescDesc}>
                        <Text>{truncateText(descripcion, 102)}</Text>
                    </ThemedText>

                </View>
                {/*fin desc*/}

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
    //boxShadow: '0px 1px 4px rgb(49, 130, 200)',
    marginBottom: 10,
  },
  cardContenidoPressed: {
    backgroundColor: COLORS.surfaceContainerHigh,
    transform: [{ scale: 0.98 }],
    borderLeftColor: COLORS.inverseSurface,
    borderRightColor: COLORS.inverseSurface,
    //boxShadow: '0px 1px 4px rgb(24, 22, 18)',
  },
  cardColumnContenido: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 16,
    flex: 1,
  },
  imgbg: {
    width: 45,
    height: 45,
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
  },


  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flex: 1,
  },
  cardHeaderText:{
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 4,
    flex: 1,
    flexShrink: 1,
  },
  cardHeaderTitle: {
    fontSize: 16,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  cardHeaderprof: {
    fontSize: 10,
    letterSpacing: 1,
    
  },

  accentBar: {
    width: 240,
    height: 1,
    alignSelf: 'center',
    borderRadius: 9999,
    //backgroundColor: COLORS.primary,
  },


  cardDesc: {
    flexDirection: 'column',
    marginBottom: 3,

  },
  cardDescDesc: {
    fontSize: 12,
    fontFamily: "Manrope_300Bold",
    marginBottom: 8,
  },
  cardDescAlum: {
    fontSize: 11,
    fontFamily: "Manrope_300Regular",
    alignSelf: 'flex-end',
  }
})