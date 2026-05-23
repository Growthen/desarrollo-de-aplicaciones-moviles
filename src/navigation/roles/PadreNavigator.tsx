import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { PadreScreen } from "@/features/padre";
import ConfigurationNavigator from "../components/ConfigurationNavigator";
import { MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function PadreNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="PadreDashboard" component={PadreScreen}
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="calendar-month" size={size} color={color} />
          ),
        }} />
      <Tab.Screen name="PadreHijos" component={PadreScreen}
        options={{
          title: "Hijos",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="people" size={size} color={color} />
          ),
        }} />
      <Tab.Screen
        name="Configuration"
        component={ConfigurationNavigator}
        options={{
          title: "Configuración",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
