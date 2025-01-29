import { AuthProvider } from "./src/context/AuthContext";
import Navigation from "./src/navigation/Navigation";
import { useFonts } from "expo-font";

export default function App() {
  const [loaded] = useFonts({
    "TTNormsPro-Medium": require("./assets/fonts/TTNormsProRegular.otf"),
    "TTNormsPro-Bold": require("./assets/fonts/TTNormsProBold.otf"),
    "TTNormsPro-Regular": require("./assets/fonts/TTNormsProRegular.otf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
