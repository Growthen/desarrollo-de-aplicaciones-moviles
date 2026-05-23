import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { ProfesorScreen } from "@/features/profesor";
import ConfigurationNavigator from "../components/ConfigurationNavigator";
import { MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function ProfesorNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="ProfesorDashboard" component={ProfesorScreen}
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="calendar-month" size={size} color={color} />
          ),
        }} />
      <Tab.Screen name="ProfesorClases" component={ProfesorScreen}
        options={{
          title: "Clases",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="school" size={size} color={color} />
          ),
        }}
      />
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
