import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Navigation from "./app/navigation/Navigation";

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </PaperProvider>
  );
}
