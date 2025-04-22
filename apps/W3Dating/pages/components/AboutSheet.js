import React from "react";
import { Text, ToastAndroid, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { COLORS, FONTS } from "../../../../app/constants/theme";
import { GlobalStyleSheet } from "../../../../app/constants/StyleSheet";
import CustomInput from "../../../../app/components/Input/CustomInput";
import GradientBtn from "./GradientBtn";
import * as Actions from "../../../../redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import RBSheet from "react-native-raw-bottom-sheet";
import FeatherIcon from "react-native-vector-icons/Feather";

const AboutSheet = ({ sheetRef }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state?.user?.currentUser);
  const [about, setAbout] = React.useState(currentUser?.about);
  const [isLoading, setIsLoading] = React.useState(false);
  const [maxCharacters, setMaxCharacters] = React.useState(150);

  const handleSavePress = async () => {
    if (about?.length <= 10) {
      ToastAndroid.show("Please enter something about yourself", ToastAndroid.SHORT);
      return;
    }
    setIsLoading(true);
    try {
      await dispatch(Actions?.updateCurrentUser({ about, profileStatusToAdd: ["about"] }));
      // ToastAndroid.show("Updated about info", ToastAndroid.SHORT);
      setIsLoading(false);
      setAbout(about);
      sheetRef?.current.close();
    } catch (error) {
      setIsLoading(false);
      ToastAndroid.show("Error updating about info", ToastAndroid.SHORT);
    }
  };
  return (
    <RBSheet
      ref={sheetRef}
      height={450}
      openDuration={100}
      closeOnDragDown={true}
      customStyles={{
        wrapper: {},
        container: {
          backgroundColor: colors.cardBg,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        },
        draggableIcon: {
          marginTop: 5,
          marginBottom: 0,
          height: 5,
          width: 90,
          backgroundColor: colors.borderColor,
        },
      }}
      closeOnPressBack
    >
      <View
        style={{
          paddingHorizontal: 15,
          borderBottomWidth: 1,
          borderColor: colors.borderColor,
          paddingVertical: 12,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ ...FONTS.h5, color: colors.title }}>About Me</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {about?.replace(/\s+/g, "").length >= maxCharacters && (
            <FeatherIcon color={"green"} size={22} name="check-circle" />
          )}
          {about?.replace(/\s+/g, "").length !== 0 && about?.replace(/\s+/g, "").length < maxCharacters && (
            <FeatherIcon color={COLORS.primary} size={22} name="x-circle" />
          )}
        </View>
      </View>
      <View style={GlobalStyleSheet.container}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 8 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Text style={{ ...FONTS.fontBold, color: COLORS.textLight }}>Characters Count</Text>
            <Text style={{ ...FONTS.fontBold, color: colors.title }}>
              {about?.replace(/\s+/g, "").length.toString().padStart(3, "0")}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Text style={{ ...FONTS.fontBold, color: COLORS.textLight }}>Max Characters</Text>
            <Text style={{ ...FONTS.fontBold, color: colors.title }}>{maxCharacters}</Text>
          </View>
        </View>
        <View style={{ marginBottom: 15 }}>
          <CustomInput
            // icon={<Entypo style={{ opacity: 0.6 }} name={"info"} size={20} color={colors.text} />}
            // icon={<FeatherIcon name="info" size={20} color={colors.text} style={{ opacity: 0.6 }} />}
            value={about}
            multiline
            placeholder={"Tell us something about yourself..."}
            onChangeText={(value) => setAbout(value)}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 15,
          }}
        >
          <GradientBtn title={"Save"} isLoading={isLoading} onPress={handleSavePress} />
        </View>
      </View>
    </RBSheet>
  );
};

export default AboutSheet;
