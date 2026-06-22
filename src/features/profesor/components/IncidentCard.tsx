import { Pressable, StyleSheet, View } from "react-native";

import ThemedText from "@/shared/components/ThemedText";
import { COLORS } from "@/shared/constants/colors";
import { Incidence } from "../types/types";

type IncidentCardProps = {
  incident: Incidence;
  onPress: () => void;
  maxDescriptionLength?: number;
};

function truncateText(text: string, maxLength: number) {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

export default function IncidentCard({
  incident,
  onPress,
  maxDescriptionLength = 90,
}: IncidentCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <ThemedText type="button" style={styles.title}>
          {incident.title}
        </ThemedText>
        <ThemedText type="label" style={styles.status}>
          {incident.status}
        </ThemedText>
      </View>
      <ThemedText type="body" style={styles.description}>
        {truncateText(incident.description, maxDescriptionLength)}
      </ThemedText>
      <View style={styles.footer}>
        <ThemedText type="label">{incident.course}</ThemedText>
        <ThemedText type="label">{incident.student}</ThemedText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.surfaceContainerHigh,
    gap: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  title: {
    flex: 1,
    color: COLORS.onSurface,
    marginRight: 10,
  },
  status: {
    color: COLORS.secondary,
    fontSize: 12,
  },
  description: {
    color: COLORS.onSurfaceVariant,
    lineHeight: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
});
