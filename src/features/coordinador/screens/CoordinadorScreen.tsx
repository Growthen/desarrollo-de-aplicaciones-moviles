import { StyleSheet, View, TouchableOpacity } from "react-native";
import { COLORS, ThemedText } from "@/shared";
import useAuth from "@/features/auth/hooks/useAuth";

export default function CoordinadorScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <ThemedText type="label">Bienvenido, Coordinador</ThemedText>
      <ThemedText type="body">{user?.username}</ThemedText>
      <ThemedText type="link" onPress={logout}>
        Cerrar sesión
      </ThemedText>
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
