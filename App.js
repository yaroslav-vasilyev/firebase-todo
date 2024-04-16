import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Navigation from "./app/navigation/Navigation";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <SafeAreaProvider>
          <Navigation />
        </SafeAreaProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
