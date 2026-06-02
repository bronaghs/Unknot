import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";

interface AppHeaderProps {
  showBack?: boolean;
  onBack?: () => void;
}

export function AppHeader({ showBack = true, onBack }: AppHeaderProps) {
  const router = useRouter();
  const colors = useColors();
  const insets = useSafeAreaInsets();

  const handleBack = onBack || (() => router.back());
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  return (
    <View
      style={[
        styles.container,
        { paddingTop: topPad + 8, backgroundColor: colors.background },
      ]}
    >
      {showBack ? (
        <TouchableOpacity
          onPress={handleBack}
          style={[styles.iconBtn, { backgroundColor: colors.card }]}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={20} color={colors.primary} />
        </TouchableOpacity>
      ) : (
        <View style={styles.iconBtn} />
      )}

      <View style={styles.logoRow}>
        <Image
          source={require("../assets/images/icon.png")}
          style={styles.logoIcon}
          resizeMode="contain"
        />
        <Text
          style={[styles.logoText, { color: colors.text }]}
        >
          <Text style={{ color: colors.text }}>Un</Text>
          <Text style={{ color: colors.accent }}>K</Text>
          <Text style={{ color: colors.text }}>not</Text>
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.iconBtn, { backgroundColor: colors.card }]}
        activeOpacity={0.7}
      >
        <Ionicons name="ellipsis-horizontal" size={20} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  logoIcon: {
    width: 46,
    height: 21,
  },
  logoText: {
    fontSize: 20,
    fontFamily: "Nunito_400Regular",
    letterSpacing: -0.3,
  },
});
