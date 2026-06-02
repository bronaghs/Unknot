import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
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

type IconName = React.ComponentProps<typeof Ionicons>["name"];

const CHECKLIST: Array<{ icon: IconName; title: string; desc: string }> = [
  {
    icon: "flag-outline",
    title: "Introduction",
    desc: "Check if your introduction grabs attention and clearly states your main point.",
  },
  {
    icon: "document-text-outline",
    title: "Body Paragraphs",
    desc: "Check if each paragraph is clear, supported, and well organized.",
  },
  {
    icon: "flag",
    title: "Conclusion",
    desc: "Make sure your ending is strong and leaves a lasting impression.",
  },
  {
    icon: "bulb-outline",
    title: "Clarity & Flow",
    desc: "Read your essay and check that your ideas flow smoothly.",
  },
  {
    icon: "shield-checkmark-outline",
    title: "Grammar & Spelling",
    desc: "Look for any grammar, spelling, or punctuation mistakes.",
  },
  {
    icon: "flag-outline",
    title: "Impact",
    desc: "Does your essay answer the prompt and make your point clearly?",
  },
];

export default function ReviewScreen() {
  const colors = useColors();
  const router = useRouter();

  const handleFinish = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert(
      "Great work! 🎉",
      "You've completed your essay coaching session. Your essay is ready to submit!",
      [
        {
          text: "Start new assignment",
          onPress: () => router.replace("/upload"),
        },
        { text: "Done", style: "default" },
      ]
    );
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <AppHeader />
      <SectionHeader
        icon="document-text-outline"
        title="Final Review"
        progressLabel="Final Step"
        progress={100}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.badge, { backgroundColor: colors.card }]}>
          <Text style={[styles.badgeText, { color: colors.primary }]}>Review Your Essay</Text>
        </View>

        <View style={styles.heroRow}>
          <View style={styles.heroText}>
            <Text style={[styles.headline, { color: colors.text }]}>
              Let's polish your essay.
            </Text>
            <Text style={[styles.heroSub, { color: colors.mutedForeground }]}>
              Review each part to check clarity, flow, and impact.
            </Text>
          </View>
          <View style={[styles.illustration, { backgroundColor: colors.card }]}>
            <Ionicons name="clipboard" size={36} color={colors.border} />
            <View style={[styles.checkStack, { backgroundColor: colors.accentLight }]}>
              <Ionicons name="checkmark" size={12} color={colors.accent} />
            </View>
            <View style={[styles.magGlass, { backgroundColor: colors.primary }]}>
              <Ionicons name="search" size={14} color="#fff" />
            </View>
          </View>
        </View>

        <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>Review checklist:</Text>
        <View style={[styles.checklistCard, { backgroundColor: colors.background, borderColor: colors.border }]}>
          {CHECKLIST.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.checkRow,
                i < CHECKLIST.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
              ]}
              activeOpacity={0.7}
              onPress={() => Haptics.selectionAsync()}
            >
              <View style={[styles.checkIcon, { backgroundColor: colors.card }]}>
                <Ionicons name={item.icon} size={20} color={colors.primary} />
              </View>
              <View style={styles.checkText}>
                <Text style={[styles.checkTitle, { color: colors.text }]}>{item.title}</Text>
                <Text style={[styles.checkDesc, { color: colors.mutedForeground }]}>{item.desc}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={colors.primary} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <CoachBottomNav
        onBack={() => router.back()}
        onNext={handleFinish}
        nextLabel="Looks good! Finish"
      />
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
  heroSub: { fontSize: 14, fontFamily: "Inter_400Regular", lineHeight: 20 },
  illustration: {
    width: 90,
    height: 90,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  checkStack: {
    position: "absolute",
    top: 12,
    right: 10,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  magGlass: {
    position: "absolute",
    bottom: 10,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionLabel: { fontSize: 14, fontFamily: "Inter_500Medium" },
  checklistCard: { borderRadius: 18, borderWidth: 1, overflow: "hidden" },
  checkRow: { flexDirection: "row", alignItems: "center", gap: 14, padding: 16 },
  checkIcon: { width: 42, height: 42, borderRadius: 13, alignItems: "center", justifyContent: "center" },
  checkText: { flex: 1, gap: 3 },
  checkTitle: { fontSize: 14, fontFamily: "Inter_500Medium" },
  checkDesc: { fontSize: 12, fontFamily: "Inter_400Regular", lineHeight: 18 },
});
