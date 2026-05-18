import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "@/shared";

type Props = {
  title: string;
  schedule: string;
  room: string;
  grade: string;
  students: number;
  onAttendance: () => void;
};

export default function ClaseCard({
  title,
  schedule,
  room,
  grade,
  students,
  onAttendance,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.labelWrapper}>
        <Text style={styles.labelText}>{schedule}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{room}</Text>
      <Text style={styles.text}>{grade}</Text>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Estudiantes: {students}</Text>
        <Pressable
          onPress={onAttendance}
          style={({ pressed }) => [
            styles.attendanceButton,
            pressed && styles.attendanceButtonPressed,
          ]}
        >
          <Text style={styles.attendanceText}>Asistencia</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 24,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
  },
  labelWrapper: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.secondaryFixed,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    marginBottom: 10,
  },
  labelText: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.onSecondaryFixedVariant,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.onBackground,
    marginBottom: 6,
  },
  text: {
    fontSize: 14,
    color: COLORS.onSurfaceVariant,
    marginBottom: 4,
  },
  footer: {
    marginTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: {
    fontSize: 13,
    color: COLORS.onSurfaceVariant,
    fontWeight: "600",
  },
  attendanceButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 18,
    backgroundColor: COLORS.secondaryContainer,
  },
  attendanceButtonPressed: {
    opacity: 0.85,
  },
  attendanceText: {
    fontSize: 13,
    color: COLORS.onSecondary,
    fontWeight: "700",
  },
});
