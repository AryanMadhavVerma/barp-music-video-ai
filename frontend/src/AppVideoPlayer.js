import { useVideoPlayer, VideoView } from "expo-video";
import { useRef } from "react";
import { StyleSheet, View } from "react-native";

// v =
//   "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

export default function AppVideoPlayer({ uri }) {
  const ref = useRef(null);
  const player = useVideoPlayer(uri, (player) => {
    if (player.status === "readyToPlay") {
      player.loop = true;
      player.play();
    }
  });

  return (
    <View style={styles.contentContainer}>
      <VideoView
        ref={ref}
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  controlsContainer: {
    padding: 10,
  },
});
