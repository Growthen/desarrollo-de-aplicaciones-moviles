import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { COLORS } from "@/shared";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import api from "@/features/auth/services/auth";
import { StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Alert, Platform, KeyboardAvoidingView, ScrollView } from "react-native";

export default function EditarUsuarioScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  
  // Recibiremos los datos del usuario directamente al hacer clic en él
  const { user } = route.params || { user: {} };

  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [dni, setDni] = useState(user.dni || user.studentCode || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setDni(user.dni || "");
    }
  }, [user]);

const handleGuardar = async () => {
    try {
      setLoading(true);
      // Preparamos los datos tal como los espera tu backend
      const payload = {
        name: name,
        email: email,
        dni: dni,
        role: user.role
      };

      console.log("Enviando actualización...", payload);
      
      // 👇 CORREGIDO: Apunta a users y usa user.id 👇
      await api.put(`/api/users/coordinator/${user.id}`, payload);
      
      Alert.alert("¡Éxito!", "Los datos del usuario se actualizaron correctamente.");
      navigation.goBack(); // Regresa a la lista automáticamente
    } catch (error) {
      console.error("Error al actualizar:", error);
      Alert.alert("Error", "No se pudo actualizar el usuario. Revisa la consola.");
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = () => {
    Alert.alert(
      "Eliminar Usuario",
      `¿Estás seguro de que deseas eliminar a ${name}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sí, Eliminar", 
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              
              // 👇 CORREGIDO: Apunta a users y usa user.id 👇
              await api.delete(`/api/users/${user.id}`);
              
              Alert.alert("Eliminado", "El usuario ha sido dado de baja.");
              navigation.goBack();
            } catch (error) {
              console.error("Error al eliminar:", error);
              Alert.alert("Error", "No se pudo eliminar el usuario.");
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Usuario</Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <MaterialIcons name="person" size={48} color={COLORS.primary} />
            </View>
            <Text style={styles.userId}>ID: {user.id || "N/A"}</Text>
          </View>

<View style={styles.formContainer}>
            {/* Un solo campo para Nombre Completo */}
            <Text style={styles.label}>Nombre Completo</Text>
            <TextInput 
              style={styles.input} 
              value={name} 
              onChangeText={setName} 
              placeholder="Ej. Juan Pérez" 
              placeholderTextColor={COLORS.onSurfaceVariant} 
            />

            <Text style={styles.label}>Correo Electrónico</Text>
            <TextInput 
              style={styles.input} 
              value={email} 
              onChangeText={setEmail} 
              placeholder="correo@ejemplo.com" 
              keyboardType="email-address" 
              autoCapitalize="none" 
              placeholderTextColor={COLORS.onSurfaceVariant} 
            />

            <Text style={styles.label}>DNI</Text>
            <TextInput 
              style={styles.input} 
              value={dni} 
              onChangeText={setDni} 
              placeholder="Ej. 12345678" 
              keyboardType="numeric" 
              placeholderTextColor={COLORS.onSurfaceVariant} 
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleGuardar} disabled={loading}>
              <MaterialIcons name="save" size={24} color={COLORS.onPrimary} style={{ marginRight: 8 }} />
              <Text style={styles.saveButtonText}>{loading ? "Guardando..." : "Guardar Cambios"}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteButton} onPress={handleEliminar}>
              <MaterialIcons name="delete-outline" size={20} color={COLORS.error} style={{ marginRight: 8 }} />
              <Text style={styles.deleteButtonText}>Eliminar Usuario</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.surface },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: COLORS.surfaceContainerHigh },
  backButton: { padding: 8, borderRadius: 20 },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: COLORS.primary },
  scrollContent: { padding: 24 },
  avatarContainer: { alignItems: "center", marginBottom: 32 },
  avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: COLORS.secondaryContainer, justifyContent: "center", alignItems: "center", marginBottom: 12 },
  userId: { fontSize: 14, color: COLORS.onSurfaceVariant, fontWeight: "500" },
  formContainer: { backgroundColor: COLORS.surfaceContainerLowest, padding: 20, borderRadius: 16, shadowColor: COLORS.onSurface, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  label: { fontSize: 14, fontWeight: "600", color: COLORS.onSurface, marginBottom: 8, marginTop: 12 },
  input: { backgroundColor: COLORS.surfaceContainerLowest, borderWidth: 1, borderColor: COLORS.surfaceContainerHigh, borderRadius: 12, padding: 14, fontSize: 16, color: COLORS.onSurface, marginBottom: 8 },
  saveButton: { backgroundColor: COLORS.primary, flexDirection: "row", padding: 16, borderRadius: 12, alignItems: "center", justifyContent: "center", marginTop: 24, marginBottom: 16 },
  saveButtonText: { color: COLORS.onPrimary, fontSize: 16, fontWeight: "bold" },
  deleteButton: { flexDirection: "row", padding: 16, borderRadius: 12, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: COLORS.error },
  deleteButtonText: { color: COLORS.error, fontSize: 16, fontWeight: "bold" },
});