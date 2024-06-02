import LottieView from "lottie-react-native";
import React, { useRef } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { CustomHeadingText, CustomText } from "./components/CustomText";

const Loader = () => {
  const animation = useRef(null);
  return (
    <View style={[styles.container]}>
      <LottieView
        autoPlay
        loop
        ref={animation}
        style={{
          width: 400,
          height: 400,
        }}
        source={require("../assets/avatar1.json")}
      />
      <CustomHeadingText>Loading...</CustomHeadingText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#161622",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  // horizontal: {
  //   flexDirection: "row",
  //   justifyContent: "space-around",
  //   padding: 10,
  // },
});

export default Loader;
