import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PasswordRestoreScreen from "@/features/auth/screens/PasswordRestoreScreen";
import EmailRestoreScreen from "@/features/auth/screens/EmailRestoreScreen";
import ConfigurationScreen from "@/navigation/components/configuration/ConfigurationScreen";

export type ConfigurationStackParamList = {
  ConfigurationHome: undefined;
  PasswordRestore: undefined;
  EmailRestore: undefined;
};

const Stack = createNativeStackNavigator<ConfigurationStackParamList>();

export default function ConfigurationNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right", // transition from right to left
      }}
    >
      <Stack.Screen name="ConfigurationHome" component={ConfigurationScreen} />
      <Stack.Screen name="PasswordRestore" component={PasswordRestoreScreen} />
      <Stack.Screen name="EmailRestore" component={EmailRestoreScreen} />
    </Stack.Navigator>
  );
}
