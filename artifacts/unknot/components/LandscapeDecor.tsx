import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function LandscapeDecor() {
  const insets = useSafeAreaInsets();
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  return (
    <View style={[styles.container, { paddingBottom: bottomPad }]}>
      <Ionicons
        name="leaf"
        size={38}
        color="#7B6DE0"
        style={[styles.icon, { left: 12, bottom: bottomPad + 14, transform: [{ rotate: "-30deg" }] }]}
      />
      <Ionicons
        name="leaf"
        size={24}
        color="#9B8DEA"
        style={[styles.icon, { left: 40, bottom: bottomPad + 6, transform: [{ rotate: "20deg" }] }]}
      />
      {[70, 110, 150, 190, 235, 275].map((left, i) => (
        <View
          key={i}
          style={[
            styles.stone,
            {
              left,
              bottom: bottomPad + 4 + (i % 3) * 3,
              width: 14 + (i % 3) * 6,
              height: 9 + (i % 3) * 3,
              opacity: 0.35 + i * 0.07,
            },
          ]}
        />
      ))}
      <Ionicons
        name="leaf"
        size={20}
        color="#4CAF50"
        style={[styles.icon, { right: 28, bottom: bottomPad + 18, transform: [{ rotate: "10deg" }] }]}
      />
      <Ionicons
        name="leaf"
        size={14}
        color="#66BB6A"
        style={[styles.icon, { right: 18, bottom: bottomPad + 10, transform: [{ rotate: "-20deg" }] }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 72,
    backgroundColor: "#EEEBFd",
    overflow: "hidden",
    position: "relative",
  },
  stone: {
    position: "absolute",
    backgroundColor: "#B8B0E8",
    borderRadius: 999,
  },
  icon: {
    position: "absolute",
  },
});
