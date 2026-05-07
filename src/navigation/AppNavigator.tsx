import { NavigationContainer } from "@react-navigation/native";

import MainTabsNavigator from "./MainTabsNavigator";
import AuthNavigator from "./AuthNavigator";

import useAuth from "@/features/auth/hooks/useAuth";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/shared/constants/colors";

export default function AppNavigator() {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.root} edges={["top", "bottom"]}>
        {user ? <MainTabsNavigator /> : <AuthNavigator />}
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
