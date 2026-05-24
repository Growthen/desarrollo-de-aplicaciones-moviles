import { ScrollView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ActionRow from "@/shared/components/ActionRow";
import ThemedText from "@/shared/components/ThemedText";
import { COLORS } from "@/shared/constants/colors";

export default function TeacherCoursesScreen() {
  const navigation = useNavigation<any>();
  const mockCourses = [
    {
      id: "1",
      title: "Matemáticas - 1A",
      subtitle: "25 alumnos",
      classroom: "1A",
      students: [
        {
          id: "s1",
          name: "Juan Pérez",
          dni: "74839211",
        },
        {
          id: "s2",
          name: "María Gómez",
          dni: "71592833",
        },
      ],
    },
    {
      id: "2",
      title: "Ciencias - 2B",
      subtitle: "22 alumnos",
      classroom: "2B",
      students: [
        {
          id: "s3",
          name: "Ana Torres",
          dni: "76283911",
        },
      ],
    },
  ];
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ThemedText type="brandTitle">Todos los cursos</ThemedText>

      <View style={styles.list}>
        {mockCourses.map((course) => (
          <ActionRow
            key={course.id}
            icon="class"
            iconBgColor={COLORS.primaryFixed}
            iconColor={COLORS.onPrimaryFixed}
            accentColor={COLORS.primary}
            title={course.title}
            subtitle={course.subtitle}
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
