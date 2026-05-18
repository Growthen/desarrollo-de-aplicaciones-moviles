import { StyleSheet, Text, View, type ViewStyle } from "react-native";
import { COLORS } from "@/shared";

type Props = {
  count: number | string;
  label: string;
  style?: ViewStyle;
};

export default function StatsCard({ count, label, style }: Props) {
  return (
    <View style={[styles.card, style]}>
      <Text style={styles.count}>{count}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.surfaceContainerHighest,
    borderRadius: 22,
    padding: 18,
    alignItems: "flex-start",
  },
  count: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.onBackground,
    marginBottom: 6,
  },
  label: {
    fontSize: 13,
    color: COLORS.onSurfaceVariant,
  },
});
