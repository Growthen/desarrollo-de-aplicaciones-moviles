import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function MainTabsNavigator() {
  return (
    // Se usa el headerShown: false para ocultar el header en cada pantalla del tab navigator
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      {/* Aquí se agregarían las pantallas del tab navigator */}
      <></>
    </Tab.Navigator>
  );
}
