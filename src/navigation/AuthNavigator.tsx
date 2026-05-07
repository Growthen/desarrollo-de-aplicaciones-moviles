import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LoginScreen } from "@/features/auth";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}
