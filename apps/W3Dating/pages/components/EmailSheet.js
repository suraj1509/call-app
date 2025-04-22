import React from "react";
import { Text, ToastAndroid, View } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "@react-navigation/native";
import { FONTS } from "../../../../app/constants/theme";
import { GlobalStyleSheet } from "../../../../app/constants/StyleSheet";
import CustomInput from "../../../../app/components/Input/CustomInput";
import GradientBtn from "./GradientBtn";
import * as services from "../../../../services/user";
import * as Actions from "../../../.././redux/Actions";
import { useDispatch, useSelector } from "react-redux";

const EmailSheet = ({ currentEmail, settingSheet, setEmailId }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState(currentEmail);
  const [isLoading, setIsLoading] = React.useState(false);
  const user = useSelector((state) => state.user.currentUser);

  const handleSavePress = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      ToastAndroid.show("Please enter a valid email address", ToastAndroid.SHORT);
      return;
    }
    setIsLoading(true);
    try {
      const res = await services?.updateUser({ email, profileStatusToAdd: ["email"] });
      if (res.statusCode === 400 && res.message === "Email already registered" && res.status === "error") {
        ToastAndroid.show("Email already registered", ToastAndroid.SHORT);
      } else {
        setEmailId(email);
        dispatch(Actions?.updateCurrentUserState({ email, profileStatus: [...user?.profileStatus, "email"] }));
        ToastAndroid.show("Updated email", ToastAndroid.SHORT);
      }
      setIsLoading(false);
      settingSheet?.current.close();
    } catch (error) {
      setIsLoading(false);
      ToastAndroid.show("Error updating email", ToastAndroid.SHORT);
    }
  };
  return (
    <>
      <View
        style={{
          paddingHorizontal: 15,
          borderBottomWidth: 1,
          borderColor: colors.borderColor,
          paddingVertical: 12,
        }}
      >
        <Text style={{ ...FONTS.h5, color: colors.title }}>Email Address</Text>
      </View>
      <View style={GlobalStyleSheet.container}>
        <View style={{ marginBottom: 15 }}>
          <CustomInput
            icon={<MaterialIcon style={{ opacity: 0.6 }} name={"email"} size={20} color={colors.text} />}
            value={email}
            placeholder={"Enter your email"}
            onChangeText={(value) => setEmail(value)}
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
    </>
  );
};

export default EmailSheet;
