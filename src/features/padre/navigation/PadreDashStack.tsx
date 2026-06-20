import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PadreScreen from "../screens/PadreScreen";
import PadreInciHijoDetail from "../screens/PadreInciHijoDetail";
import { InciDetailParams } from "./types/PadreNavigation.types";

export type PadreDashStackParams = {
    PadreDashHome: undefined;
    inciDetail: InciDetailParams;
}

const Stack= createNativeStackNavigator<PadreDashStackParams>();

export default function PadreDashStack(){
    return(
        <Stack.Navigator screenOptions={{ headerShown: false}}>
            <Stack.Screen name="PadreDashHome" component={PadreScreen}/>
            <Stack.Screen name="inciDetail" component={PadreInciHijoDetail}/>
        </Stack.Navigator>
    );
}