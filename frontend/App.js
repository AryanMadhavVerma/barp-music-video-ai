import {
  NotoSans_200ExtraLight,
  NotoSans_500Medium,
  NotoSans_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/noto-sans";
import * as FileSystem from "expo-file-system";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import AppVideoPlayer from "./src/AppVideoPlayer";
import VideoUploadScreen from "./src/Home";
import Loader from "./src/Loader";
import { registerRootComponent } from "expo";
import * as Permissions from "expo-permissions";

export default function App() {
  const [uploading, setUploading] = useState(false);
  const [generatedSongURL, setGeneratedSongURL] = useState(null);
  let [fontsLoaded, fontError] = useFonts({
    NotoSans_800ExtraBold,
    NotoSans_500Medium,
    NotoSans_200ExtraLight,
  });

  print(generatedSongURL);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const readFile = async (fileUri) => {
    try {
      const fileData = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      return fileData;
    } catch (error) {
      console.error("Error reading file:", error);
      return null;
    }
  };

  const uploadVideoAudio = async (videouri, audiouri) => {
    if (!videouri || !audiouri) return;

    setUploading(true);

    const videoFileData = await readFile(videouri);
    const audioFileData = await readFile(audiouri);

    const formData = new FormData();

    console.log(videouri);
    formData.append("video_file", {
      uri: videouri,
      name: "video.mp4",
      type: "video/mp4",
      data: videoFileData,
    });

    formData.append("audio_file", {
      uri: audiouri,
      name: "audio.mp3",
      type: "audio/mpeg",
      data: audioFileData,
    });

    console.log("Sending the Result to the server...");

    try {
      const response = await fetch(
        "https://regular-adder-sadly.ngrok-free.app/predict",
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const result = await response.json();
      setGeneratedSongURL(result.final_video);
      console.log(result);
    } catch (error) {
      console.error("Error uploading video:", error);
    } finally {
      setUploading(false);
    }
  };

  if (uploading) {
    return <Loader />;
  }

  if (generatedSongURL) {
    return <AppVideoPlayer uri={generatedSongURL} />;
  }

  return <VideoUploadScreen handleOnUpload={uploadVideoAudio} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
