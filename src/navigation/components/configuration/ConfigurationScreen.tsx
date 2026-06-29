import { Alert, ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { COLORS, ThemedText } from "@/shared";
import ActionRow from "@/shared/components/ActionRow";
import BiometricSwitch from "@/shared/components/BiometricSwitch";
import DataField from "@/shared/components/DataField";
import useAuth from "@/features/auth/hooks/useAuth";
import type { AuthRole } from "@/features/auth/types/auth.types";
import type { ConfigurationStackParamList } from "../ConfigurationNavigator";
import { ObtenerUsuarioActual, ActualizarFotoPerfil } from "@/features/padre/services/User.service";

const ROLE_LABELS: Record<AuthRole, string> = {
  COORDINADOR: "Coordinador",
  PROFESOR: "Profesor",
  PADRE: "Padre de Familia",
};

export default function ConfigurationScreen() {
  const { user, logout } = useAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<ConfigurationStackParamList>>();

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loadingImage, setLoadingImage] = useState(false);

  useEffect(() => {
    async function loadUserData() {
      try {
        setLoadingImage(true);
        const userData = await ObtenerUsuarioActual();
        if (userData.imageUrl) {
          setImageUrl(userData.imageUrl);
        }
      } catch (err) {
        console.log("Error al cargar imagen del usuario:", err);
      } finally {
        setLoadingImage(false);
      }
    }
    loadUserData();
  }, []);

  const handleUpdatePhoto = () => {
    Alert.prompt(
      "Actualizar foto de perfil",
      "Introduce la URL de tu nueva foto de perfil:",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Guardar",
          onPress: async (url?: string) => {
            if (!url || url.trim() === "") {
              Alert.alert("Error", "La URL de la imagen es obligatoria");
              return;
            }
            try {
              setLoadingImage(true);
              const updatedUser = await ActualizarFotoPerfil(url);
              if (updatedUser.imageUrl) {
                setImageUrl(updatedUser.imageUrl);
              }
              Alert.alert("Éxito", "Foto de usuario actualizada correctamente");
            } catch (err) {
              console.log(err);
              Alert.alert("Error", "No se pudo actualizar la foto de perfil");
            } finally {
              setLoadingImage(false);
            }
          },
        },
      ],
      "plain-text",
      imageUrl || ""
    );
  };

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Section Header ── */}
        <View style={styles.sectionHeader}>
          <ThemedText type="label" color="primary" style={styles.sectionTag}>
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

        {/* ── Profile Image / Avatar Section ── */}
        <View style={styles.avatarSection}>
          <Pressable onPress={handleUpdatePhoto} style={styles.avatarWrapper}>
            {loadingImage ? (
              <ActivityIndicator size="large" color={COLORS.primary} />
            ) : imageUrl ? (
              <Image source={{ uri: imageUrl }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <MaterialIcons name="person" size={60} color={COLORS.outline} />
              </View>
            )}
            <View style={styles.editBadge}>
              <MaterialIcons name="edit" size={16} color={COLORS.onPrimary} />
            </View>
          </Pressable>
          <ThemedText type="body" color="outline" style={styles.avatarHint}>
            Presiona para cambiar foto de perfil
          </ThemedText>
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

          <View style={styles.personalFields}>
            <DataField label="Nombre" value={user?.name ?? "—"} />
            <DataField
              label="Código de Usuario"
              value={user?.username ?? "—"}
            />
            <DataField label="Correo Electrónico" value={user?.email ?? "—"} />
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
            onPress={() => navigation.navigate("PasswordRestore")}
          />

          <ActionRow
            icon="alternate-email"
            iconBgColor={`${COLORS.secondary}1A`}
            iconColor={COLORS.secondary}
            accentColor={COLORS.secondary}
            title="Actualizar Correo"
            subtitle="Mantén un medio de recuperación secundario"
            onPress={() => navigation.navigate("EmailRestore")}
          />

          <BiometricSwitch />
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
            <ThemedText type="button" color="onErrorContainer">
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

  /* ── Avatar Section ── */
  avatarSection: {
    alignItems: "center",
    marginBottom: 24,
    gap: 8,
  },
  avatarWrapper: {
    position: "relative",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.surfaceContainerLow,
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  editBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.surface,
  },
  avatarHint: {
    fontSize: 12,
    fontFamily: "Manrope_300Bold",
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
