import React, { useState, useRef } from "react";
import {
  View,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Slider,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import LottieView from "lottie-react-native";
import {
  CustomHeadingText,
  CustomLightText,
  CustomText,
} from "./components/CustomText";
import { Audio, Video } from "expo-av";

export default function VideoUploadScreen({ handleOnUpload }) {
  const [video, setVideo] = useState(null);

  const animation = useRef(null);
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedUri, setRecordedUri] = useState(null);

  const recordingRef = useRef(null);

  const pickVideo = async () => {
    const MIN_VIDEO_LENGTH = 30;
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const { uri } = result.assets[0];

        const { size } = await FileSystem.getInfoAsync(uri);
        const videoDuration = size / 1024 / 1024; // Convert bytes to seconds (rough estimate)

        if (videoDuration < MIN_VIDEO_LENGTH) {
          alert("Video must be at least 30 seconds long.");
          return;
        }

        console.log("Video uploaded successfully");
        setVideo(uri);
      }
    } catch (error) {
      console.error("Error uploading video:", error);
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
        source={require("../assets/background.json")}
      />
      <View style={styles.greetingsWrapper}>
        <LottieView
          autoPlay
          loop
          ref={animation}
          style={{
            width: 200,
            height: 200,
          }}
          source={require("../assets/avatar1.json")}
        />
        <View style={styles.greetingsTextWrapper}>
          <CustomHeadingText>Hi, I'm BARP 👋🏻</CustomHeadingText>
          <View
            style={{
              display: "flex",
              gap: 2,
            }}
          >
            <CustomText>Your personal music video composer 🎛️</CustomText>

            <CustomLightText>
              PS - I can generate music videos for you just by using a video 🤯
            </CustomLightText>
          </View>
        </View>
      </View>

      <View>
        <View style={styles.buttonsWrapper}>
          <TouchableOpacity onPress={pickVideo} style={styles.button}>
            {!video ? (
              <Text style={styles.buttonText}>Upload video 📹</Text>
            ) : (
              <Text style={styles.buttonText}>Change video 📹</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.roundButton}
            title={isRecording ? "Stop Recording" : "Start Recording"}
            onPress={isRecording ? stopRecording : startRecording}
          >
            {isRecording ? (
              <LottieView
                autoPlay
                loop
                ref={animation}
                style={{
                  width: 30,
                  height: 30,
                }}
                source={require("../assets/recording.json")}
              />
            ) : (
              <Text style={styles.buttonText}>🎤</Text>
            )}
          </TouchableOpacity>
        </View>
        <CustomLightText
          style={{
            margin: 5,
            width: 200,
            textAlign: "center",
            alignSelf: "center",
          }}
        >
          Optionally you can record your voice as well for better tone-setting
        </CustomLightText>
      </View>
      <TouchableOpacity
        disabled={!video}
        onPress={() => {
          handleOnUpload(video, recordedUri);
        }}
        style={styles.primaryButton}
      >
        <Text style={styles.buttonText}>Generate music video {"  "}📀</Text>
      </TouchableOpacity>
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
    justifyContent: "space-between",
    paddingBottom: 20,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  roundButton: {
    backgroundColor: "#EDFF7B",

    aspectRatio: 1,

    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    height: 55,
    width: 55,
  },
  primaryButton: {
    textAlign: "center",
    backgroundColor: "#00CAD7",
    padding: 15,
    margin: 20,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
  },

  button: {
    backgroundColor: "#ccf0fa",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    color: "#161622",
    fontSize: 15,
    fontFamily: "NotoSans_800ExtraBold",
  },
  videoUri: {
    margin: 10,
    fontSize: 12,
    color: "#333",
  },
});
