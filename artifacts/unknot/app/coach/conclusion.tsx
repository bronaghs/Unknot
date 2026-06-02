import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
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

const FOCUS = [
  {
    icon: "shield-checkmark-outline" as const,
    text: "Reinforce your main point",
    subtitle: "Remind your reader of your argument in a new way.",
  },
  {
    icon: "sparkles-outline" as const,
    text: "End with impact",
    subtitle: "Leave your reader with a thought, solution, or call to action.",
  },
];

const THINK_ABOUT = [
  { icon: "flag-outline" as const, title: "What is my main point?", subtitle: "Restate your point in a fresh, clear way." },
  { icon: "person-outline" as const, title: "Why does it matter?", subtitle: "Remind the reader why this issue is important." },
  { icon: "flag" as const, title: "What do I want the reader to remember?", subtitle: "End with a lasting thought, solution, or call to action." },
];

export default function ConclusionScreen() {
  const colors = useColors();
  const router = useRouter();

  const handleNext = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push("/coach/review");
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <AppHeader />
      <SectionHeader
        icon="flag-outline"
        title="Conclusion"
        progressLabel="Final Step"
        progress={87}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.badge, { backgroundColor: colors.card }]}>
          <Text style={[styles.badgeText, { color: colors.primary }]}>Conclusion</Text>
        </View>

        <View style={styles.heroRow}>
          <View style={styles.heroText}>
            <Text style={[styles.headline, { color: colors.text }]}>
              Wrap it up and leave a lasting impression.
            </Text>
            <Text style={[styles.heroSub, { color: colors.mutedForeground }]}>
              Review your conclusion to ensure it reinforces your main point and stays with your reader.
            </Text>
          </View>
          <View style={[styles.illustration, { backgroundColor: colors.card }]}>
            <Image
              source={require("../../assets/images/mountain.png")}
              style={styles.mountImg}
              resizeMode="cover"
            />
          </View>
        </View>

        <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>Focus on this idea:</Text>
        <View style={[styles.focusCard, { backgroundColor: colors.background, borderColor: colors.border }]}>
          {FOCUS.map((item, i) => (
            <View
              key={i}
              style={[
                styles.focusRow,
                i < FOCUS.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
              ]}
            >
              <View style={[styles.focusIcon, { backgroundColor: colors.card }]}>
                <Ionicons name={item.icon} size={20} color={colors.primary} />
              </View>
              <View style={styles.focusText}>
                <Text style={[styles.focusTitle, { color: colors.text }]}>{item.text}</Text>
                <Text style={[styles.focusSub, { color: colors.mutedForeground }]}>{item.subtitle}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>Think about:</Text>
        <View style={[styles.thinkCard, { backgroundColor: colors.background, borderColor: colors.border }]}>
          {THINK_ABOUT.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.thinkRow,
                i < THINK_ABOUT.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
              ]}
              activeOpacity={0.7}
              onPress={() => Haptics.selectionAsync()}
            >
              <View style={[styles.thinkIcon, { backgroundColor: colors.card }]}>
                <Ionicons name={item.icon} size={20} color={colors.primary} />
              </View>
              <View style={styles.thinkText}>
                <Text style={[styles.thinkTitle, { color: colors.text }]}>{item.title}</Text>
                <Text style={[styles.thinkSub, { color: colors.mutedForeground }]}>{item.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={colors.primary} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <CoachBottomNav onBack={() => router.back()} onNext={handleNext} nextLabel="Review essay" />
      <LandscapeDecor />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 14, paddingBottom: 12, gap: 14 },
  badge: { alignSelf: "flex-start", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  badgeText: { fontSize: 13, fontFamily: "Inter_500Medium" },
  heroRow: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  heroText: { flex: 1, gap: 8 },
  headline: { fontSize: 22, fontFamily: "Inter_500Medium", lineHeight: 30 },
  heroSub: { fontSize: 13, fontFamily: "Inter_400Regular", lineHeight: 19 },
  illustration: { width: 90, height: 90, borderRadius: 20, overflow: "hidden" },
  mountImg: { width: "100%", height: "100%" },
  sectionLabel: { fontSize: 14, fontFamily: "Inter_500Medium" },
  focusCard: { borderRadius: 18, borderWidth: 1, overflow: "hidden" },
  focusRow: { flexDirection: "row", alignItems: "center", gap: 14, padding: 16 },
  focusIcon: { width: 42, height: 42, borderRadius: 13, alignItems: "center", justifyContent: "center" },
  focusText: { flex: 1, gap: 3 },
  focusTitle: { fontSize: 14, fontFamily: "Inter_500Medium", lineHeight: 20 },
  focusSub: { fontSize: 12, fontFamily: "Inter_400Regular", lineHeight: 18 },
  thinkCard: { borderRadius: 18, borderWidth: 1, overflow: "hidden" },
  thinkRow: { flexDirection: "row", alignItems: "center", gap: 14, padding: 16 },
  thinkIcon: { width: 42, height: 42, borderRadius: 13, alignItems: "center", justifyContent: "center" },
  thinkText: { flex: 1, gap: 3 },
  thinkTitle: { fontSize: 14, fontFamily: "Inter_500Medium" },
  thinkSub: { fontSize: 12, fontFamily: "Inter_400Regular", lineHeight: 18 },
});
