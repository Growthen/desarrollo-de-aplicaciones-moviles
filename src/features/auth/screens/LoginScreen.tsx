import { Button, Text, View } from "react-native";

import useAuth from "../hooks/useAuth";

export default function LoginScreen() {
  const { login } = useAuth();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Login Screen</Text>

      <Button title="Iniciar sesión" onPress={login} />
    </View>
  );
}
