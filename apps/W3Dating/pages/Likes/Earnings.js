import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  Image,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  Animated,
  View,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { List } from "react-native-paper";
import uuid from "react-native-uuid";
import FeatherIcon from "react-native-vector-icons/Feather";
import { launchImageLibrary } from "react-native-image-picker";
import RBSheet from "react-native-raw-bottom-sheet";
import Header from "../../../../app/layout/Header";
import { GlobalStyleSheet } from "../../../../app/constants/StyleSheet";
import { COLORS, FONTS, IMAGES, SIZES } from "../../../../app/constants/theme";
import storage from "@react-native-firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../../redux/Actions";
import LanguageSheet from "../components/LanguageSheet";
import AboutSheet from "../components/AboutSheet";
import ImageResizer from "react-native-image-resizer";
import * as services from "../../../../services/user";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import TimeSlotSheet from "../components/TimeSlotSheet";
import TabButtonStyle1 from "../../../../app/components/Tabs/TabButtonStyle1";
import TabButtonStyle2 from "../../../../app/components/Tabs/TabButtonStyle2";
import ButtonLight from "../../../../app/components/Button/ButtonLight";
import ButtonOutline from "../../../../app/components/Button/ButtonOutline";

const Earnings = ({ navigation }) => {
  const user = useSelector((state) => state?.user?.currentUser);
  const { colors } = useTheme();
  const dispatch = useDispatch();

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
      >
        <Header
          leftIcon={"back"}
          title={"Earnings Snapshot"}
          titleLeft
          backAction={() => {navigation.navigate("DrawerNavigation")}}
        />

        <ScrollView style={{paddingVertical: 16, paddingHorizontal: 10, flex: 1}}>
            <View
              style={[
                GlobalStyleSheet.card,
                {
                  backgroundColor: colors.cardBg,
                  borderColor: colors.borderColor,
                  paddingBottom: 20,
                  marginTop: 25,
                },
              ]}
            >
              <Text
                style={{
                  ...FONTS.font,
                  ...FONTS.fontBold,
                  color: colors.title,
                  paddingBottom: 8,
                  marginBottom: 5,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.borderColor,
                }}
              >
                Todays Earnings
              </Text>
              <Text style={{color:COLORS.textLight}}>30 Rs</Text>
            </View>  
            <View
              style={[
                GlobalStyleSheet.card,
                {
                  backgroundColor: colors.cardBg,
                  borderColor: colors.borderColor,
                  paddingBottom: 20,
                  marginTop: 25,
                },
              ]}
            >
              <Text
                style={{
                  ...FONTS.font,
                  ...FONTS.fontBold,
                  color: colors.title,
                  paddingBottom: 8,
                  marginBottom: 5,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.borderColor,
                }}
              >
               Total Earnings 
              </Text>
              <Text style={{color:COLORS.textLight}}>40000 Rs</Text>
            </View>
             <View
              style={[
                GlobalStyleSheet.card,
                {
                  backgroundColor: colors.cardBg,
                  borderColor: colors.borderColor,
                  paddingBottom: 20,
                  marginTop: 25,
                },
              ]}
            >
              <Text
                style={{
                  ...FONTS.font,
                  ...FONTS.fontBold,
                  color: colors.title,
                  paddingBottom: 8,
                  marginBottom: 5,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.borderColor,
                }}
              >
               Time Spent On Calls 
              </Text>
              <Text style={{color:COLORS.textLight}}>400 mins</Text>
            </View>
        </ScrollView>
            <View style={{paddingVertical: 20, paddingHorizontal:20, gap: 40}}>
      <ButtonLight
        onPress={() => navigation.navigate("EarningDetails")}
        title={"Earnings Details"}
        btnRounded
        color={COLORS.textLight}
      />
      <ButtonOutline
        // onPress={handleAddRecharge}
        title={"Proceed to Widthdraw"}
        btnRounded
      />
      </View>
      </SafeAreaView>
    </>
  );
};

export default Earnings;
