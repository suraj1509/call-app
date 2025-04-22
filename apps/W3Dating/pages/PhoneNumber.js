import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { GlobalStyleSheet } from "../../../app/constants/StyleSheet";
import { FONTS, SIZES } from "../../../app/constants/theme";
import GradientBtn from "./components/GradientBtn";
import { CountryPicker } from "react-native-country-codes-picker";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const PhoneNumber = ({ navigation }) => {
  const theme = useTheme();
  const { colors } = theme;

  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  const validatePhoneNumber = (fullPhoneNumber) => {
    const parsedPhoneNumber = parsePhoneNumberFromString(fullPhoneNumber);
    return parsedPhoneNumber && parsedPhoneNumber.isValid(); // Returns true if valid
  };

  const handlePhoneNumberSignIn = async () => {
    try {
      const fullPhoneNumber = `${countryCode}${phoneNumber}`;
      const phoneRegex = /^\+?[1-9]\d{1,14}$/;
      if (!phoneRegex.test(fullPhoneNumber)) {
        ToastAndroid.show("Invalid phone number format", ToastAndroid.SHORT);
        return;
      }
      if (!validatePhoneNumber(fullPhoneNumber)) {
        ToastAndroid.show("Please enter a valid phone number", ToastAndroid.SHORT);
        return;
      }
      // setIsLoading(true);
      // const confirmationResult = await auth().signInWithPhoneNumber(fullPhoneNumber);
      ToastAndroid.show("OTP sent successfully", ToastAndroid.SHORT);
      // setIsLoading(false);
      navigation.navigate("EnterCode", {
        countryCode,
        phoneNumber,
      });
    } catch (error) {
      // setIsLoading(false);
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : ""}>
        <CountryPicker
          show={show}
          pickerButtonOnPress={(item) => {
            setCountryCode(item.dial_code);
            setShow(false);
          }}
          style={{
            dialCode: { color: colors.text },
            countryName: { color: colors.text },
            modal: { backgroundColor: colors.background, height: "100%" },
            countryButtonStyles: {
              backgroundColor: colors.cardBg,
            },
            textInput: {
              ...FONTS.fontMedium,
              backgroundColor: colors.background,
              color: colors.text,
              letterSpacing: 0.5,
            },
            line: {
              backgroundColor: colors.background,
            },
            searchMessageText: {
              color: colors.text,
            },
          }}
          onBackdropPress={() => setShow(false)}
          onRequestClose={() => setShow(false)}
        />
        <View style={{ flex: 1 }}>
          <ScrollView>
            <View style={GlobalStyleSheet.container}>
              <TouchableOpacity
                onPress={() => navigation.navigate("AuthOptions")}
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
                <FeatherIcon size={26} color={colors.title} name="chevron-left" />
              </TouchableOpacity>
              <Text style={{ ...FONTS.h3, color: colors.title, marginBottom: 20 }}>Please enter your phone number</Text>

              <View style={[styles.inputStyle, { borderColor: colors.borderColor }]}>
                <TouchableOpacity
                  onPress={() => setShow(true)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingRight: 8,
                  }}
                >
                  <Text style={{ ...FONTS.fontLg, color: colors.title }}>{countryCode}</Text>
                  <FeatherIcon style={{ marginLeft: 2 }} color={colors.title} size={18} name="chevron-down" />
                </TouchableOpacity>

                <TextInput
                  style={{
                    ...FONTS.font,
                    fontSize: 16,
                    color: colors.title,
                    flex: 1,
                    borderLeftWidth: 1,
                    borderLeftColor: colors.borderColor,
                    paddingVertical: 0,
                    paddingLeft: 12,
                  }}
                  keyboardType="number-pad"
                  placeholder="Phone number"
                  placeholderTextColor={colors.textLight}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                />
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={{ paddingHorizontal: 45, paddingVertical: 35 }}>
          <GradientBtn onPress={handlePhoneNumberSignIn} title="Next" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    height: 55,
    padding: 5,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,.05)",
  },
});

export default PhoneNumber;
