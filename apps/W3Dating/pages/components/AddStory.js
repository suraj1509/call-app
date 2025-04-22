import React from "react";
import { TouchableOpacity, Text, Image, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";
import { COLORS, FONTS, IMAGES } from "../../../../app/constants/theme";
import { useSelector } from "react-redux";
import FeatherIcon from "react-native-vector-icons/Feather";

const AddStory = () => {
  const navigation = useNavigation();
  const currentUserDisplayPic = useSelector((state) => state?.user?.currentUser?.profilePhoto);

  const theme = useTheme();
  // const { colors } = theme;

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => navigation.navigate("Stories")}
      style={{
        marginRight: 10,
      }}
    >
      <View
        style={{
          alignItems: "flex-end",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: 74,
            height: 74,
            borderRadius: 50,
            // backgroundColor: COLORS.primary,
            borderColor: theme?.dark ? COLORS.primary : COLORS.dark,
            borderWidth: 2.5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {currentUserDisplayPic && (
            <Image
              style={{
                height: 65,
                width: 65,
                borderRadius: 50,
                resizeMode: "cover",
              }}
              source={{ uri: currentUserDisplayPic }}
            />
          )}
        </View>
        <View
          style={{
            position: "absolute",
            right: 0.5,
            bottom: 0.5,
            backgroundColor: COLORS.primary,
            height: 24,
            width: 24,
            borderRadius: 12,
          }}
        >
          <FeatherIcon color={COLORS.white} size={24} name="plus-circle" />
        </View>
      </View>
      <Text
        style={{
          ...FONTS.fontBold,
          fontSize: 14,
          color: theme?.dark ? COLORS.light : COLORS.dark,
          textAlign: "center",
          marginTop: 5,
        }}
      >
        Your Story
      </Text>
    </TouchableOpacity>
  );
};

export default AddStory;
