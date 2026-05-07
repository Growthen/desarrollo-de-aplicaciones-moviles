import { StyleSheet, Text, type TextProps } from "react-native";

import { COLORS, type AppColors } from "../constants/colors";

export type ThemedTextType =
  | "body"
  | "brandTitle"
  | "brandSubtitle"
  | "label"
  | "roleLabel"
  | "button"
  | "link";

export type ThemedTextProps = TextProps & {
  type?: ThemedTextType;
  color?: keyof AppColors;
};

const defaultColorByType: Record<ThemedTextType, keyof AppColors> = {
  body: "onSurface",
  brandTitle: "primary",
  brandSubtitle: "onSurfaceVariant",
  label: "onSurfaceVariant",
  roleLabel: "onSurfaceVariant",
  button: "onPrimary",
  link: "secondary",
};

export default function ThemedText({
  style,
  type = "body",
  color,
  ...rest
}: ThemedTextProps) {
  const resolvedColor = COLORS[color ?? defaultColorByType[type]];

  return (
    <Text
      style={[
        { color: resolvedColor },
        type === "body" && styles.body,
        type === "brandTitle" && styles.brandTitle,
        type === "brandSubtitle" && styles.brandSubtitle,
        type === "label" && styles.label,
        type === "roleLabel" && styles.roleLabel,
        type === "button" && styles.button,
        type === "link" && styles.link,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  body: {
    fontSize: 15,
    fontFamily: "Manrope_400Regular",
  },

  brandTitle: {
    fontSize: 36,
    fontFamily: "PlusJakartaSans_800ExtraBold",
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  brandSubtitle: {
    fontSize: 15,
    fontFamily: "Manrope_400Regular",
    textAlign: "center",
    maxWidth: 280,
  },

  label: {
    fontSize: 14,
    fontFamily: "Manrope_600SemiBold",
    marginLeft: 4,
    marginBottom: 2,
  },

  roleLabel: {
    fontSize: 12,
    fontFamily: "Manrope_600SemiBold",
  },

  button: {
    fontSize: 16,
    fontFamily: "Manrope_700Bold",
  },

  link: {
    fontSize: 14,
    fontFamily: "Manrope_600SemiBold",
  },
});
