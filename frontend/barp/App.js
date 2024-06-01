import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import VideoUploadScreen from "./src/home";
import {
  NotoSans_200ExtraLight,
  NotoSans_500Medium,
  NotoSans_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/noto-sans";

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    NotoSans_800ExtraBold,
    NotoSans_500Medium,
    NotoSans_200ExtraLight,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return <VideoUploadScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
