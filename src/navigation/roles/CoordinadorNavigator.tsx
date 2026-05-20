import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CoordinadorScreen } from "@/features/coordinador";

const Tab = createBottomTabNavigator();

export default function CoordinadorNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="CoordinadorHome" component={CoordinadorScreen} />
    </Tab.Navigator>
  );
}
