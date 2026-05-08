import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ProfesorScreen } from "@/features/profesor";

const Stack = createNativeStackNavigator();

export default function ProfesorNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfesorHome" component={ProfesorScreen} />
    </Stack.Navigator>
  );
}
