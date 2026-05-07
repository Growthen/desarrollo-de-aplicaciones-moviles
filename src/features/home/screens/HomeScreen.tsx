import { Text, View } from "react-native";
import { useAuth } from "@/features/auth";

export default function HomeScreen() {
  const { user } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Hola, {user?.name || "usuario"}!</Text>
      <Text>Bienvenido a la pantalla de inicio.</Text>
    </View>
  );
}
