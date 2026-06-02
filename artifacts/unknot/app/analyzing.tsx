import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppHeader } from "@/components/AppHeader";
import { useColors } from "@/hooks/useColors";

const STEPS = [
  {
    id: 0,
    icon: "sparkles-outline" as const,
    title: "Reading screenshot",
    subtitle: "Extracting text and details...",
  },
  {
    id: 1,
    icon: "list-outline" as const,
    title: "Understanding instructions",
    subtitle: "Identifying requirements...",
  },
  {
    id: 2,
    icon: "flag-outline" as const,
    title: "Identifying key goals",
    subtitle: "Determining what success looks like...",
  },
  {
    id: 3,
    icon: "bar-chart-outline" as const,
    title: "Preparing a plan",
    subtitle: "Organizing the best way to help you...",
  },
];

function StepItem({ step, status }: { step: (typeof STEPS)[0]; status: "pending" | "active" | "done" }) {
  const colors = useColors();

  return (
    <View style={[styles.stepRow, { borderBottomColor: colors.border }]}>
      <View style={[styles.stepIcon, { backgroundColor: colors.card }]}>
        <Ionicons name={step.icon} size={18} color={colors.primary} />
      </View>
      <View style={styles.stepText}>
        <Text style={[styles.stepTitle, { color: colors.text }]}>{step.title}</Text>
        <Text style={[styles.stepSub, { color: colors.mutedForeground }]}>{step.subtitle}</Text>
      </View>
      <View style={styles.stepStatus}>
        {status === "done" && (
          <View style={[styles.checkCircle, { backgroundColor: colors.accentLight }]}>
            <Ionicons name="checkmark" size={14} color={colors.accent} />
          </View>
        )}
        {status === "active" && (
          <ActivityIndicator size="small" color={colors.primary} />
        )}
        {status === "pending" && (
          <View style={[styles.pendingCircle, { borderColor: colors.border }]} />
        )}
      </View>
    </View>
  );
}

export default function AnalyzingScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const botPad = Platform.OS === "web" ? 34 : insets.bottom;

  const [completedSteps, setCompletedSteps] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 4800,
      useNativeDriver: false,
    }).start();

    const t1 = setTimeout(() => setCompletedSteps(1), 1200);
    const t2 = setTimeout(() => setCompletedSteps(2), 2500);
    const t3 = setTimeout(() => setCompletedSteps(3), 3800);
    const t4 = setTimeout(() => {
      setCompletedSteps(4);
      setTimeout(() => router.replace("/plan"), 500);
    }, 4800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  const getStatus = (stepId: number): "pending" | "active" | "done" => {
    if (completedSteps > stepId) return "done";
    if (completedSteps === stepId) return "active";
    return "pending";
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <AppHeader showBack={false} />

      <View style={styles.titleRow}>
        <View style={[styles.titleIcon, { backgroundColor: colors.card }]}>
          <Ionicons name="document-text-outline" size={20} color={colors.primary} />
        </View>
        <Text style={[styles.title, { color: colors.text }]}>
          Analyzing Assignment
        </Text>
      </View>

      <View style={[styles.progressTrack, { backgroundColor: colors.card }]}>
        <Animated.View
          style={[styles.progressFill, { width: progressWidth, backgroundColor: colors.primary }]}
        />
      </View>

      <View style={styles.illustration}>
        <View style={[styles.illustrationCircle, { backgroundColor: colors.card }]}>
          <Ionicons name="document-text" size={56} color={colors.border} />
        </View>
        <View style={[styles.magGlass, { backgroundColor: colors.accentLight, borderColor: colors.accent }]}>
          <Ionicons name="sparkles" size={20} color={colors.accent} />
        </View>
      </View>

      <Text style={[styles.headline, { color: colors.text }]}>
        AI is analyzing your assignment...
      </Text>
      <Text style={[styles.subtext, { color: colors.mutedForeground }]}>
        We're reading the screenshot and extracting{"\n"}the title, instructions, and key goals.
      </Text>

      <View style={[styles.stepsCard, { backgroundColor: colors.background, borderColor: colors.border }]}>
        {STEPS.map((step) => (
          <StepItem key={step.id} step={step} status={getStatus(step.id)} />
        ))}
      </View>

      <View style={[styles.secRow, { marginBottom: botPad + 12 }]}>
        <Ionicons name="shield-checkmark-outline" size={14} color={colors.mutedForeground} />
        <Text style={[styles.secText, { color: colors.mutedForeground }]}>
          Your files and information are secure and private.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  titleIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: 18, fontFamily: "Inter_700Bold" },
  progressTrack: {
    height: 4,
    marginHorizontal: 20,
    borderRadius: 99,
    overflow: "hidden",
    marginBottom: 32,
  },
  progressFill: { height: 4, borderRadius: 99 },
  illustration: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    height: 120,
  },
  illustrationCircle: {
    width: 110,
    height: 110,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  magGlass: {
    position: "absolute",
    right: "30%",
    bottom: 4,
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  headline: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    textAlign: "center",
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  subtext: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  stepsCard: {
    marginHorizontal: 20,
    borderRadius: 18,
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: 16,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 16,
    borderBottomWidth: 1,
  },
  stepIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  stepText: { flex: 1 },
  stepTitle: { fontSize: 14, fontFamily: "Inter_600SemiBold", marginBottom: 2 },
  stepSub: { fontSize: 12, fontFamily: "Inter_400Regular" },
  stepStatus: { width: 28, alignItems: "center" },
  checkCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  pendingCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
  },
  secRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingTop: 4,
  },
  secText: { fontSize: 12, fontFamily: "Inter_400Regular" },
});
