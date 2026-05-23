/* eslint-disable prettier/prettier */
import React from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import ThemedText from "@/shared/components/ThemedText";
import { COLORS } from "@/shared/constants/colors";

export default function IncidenceDetail() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const incidence = route.params?.incident;

    if (!incidence) {
        return (
            <View style={styles.container}>
                <ThemedText type="brandTitle">Incidencia no encontrada</ThemedText>
                <Pressable
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Text style={styles.backButtonText}>{"<"}</Text>
                </Pressable>
            </View>
        );
    }

    const statusColor =
        incidence.status === "Leída" ? COLORS.secondary : COLORS.error;
    const timestamp = new Date(incidence.timestamp).toLocaleString("es-PE", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        
        <View style={styles.container}>
            <View style={styles.header}>
                <ThemedText type="brandTitle">Detalle de incidencia</ThemedText>
                
            </View>
            <Pressable
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Text style={styles.backButtonText}>{"<"}</Text>
                </Pressable>
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
                    <View style={styles.metaBlock}>
                        <ThemedText type="label">Curso</ThemedText>
                        <ThemedText type="body">{incidence.course}</ThemedText>
                    </View>
                    <View style={styles.metaBlock}>
                        <ThemedText type="label">Alumno</ThemedText>
                        <ThemedText type="body">{incidence.student}</ThemedText>
                    </View>
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
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 999,
    },
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
    metaBlock: {
        flex: 1,
        gap: 4,
    },
});
