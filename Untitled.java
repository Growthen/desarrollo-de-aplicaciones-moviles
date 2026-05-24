import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TeacherCoursesScreen from "../screens/ProfesorCoursesScreen";
import CourseDetailScreen from "../screens/CourseDetailScreen";
import IncidenceForm from "../screens/IncidenceForm";

const Stack = createNativeStackNavigator();

export default function ProfesorCoursesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="TeacherCourses"
        component={TeacherCoursesScreen}
      />

      <Stack.Screen
        name="CourseDetail"
        component={CourseDetailScreen}
      />

      <Stack.Screen
        name="IncidenceForm"
        component={IncidenceForm}
      />
    </Stack.Navigator>
  );
}