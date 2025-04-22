import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import FeatherIcon from "react-native-vector-icons/Feather";
import OTPTextInput from "react-native-otp-textinput";
import { GlobalStyleSheet } from "../../../app/constants/StyleSheet";
import { COLORS, FONTS } from "../../../app/constants/theme";
import GradientBtn from "./components/GradientBtn";
import auth from "@react-native-firebase/auth";
import authServices from "../../../services/auth";
import { getOnboardingScreen } from "./Index";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EnterCode = ({ navigation, route }) => {
  const { countryCode, phoneNumber } = route.params;
  const { colors } = useTheme();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOtpSubmit = async () => {
    try {
      if (otp.length !== 6) {
        ToastAndroid.show("Please enter a valid 6 digit otp", ToastAndroid.SHORT);
        return;
      }
      setIsLoading(true);
      const confirmationResult = await auth().signInWithPhoneNumber(`${countryCode}${phoneNumber}`);
      const { verificationId } = confirmationResult;
      const credential = await auth.PhoneAuthProvider.credential(verificationId, otp);
      const response = await auth().signInWithCredential(credential);
      if (response && response.user) {
        const idToken = await response.user.getIdToken();
        const res = await authServices.verifyToken({ idToken, phoneNumber, countryCode });
        if(res?.user?.isOnboardingCompleted === true){
          navigation.navigate("DrawerNavigation");
        }else{
          navigation.navigate("Form");
        }
        setIsLoading(false);
      } else {
        ToastAndroid.show("Verification failed. Please try again.", ToastAndroid.SHORT);
      }
    } catch (error) {
      setIsLoading(false);
      if (error.code === "auth/invalid-verification-code") {
        ToastAndroid.show(
          "Invalid OTP. Please check and enter the correct verification code again.",
          ToastAndroid.SHORT,
        );
      } else if (error.code === "auth/invalid-phone-number") {
        ToastAndroid.show("Authentication Error: Please enter a valid phone number", ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      }
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.cardBg,
      }}
    >
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : ""}>
        <View style={{ flex: 1 }}>
          <ScrollView>
            <View style={GlobalStyleSheet.container}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  height: 48,
                  width: 48,
                  borderRadius: 48,
                  backgroundColor: colors.bgLight,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 15,
                }}
              >
                <FeatherIcon size={26} color={colors.title} name={"chevron-left"} />
              </TouchableOpacity>
              <Text style={{ ...FONTS.h3, color: colors.title, marginBottom: 20 }}>Enter your code</Text>
              <View style={{ alignItems: "center", marginHorizontal: 50 }}>
                <OTPTextInput
                  tintColor={COLORS.primary}
                  textInputStyle={{
                    borderBottomWidth: 2,
                    color: colors.title,
                  }}
                  inputCount={6}
                  containerStyle={{}}
                  handleTextChange={(input) => setOtp(input)}
                />
              </View>
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            paddingHorizontal: 45,
            paddingVertical: 35,
          }}
        >
          <GradientBtn isLoading={isLoading} onPress={handleOtpSubmit} title={"Next"} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EnterCode;
