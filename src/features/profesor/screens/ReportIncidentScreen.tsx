import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { useNavigation, type NavigationProp } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { COLORS } from "@/shared";

type IncidentType = "behavior" | "academic" | "citation";

type ProfesorStackParamList = {
  ProfesorHome: undefined;
  ReportIncident: undefined;
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

export default function ReportIncidentScreen() {
  const navigation = useNavigation<NavigationProp<ProfesorStackParamList>>();
  const [student, setStudent] = useState("");
  const [type, setType] = useState<IncidentType>("behavior");
  const [description, setDescription] = useState("");
  const [notifyParent, setNotifyParent] = useState(true);

  const handleSubmit = () => {
    console.log("Reporte enviado", {
      student,
      type,
      description,
      notifyParent,
    });
    navigation.goBack();
  };

  return (
    <View style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topBar}>
            <Pressable
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <MaterialIcons
                name="arrow-back"
                size={24}
                color={COLORS.onBackground}
              />
            </Pressable>
            <Text style={styles.screenTitle}>Reportar incidente</Text>
          </View>

          <Text style={styles.screenSubtitle}>
            Documenta el incidente con detalles claros y objetivos.
          </Text>

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
            <View style={styles.radioList}>
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
                  Envía una alerta formal al contacto principal.
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
            <Pressable
              style={styles.secondaryButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.secondaryButtonText}>Descartar</Text>
            </Pressable>
            <Pressable style={styles.primaryButton} onPress={handleSubmit}>
              <Text style={styles.primaryButtonText}>Enviar reporte</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.surfaceContainerLow,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.onBackground,
  },
  screenSubtitle: {
    fontSize: 15,
    color: COLORS.onSurfaceVariant,
    lineHeight: 22,
    marginBottom: 20,
  },
  section: {
    marginBottom: 18,
    padding: 18,
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
  radioList: {
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
