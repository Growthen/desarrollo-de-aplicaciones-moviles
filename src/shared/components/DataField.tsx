import { StyleSheet, View } from "react-native";

import ThemedText from "./ThemedText";

export type DataFieldProps = {
  label: string;
  value: string;
};

export default function DataField({ label, value }: DataFieldProps) {
  return (
    <View style={styles.dataField}>
      <ThemedText
        type="roleLabel"
        color="onSurfaceVariant"
        style={styles.dataFieldLabel}
      >
        {label.toUpperCase()}
      </ThemedText>
      <ThemedText type="body" color="onSurface" style={styles.dataFieldValue}>
        {value}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  dataField: {
    gap: 4,
  },
  dataFieldLabel: {
    fontSize: 10,
    letterSpacing: 1,
    fontFamily: "Manrope_700Bold",
    opacity: 0.6,
  },
  dataFieldValue: {
    fontSize: 16,
    fontFamily: "Manrope_500Medium",
  },
});
