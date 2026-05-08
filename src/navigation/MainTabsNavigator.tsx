import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AdminScreen } from "@/features/admin";

const Tab = createBottomTabNavigator();

export default function MainTabsNavigator() {
  return (
    // Se usa el headerShown: false para ocultar el header en cada pantalla del tab navigator
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Admin" component={AdminScreen} />
    </Tab.Navigator>
  );
}
