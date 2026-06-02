import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { AppHeader } from "@/components/AppHeader";
import { CoachBottomNav } from "@/components/CoachBottomNav";
import { LandscapeDecor } from "@/components/LandscapeDecor";
import { SectionHeader } from "@/components/SectionHeader";
import { useColors } from "@/hooks/useColors";

const OPTIONS = [
  {
    icon: "bulb-outline" as const,
    title: "Start with a surprising fact",
    desc: "Share a statistic or surprising detail that grabs attention.",
  },
  {
    icon: "help-circle-outline" as const,
    title: "Ask a thought-provoking question",
    desc: "Make your reader curious and engage them from the start.",
  },
  {
    icon: "globe-outline" as const,
    title: "Connect it to real life",
    desc: "Show how climate change affects people, places, or the world around us.",
  },
];

export default function IntroductionScreen() {
  const colors = useColors();
  const router = useRouter();

  const handleNext = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push("/coach/body?step=1");
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <AppHeader />
      <SectionHeader
        icon="document-text-outline"
        title="Introduction"
        progressLabel="1 of 5"
        progress={15}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.badge, { backgroundColor: colors.card }]}>
          <Text style={[styles.badgeText, { color: colors.primary }]}>Introduction</Text>
        </View>

        <View style={styles.heroRow}>
          <View style={styles.heroText}>
            <Text style={[styles.headline, { color: colors.text }]}>
              Let's start your introduction.
            </Text>
            <Text style={[styles.heroSub, { color: colors.mutedForeground }]}>
              You don't need the perfect opening. Just begin with one interesting thought.
            </Text>
          </View>
          <View style={[styles.illustration, { backgroundColor: colors.card }]}>
            <Ionicons name="document-text" size={36} color={colors.border} />
            <View style={[styles.illustBadge, { backgroundColor: colors.accentLight }]}>
              <Ionicons name="pencil" size={14} color={colors.accent} />
            </View>
          </View>
        </View>

        <Text style={[styles.sectionLabel, { color: colors.primary }]}>
          Try one of these ways to begin:
        </Text>

        <View style={[styles.optionsCard, { backgroundColor: colors.background, borderColor: colors.border }]}>
          {OPTIONS.map((opt, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.optionRow,
                i < OPTIONS.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
              ]}
              activeOpacity={0.7}
              onPress={() => Haptics.selectionAsync()}
            >
              <View style={[styles.optIcon, { backgroundColor: colors.card }]}>
                <Ionicons name={opt.icon} size={20} color={colors.primary} />
              </View>
              <View style={styles.optText}>
                <Text style={[styles.optTitle, { color: colors.text }]}>{opt.title}</Text>
                <Text style={[styles.optDesc, { color: colors.mutedForeground }]}>{opt.desc}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={colors.primary} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <CoachBottomNav
        onBack={() => router.back()}
        onNext={handleNext}
        nextLabel="Great! Let's move on to your body paragraphs"
      />
      <LandscapeDecor />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 14, paddingBottom: 12, gap: 16 },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  badgeText: { fontSize: 13, fontFamily: "Inter_500Medium" },
  heroRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  heroText: { flex: 1, gap: 8 },
  headline: { fontSize: 22, fontFamily: "Inter_500Medium", lineHeight: 30 },
  heroSub: { fontSize: 14, fontFamily: "Inter_400Regular", lineHeight: 20 },
  illustration: {
    width: 90,
    height: 90,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  illustBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionLabel: { fontSize: 14, fontFamily: "Inter_500Medium" },
  optionsCard: {
    borderRadius: 18,
    borderWidth: 1,
    overflow: "hidden",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 16,
  },
  optIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  optText: { flex: 1, gap: 3 },
  optTitle: { fontSize: 14, fontFamily: "Inter_500Medium" },
  optDesc: { fontSize: 13, fontFamily: "Inter_400Regular", lineHeight: 18 },
});
