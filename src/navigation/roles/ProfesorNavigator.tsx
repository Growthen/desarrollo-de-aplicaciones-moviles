import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { ProfesorScreen } from "@/features/profesor";

const Tab = createBottomTabNavigator();

export default function ProfesorNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="ProfesorHome" component={ProfesorScreen} />
    </Tab.Navigator>
  );
}
