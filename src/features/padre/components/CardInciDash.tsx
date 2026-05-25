
import { COLORS, ThemedText } from "@/shared";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, View, StyleSheet } from "react-native";

//tipo de los props, define q datos necesita el componente para funcionar
//icono(?, titulo, fecha, profesor, descripcion, estado leido no leido, nombre alumno
//incidencias: alteracion del orden, medica, tardanza
//se enseñaran las primeras 4 - 5
export type CardInciDashProps = {
    icon: React.ComponentProps<typeof MaterialIcons>["name"];
    iconbgcolor: string;
    iconcolor: string;
    
    titulo: string;
    fecha: string; //cambiar
    profesor: string;
    descripcion: string;
    estado: string; //boolean? cambiar
    nombre_alumno: string;
    onPress?: () => void; //no devuelve nada 
    
}

export default function CardInciDash({icon, iconbgcolor, iconcolor, titulo, fecha,
    profesor, descripcion, estado, nombre_alumno, onPress}: CardInciDashProps){
        //desestructuracion de props, verifica q se usen todos los props al usarlo
    return(
        <Pressable onPress={onPress} style={({pressed}) => [styles.cardContenido, 
            { borderLeftColor: estado, borderRightColor: estado}, pressed && 
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
                            {profesor} ⤷ {fecha}
                        </ThemedText>

                    </View>
                    
                </View>
                <View style={[styles.accentBar, {backgroundColor: iconcolor}]}></View>
                {/*fin header*/}

                {/*desc*/}
                <View style={styles.cardDesc}>

                    <ThemedText type="body" color="onSurfaceVariant" style={styles.cardDescDesc}>
                        {descripcion}
                    </ThemedText>

                    <ThemedText type="roleLabel" color="onSurfaceVariant" style={styles.cardDescAlum}>
                        {nombre_alumno}
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
    borderLeftWidth: 4,
    borderRightWidth: 4,
    boxShadow: '0px 1px 4px rgb(49, 130, 200)',
    marginBottom: 10,
  },
  cardContenidoPressed: {
    backgroundColor: COLORS.surfaceContainerHigh,
    transform: [{ scale: 0.98 }],
    borderLeftColor: COLORS.inverseSurface,
    borderRightColor: COLORS.inverseSurface,
    boxShadow: '0px 1px 4px rgb(24, 22, 18)',
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
    backgroundColor: COLORS.primary,
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
});