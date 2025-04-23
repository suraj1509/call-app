import React from "react";
import { TouchableOpacity, Text, Platform, ActivityIndicator } from "react-native";
// import {Shadow} from "react-native-shadow-2";
import LinearGradient from "react-native-linear-gradient";
import { COLORS } from "../../../../app/constants/theme";

const GradientBtn = ({ title, onPress, isLoading, paddingHorizontal, height }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onPress && onPress()}>
      {/* <Shadow
        style={[
          {
            shadowColor: COLORS.primary,
            shadowOffset: {
              width: 0,
              height: 5,
            },
            width: '100%',
            shadowOpacity: 0.5,
            shadowRadius: 12,
          },
          Platform.OS === "ios" && {
            backgroundColor: COLORS.primary,
            borderRadius: 30,
          },
        ]}
      > */}
        <LinearGradient
          colors={["#f481a1", "#fb6d7d"]}
          style={{
            height: height ? height : 55,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: paddingHorizontal ? paddingHorizontal : 20,
            paddingVertical: 12,
            borderRadius: 30,
          }}
        >
          {isLoading ? (
            <ActivityIndicator size={"small"} color={"white"} />
          ) : (
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Poppins-Medium",
                color: COLORS.white,
                top: 1,
              }}
            >
              {title}
            </Text>
          )}
        </LinearGradient>
      {/* </Shadow> */}
    </TouchableOpacity>
  );
};

export default GradientBtn;
