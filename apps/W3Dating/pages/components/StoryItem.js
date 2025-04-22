import React from "react";
import { TouchableOpacity, Text, Image, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";
import { COLORS, FONTS } from "../../../../app/constants/theme";

const StoryItem = ({ title, image, id, storyItem, backgroundColor, age, address }) => {
  const navigation = useNavigation();

  const theme = useTheme();
  const { colors } = theme;

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() =>
        navigation.navigate("Status", {
          name: title,
          image: image,
          statusData: storyItem,
          age,
          address,
        })
      }
      style={{
        marginRight: 10,
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: 70,
            height: 70,
            borderRadius: 50,
            backgroundColor: COLORS.primary,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{
              height: 65,
              width: 65,
              borderRadius: 50,
              resizeMode: "cover",
            }}
            source={{ uri: image }}
          />
        </View>
      </View>
      <Text
        style={{
          ...FONTS.fontBold,
          fontSize: 14,
          color: backgroundColor ? (theme.dark ? colors.title : "#141414") : "#141414",
          textAlign: "center",
          marginTop: 5,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default StoryItem;
