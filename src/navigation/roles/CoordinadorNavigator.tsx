import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CoordinadorScreen, CursosScreen, CrearCursoScreen, AsignarAlumnosScreen, UsuariosScreen, RegistrarUsuarioScreen } from "@/features/coordinador";
import ConfigurationNavigator from "../components/ConfigurationNavigator";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "@/shared";

const Tab = createBottomTabNavigator();

export default function CoordinadorNavigator() {
  return (
    <Tab.Navigator 
      screenOptions={{ 
        headerShown: false,
        tabBarActiveTintColor: COLORS.secondary,
        tabBarInactiveTintColor: COLORS.onSurfaceVariant,
        tabBarStyle: {
          backgroundColor: COLORS.surfaceContainerLowest,
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: COLORS.onSurface,
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.06,
          shadowRadius: 16,
        }
      }}
    >
      <Tab.Screen 
        name="CoordinadorDashboard" 
        component={CoordinadorScreen}
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="dashboard" size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="CursosScreenPlaceholder" 
        component={CursosScreen}
        options={{
          title: "Cursos",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="school" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="UsuariosScreenPlaceholder" 
        component={UsuariosScreen}
        options={{
          title: "Usuarios",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="group" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="CoordinadorCrearCurso" 
        component={CrearCursoScreen}
        options={{
          title: "Crear Curso",
          tabBarStyle: { display: "none" },
          tabBarItemStyle: { display: "none" },
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen 
        name="CoordinadorAsignarAlumnos" 
        component={AsignarAlumnosScreen}
        options={{
          title: "Asignar Alumnos",
          tabBarStyle: { display: "none" },
          tabBarItemStyle: { display: "none" },
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen 
        name="CoordinadorRegistrarUsuario" 
        component={RegistrarUsuarioScreen}
        options={{
          title: "Registrar Usuario",
          tabBarStyle: { display: "none" },
          tabBarItemStyle: { display: "none" },
          tabBarButton: () => null,
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
