import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CoordinadorScreen } from "@/features/coordinador";

const Stack = createNativeStackNavigator();

export default function CoordinadorNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CoordinadorHome" component={CoordinadorScreen} />
    </Stack.Navigator>
  );
}
