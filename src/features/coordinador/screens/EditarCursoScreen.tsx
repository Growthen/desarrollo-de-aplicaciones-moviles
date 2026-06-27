import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { COLORS } from "@/shared";
import api from "@/features/auth/services/auth";

export default function EditarCursoScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { curso } = route.params as any;

  // Estados
  const [nombre, setNombre] = useState(curso?.name || "");
  const [profesorId, setProfesorId] = useState(curso?.teacherId || ""); 
  const [profesores, setProfesores] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch profesores
const fetchProfesores = async () => {
    try {
      setLoading(true);
      
      const res = await api.get("/api/users"); 
      
      if (res.data?.data) {
        // Filtrar por rol profesor
        const soloProfesores = res.data.data.filter((u: any) => u.role === "PROFESOR");
        console.log("Profesores filtrados:", soloProfesores);
        setProfesores(soloProfesores);
        
        if (!profesorId && soloProfesores.length > 0) {
          setProfesorId(soloProfesores[0].id);
        }
      } else {
        console.warn("La respuesta del backend no trajo datos en el formato esperado (res.data.data)");
      }
    } catch (error) {
      console.error("Error en fetchProfesores:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfesores();
  }, []);

  // Actualizar curso
const handleGuardar = async () => {
    if (!nombre.trim()) {
      Alert.alert("Aviso", "El nombre del curso no puede estar vacío");
      return;
    }

    try {
      setSaving(true);
      
      // Preparación de payload
      const idsAlumnosActuales = (curso?.students || []).map((s: any) => s.id);

      const payload = {
        name: nombre,
        teacherId: profesorId,
        studentIds: idsAlumnosActuales
      };

      const response = await api.put(`/api/classes/${curso.id}`, payload); 

      Alert.alert("Éxito", "Curso actualizado correctamente");
      navigation.goBack();

    } catch (error: any) {
      console.error("Error al guardar curso:", error.response?.data || error);
      Alert.alert("Error", `No se pudo actualizar: ${error.response?.data?.message || 'Error interno'}`);
    } finally {
      setSaving(false);
    }
  };

  // Eliminar curso
  const handleEliminar = () => {
    Alert.alert(
      "Confirmar Eliminación",
      "¿Estás seguro de que deseas eliminar este curso?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(`/api/classes/${curso.id}`);
              Alert.alert("Éxito", "Curso eliminado");
              navigation.goBack();
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar el curso");
            }
          } 
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Editar Curso</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Nombre del Curso</Text>
        <TextInput 
          style={styles.input} 
          value={nombre} 
          onChangeText={setNombre} 
          placeholder="Ej: Matemáticas Avanzadas"
        />

        <Text style={styles.label}>Profesor Asignado</Text>
        <View style={styles.pickerContainer}>
          {loading ? (
            <ActivityIndicator size="small" color={COLORS.primary} style={{ padding: 15 }} />
          ) : (
            <Picker
              selectedValue={profesorId}
              onValueChange={(itemValue) => setProfesorId(itemValue)}
            >
              <Picker.Item label="Seleccione un profesor..." value="" />
              {profesores.map((p) => (
                <Picker.Item key={p.id} label={p.name} value={p.id} />
              ))}
            </Picker>
          )}
        </View>

        <TouchableOpacity 
          style={[styles.buttonSave, saving && { opacity: 0.7 }]} 
          onPress={handleGuardar}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Guardar Cambios</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonDelete} onPress={handleEliminar}>
          <Text style={styles.buttonText}>Eliminar Curso</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  header: { padding: 20, borderBottomWidth: 1, borderBottomColor: "#E0E0E0" },
  title: { fontSize: 24, fontWeight: "bold", color: COLORS.primary },
  form: { padding: 20 },
  label: { fontSize: 14, marginBottom: 8, color: "#333", fontWeight: "600" },
  input: { borderWidth: 1, borderColor: "#E0E0E0", borderRadius: 10, padding: 15, marginBottom: 20, backgroundColor: "#F9F9F9", fontSize: 16 },
  pickerContainer: { borderWidth: 1, borderColor: "#E0E0E0", borderRadius: 10, marginBottom: 20, backgroundColor: "#F9F9F9", overflow: 'hidden' },
  buttonSave: { backgroundColor: COLORS.primary, padding: 16, borderRadius: 10, alignItems: "center", marginBottom: 15 },
  buttonDelete: { backgroundColor: "#FF3B30", padding: 16, borderRadius: 10, alignItems: "center" },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
});