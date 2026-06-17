import { ScrollView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ActionRow from "@/shared/components/ActionRow";
import ThemedText from "@/shared/components/ThemedText";
import { COLORS } from "@/shared/constants/colors";

import { useTeacherCourses } from "../hooks/useTeacherCourses";

export default function ProfesorCoursesScreen() {
  const navigation = useNavigation<any>();
  const { courses } = useTeacherCourses();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ThemedText type="brandTitle">Todos los cursos</ThemedText>

      <View style={styles.list}>
        {courses.map((course) => (
          <ActionRow
            key={course.id}
            icon="class"
            iconBgColor={COLORS.primaryFixed}
            iconColor={COLORS.onPrimaryFixed}
            accentColor={COLORS.primary}
            title={course.title}
            subtitle={course.subtitle ?? ""}
            onPress={() =>
              navigation.navigate("CourseDetail", {
                course,
              })
            }
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 20,
  },
  list: {
    gap: 14,
    marginTop: 20,
  },
});
