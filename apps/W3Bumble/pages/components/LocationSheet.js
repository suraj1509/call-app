import React from "react";
import { Text, View } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useTheme } from "@react-navigation/native";
import { FONTS } from "../../../../app/constants/theme";
import { GlobalStyleSheet } from "../../../../app/constants/StyleSheet";
import CustomInput from "../../../../app/components/Input/CustomInput";
import GradientBtn from "./GradientBtn";

const LocationSheet = () => {
  const theme = useTheme();
  const { colors } = theme;

  return (
    <>
      <View
        style={{
          paddingHorizontal: 15,
          borderBottomWidth: 1,
          borderColor: colors.borderColor,
          paddingVertical: 12,
        }}>
        <Text style={{ ...FONTS.h5, color: colors.title }}>Location</Text>
      </View>
      <View style={GlobalStyleSheet.container}>
        <View style={{ marginBottom: 15 }}>
          <CustomInput
            icon={<FeatherIcon style={{ opacity: 0.6 }} name={"map-pin"} size={20} color={colors.text} />}
            value={"2300 Traverwood Dr.Ann Arbor, MI 48105 United States"}
            placeholder={"Emai"}
            onChangeText={(value) => null}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 15,
          }}>
          <GradientBtn title={"Save"} />
        </View>
      </View>
    </>
  );
};

export default LocationSheet;
