import { NavigationContainer } from "@react-navigation/native";

import MainTabsNavigator from "./MainTabsNavigator";
import AuthNavigator from "./AuthNavigator";

import useAuth from "@/features/auth/hooks/useAuth";

export default function AppNavigator() {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      {user ? <MainTabsNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
