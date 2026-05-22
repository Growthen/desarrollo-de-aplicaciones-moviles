import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { COLORS, ThemedText } from "@/shared";
import DataField from "@/shared/components/DataField";
import ActionRow from "@/shared/components/ActionRow";
import useAuth from "@/features/auth/hooks/useAuth";
import type { AuthRole } from "@/features/auth/types/auth.types";

const ROLE_LABELS: Record<AuthRole, string> = {
  COORDINADOR: "Coordinador",
  PROFESOR: "Profesor",
  PADRE: "Padre de Familia",
};

export default function ConfigurationNavigator() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Section Header ── */}
        <View style={styles.sectionHeader}>
          <ThemedText
            type="label"
            color="primary"
            style={styles.sectionTag}
          >
            CONFIGURACIÓN DE USUARIO
          </ThemedText>

          <ThemedText
            type="brandTitle"
            color="onSurface"
            style={styles.sectionTitle}
          >
            Configuración de Perfil
          </ThemedText>

          <View style={styles.accentBar} />
        </View>

        {/* ── Personal Info Card ── */}
        <View style={styles.personalCard}>
          <View style={styles.personalCardHeader}>
            <View style={styles.personalCardTitleRow}>
              <MaterialIcons
                name="person-pin"
                size={24}
                color={COLORS.secondary}
              />
              <ThemedText
                type="button"
                color="onSurface"
                style={styles.personalCardTitleText}
              >
                Datos Personales
              </ThemedText>
            </View>

            <View style={styles.readBadge}>
              <ThemedText
                type="roleLabel"
                color="onSecondaryFixed"
                style={styles.readBadgeText}
              >
                {user?.role ? ROLE_LABELS[user.role] : "Usuario"}
              </ThemedText>
            </View>
          </View>

          {/* ── TODO: Hacer que devuelva name ── */}
          <View style={styles.personalFields}>
            <DataField
              label="Nombre de Usuario"
              value={user?.username ?? "—"}
            />
            <DataField
              label="Código de Usuario"
              value={user?.username ?? "—"}
            />
            <DataField
              label="Correo Electrónico"
              value={user?.email ?? "—"}
            />
          </View>
        </View>

        {/* ── Account Actions ── */}
        <View style={styles.actionsSection}>
          <ThemedText
            type="button"
            color="onSurface"
            style={styles.actionsSectionTitle}
          >
            Acciones de Cuenta
          </ThemedText>

          <ActionRow
            icon="lock"
            iconBgColor={`${COLORS.primary}1A`}
            iconColor={COLORS.primary}
            accentColor={COLORS.primary}
            title="Actualizar Contraseña"
            subtitle="Protege tu cuenta con una credencial segura"
          />

          <ActionRow
            icon="alternate-email"
            iconBgColor={`${COLORS.secondary}1A`}
            iconColor={COLORS.secondary}
            accentColor={COLORS.secondary}
            title="Actualizar Correo"
            subtitle="Mantén un medio de recuperación secundario"
          />

          <ActionRow
            icon="fingerprint"
            iconBgColor={`${COLORS.tertiary}1A`}
            iconColor={COLORS.tertiary}
            accentColor={COLORS.tertiary}
            title="Biometría Digital"
            subtitle="Configura tu acceso seguro"
          />
        </View>

        {/* ── Logout Button ── */}
        <View style={styles.logoutContainer}>
          <Pressable
            onPress={logout}
            style={({ pressed }) => [
              styles.logoutButton,
              pressed && styles.logoutButtonPressed,
            ]}
          >
            <MaterialIcons
              name="logout"
              size={22}
              color={COLORS.onErrorContainer}
            />
            <ThemedText
              type="button"
              color="onErrorContainer"
            >
              Cerrar Sesión
            </ThemedText>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

/* ─── Styles ─────────────────────────────────────────────────────── */

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 48,
  },

  /* ── Section header ── */
  sectionHeader: {
    marginBottom: 32,
  },
  sectionTag: {
    fontSize: 11,
    letterSpacing: 2,
    fontFamily: "Manrope_700Bold",
    marginBottom: 8,
    marginLeft: 0,
  },
  sectionTitle: {
    fontSize: 32,
    lineHeight: 38,
    marginBottom: 12,
  },
  accentBar: {
    width: 96,
    height: 4,
    borderRadius: 9999,
    backgroundColor: COLORS.primary,
  },

  /* ── Personal data card ── */
  personalCard: {
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: 16,
    padding: 24,
    marginBottom: 28,
    gap: 24,
  },
  personalCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  personalCardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  personalCardTitleText: {
    fontSize: 18,
  },

  readBadge: {
    backgroundColor: COLORS.secondaryFixed,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  readBadgeText: {
    fontSize: 11,
    fontFamily: "Manrope_700Bold",
  },

  personalFields: {
    gap: 20,
  },

  /* ── Actions section ── */
  actionsSection: {
    gap: 12,
    marginBottom: 8,
  },
  actionsSectionTitle: {
    fontSize: 18,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },

  /* ── Logout ── */
  logoutContainer: {
    paddingTop: 40,
    paddingBottom: 16,
    alignItems: "center",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: COLORS.errorContainer,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 9999,
  },
  logoutButtonPressed: {
    backgroundColor: COLORS.error,
    transform: [{ scale: 0.95 }],
  },
});
