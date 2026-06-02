import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useColors } from "@/hooks/useColors";

interface CoachBottomNavProps {
  onBack: () => void;
  onNext: () => void;
  nextLabel: string;
}

export function CoachBottomNav({ onBack, onNext, nextLabel }: CoachBottomNavProps) {
  const colors = useColors();

  return (
    <View
      style={[
        styles.container,
        { borderTopColor: colors.border, backgroundColor: colors.background },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.backBtn,
          { borderColor: colors.border, backgroundColor: colors.card },
        ]}
        onPress={onBack}
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back" size={16} color={colors.primary} />
        <Text style={[styles.backText, { color: colors.primary }]}>Back</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.nextBtn, { backgroundColor: colors.accentLight }]}
        onPress={onNext}
        activeOpacity={0.7}
      >
        <Text
          style={[styles.nextText, { color: colors.accent }]}
          numberOfLines={2}
        >
          {nextLabel}
        </Text>
        <Ionicons name="arrow-forward" size={16} color={colors.accent} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  backText: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
  nextBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 14,
  },
  nextText: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
    flexShrink: 1,
  },
});
