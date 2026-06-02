import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { useColors } from "@/hooks/useColors";

interface SectionHeaderProps {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  title: string;
  progressLabel: string;
  progress: number;
}

export function SectionHeader({
  icon,
  title,
  progressLabel,
  progress,
}: SectionHeaderProps) {
  const colors = useColors();

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <View style={[styles.iconBox, { backgroundColor: colors.card }]}>
          <Ionicons name={icon} size={20} color={colors.primary} />
        </View>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.progressLabel, { color: colors.mutedForeground }]}>
          {progressLabel}
        </Text>
      </View>
      <View style={[styles.track, { backgroundColor: colors.card }]}>
        <View
          style={[
            styles.fill,
            { width: `${progress}%`, backgroundColor: colors.primary },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 4,
    gap: 10,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontFamily: "Inter_700Bold",
  },
  progressLabel: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
  },
  track: {
    height: 4,
    borderRadius: 99,
    overflow: "hidden",
  },
  fill: {
    height: 4,
    borderRadius: 99,
  },
});
