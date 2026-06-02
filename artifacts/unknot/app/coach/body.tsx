import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams, useRouter } from "expo-router";
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

type IconName = React.ComponentProps<typeof Ionicons>["name"];

interface BodyContent {
  badge: string;
  headline: string;
  illustIcon: IconName;
  illustIcon2?: IconName;
  focus: Array<{ icon: IconName; text: string; subtitle?: string }>;
  thinkAbout: Array<{ icon: IconName; title: string; subtitle: string }>;
  progress: number;
}

const BODY_CONTENT: Record<number, BodyContent> = {
  1: {
    badge: "Body Paragraph 1",
    headline: "Introduce your point.",
    illustIcon: "thunderstorm",
    focus: [
      {
        icon: "shield-checkmark-outline",
        text: "Stronger storms and hurricanes are caused by climate change",
      },
      {
        icon: "sparkles-outline",
        text: "Add details that explain your point.",
        subtitle: "Use facts, examples, or specific details to help your reader understand.",
      },
    ],
    thinkAbout: [
      { icon: "rainy-outline", title: "What is my point?", subtitle: "State your main idea clearly in one or two sentences." },
      { icon: "search-outline", title: "Why is this true?", subtitle: "What facts or evidence support your point?" },
      { icon: "flag-outline", title: "How does it relate to the prompt?", subtitle: "Explain how your point connects to the essay question." },
    ],
    progress: 32,
  },
  2: {
    badge: "Body Paragraph 2",
    headline: "Explain why\nit matters.",
    illustIcon: "globe",
    illustIcon2: "people",
    focus: [
      {
        icon: "globe-outline",
        text: "Climate change affects people and communities",
      },
      {
        icon: "sparkles-outline",
        text: "Add details that show the impact.",
        subtitle: "Use facts, examples, or specific details to explain why this issue is important.",
      },
    ],
    thinkAbout: [
      { icon: "rainy-outline", title: "Who is affected?", subtitle: "Describe the people, places, or animals impacted." },
      { icon: "heart-outline", title: "What are the consequences?", subtitle: "What happens if this issue continues?" },
      { icon: "star-outline", title: "Why should we care?", subtitle: "Explain why this impact matters to everyone." },
    ],
    progress: 48,
  },
  3: {
    badge: "Body Paragraph 3",
    headline: "Provide an example.",
    illustIcon: "snow-outline",
    focus: [
      {
        icon: "paw-outline",
        text: "Animals are losing their habitats because of climate change",
      },
      {
        icon: "sparkles-outline",
        text: "Add details that support this example.",
        subtitle: "Use facts, examples, or specific details to strengthen your point.",
      },
    ],
    thinkAbout: [
      { icon: "partly-sunny-outline", title: "What's happening?", subtitle: "Describe the change and how it affects animal habitats." },
      { icon: "search-outline", title: "Give a real-life example.", subtitle: "Use a specific animal or place to show this is really happening." },
      { icon: "leaf-outline", title: "Why is this an example?", subtitle: "Explain how this example supports your overall point." },
    ],
    progress: 62,
  },
  4: {
    badge: "Body Paragraph 4",
    headline: "Suggest a solution.",
    illustIcon: "leaf",
    illustIcon2: "bulb-outline",
    focus: [
      {
        icon: "leaf-outline",
        text: "People and governments can reduce pollution",
      },
      {
        icon: "sparkles-outline",
        text: "Add details that show how solutions work.",
        subtitle: "Use facts, examples, or specific details to explain how we can make a difference.",
      },
    ],
    thinkAbout: [
      { icon: "people-outline", title: "What can we do?", subtitle: "List actions people, communities, or governments can take." },
      { icon: "bulb-outline", title: "How does it help?", subtitle: "Explain how these solutions reduce pollution or solve the problem." },
      { icon: "flag-outline", title: "Why is it the best choice?", subtitle: "Explain why these solutions are important and worth doing." },
    ],
    progress: 75,
  },
};

export default function BodyScreen() {
  const colors = useColors();
  const router = useRouter();
  const { step: stepParam } = useLocalSearchParams<{ step: string }>();
  const step = Math.min(Math.max(parseInt(stepParam || "1", 10), 1), 4);
  const content = BODY_CONTENT[step];

  const handleNext = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (step < 4) {
      router.push(`/coach/body?step=${step + 1}`);
    } else {
      router.push("/coach/conclusion");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      router.push(`/coach/body?step=${step - 1}`);
    } else {
      router.back();
    }
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <AppHeader onBack={handleBack} />
      <SectionHeader
        icon="document-text-outline"
        title="Body Paragraphs"
        progressLabel={`${step} of 4`}
        progress={content.progress}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.badge, { backgroundColor: colors.card }]}>
          <Text style={[styles.badgeText, { color: colors.primary }]}>{content.badge}</Text>
        </View>

        <View style={styles.heroRow}>
          <Text style={[styles.headline, { color: colors.text }]}>{content.headline}</Text>
          <View style={[styles.illustration, { backgroundColor: colors.card }]}>
            <Ionicons name={content.illustIcon} size={38} color={colors.primary} style={{ opacity: 0.8 }} />
            {content.illustIcon2 && (
              <View style={[styles.illustBadge, { backgroundColor: colors.accentLight }]}>
                <Ionicons name={content.illustIcon2} size={14} color={colors.accent} />
              </View>
            )}
          </View>
        </View>

        <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>Focus on this idea:</Text>
        <View style={[styles.focusCard, { backgroundColor: colors.background, borderColor: colors.border }]}>
          {content.focus.map((item, i) => (
            <View
              key={i}
              style={[
                styles.focusRow,
                i < content.focus.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
              ]}
            >
              <View style={[styles.focusIcon, { backgroundColor: colors.card }]}>
                <Ionicons name={item.icon} size={20} color={colors.primary} />
              </View>
              <View style={styles.focusText}>
                <Text style={[styles.focusTitle, { color: colors.text }]}>{item.text}</Text>
                {item.subtitle && (
                  <Text style={[styles.focusSub, { color: colors.mutedForeground }]}>{item.subtitle}</Text>
                )}
              </View>
            </View>
          ))}
        </View>

        <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>Think about:</Text>
        <View style={[styles.thinkCard, { backgroundColor: colors.background, borderColor: colors.border }]}>
          {content.thinkAbout.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.thinkRow,
                i < content.thinkAbout.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
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

      <CoachBottomNav
        onBack={handleBack}
        onNext={handleNext}
        nextLabel={step < 4 ? "Next paragraph" : "Write conclusion"}
      />
      <LandscapeDecor />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 14, paddingBottom: 12, gap: 14 },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  badgeText: { fontSize: 13, fontFamily: "Inter_600SemiBold" },
  heroRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  headline: {
    flex: 1,
    fontSize: 24,
    fontFamily: "Inter_700Bold",
    lineHeight: 32,
  },
  illustration: {
    width: 88,
    height: 88,
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
  sectionLabel: { fontSize: 14, fontFamily: "Inter_600SemiBold" },
  focusCard: {
    borderRadius: 18,
    borderWidth: 1,
    overflow: "hidden",
  },
  focusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 16,
  },
  focusIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  focusText: { flex: 1, gap: 3 },
  focusTitle: { fontSize: 14, fontFamily: "Inter_600SemiBold", lineHeight: 20 },
  focusSub: { fontSize: 12, fontFamily: "Inter_400Regular", lineHeight: 18 },
  thinkCard: {
    borderRadius: 18,
    borderWidth: 1,
    overflow: "hidden",
  },
  thinkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 16,
  },
  thinkIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  thinkText: { flex: 1, gap: 3 },
  thinkTitle: { fontSize: 14, fontFamily: "Inter_600SemiBold" },
  thinkSub: { fontSize: 12, fontFamily: "Inter_400Regular", lineHeight: 18 },
});
