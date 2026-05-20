import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { PadreScreen } from "@/features/padre";

const Tab = createBottomTabNavigator();

export default function PadreNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="PadreHome" component={PadreScreen} />
    </Tab.Navigator>
  );
}
