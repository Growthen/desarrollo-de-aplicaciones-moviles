import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { PadreScreen } from "@/features/padre";

const Stack = createNativeStackNavigator();

export default function PadreNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PadreHome" component={PadreScreen} />
    </Stack.Navigator>
  );
}
