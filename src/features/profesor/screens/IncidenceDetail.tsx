/* eslint-disable prettier/prettier */
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";

import BackButton from "@/shared/components/BackButton";
import DataField from "@/shared/components/DataField";
import ThemedText from "@/shared/components/ThemedText";
import { COLORS } from "@/shared/constants/colors";

export default function IncidenceDetail() {
  const route = useRoute<any>();
  const incidence = route.params?.incident;

  if (!incidence) {
    return (
      <View style={styles.container}>
        <BackButton />
        <ThemedText type="brandTitle">Incidencia no encontrada</ThemedText>
      </View>
    );
  }

  const statusColor =
    incidence.status === "Leída" ? COLORS.secondary : COLORS.error;

  const date = new Date(incidence.timestamp);
  const timestamp = `${date.toLocaleDateString("es-PE")} - ${date.toLocaleTimeString(
    "es-PE",
    {
      hour: "2-digit",
      minute: "2-digit",
    },
  )}`;

  return (
    <View style={styles.container}>
      <BackButton />
      <ThemedText type="brandTitle" style={styles.pageTitle}>
        Detalle de incidencia
      </ThemedText>

      <View style={styles.card}>
        <View style={styles.statusRow}>
          <View style={[styles.statusTag, { backgroundColor: statusColor }]}>
            <ThemedText type="button" color="onPrimary">
              {incidence.status}
            </ThemedText>
          </View>
          <ThemedText type="label" style={styles.timestamp}>
            {timestamp}
          </ThemedText>
        </View>

        <ThemedText type="button" style={styles.title}>
          {incidence.title}
        </ThemedText>
        <ThemedText type="body" style={styles.description}>
          {incidence.description}
        </ThemedText>

        <View style={styles.metaRow}>
          <DataField label="Curso" value={incidence.course} />
          <DataField label="Alumno" value={incidence.student} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    paddingTop: 60,
  },
  pageTitle: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 18,
    padding: 18,
    gap: 16,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statusTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  timestamp: {
    color: COLORS.onSurfaceVariant,
  },
  title: {
    fontSize: 20,
    color: COLORS.onSurface,
  },
  description: {
    color: COLORS.onSurfaceVariant,
    lineHeight: 22,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
});
