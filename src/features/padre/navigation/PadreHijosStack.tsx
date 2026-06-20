import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PadreHijosScreen from "../screens/PadreHijosScreen"; 
import PadreInciHijoDetail from "../screens/PadreInciHijoDetail";
import { InciDetailParams } from "./types/PadreNavigation.types";


//parametros de cada ruta del stack
export type PadreHijosStackParams = {
    PadreHijosHome: undefined; //sin parametros
    inciDetail: InciDetailParams; //details recibe la incidencia completa
};

const Stack = createNativeStackNavigator<PadreHijosStackParams>();

export default function PadreHijosStack(){
    return(
        <Stack.Navigator screenOptions={{ headerShown: false}}>
            <Stack.Screen name="PadreHijosHome" component={PadreHijosScreen}/>
            <Stack.Screen name="inciDetail" component={PadreInciHijoDetail}/>
        </Stack.Navigator>
    );
}