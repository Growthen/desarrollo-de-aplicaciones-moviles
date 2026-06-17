import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { 
  CoordinadorScreen, CursosScreen, CrearCursoScreen, 
  AsignarAlumnosScreen, UsuariosScreen, RegistrarUsuarioScreen
} from "@/features/coordinador";
import DetalleCursoScreen from "@/features/coordinador/screens/DetalleCursoScreen";
import EditarUsuarioScreen from "@/features/coordinador/screens/EditarUsuarioScreen";
import EditarCursoScreen from "@/features/coordinador/screens/EditarCursoScreen";
console.log('EditarCursoScreen:', EditarCursoScreen);
import ConfigurationNavigator from "../components/ConfigurationNavigator";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "@/shared";

const Tab = createBottomTabNavigator();
export default function CoordinadorNavigator() {
  
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="CoordinadorDashboard" component={CoordinadorScreen} options={{ title: "Inicio", tabBarIcon: ({ color, size }) => <MaterialIcons name="dashboard" size={size} color={color} /> }} />
      <Tab.Screen name="CoordinadorCursos" component={CursosScreen} options={{ title: "Cursos", tabBarIcon: ({ color, size }) => <MaterialIcons name="school" size={size} color={color} /> }} />
      <Tab.Screen name="CoordinadorUsuarios" component={UsuariosScreen} options={{ title: "Usuarios", tabBarIcon: ({ color, size }) => <MaterialIcons name="group" size={size} color={color} /> }} />
      <Tab.Screen name="CoordinadorCrearCurso" component={CrearCursoScreen} options={{ tabBarStyle: { display: "none" }, tabBarItemStyle: { display: "none" }, tabBarButton: () => null }} />
      <Tab.Screen name="CoordinadorAsignarAlumnos" component={AsignarAlumnosScreen} options={{ tabBarStyle: { display: "none" }, tabBarItemStyle: { display: "none" }, tabBarButton: () => null }} />
      <Tab.Screen name="CoordinadorRegistrarUsuario" component={RegistrarUsuarioScreen} options={{ tabBarStyle: { display: "none" }, tabBarItemStyle: { display: "none" }, tabBarButton: () => null }} />
      <Tab.Screen name="CoordinadorDetalleCurso" component={DetalleCursoScreen} options={{ tabBarStyle: { display: "none" }, tabBarItemStyle: { display: "none" }, tabBarButton: () => null }} />
      <Tab.Screen name="CoordinadorEditarUsuario" component={EditarUsuarioScreen} options={{ tabBarStyle: { display: "none" }, tabBarItemStyle: { display: "none" }, tabBarButton: () => null }} />
      <Tab.Screen name="CoordinadorEditarCurso" component={EditarCursoScreen} options={{ tabBarStyle: { display: "none" }, tabBarItemStyle: { display: "none" }, tabBarButton: () => null }} />
      <Tab.Screen name="Configuration" component={ConfigurationNavigator} options={{ title: "Configuración", tabBarIcon: ({ color, size }) => <MaterialIcons name="settings" size={size} color={color} /> }} />
    </Tab.Navigator>
  );
}