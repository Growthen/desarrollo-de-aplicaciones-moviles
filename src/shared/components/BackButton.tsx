import { Pressable, StyleSheet, Text, type TextStyle, type ViewStyle } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { COLORS } from "../constants/colors";

type BackButtonProps = {
  label?: string;
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
};

export default function BackButton({
  label = "<",
  onPress,
  style,
  textStyle,
}: BackButtonProps) {
  const navigation = useNavigation<any>();

  return (
    <Pressable
      onPress={onPress ?? (() => navigation.goBack())}
      style={[styles.backButton, style]}
    >
      <Text style={[styles.backButtonText, textStyle]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  backButtonText: {
    fontSize: 28,
    color: COLORS.primary,
    fontFamily: "Manrope_700Bold",
  },
});
