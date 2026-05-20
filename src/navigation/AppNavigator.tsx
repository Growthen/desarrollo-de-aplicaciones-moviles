import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./AuthNavigator";
import PadreNavigator from "./roles/PadreNavigator";
import CoordinadorNavigator from "./roles/CoordinadorNavigator";
import ProfesorNavigator from "./roles/ProfesorNavigator";

import useAuth from "@/features/auth/hooks/useAuth";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/shared/constants/colors";

function RoleNavigator({ role }: { role: string }) {
  switch (role) {
    case "PADRE":
      return <PadreNavigator />;
    case "COORDINADOR":
      return <CoordinadorNavigator />;
    case "PROFESOR":
      return <ProfesorNavigator />;
    default:
      return <AuthNavigator />;
  }
}

export default function AppNavigator() {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.root} edges={["top"]}>
        {user ? <RoleNavigator role={user.role} /> : <AuthNavigator />}
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
});
