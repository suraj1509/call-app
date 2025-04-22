import React from "react";
import { Image, StyleSheet, Text, TextInput, ToastAndroid, View } from "react-native";
// import SelectDropdown from "react-native-select-dropdown";
// import FeatherIcon from "react-native-vector-icons/Feather";
import { useTheme } from "@react-navigation/native";
import { FONTS, IMAGES, SIZES } from "../../../../app/constants/theme";
import { GlobalStyleSheet } from "../../../../app/constants/StyleSheet";
import GradientBtn from "./GradientBtn";
import * as services from "../../../.././services/user";
import parsePhoneNumberFromString from "libphonenumber-js";
import auth from "@react-native-firebase/auth";
// import authServices from "../../../../services/auth";

const PhoneNumberSheet = ({ settingSheet, setPhoneNumber, setCountry }) => {
  const { colors } = useTheme();
  const [number, setNumber] = React.useState("9054047052");
  const [countryCode, setCountryCode] = React.useState("+91");
  const [isLoading, setIsLoading] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [otp, setOtp] = React.useState(false);
  const [otpCode, setOtpCode] = React.useState(null);
  const [verificationId, setVerificationId] = React.useState(null);

  // const countriesWithFlags = [
  //   { title: "+971", image: IMAGES.UnitedArabEmiratesFlag },
  //   { title: "+61", image: IMAGES.AustraliaFlag },
  //   { title: "+91", image: IMAGES.indiaFlag },
  //   { title: "+1", image: IMAGES.UnitedStatesFlag },
  // ];

  const validatePhoneNumber = (fullPhoneNumber) => {
    const parsedPhoneNumber = parsePhoneNumberFromString(fullPhoneNumber);
    return parsedPhoneNumber && parsedPhoneNumber.isValid(); // Returns true if valid
  };

  const handleSendOtp = async () => {
    const fullPhoneNumber = `${countryCode}${number}`;
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(fullPhoneNumber)) {
      ToastAndroid.show("Invalid phone number format", ToastAndroid.SHORT);
      return;
    }
    if (!validatePhoneNumber(fullPhoneNumber)) {
      ToastAndroid.show("Please enter a valid phone number", ToastAndroid.SHORT);
      return;
    }
    setLoader(true);
    const confirmationResult = await auth().signInWithPhoneNumber(fullPhoneNumber);
    setVerificationId(confirmationResult?.verificationId);
    setLoader(false);
    ToastAndroid.show("OTP sent successfully", ToastAndroid.SHORT);
    setOtp(true);
  };

  const handleSavePress = async () => {
    if (otpCode.length !== 6) {
      ToastAndroid.show("Please enter a valid otp", ToastAndroid.SHORT);
      return;
    }
    //verify otp here
    setIsLoading(true);
    try {
      const credential = auth.PhoneAuthProvider.credential(verificationId, otpCode);
      const user = auth().currentUser;
      if (user) {
        // const idToken = await user.getIdToken(true);
        await user.updatePhoneNumber(credential);
        // await authServices.verifyToken({ idToken, phoneNumber: number, countryCode });
        const res = await services.updateUser({
          countryCode,
          phoneNumber: number,
          profileStatusToAdd: ["phone-number"],
        });
        if (res.statusCode === 400 && res.message === "Phone number already registered" && res.status === "error") {
          ToastAndroid.show("Phone number already registered", ToastAndroid.SHORT);
        } else {
          setPhoneNumber(number);
          setCountry(countryCode);
          ToastAndroid.show("Updated phone number", ToastAndroid.SHORT);
        }
      } else {
        console.log("No user is signed in.");
      }

      setIsLoading(false);
      settingSheet?.current.close();
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
      ToastAndroid.show("Error updating phone number", ToastAndroid.SHORT);
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
        <Text style={{ ...FONTS.h5, color: colors.title }}>{otp ? "Enter Code" : "Phone Number"}</Text>
      </View>
      <View style={GlobalStyleSheet.container}>
        <View style={[styles.inputStyle, { borderColor: colors.borderColor }]}>
          {/* <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <SelectDropdown
              data={countriesWithFlags}
              defaultValue={countriesWithFlags[0]}
              onSelect={(selectedItem, index) => {}}
              buttonStyle={{
                padding: 0,
                backgroundColor: "transparent",
                width: 102,
                paddingRight: 0,
                height: 24,
              }}
              renderDropdownIcon={() => {
                return <FeatherIcon size={16} color={colors.textLight} name="chevron-down" />;
              }}
              renderCustomizedButtonChild={(selectedItem, index) => {
                return (
                  <View style={{ flexDirection: "row" }}>
                    {selectedItem ? (
                      <View
                        style={{
                          borderWidth: 1,
                          borderColor: colors.borderColor,
                          overflow: "hidden",
                          marginRight: 6,
                          borderRadius: 4,
                        }}
                      >
                        <Image
                          style={{
                            width: 30,
                            height: 20,
                          }}
                          source={selectedItem.image}
                        />
                      </View>
                    ) : undefined}
                    <Text style={{ ...FONTS.fontLg, color: colors.title, top: 1 }}>
                      {selectedItem ? selectedItem.title : "000"}
                    </Text>
                  </View>
                );
              }}
              dropdownStyle={{
                width: 100,
                borderRadius: 4,
              }}
              rowStyle={{
                height: 40,
                borderBottomColor: colors.borderColor,
              }}
              renderCustomizedRowChild={(item, index) => {
                return (
                  <View style={{ flexDirection: "row", paddingHorizontal: 10 }}>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: colors.borderColor,
                        overflow: "hidden",
                        marginRight: 6,
                      }}
                    >
                      <Image
                        style={{
                          width: 30,
                          height: 20,
                        }}
                        source={item.image}
                      />
                    </View>
                    <Text style={{ ...FONTS.fontLg, color: colors.title }}>{item.title}</Text>
                  </View>
                );
              }}
            />
          </View> */}

          {otp ? (
            <TextInput
              style={{
                ...FONTS.font,
                fontSize: 16,
                color: colors.title,
                flex: 1,
                top: 0,
                // borderLeftWidth: 1,
                // borderLeftColor: colors.borderColor,
                paddingVertical: 0,
                paddingLeft: 12,
              }}
              // defaultValue={"12345"}
              value={otpCode}
              onChangeText={(input) => setOtpCode(input)}
              keyboardType="number-pad"
              placeholder="Enter Code"
              placeholderTextColor={colors.textLight}
              maxLength={6}
            />
          ) : (
            <View style={{ flexDirection: "row" }}>
              <TextInput
                style={{
                  ...FONTS.font,
                  fontSize: 16,
                  color: colors.title,
                  top: 0,
                  width: "20%",
                  paddingVertical: 0,
                  paddingLeft: 12,
                  letterSpacing: 1,
                }}
                // defaultValue={"+00"}
                value={countryCode}
                onChangeText={(input) => setCountryCode(input)}
                keyboardType="number-pad"
                placeholder="+91"
                placeholderTextColor={colors.textLight}
              />
              <TextInput
                style={{
                  ...FONTS.font,
                  fontSize: 16,
                  color: colors.title,
                  // flex: 1,
                  top: 0,
                  width: "80%",
                  borderLeftWidth: 1,
                  borderLeftColor: colors.borderColor,
                  paddingVertical: 0,
                  paddingLeft: 12,
                  letterSpacing: 1,
                }}
                // defaultValue={"0540 4705"}
                value={number}
                onChangeText={(input) => setNumber(input)}
                keyboardType="number-pad"
                placeholder="9054047052"
                placeholderTextColor={colors.textLight}
              />
            </View>
          )}
        </View>
        <View
          style={{
            paddingHorizontal: 15,
          }}
        >
          {!otp ? (
            <GradientBtn title={"Send OTP"} onPress={handleSendOtp} isLoading={loader} />
          ) : (
            <GradientBtn title={"Enter Code"} onPress={handleSavePress} isLoading={isLoading} />
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    height: 50,
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

export default PhoneNumberSheet;
