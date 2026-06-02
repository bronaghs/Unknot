import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";

export default function OnboardingScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 0 : insets.top;
  const botPad = Platform.OS === "web" ? 0 : insets.bottom;

  const logoAnim = useRef(new Animated.Value(0)).current;
  const headlineAnim = useRef(new Animated.Value(0)).current;
  const mountainAnim = useRef(new Animated.Value(0)).current;
  const actionsAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(120, [
      Animated.timing(logoAnim, { toValue: 1, duration: 500, useNativeDriver: false }),
      Animated.timing(headlineAnim, { toValue: 1, duration: 500, useNativeDriver: false }),
      Animated.timing(mountainAnim, { toValue: 1, duration: 500, useNativeDriver: false }),
      Animated.timing(actionsAnim, { toValue: 1, duration: 500, useNativeDriver: false }),
    ]).start();
  }, []);

  const makeStyle = (anim: Animated.Value) => ({
    opacity: anim,
    transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) }],
  });

  const handleGetStarted = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push("/upload");
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={[styles.inner, { paddingTop: topPad + 32, paddingBottom: botPad + 24 }]}>

          <Animated.View style={[styles.logoArea, makeStyle(logoAnim)]}>
            <Image
              source={require("../assets/images/icon.png")}
              style={styles.logoIcon}
              resizeMode="contain"
            />
            <Text style={[styles.logoText, { color: colors.text, fontFamily: "Nunito_400Regular" }]}>
              <Text style={{ color: colors.text }}>Un</Text>
              <Text style={{ color: colors.accent }}>K</Text>
              <Text style={{ color: colors.text }}>not</Text>
            </Text>
            <Text style={[styles.logoTagline, { color: colors.mutedForeground, fontFamily: "Inter_600SemiBold" }]}>
              LET'S UNKNOT THIS
            </Text>
          </Animated.View>

          <Animated.View style={[styles.headlineArea, makeStyle(headlineAnim)]}>
            <Text style={[styles.headline, { color: colors.text, fontFamily: "Inter_400Regular" }]}>
              Clarity in every step.{"\n"}Confidence in every assignment.
            </Text>
            <Text style={[styles.subtext, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              A calm academic coach that helps{"\n"}you start, organize, and move forward.
            </Text>
          </Animated.View>

          <Animated.View style={[styles.mountainContainer, { backgroundColor: colors.card }, makeStyle(mountainAnim)]}>
            <Image
              source={require("../assets/images/mountain.png")}
              style={styles.mountain}
              resizeMode="cover"
            />
            <View style={styles.sparkleLeft}>
              <Ionicons name="sparkles" size={18} color={colors.primary} style={{ opacity: 0.5 }} />
            </View>
            <View style={styles.sparkleRight}>
              <Ionicons name="star" size={12} color={colors.accent} style={{ opacity: 0.7 }} />
            </View>
          </Animated.View>

          <Animated.View style={[styles.actions, makeStyle(actionsAnim)]}>
            <TouchableOpacity
              style={[styles.ctaBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={handleGetStarted}
              activeOpacity={0.8}
            >
              <Text style={[styles.ctaText, { color: colors.primary, fontFamily: "Inter_600SemiBold" }]}>
                Let's get started
              </Text>
              <Ionicons name="arrow-forward" size={18} color={colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() => router.push("/upload")}
              activeOpacity={0.7}
            >
              <Text style={[styles.secondaryText, { color: colors.primary, fontFamily: "Inter_500Medium" }]}>
                I already have an account
              </Text>
            </TouchableOpacity>
          </Animated.View>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  inner: {
    paddingHorizontal: 24,
    alignItems: "center",
  },
  logoArea: {
    alignItems: "center",
    marginBottom: 24,
  },
  logoIcon: {
    width: 160,
    height: 73,
    marginBottom: 8,
  },
  logoText: {
    fontSize: 32,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  logoTagline: {
    fontSize: 11,
    letterSpacing: 2.5,
  },
  headlineArea: {
    alignItems: "center",
    marginBottom: 24,
  },
  headline: {
    fontSize: 20,
    textAlign: "center",
    lineHeight: 28,
    letterSpacing: -0.2,
    marginBottom: 12,
  },
  subtext: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
  },
  mountainContainer: {
    width: "100%",
    height: 240,
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 20,
  },
  mountain: {
    width: "100%",
    height: "100%",
  },
  sparkleLeft: {
    position: "absolute",
    top: 12,
    left: 14,
  },
  sparkleRight: {
    position: "absolute",
    top: 8,
    right: 16,
  },
  actions: {
    width: "100%",
    alignItems: "stretch",
  },
  ctaBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 14,
  },
  ctaText: {
    fontSize: 16,
    marginRight: 8,
  },
  secondaryBtn: {
    alignItems: "center",
    paddingVertical: 6,
  },
  secondaryText: {
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
