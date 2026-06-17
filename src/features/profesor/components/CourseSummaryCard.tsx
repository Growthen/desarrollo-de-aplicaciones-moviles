import { Pressable, StyleSheet, View } from "react-native";

import ThemedText from "@/shared/components/ThemedText";
import { COLORS } from "@/shared/constants/colors";
import { Course } from "../types/types";

type CourseSummaryCardProps = {
  course: Course;
  onPress?: () => void;
};

export default function CourseSummaryCard({
  course,
  onPress,
}: CourseSummaryCardProps) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.badge}>
        <ThemedText type="label" color="onPrimary">
          Curso
        </ThemedText>
      </View>
      <ThemedText type="button" style={styles.title}>
        {course.title}
      </ThemedText>
      <ThemedText type="body" style={styles.subtitle}>
        {course.subtitle}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.surfaceContainerHigh,
    gap: 10,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  title: {
    color: COLORS.onSurface,
  },
  subtitle: {
    color: COLORS.onSurfaceVariant,
  },
});
