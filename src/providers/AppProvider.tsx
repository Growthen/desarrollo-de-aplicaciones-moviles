import AuthProvider from "@/context/auth/AuthProvider";
import { ReactNode } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

type Props = {
  children: ReactNode;
};

export default function AppProvider({ children }: Props) {
  return (
    <SafeAreaProvider>
      <AuthProvider>{children}</AuthProvider>
    </SafeAreaProvider>
  );
}
