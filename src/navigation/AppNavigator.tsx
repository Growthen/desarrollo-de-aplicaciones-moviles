import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./AuthNavigator";
import PadreNavigator from "./PadreNavigator";
import AdminNavigator from "./AdminNavigator";
import ProfesorNavigator from "./ProfesorNavigator";

import useAuth from "@/features/auth/hooks/useAuth";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/shared/constants/colors";

/**
 * Retorna el navigator correspondiente según el rol del usuario.
 * TODO: Cuando se implemente auth real, el rol vendrá del backend.
 */
function RoleNavigator({ role }: { role: string }) {
  switch (role) {
    case "padre":
      return <PadreNavigator />;
    case "admin":
      return <AdminNavigator />;
    case "docente":
      return <ProfesorNavigator />;
    default:
      return <AuthNavigator />;
  }
}

export default function AppNavigator() {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.root} edges={["top", "bottom"]}>
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

