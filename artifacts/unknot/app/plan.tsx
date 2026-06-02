import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppHeader } from "@/components/AppHeader";
import { LandscapeDecor } from "@/components/LandscapeDecor";
import { useColors } from "@/hooks/useColors";

const PLAN_STEPS = [
  {
    id: 1,
    icon: "search-outline" as const,
    title: "Understand the prompt",
    desc: "We'll make sure we understand exactly what you need to write.",
  },
  {
    id: 2,
    icon: "bulb-outline" as const,
    title: "Brainstorm ideas",
    desc: "We'll generate and explore ideas tailored to your topic.",
  },
  {
    id: 3,
    icon: "create-outline" as const,
    title: "Build your essay",
    desc: "We'll help you write a strong essay with a clear structure.",
    substeps: ["Introduction", "Body paragraphs", "Conclusion"],
  },
  {
    id: 4,
    icon: "sparkles-outline" as const,
    title: "Review & improve",
    desc: "We'll review your essay and help you make it even better.",
  },
];

export default function PlanScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const botPad = Platform.OS === "web" ? 34 : insets.bottom;

  const handleLetsGo = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push("/coach/introduction");
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <AppHeader />
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: botPad + 16 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.pageHeader}>
          <View style={[styles.titleIcon, { backgroundColor: colors.card }]}>
            <Ionicons name="clipboard-outline" size={22} color={colors.primary} />
          </View>
          <View style={styles.titleText}>
            <Text style={[styles.title, { color: colors.text }]}>Your plan</Text>
            <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
              We'll guide you step by step to write your best essay.
            </Text>
          </View>
        </View>

        <View style={[styles.planCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.planLabel, { color: colors.primary }]}>
            Here's your personalized plan
          </Text>
          {PLAN_STEPS.map((step, i) => (
            <View key={step.id} style={styles.stepWrapper}>
              <View style={styles.stepLeft}>
                <View style={[styles.stepNum, { borderColor: colors.border, backgroundColor: colors.background }]}>
                  <Text style={[styles.stepNumText, { color: colors.primary }]}>{step.id}</Text>
                </View>
                {i < PLAN_STEPS.length - 1 && (
                  <View style={[styles.connector, { backgroundColor: colors.border }]} />
                )}
              </View>
              <View style={styles.stepContent}>
                <View style={[styles.stepIconBox, { backgroundColor: colors.background, borderColor: colors.border }]}>
                  <Ionicons name={step.icon} size={20} color={colors.primary} />
                </View>
                <View style={styles.stepInfo}>
                  <Text style={[styles.stepTitle, { color: colors.text }]}>{step.title}</Text>
                  <Text style={[styles.stepDesc, { color: colors.mutedForeground }]}>{step.desc}</Text>
                  {step.substeps && (
                    <View style={styles.substepList}>
                      {step.substeps.map((s) => (
                        <View key={s} style={styles.substepRow}>
                          <View style={[styles.bullet, { backgroundColor: colors.primary }]} />
                          <Text style={[styles.substepText, { color: colors.mutedForeground }]}>{s}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.goBtn, { backgroundColor: colors.accentLight }]}
          onPress={handleLetsGo}
          activeOpacity={0.8}
        >
          <Ionicons name="pencil" size={18} color={colors.accent} />
          <Text style={[styles.goBtnText, { color: colors.accent }]}>Let's go</Text>
        </TouchableOpacity>

        <View style={styles.secRow}>
          <Ionicons name="lock-closed-outline" size={13} color={colors.mutedForeground} />
          <Text style={[styles.secText, { color: colors.mutedForeground }]}>
            Your data is secure and private.
          </Text>
        </View>
      </ScrollView>

      <LandscapeDecor />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  scroll: { paddingHorizontal: 20, gap: 16, paddingTop: 8 },
  pageHeader: { flexDirection: "row", gap: 14, alignItems: "flex-start" },
  titleIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  titleText: { flex: 1, gap: 4 },
  title: { fontSize: 22, fontFamily: "Inter_700Bold" },
  subtitle: { fontSize: 14, fontFamily: "Inter_400Regular", lineHeight: 20 },
  planCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    gap: 0,
  },
  planLabel: { fontSize: 14, fontFamily: "Inter_600SemiBold", marginBottom: 16 },
  stepWrapper: { flexDirection: "row", gap: 12 },
  stepLeft: { alignItems: "center", width: 28 },
  stepNum: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumText: { fontSize: 12, fontFamily: "Inter_700Bold" },
  connector: { flex: 1, width: 1.5, marginVertical: 4, minHeight: 20 },
  stepContent: {
    flex: 1,
    flexDirection: "row",
    gap: 12,
    paddingBottom: 20,
  },
  stepIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  stepInfo: { flex: 1, gap: 4 },
  stepTitle: { fontSize: 15, fontFamily: "Inter_600SemiBold" },
  stepDesc: { fontSize: 13, fontFamily: "Inter_400Regular", lineHeight: 18 },
  substepList: { gap: 4, marginTop: 4 },
  substepRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  bullet: { width: 5, height: 5, borderRadius: 3 },
  substepText: { fontSize: 13, fontFamily: "Inter_400Regular" },
  goBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 18,
    borderRadius: 18,
  },
  goBtnText: { fontSize: 17, fontFamily: "Inter_600SemiBold" },
  secRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingBottom: 4,
  },
  secText: { fontSize: 12, fontFamily: "Inter_400Regular" },
});
