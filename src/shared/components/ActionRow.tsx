import { Pressable, StyleSheet, View } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import ThemedText from "./ThemedText";
import { COLORS } from "../constants/colors";

export type ActionRowProps = {
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  iconBgColor: string;
  iconColor: string;
  accentColor: string;
  title: string;
  subtitle: string;
  onPress?: () => void;
};

export default function ActionRow({
  icon,
  iconBgColor,
  iconColor,
  accentColor,
  title,
  subtitle,
  onPress,
}: ActionRowProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.actionRow,
        { borderLeftColor: accentColor },
        pressed && styles.actionRowPressed,
      ]}
    >
      <View style={styles.actionRowContent}>
        <View style={[styles.actionIconCircle, { backgroundColor: iconBgColor }]}>
          <MaterialIcons name={icon} size={24} color={iconColor} />
        </View>

        <View style={styles.actionTextGroup}>
          <ThemedText
            type="button"
            color="onSurface"
            style={styles.actionTitle}
          >
            {title}
          </ThemedText>
          <ThemedText
            type="body"
            color="onSurfaceVariant"
            style={styles.actionSubtitle}
          >
            {subtitle}
          </ThemedText>
        </View>
      </View>

      <MaterialIcons
        name="chevron-right"
        size={24}
        color={accentColor}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.surfaceContainerLowest,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderLeftWidth: 4,
  },
  actionRowPressed: {
    backgroundColor: COLORS.surfaceContainerHigh,
    transform: [{ scale: 0.98 }],
  },
  actionRowContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flex: 1,
  },
  actionIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
  },
  actionTextGroup: {
    flex: 1,
    gap: 2,
  },
  actionTitle: {
    fontSize: 16,
  },
  actionSubtitle: {
    fontSize: 13,
    fontFamily: "Manrope_400Regular",
  },
});
