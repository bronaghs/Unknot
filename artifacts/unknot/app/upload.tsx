import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppHeader } from "@/components/AppHeader";
import { useColors } from "@/hooks/useColors";
import { useAssignment } from "@/context/AssignmentContext";

export default function UploadScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { setImageUri } = useAssignment();
  const [loading, setLoading] = useState(false);
  const botPad = Platform.OS === "web" ? 34 : insets.bottom;

  const handleTakePhoto = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (Platform.OS === "web") {
      router.push("/analyzing");
      return;
    }
    let cameraGranted = false;
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      cameraGranted = status === "granted";
    } catch {
      cameraGranted = false;
    }
    if (!cameraGranted) {
      try {
        const galleryResult = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: "images",
          quality: 0.8,
          base64: false,
        });
        if (!galleryResult.canceled && galleryResult.assets[0]) {
          setImageUri(galleryResult.assets[0].uri);
          router.push("/analyzing");
        }
      } catch {
        router.push("/analyzing");
      }
      return;
    }
    setLoading(true);
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: "images",
        quality: 0.8,
        base64: false,
      });
      if (!result.canceled && result.assets[0]) {
        setImageUri(result.assets[0].uri);
        router.push("/analyzing");
      }
    } catch {
      router.push("/analyzing");
    } finally {
      setLoading(false);
    }
  };

  const handleGallery = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (Platform.OS === "web") {
      router.push("/analyzing");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      quality: 0.8,
      base64: false,
    });
    if (!result.canceled && result.assets[0]) {
      setImageUri(result.assets[0].uri);
      router.push("/analyzing");
    }
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <AppHeader />
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: botPad + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.pageTitle}>
          <View style={[styles.titleIcon, { backgroundColor: colors.card }]}>
            <Ionicons name="image-outline" size={22} color={colors.primary} />
          </View>
          <Text style={[styles.title, { color: colors.text }]}>
            Upload Assignment
          </Text>
        </View>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
          Upload a clear photo of your assignment{"\n"}so UnKnot can start helping you.
        </Text>

        <View style={[styles.uploadCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.phoneIllustration}>
            <View style={[styles.phoneFrame, { backgroundColor: colors.background, borderColor: colors.border }]}>
              <Ionicons name="image" size={40} color={colors.border} />
              <View style={styles.docLines}>
                <View style={[styles.line, { backgroundColor: colors.border, width: 60 }]} />
                <View style={[styles.line, { backgroundColor: colors.border, width: 44 }]} />
                <View style={[styles.line, { backgroundColor: colors.border, width: 52 }]} />
              </View>
            </View>
            <Ionicons
              name="leaf"
              size={28}
              color="#4CAF50"
              style={{ position: "absolute", left: 10, bottom: 8 }}
            />
            <Ionicons
              name="leaf"
              size={22}
              color="#66BB6A"
              style={{ position: "absolute", right: 10, bottom: 8, transform: [{ scaleX: -1 }] }}
            />
          </View>

          <Text style={[styles.photoInstr, { color: colors.text }]}>
            Take a clear photo of your assignment.
          </Text>
          <Text style={[styles.photoSubInstr, { color: colors.mutedForeground }]}>
            Make sure all text is visible and in focus.
          </Text>

          <TouchableOpacity
            style={[styles.photoBtn, { backgroundColor: colors.accentLight }]}
            onPress={handleTakePhoto}
            activeOpacity={0.8}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={colors.accent} size="small" />
            ) : (
              <Ionicons name="camera-outline" size={20} color={colors.accent} />
            )}
            <Text style={[styles.photoBtnText, { color: colors.accent }]}>
              {loading ? "Opening camera..." : "Take Photo"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleGallery} activeOpacity={0.7} style={styles.galleryLink}>
            <Text style={[styles.galleryLinkText, { color: colors.mutedForeground }]}>
              or choose from gallery
            </Text>
          </TouchableOpacity>

          <View style={styles.securityNote}>
            <Ionicons name="lock-closed-outline" size={14} color={colors.mutedForeground} />
            <Text style={[styles.securityText, { color: colors.mutedForeground }]}>
              Your files and information are secure and private.
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.whyCard, { backgroundColor: colors.card, borderColor: colors.border }]}
          activeOpacity={0.8}
        >
          <View style={[styles.whyIcon, { backgroundColor: colors.background }]}>
            <Ionicons name="bulb-outline" size={20} color={colors.accent} />
          </View>
          <View style={styles.whyText}>
            <Text style={[styles.whyTitle, { color: colors.text }]}>Why a photo?</Text>
            <Text style={[styles.whyDesc, { color: colors.mutedForeground }]}>
              A clear photo helps UnKnot understand everything clearly.
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  scroll: { paddingHorizontal: 20, gap: 16, paddingTop: 8 },
  pageTitle: { flexDirection: "row", alignItems: "center", gap: 12 },
  titleIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: 22, fontFamily: "Inter_500Medium" },
  subtitle: { fontSize: 14, fontFamily: "Inter_400Regular", lineHeight: 20 },
  uploadCard: {
    borderRadius: 20,
    borderWidth: 1.5,
    borderStyle: "dashed",
    padding: 20,
    alignItems: "center",
    gap: 12,
  },
  phoneIllustration: {
    width: 160,
    height: 160,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  phoneFrame: {
    width: 90,
    height: 120,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 10,
  },
  docLines: { gap: 4, alignItems: "center" },
  line: { height: 3, borderRadius: 2 },
  photoInstr: { fontSize: 15, fontFamily: "Inter_500Medium", textAlign: "center" },
  photoSubInstr: { fontSize: 13, fontFamily: "Inter_400Regular", textAlign: "center" },
  photoBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 4,
  },
  photoBtnText: { fontSize: 16, fontFamily: "Inter_500Medium" },
  galleryLink: { paddingVertical: 4 },
  galleryLinkText: { fontSize: 13, fontFamily: "Inter_400Regular", textDecorationLine: "underline" },
  securityNote: { flexDirection: "row", alignItems: "center", gap: 6, paddingTop: 4 },
  securityText: { fontSize: 12, fontFamily: "Inter_400Regular" },
  whyCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  whyIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  whyText: { flex: 1, gap: 3 },
  whyTitle: { fontSize: 14, fontFamily: "Inter_500Medium" },
  whyDesc: { fontSize: 13, fontFamily: "Inter_400Regular", lineHeight: 18 },
});
