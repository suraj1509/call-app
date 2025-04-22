import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { COLORS, FONTS } from "../constants/theme";

const MsgComponent = ({ item, sender }) => {
  const { colors } = useTheme();
  const theme = useTheme();

  const calculateTimeAgo = (createdAt) => {
    const now = new Date();
    const messageTime = new Date(createdAt);
    const diffInSeconds = Math.floor((now - messageTime) / 1000);

    if (diffInSeconds < 60) {
      return "just now";
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hr${diffInHours > 1 ? "s" : ""} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) {
      return "yesterday";
    }
    if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    }

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) {
      return `${diffInWeeks} week${diffInWeeks > 1 ? "s" : ""} ago`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
    }

    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
  };

  return (
    <>
      <View
        style={[
          {
            alignItems: "flex-start",
            marginRight: "25%",
            marginBottom: 15,
          },
          sender && {
            alignItems: "flex-end",
            marginLeft: "25%",
            marginRight: 0,
          },
        ]}
      >
        <View
          style={[
            {
              backgroundColor: theme.dark ? colors.background : "#eee",
              borderRadius: 8,
              paddingHorizontal: 15,
              paddingVertical: 12,
            },
            sender && {
              backgroundColor: COLORS.primary,
            },
          ]}
        >
          <Text
            style={[
              {
                ...FONTS.font,
                ...FONTS.fontMedium,
                color: colors.title,
              },
              sender && {
                color: COLORS.white,
              },
            ]}
          >
            {item?.text}
          </Text>
        </View>
        <Text style={{ ...FONTS.font, color: colors.textLight, marginTop: 4 }}>
          {item?.status === "offline" ? "sending.." : calculateTimeAgo(item?.createdAt)}
        </Text>
      </View>
    </>
  );
};

export default MsgComponent;
