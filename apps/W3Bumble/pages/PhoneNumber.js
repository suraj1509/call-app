import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { GlobalStyleSheet } from "../../../app/constants/StyleSheet";
import { COLORS, FONTS, SIZES } from "../../../app/constants/theme";

import { CountryPicker } from "react-native-country-codes-picker";
import Button from "../../../app/components/Button/Button";

const PhoneNumber = ({ navigation }) => {
  const theme = useTheme();
  const { colors } = theme;

  const [show, setShow] = useState(false);

  const [countryCode, setCountryCode] = useState("+91");

  const [countryName, setCountryName] = useState("IN");

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.cardBg,
      }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : ""}>
        <CountryPicker
          show={show}
          pickerButtonOnPress={(item) => {
            setCountryName(item.code);
            setCountryCode(item.dial_code);
            setShow(false);
          }}
          onBackdropPress={() => setShow(false)}
          style={{
            modal: {
              height: "60%",
              backgroundColor: colors.cardBg,
            },
            textInput: {
              paddingHorizontal: 12,
              height: 48,
              color: colors.title,
              backgroundColor: colors.bgLight,
            },
            dialCode: {
              ...FONTS.fontLg,
              ...FONTS.fontSemiBold,
              color: colors.title,
            },
            countryName: {
              ...FONTS.font,
              ...FONTS.fontSemiBold,
              color: colors.text,
            },
            countryButtonStyles: {
              height: 50,
              backgroundColor: colors.cardBg,
              borderRadius: 0,
              borderBottomWidth: 1,
              borderBottomColor: colors.borderColor,
              marginBottom: 0,
            },
          }}
        />
        <View style={{ flex: 1 }}>
          <ScrollView>
            <View style={[GlobalStyleSheet.container, { paddingHorizontal: 25 }]}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  height: 48,
                  width: 48,
                  borderRadius: 48,
                  backgroundColor: "#FFEDB3",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 15,
                }}>
                <FeatherIcon size={26} color={"#141414"} name={"arrow-left"} />
              </TouchableOpacity>
              <Text
                style={{
                  ...FONTS.fontBold,
                  fontSize: 28,
                  color: theme.dark ? colors.title : "#141414",
                  marginBottom: 10,
                }}>
                Can you get{"\n"}your number?{" "}
              </Text>
              <Text style={{ ...FONTS.fontMedium, fontSize: 16, color: "#666666", marginBottom: 15, paddingRight: 35 }}>
                We safeguard our community by ensuring that every user on W3Bumble is genuine.
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10, width: "100%" }}>
                <View style={[styles.inputStyle, { borderColor: theme.dark ? colors.title : "#141414", width: "35%" }]}>
                  <TouchableOpacity
                    onPress={() => setShow(true)}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingRight: 8,
                    }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                      <Text
                        style={{
                          ...FONTS.fontSemiBold,
                          fontSize: 18,
                          color: theme.dark ? colors.title : "#141414",
                        }}>
                        {countryName}
                      </Text>
                      <Text
                        style={{
                          ...FONTS.fontSemiBold,
                          fontSize: 18,
                          color: theme.dark ? colors.title : "#141414",
                        }}>
                        {countryCode}
                      </Text>
                    </View>
                    <FeatherIcon style={{ marginLeft: 2 }} color={colors.title} size={18} name="chevron-down" />
                  </TouchableOpacity>
                </View>
                <View style={[styles.inputStyle, { borderColor: theme.dark ? colors.title : "#141414", width: "60%" }]}>
                  <TextInput
                    style={{
                      ...FONTS.fontSemiBold,
                      fontSize: 18,
                      color: colors.title,
                      flex: 1,
                      top: 0,
                      paddingVertical: 0,
                      paddingLeft: 10,
                      //backgroundColor:'red'
                    }}
                    //autoFocus
                    keyboardType="number-pad"
                    placeholder="00000 00000"
                    placeholderTextColor={theme.dark ? colors.title : "#141414"}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            paddingHorizontal: 35,
            paddingBottom: 20,
          }}>
          <Button
            title={"Next"}
            onPress={() => navigation.navigate("EnterCode")}
            btnRounded
            fontSize
            textColor={"#141414"}
            color={COLORS.primary4}
          />
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
    borderBottomWidth: 3,
    borderRadius: SIZES.radius,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#141414",
    // backgroundColor:'green'
    //backgroundColor:'rgba(255,255,255,.05)',
  },
});

export default PhoneNumber;
