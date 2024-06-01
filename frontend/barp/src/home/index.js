import React, { useState, useRef } from "react";
import {
  View,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import LottieView from "lottie-react-native";
import {
  CustomHeadingText,
  CustomLightText,
  CustomText,
} from "../components/CustomText";

export default function VideoUploadScreen() {
  const [video, setVideo] = useState(null);
  const [uploading, setUploading] = useState(false);
  const animation = useRef(null);

  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setVideo(result.assets[0].uri);
    }
  };

  const uploadVideo = async () => {
    if (!video) return;

    setUploading(true);

    const uriParts = video.split(".");
    const fileType = uriParts[uriParts.length - 1];

    const formData = new FormData();
    formData.append("video", {
      uri: video,
      name: `video.${fileType}`,
      type: `video/${fileType}`,
    });

    try {
      const response = await fetch("YOUR_SERVER_URL/upload", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error uploading video:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        loop
        ref={animation}
        style={{
          width: 500,
          height: 400,
          position: "absolute",
          top: 0,
        }}
        source={require("./../../assets/background.json")}
      />
      <View style={styles.greetingsWrapper}>
        <LottieView
          autoPlay
          loop
          ref={animation}
          style={{
            width: 150,
            height: 150,
          }}
          source={require("./../../assets/avatar.json")}
        />
        <View style={styles.greetingsTextWrapper}>
          <CustomHeadingText>Hi! I'm BARP 👋🏻</CustomHeadingText>
          <View
            style={{
              display: "flex",
              gap: 2,
            }}
          >
            <CustomText>Your personal music video composer 🎛️</CustomText>

            <CustomText>
              I can generate music videos for you just by using a video 🤯
            </CustomText>
          </View>
        </View>
      </View>

      <View style={styles.buttonsWrapper}>
        <TouchableOpacity onPress={pickVideo} style={styles.button}>
          <Text style={styles.buttonText}>Upload your video 📹</Text>
        </TouchableOpacity>
      </View>
      {/* 
      {video && <Text style={styles.videoUri}>{video}</Text>}
      <TouchableOpacity
        onPress={uploadVideo}
        style={styles.button}
        disabled={uploading}
      >
        <Text style={styles.buttonText}>
          {uploading ? "Uploading..." : "Upload Video"}
        </Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#161622",
  },
  greetingsWrapper: {
    width: 50,
    display: "flex",
    width: "auto",
    alignItems: "flex-start",
    flexDirection: "column",
    paddingVertical: 90,
    paddingHorizontal: 20,
    gap: 20,
  },
  greetingsTextWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  buttonsWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  button: {
    backgroundColor: "#ccf0fa",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    margin: 10,
  },
  buttonText: {
    color: "#161622",
    fontSize: 16,
    fontFamily: "NotoSans_800ExtraBold",
  },
  videoUri: {
    margin: 10,
    fontSize: 12,
    color: "#333",
  },
});
