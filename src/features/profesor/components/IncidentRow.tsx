import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "@/shared";

type Props = {
  title: string;
  student: string;
  detail: string;
  timestamp: string;
  priority: string;
};

export default function IncidentRow({
  title,
  student,
  detail,
  timestamp,
  priority,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.infoRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeIcon}>!</Text>
        </View>
        <View style={styles.textGroup}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>
            {student} · {detail}
          </Text>
        </View>
      </View>
      <View style={styles.metaRow}>
        <Text style={styles.timestamp}>{timestamp}</Text>
        <Text style={styles.priority}>{priority}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: 22,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.surfaceVariant,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  badge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.primaryFixed,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  badgeIcon: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: "700",
  },
  textGroup: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.onBackground,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.onSurfaceVariant,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timestamp: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
  },
  priority: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.secondary,
  },
});
