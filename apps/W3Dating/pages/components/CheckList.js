import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { COLORS, FONTS, SIZES } from "../../../../app/constants/theme";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const CheckList = ({ item, checked, onPress, dropdown = false }) => {
  const { colors } = useTheme();

  return (
    <>
      <TouchableOpacity
        onPress={() => onPress()}
        style={[
          {
            borderWidth: 1,
            marginBottom: 14,
            borderColor: colors.borderColor,
            paddingHorizontal: 15,
            paddingVertical: 14,
            borderRadius: SIZES.radius,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.cardBg,
          },
          checked && !dropdown && {
            borderColor: COLORS.primary,
            backgroundColor: colors.cardBg,
          },
        ]}
      >
        <Text
          style={{
            ...FONTS.font,
            ...FONTS.fontSemiBold,
            color: colors.text,
            fontSize: 16,
            top: 1,
            flex: 1,
          }}
        >
          {item}
        </Text>
        {(dropdown === false) ?  (<View
          style={[
            {
              height: 16,
              width: 16,
              borderWidth: 1.5,
              borderRadius: 16,
              borderColor: colors.borderColor,
              marginLeft: 10,
              alignItems: "center",
              justifyContent: "center",
            },
            checked && {
              borderColor: COLORS.primary,
            },
          ]}
        >
          {checked && (
            <View
              style={{
                height: 8,
                width: 8,
                borderRadius: 8,
                backgroundColor: COLORS.primary,
              }}
            />
          )}
        </View>) :
        (<View
          style={[
            {
              // height: 16,
              // width: 16,
              // borderWidth: 1.5,
              borderRadius: 10,
              // borderColor: colors.borderColor,
              marginLeft: 10,
              alignItems: "center",
              justifyContent: "center",
            }
          ]}
        >
          <MaterialIcons size={24} color={colors.title} name="arrow-drop-down"  />
        </View>)}
      </TouchableOpacity>
    </>
  );
};

export default CheckList;
