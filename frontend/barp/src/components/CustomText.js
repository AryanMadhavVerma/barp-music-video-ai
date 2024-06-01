import React from "react";
import { Text, StyleSheet } from "react-native";

export const CustomText = ({ style, children, ...props }) => {
  return (
    <Text style={[styles.defaultText, style]} {...props}>
      {children}
    </Text>
  );
};

export const CustomHeadingText = ({ style, children, ...props }) => {
  return (
    <Text style={[styles.headingText, style]} {...props}>
      {children}
    </Text>
  );
};

export const CustomLightText = ({ style, children, ...props }) => {
  return (
    <Text style={[styles.lightText, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: "NotoSans_500Medium", // Default font family
    fontSize: 16, // Default font size

    color: "#fefefe",
  },
  headingText: {
    fontFamily: "NotoSans_800ExtraBold", // Default font family
    fontSize: 30, // Default font size
    color: "#fefefe",
  },
  lightText: {
    fontFamily: "NotoSans_200ExtraLight", // Default font family
    fontSize: 14, // Default font size
    color: "#fefefe",
  },
});
