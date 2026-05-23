import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CoordinadorScreen } from "@/features/coordinador";
import ConfigurationNavigator from "../components/ConfigurationNavigator";
import { MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function CoordinadorNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="CoordinadorDashboard" component={CoordinadorScreen}
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="calendar-month" size={size} color={color} />
          ),
        }} />
      <Tab.Screen name="CoodinadorCrearUsers" component={CoordinadorScreen}
        options={{
          title: "Crear Usuarios",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person-add" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen name="CoordinadorCrearCurso" component={CoordinadorScreen}
        options={{
          title: "Crear Curso",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="add" size={size} color={color} />
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
