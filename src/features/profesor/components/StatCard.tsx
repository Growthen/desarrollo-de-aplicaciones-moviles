import { StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ThemedText from "@/shared/components/ThemedText";
import { COLORS } from "@/shared/constants/colors";

interface StatCardProps {
  label: string;
  value: number | string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  color?: string;
}

export default function StatCard({
  label,
  value,
  icon,
  color = COLORS.primary,
}: StatCardProps) {
  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <ThemedText type="label" style={styles.label}>
        {label}
      </ThemedText>
      <View style={styles.valueContainer}>
        {icon && <MaterialIcons name={icon} size={24} color={color} />}
        <ThemedText type="brandTitle" style={[styles.value, { color }]}>
          {value}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    color: COLORS.onBackground,
    marginBottom: 8,
    fontSize: 13,
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  value: {
    marginBottom: 0,
  },
});
