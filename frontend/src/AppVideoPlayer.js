import { useEffect, useRef, useState } from "react";
import {
  PixelRatio,
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  Platform,
} from "react-native";

import { ResizeMode, Video } from "expo-av";
import * as FileSystem from "expo-file-system";
import { WebView } from "react-native-webview";
import LottieView from "lottie-react-native";
import { CustomHeadingText, CustomText } from "./components/CustomText";
import * as Permissions from "expo-permissions";
import { shareAsync } from "expo";

// v =
//   "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

export default function AppVideoPlayer({ uri }) {
  const VIDEO =
    "https://storage.googleapis.com/mayhem-hackathon/final_video.mp4";
  const ref = useRef(null);
  const animation = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [status, setStatus] = useState({});

  const [videoUri, setVideoUri] = useState(null);

  const [downloadProgress, setDownloadProgress] = useState(0);

  // const getDownloadPermissions = async () => {
  //   const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
  //   return status === "granted";
  // };

  const downloadVideo = async () => {
    // const hasPermission = await getDownloadPermissions();
    // if (!hasPermission) {
    //   alert("Permission to access media library is required!");
    //   return;
    // }

    const videoUrl =
      "https://storage.googleapis.com/mayhem-hackathon/final_video.mp4"; // Replace with your video URL
    const fileUri = FileSystem.documentDirectory + "video.mp4";

    const downloadResumable = FileSystem.createDownloadResumable(
      videoUrl,
      fileUri,
      {
        headers: {
          "ngrok-skip-browser-warning": "Skip",
        },
      },
      (downloadProgress) => {
        const progress =
          downloadProgress.totalBytesWritten /
          downloadProgress.totalBytesExpectedToWrite;
        setDownloadProgress(progress);
      }
    );

    console.log(downloadResumable);

    try {
      const { uri } = await downloadResumable.downloadAsync();

      await FileSystem.moveAsync({
        from: uri,
        to: `${FileSystem.documentDirectory}/video.mp4`,
      });
      alert("Video downloaded to: " + uri);
      setVideoUri(uri);
    } catch (e) {
      console.error(e);
    }
  };

  const download = async () => {
    const filename = "dummy.pdf";
    const result = await FileSystem.downloadAsync(
      VIDEO,
      FileSystem.documentDirectory + filename
    );

    // Log the download result
    console.log(result);

    // Save the downloaded file
    saveFile(result.uri, filename, result.headers["Content-Type"]);
  };

  const saveFile = async (uri, filename, mimetype) => {
    if (Platform.OS === "android") {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          filename,
          mimetype
        )
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, {
              encoding: FileSystem.EncodingType.Base64,
            });
          })
          .catch((e) => console.log(e));
      } else {
        shareAsync(uri);
      }
    } else {
      shareAsync(uri);
    }
  };
  // const player = useVideoPlayer(uri, (player) => {
  //   player.loop = true;
  //   player.play();
  // });

  // useEffect(() => {
  //   const subscription = player.addListener("playingChange", (isPlaying) => {
  //     setIsPlaying(isPlaying);
  //   });

  //   return () => {
  //     subscription.remove();
  //   };
  // }, [player]);
  // useEffect(async () => {
  //   try {
  //     const response = await fetch(
  //       "https://squirrel-active-quail.ngrok-free.app/test"
  //     );

  //     const result = await response.json();

  //     console.log(result);
  //   } catch (error) {
  //     console.error("Error uploading video:", error);
  //   } finally {
  //   }
  // }, []);
  // useEffect(() => {
  //   downloadVideo();
  // }, []);

  return (
    <View style={styles.contentContainer}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <LottieView
          autoPlay
          loop
          ref={animation}
          style={{
            width: 100,
            height: 100,
          }}
          source={require("../assets/avatar1.json")}
        />
        <CustomText>Here's your video</CustomText>
      </View>
      <Video
        ref={ref}
        style={styles.video}
        source={{
          uri: VIDEO,
          //uri: uri,
          // headers: {
          //   "X-Pinggy-No-Screen": "Skip",
          //   // "User-Agent": "Sometuibg",
          // },
        }}
        useNativeControls={true}
        resizeMode={ResizeMode.CONTAIN}
        // isLooping
        // onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      {/* <TouchableOpacity onPress={download}>
        <CustomText>Download</CustomText>
      </TouchableOpacity> */}
      {/* <iframe
        src="https://drive.google.com/file/d/13jvKA5enCP7gHr-3ftEuHJjPD6G9XpRL/preview"
        width="640"
        height="480"
        allow="autoplay"
      ></iframe> */}

      {/* <View
        style={{
          width: 400,
          height: (400 * 9) / 16,
          overflow: "hidden",
          backgroundColor: "red",
          display: "flex",
        }}
      >
        <WebView
          scalesPageToFit={true}
          style={{ height: 400, width: 400 }}
          source={{
            uri: "https://regular-adder-sadly.ngrok-free.app/static/final_video.mp4",
            headers: {
              "ngrok-skip-browser-warning": "Skip",
              "User-Agent": "Something",
            },
          }}
        />
      </View> */}

      {/* <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? "Pause" : "Play"}
          onPress={() =>
            status.isPlaying
              ? ref.current.pauseAsync()
              : ref.current.playAsync()
          }
        />
      </View> */}
      {/* <VideoPlayer
        videoProps={{
          shouldPlay: true,
          resizeMode: ResizeMode.CONTAIN,
          // ❗ source is required https://docs.expo.io/versions/latest/sdk/video/#props
          source: {
            uri: uri,
          },
        }}
      /> */}
      {/* <VideoView
        ref={ref}
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      /> */}
      {/* <View style={styles.controlsContainer}>
        <Button
          title={isPlaying ? "Pause" : "Play"}
          onPress={() => {
            if (isPlaying) {
              player.pause();
            } else {
              player.play();
            }
            setIsPlaying(!isPlaying);
          }}
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
    backgroundColor: "#161622",
  },
  video: {
    width: 350,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
});
