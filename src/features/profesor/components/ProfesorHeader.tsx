import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "@/shared";

type Props = {
  name: string;
  classCount: number;
  incidentCount: number;
  onReport: () => void;
};

export default function ProfesorHeader({
  name,
  classCount,
  incidentCount,
  onReport,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Buenos días, {name}!</Text>
      <Text style={styles.subtitle}>
        Tienes {classCount} clases hoy y {incidentCount} incidentes recientes.
      </Text>
      <Pressable style={styles.button} onPress={onReport}>
        <Text style={styles.buttonText}>Reportar incidente</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    padding: 20,
    borderRadius: 24,
    backgroundColor: COLORS.surfaceContainerLow,
    shadowColor: COLORS.onSurface,
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.onBackground,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.onSurfaceVariant,
    lineHeight: 22,
    marginBottom: 18,
  },
  button: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 999,
  },
  buttonText: {
    color: COLORS.onPrimary,
    fontWeight: "700",
    fontSize: 15,
  },
});
