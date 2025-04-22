import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants/theme";

const Button = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => props.onPress && props.onPress()}
      style={[
        {
          ...props.style,
          backgroundColor: props.color ? props.color : COLORS.primary,
          paddingHorizontal: 12,
          paddingVertical: 12,
          height: 50,
          flexDirection: "row",
          borderRadius: props.btnSquare ? 0 : props.btnRounded ? 30 : SIZES.radius,
          alignItems: "center",
          justifyContent: "center",
        },
      ]}
    >
      {!props.loader && (
        <Text
          numberOfLines={1}
          style={[
            {
              fontSize: props.fontSize ? 18 : 15,
              lineHeight: props.fontSize ? 26 : 20,
              ...FONTS.fontSemiBold,
              color: COLORS.white,
            },
            props.textColor && { color: props.textColor },
          ]}
        >
          {props.title}
        </Text>
      )}
      {props.loader && <ActivityIndicator size="small" color={COLORS.white} />}
    </TouchableOpacity>
  );
};

export default Button;
