import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfesorScreen from "../screens/ProfesorScreen";
import IncidenceForm from "../screens/IncidenceForm";
import IncidenceDetail from "../screens/IncidenceDetail";

const Stack = createNativeStackNavigator();

export default function ProfesorStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfesorHome" component={ProfesorScreen} />
      <Stack.Screen name="IncidenceForm" component={IncidenceForm} />
      <Stack.Screen name="IncidenceDetail" component={IncidenceDetail} />
    </Stack.Navigator>
  );
}
