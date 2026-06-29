import {
  Alert,
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useEffect, useState } from "react";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { COLORS, ThemedText } from "@/shared";
import ActionRow from "@/shared/components/ActionRow";
import BiometricSwitch from "@/shared/components/BiometricSwitch";
import DataField from "@/shared/components/DataField";
import useAuth from "@/features/auth/hooks/useAuth";
import type { AuthRole } from "@/features/auth/types/auth.types";
import type { ConfigurationStackParamList } from "../ConfigurationNavigator";
import {
  ObtenerUsuarioActual,
  ActualizarFotoPerfil,
} from "@/features/padre/services/User.service";
import { uploadProfileImage } from "@/features/auth/services/supabaseStorage";

const ROLE_LABELS: Record<AuthRole, string> = {
  COORDINADOR: "Coordinador",
  PROFESOR: "Profesor",
  PADRE: "Padre de Familia",
};

type PickedAsset = {
  uri: string;
  mimeType?: string | null;
};

export default function ConfigurationScreen() {
  const { user, logout } = useAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<ConfigurationStackParamList>>();

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const [photoModalVisible, setPhotoModalVisible] = useState(false);
  const [pickedAsset, setPickedAsset] = useState<PickedAsset | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>("");

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

  const openPhotoModal = () => {
    setPickedAsset(null);
    setUploadStatus("");
    setPhotoModalVisible(true);
  };

  const closePhotoModal = () => {
    if (uploading) return;
    setPhotoModalVisible(false);
    setPickedAsset(null);
    setUploadStatus("");
  };

  const pickFromGallery = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          "Permiso requerido",
          "Necesitamos acceso a tu galería para cambiar la foto de perfil.",
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (result.canceled || !result.assets?.[0]) return;

      const asset = result.assets[0];
      setPickedAsset({
        uri: asset.uri,
        mimeType: asset.mimeType ?? null,
      });
    } catch (err) {
      console.log("Error al abrir galería:", err);
      Alert.alert("Error", "No se pudo abrir la galería");
    }
  };

  const pickFromCamera = async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          "Permiso requerido",
          "Necesitamos acceso a la cámara para tomar una foto de perfil.",
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (result.canceled || !result.assets?.[0]) return;

      const asset = result.assets[0];
      setPickedAsset({
        uri: asset.uri,
        mimeType: asset.mimeType ?? null,
      });
    } catch (err) {
      console.log("Error al abrir cámara:", err);
      Alert.alert("Error", "No se pudo abrir la cámara");
    }
  };

  const handleSavePhoto = async () => {
    if (!pickedAsset || !user?.id) {
      Alert.alert("Error", "Selecciona una imagen primero");
      return;
    }

    try {
      setUploading(true);

      setUploadStatus("Subiendo imagen...");
      const { publicUrl } = await uploadProfileImage({
        uri: pickedAsset.uri,
        mimeType: pickedAsset.mimeType,
        userId: user.id,
      });

      setUploadStatus("Guardando cambios...");
      const updatedUser = await ActualizarFotoPerfil(publicUrl);
      if (updatedUser.imageUrl) {
        setImageUrl(updatedUser.imageUrl);
      } else {
        setImageUrl(publicUrl);
      }

      setPhotoModalVisible(false);
      setPickedAsset(null);
      setUploadStatus("");
      Alert.alert("Éxito", "Foto de usuario actualizada correctamente");
    } catch (err: any) {
      console.log(err);
      Alert.alert(
        "Error",
        err?.message ?? "No se pudo actualizar la foto de perfil",
      );
    } finally {
      setUploading(false);
      setUploadStatus("");
    }
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
          <Pressable onPress={openPhotoModal} style={styles.avatarWrapper}>
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

      {/* ── Update Photo Modal ── */}
      <Modal
        visible={photoModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closePhotoModal}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <ThemedText
              type="button"
              color="onSurface"
              style={styles.modalTitle}
            >
              Actualizar foto de perfil
            </ThemedText>
            <ThemedText
              type="body"
              color="outline"
              style={styles.modalSubtitle}
            >
              Elige una imagen de tu galería o toma una foto.
            </ThemedText>

            <View style={styles.modalPreview}>
              {pickedAsset ? (
                <Image
                  source={{ uri: pickedAsset.uri }}
                  style={styles.modalPreviewImage}
                />
              ) : (
                <MaterialIcons
                  name="add-a-photo"
                  size={48}
                  color={COLORS.outline}
                />
              )}
            </View>

            <View style={styles.modalPickerRow}>
              <Pressable
                onPress={pickFromGallery}
                disabled={uploading}
                style={({ pressed }) => [
                  styles.pickerButton,
                  styles.pickerButtonSecondary,
                  pressed && styles.modalButtonPressed,
                  uploading && styles.modalButtonDisabled,
                ]}
              >
                <MaterialIcons
                  name="photo-library"
                  size={20}
                  color={COLORS.onSurface}
                />
                <ThemedText type="button" color="onSurface">
                  Galería
                </ThemedText>
              </Pressable>
              <Pressable
                onPress={pickFromCamera}
                disabled={uploading}
                style={({ pressed }) => [
                  styles.pickerButton,
                  styles.pickerButtonSecondary,
                  pressed && styles.modalButtonPressed,
                  uploading && styles.modalButtonDisabled,
                ]}
              >
                <MaterialIcons
                  name="photo-camera"
                  size={20}
                  color={COLORS.onSurface}
                />
                <ThemedText type="button" color="onSurface">
                  Cámara
                </ThemedText>
              </Pressable>
            </View>

            {uploadStatus ? (
              <ThemedText
                type="body"
                color="outline"
                style={styles.modalStatus}
              >
                {uploadStatus}
              </ThemedText>
            ) : null}

            <View style={styles.modalActions}>
              <Pressable
                onPress={closePhotoModal}
                disabled={uploading}
                style={({ pressed }) => [
                  styles.modalButton,
                  styles.modalButtonCancel,
                  pressed && styles.modalButtonPressed,
                  uploading && styles.modalButtonDisabled,
                ]}
              >
                <ThemedText type="button" color="onSurface">
                  Cancelar
                </ThemedText>
              </Pressable>
              <Pressable
                onPress={handleSavePhoto}
                disabled={uploading || !pickedAsset}
                style={({ pressed }) => [
                  styles.modalButton,
                  styles.modalButtonSave,
                  pressed && styles.modalButtonPressed,
                  (uploading || !pickedAsset) && styles.modalButtonDisabled,
                ]}
              >
                {uploading ? (
                  <ActivityIndicator size="small" color={COLORS.onPrimary} />
                ) : (
                  <ThemedText type="button" color="onPrimary">
                    Guardar
                  </ThemedText>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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

  /* ── Update Photo Modal ── */
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  modalCard: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 24,
    gap: 12,
  },
  modalTitle: {
    fontSize: 18,
  },
  modalSubtitle: {
    fontSize: 13,
  },
  modalPreview: {
    width: "100%",
    aspectRatio: 1,
    maxHeight: 220,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    backgroundColor: COLORS.surfaceContainerLow,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    alignSelf: "center",
  },
  modalPreviewImage: {
    width: "100%",
    height: "100%",
  },
  modalPickerRow: {
    flexDirection: "row",
    gap: 12,
  },
  pickerButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
  },
  pickerButtonSecondary: {
    backgroundColor: COLORS.surfaceContainerHigh,
  },
  modalStatus: {
    fontSize: 12,
    textAlign: "center",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 8,
  },
  modalButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 9999,
    minWidth: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  modalButtonCancel: {
    backgroundColor: COLORS.surfaceContainerHigh,
  },
  modalButtonSave: {
    backgroundColor: COLORS.primary,
  },
  modalButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  modalButtonDisabled: {
    opacity: 0.6,
  },
});
