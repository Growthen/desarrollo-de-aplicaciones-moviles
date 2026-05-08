import { Pressable, Text, View } from "react-native";
import { useAuth } from "@/features/auth";

export default function AdminScreen() {
  const { user, logout } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>⚙️ Pantalla del Admin</Text>
      <Text>Hola, {user?.name || "usuario"}!</Text>
      <Text style={{ color: "#888" }}>Rol: {user?.role}</Text>
      <Pressable
        onPress={logout}
        style={{
          marginTop: 20,
          backgroundColor: "#E53935",
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "600" }}>Cerrar Sesión</Text>
      </Pressable>
    </View>
  );
}

