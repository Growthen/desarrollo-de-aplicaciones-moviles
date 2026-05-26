import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PadreScreen from "../screens/PadreScreen";
import PadreInciHijoDetail from "../screens/PadreInciHijoDetail";
import type { Incidencia } from "../mockIncidencias";

export type PadreDashStackParams= {
    PadreDashHome: undefined;
    inciDetail: {incidencia: Incidencia};
}

const Stack= createNativeStackNavigator<PadreDashStackParams>();

export default function PadreDashStack(){
    return(
        <Stack.Navigator screenOptions={{ headerShown: false}}>
            <Stack.Screen name="PadreDashHome" component={PadreScreen}/>
            <Stack.Screen name="inciDetail" component={PadreInciHijoDetail}></Stack.Screen>
        </Stack.Navigator>
    );
}