import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AdminScreen } from "@/features/admin";

const Stack = createNativeStackNavigator();

export default function AdminNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminHome" component={AdminScreen} />
    </Stack.Navigator>
  );
}
