import { StyleSheet, View, Pressable, Text } from "react-native";
import { COLORS, ThemedText } from "@/shared";
import useAuth from "@/features/auth/hooks/useAuth";

export default function CoordinadorScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <ThemedText type="label">Bienvenido, Coordinador</ThemedText>
      <ThemedText type="body">{user?.username}</ThemedText>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
});
