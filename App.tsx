import { AppNavigator } from "@/navigation";
import AppProvider from "@/providers/AppProvider";

export default function App() {
  return (
    <AppProvider>
      <AppNavigator />
    </AppProvider>
  );
}
