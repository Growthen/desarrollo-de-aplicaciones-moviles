import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/features/auth";

export default function HomeScreen() {
  const { user } = useAuth();
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Hola, {user?.name || "usuario"}!</Text>
      <Text>Bienvenido a la pantalla de inicio.</Text>
    </SafeAreaView>
  );
}
