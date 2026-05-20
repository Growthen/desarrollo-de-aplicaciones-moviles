import { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { COLORS } from "@/shared";

type IncidentType = "behavior" | "academic" | "citation";

export type ReportIncidentPayload = {
  student: string;
  type: IncidentType;
  description: string;
  notifyParent: boolean;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (payload: ReportIncidentPayload) => void;
};

const incidentOptions: {
  key: IncidentType;
  title: string;
  description: string;
}[] = [
  {
    key: "behavior",
    title: "Conducta",
    description: "Disrupciones, conflictos entre pares o faltas de respeto.",
  },
  {
    key: "academic",
    title: "Académico",
    description: "Plagio, tareas faltantes o bajo rendimiento repentino.",
  },
  {
    key: "citation",
    title: "Citación",
    description: "Incumplimiento de normas de vestimenta o puntualidad.",
  },
];

export default function ReportIncidentPanel({
  visible,
  onClose,
  onSubmit,
}: Props) {
  const [student, setStudent] = useState("");
  const [type, setType] = useState<IncidentType>("behavior");
  const [description, setDescription] = useState("");
  const [notifyParent, setNotifyParent] = useState(true);

  const handleSubmit = () => {
    onSubmit({ student, type, description, notifyParent });
    setStudent("");
    setType("behavior");
    setDescription("");
    setNotifyParent(true);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.full}
        >
          <ScrollView
            contentContainerStyle={styles.modalContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.headerRow}>
              <View>
                <Text style={styles.modalTitle}>Reportar incidente</Text>
                <Text style={styles.modalSubtitle}>
                  Registra el suceso, el tipo y los pasos siguientes.
                </Text>
              </View>
              <Pressable style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </Pressable>
            </View>

            <View style={styles.section}>
              <View style={styles.stepHeader}>
                <Text style={styles.stepNumber}>1</Text>
                <Text style={styles.stepTitle}>Seleccionar estudiante</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Buscar nombre o ID"
                placeholderTextColor={COLORS.onSurfaceVariant}
                value={student}
                onChangeText={setStudent}
              />
            </View>

            <View style={styles.section}>
              <View style={styles.stepHeader}>
                <Text style={styles.stepNumber}>2</Text>
                <Text style={styles.stepTitle}>Tipo de incidente</Text>
              </View>
              <View style={styles.radioGrid}>
                {incidentOptions.map((option) => {
                  const selected = option.key === type;
                  return (
                    <Pressable
                      key={option.key}
                      style={[
                        styles.radioCard,
                        selected && styles.radioCardSelected,
                      ]}
                      onPress={() => setType(option.key)}
                    >
                      <View
                        style={[
                          styles.radioIcon,
                          selected && styles.radioIconSelected,
                        ]}
                      >
                        <Text
                          style={
                            selected
                              ? styles.radioIconTextSelected
                              : styles.radioIconText
                          }
                        >
                          {option.title.charAt(0)}
                        </Text>
                      </View>
                      <Text style={styles.radioTitle}>{option.title}</Text>
                      <Text style={styles.radioDescription}>
                        {option.description}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.stepHeader}>
                <Text style={styles.stepNumber}>3</Text>
                <Text style={styles.stepTitle}>Detalles del incidente</Text>
              </View>
              <TextInput
                style={[styles.input, styles.textarea]}
                placeholder="Describe objetivamente lo ocurrido..."
                placeholderTextColor={COLORS.onSurfaceVariant}
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={5}
              />
              <View style={styles.notifyRow}>
                <View>
                  <Text style={styles.notifyTitle}>Notificar a tutor</Text>
                  <Text style={styles.notifySubtitle}>
                    Enviar alerta formal al contacto principal.
                  </Text>
                </View>
                <Switch
                  value={notifyParent}
                  onValueChange={setNotifyParent}
                  trackColor={{
                    false: COLORS.surfaceVariant,
                    true: COLORS.primary,
                  }}
                  thumbColor={notifyParent ? COLORS.onPrimary : COLORS.surface}
                />
              </View>
            </View>

            <View style={styles.actionsRow}>
              <Pressable style={styles.secondaryButton} onPress={onClose}>
                <Text style={styles.secondaryButtonText}>Descartar</Text>
              </Pressable>
              <Pressable style={styles.primaryButton} onPress={handleSubmit}>
                <Text style={styles.primaryButtonText}>Enviar reporte</Text>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(29, 27, 23, 0.45)",
    justifyContent: "flex-end",
  },
  full: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
    paddingBottom: 34,
    minHeight: "80%",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 18,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.onBackground,
    marginBottom: 6,
  },
  modalSubtitle: {
    fontSize: 14,
    color: COLORS.onSurfaceVariant,
    lineHeight: 20,
  },
  closeButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: COLORS.surfaceContainerLow,
  },
  closeButtonText: {
    color: COLORS.onBackground,
    fontWeight: "700",
  },
  section: {
    marginBottom: 18,
    padding: 16,
    borderRadius: 24,
    backgroundColor: COLORS.surfaceContainerLow,
  },
  stepHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    color: COLORS.primary,
    fontWeight: "800",
    textAlign: "center",
    lineHeight: 32,
    marginRight: 12,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.onBackground,
  },
  input: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: COLORS.onBackground,
    fontSize: 15,
  },
  textarea: {
    minHeight: 120,
    textAlignVertical: "top",
  },
  radioGrid: {
    flexDirection: "column",
  },
  radioCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    marginBottom: 12,
  },
  radioCardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: "rgba(167, 51, 0, 0.08)",
  },
  radioIcon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  radioIconSelected: {
    backgroundColor: COLORS.primary,
  },
  radioIconText: {
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: 18,
  },
  radioIconTextSelected: {
    color: COLORS.onPrimary,
    fontWeight: "700",
    fontSize: 18,
  },
  radioTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.onBackground,
    marginBottom: 6,
  },
  radioDescription: {
    fontSize: 13,
    color: COLORS.onSurfaceVariant,
    lineHeight: 20,
  },
  notifyRow: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: COLORS.surfaceContainerLowest,
    padding: 16,
  },
  notifyTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.onBackground,
    marginBottom: 4,
  },
  notifySubtitle: {
    fontSize: 13,
    color: COLORS.onSurfaceVariant,
    lineHeight: 20,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 4,
  },
  secondaryButton: {
    flex: 1,
    minHeight: 52,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    backgroundColor: COLORS.surfaceContainerLowest,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  secondaryButtonText: {
    color: COLORS.onSurfaceVariant,
    fontWeight: "700",
  },
  primaryButton: {
    flex: 1,
    minHeight: 52,
    borderRadius: 999,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryButtonText: {
    color: COLORS.onPrimary,
    fontWeight: "700",
  },
});
