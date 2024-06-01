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
import { Audio } from "expo-av";

export default function VideoUploadScreen({ handleOnUpload }) {
  const [video, setVideo] = useState(null);

  const animation = useRef(null);
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedUri, setRecordedUri] = useState(null);

  const recordingRef = useRef(null);

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

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording...");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
      recordingRef.current = recording;
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    console.log("Stopping recording...");
    setRecording(undefined);
    setIsRecording(false);
    await recordingRef.current.stopAndUnloadAsync();
    const uri = recordingRef.current.getURI();
    setRecordedUri(uri);
    console.log("Recording stopped and stored at", uri);
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

        <Button
          title={isRecording ? "Stop Recording" : "Start Recording"}
          onPress={isRecording ? stopRecording : startRecording}
        />
        {/* {recordedUri && <Text>Recorded at: {recordedUri}</Text>} */}

        <TouchableOpacity
          onPress={() => {
            handleOnUpload(video, recordedUri);
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Generate your music video 📹</Text>
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
