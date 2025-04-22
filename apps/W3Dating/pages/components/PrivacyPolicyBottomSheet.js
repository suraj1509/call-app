import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { COLORS, FONTS } from "../../../../app/constants/theme";
import { GlobalStyleSheet } from "../../../../app/constants/StyleSheet";
import FeatherIcon from "react-native-vector-icons/Feather";

const PrivacyPolicyBottomSheet = ({ sheetRef }) => {
  const { colors } = useTheme();

  return (
    <>
      <View
        style={{
          paddingHorizontal: 15,
          borderBottomWidth: 1,
          borderColor: colors.borderColor,
          paddingVertical: 12,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ ...FONTS.h5, color: colors.title }}>Privacy Policy</Text>
        <TouchableOpacity onPress={() => sheetRef.current.close()}>
          <FeatherIcon color={colors.title} size={22} name={"x"} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={GlobalStyleSheet.container}>
          <Text style={{ color: colors.text }}>
            Welcome to W3 Dating! We value your privacy and are committed to protecting your personal data. This Privacy
            Policy explains how we collect, use, share, and safeguard your information when you use our app. By using W3
            Dating, you agree to the practices described in this Privacy Policy. If you do not agree, please discontinue
            using the app.
          </Text>
          <Text style={{ color: colors.text }}>
            Welcome to W3 Dating! We value your privacy and are committed to protecting your personal data. This Privacy
            Policy explains how we collect, use, share, and safeguard your information when you use our app. By using W3
            Dating, you agree to the practices described in this Privacy Policy. If you do not agree, please discontinue
            using the app.
          </Text>
          <Text style={{ color: colors.text }}>
            Welcome to W3 Dating! We value your privacy and are committed to protecting your personal data. This Privacy
            Policy explains how we collect, use, share, and safeguard your information when you use our app. By using W3
            Dating, you agree to the practices described in this Privacy Policy. If you do not agree, please discontinue
            using the app.
          </Text>
          <Text style={{ color: colors.text }}>
            Welcome to W3 Dating! We value your privacy and are committed to protecting your personal data. This Privacy
            Policy explains how we collect, use, share, and safeguard your information when you use our app. By using W3
            Dating, you agree to the practices described in this Privacy Policy. If you do not agree, please discontinue
            using the app.
          </Text>
        </View>
      </ScrollView>
    </>
  );
};

export default PrivacyPolicyBottomSheet;
