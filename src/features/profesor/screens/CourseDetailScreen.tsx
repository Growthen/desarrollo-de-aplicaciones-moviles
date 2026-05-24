import { FlatList, Pressable, StyleSheet, View } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";

import ThemedText from "@/shared/components/ThemedText";
import { COLORS } from "@/shared/constants/colors";

import { Course, Student } from "../types/types";

export default function CourseDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const { course }: { course: Course } = route.params;

  return (
    <View style={styles.container}>
      <ThemedText type="brandTitle">{course.title}</ThemedText>

      <ThemedText type="brandSubtitle" style={{ marginBottom: 20 }}>
        Lista de alumnos
      </ThemedText>

      <FlatList
        data={course.students}
        keyExtractor={(item: Student) => item.id}
        contentContainerStyle={{ gap: 14 }}
        renderItem={({ item }) => (
          <View style={styles.studentCard}>
            <View style={{ flex: 1 }}>
              <ThemedText type="body">{item.name}</ThemedText>

              <ThemedText type="label">DNI: {item.dni}</ThemedText>
            </View>

            <Pressable
              style={styles.button}
              onPress={() =>
                navigation.navigate("IncidenceForm", {
                  student: item,
                  course,
                })
              }
            >
              <ThemedText type="label" color="onPrimary">
                Incidencia
              </ThemedText>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.background,
  },

  studentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surfaceContainerLowest,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.surfaceContainerHigh,
  },

  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
});
