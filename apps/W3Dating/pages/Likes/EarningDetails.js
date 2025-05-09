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
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
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
import { useDispatch, useSelector } from "react-redux";
import CheckList from "../components/CheckList";
import ButtonLight from "../../../../app/components/Button/ButtonLight";
import ButtonOutline from "../../../../app/components/Button/ButtonOutline";

const EarningDetails = ({ navigation }) => {
  const user = useSelector((state) => state?.user?.currentUser);
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [modal, setModal] = React.useState(false)
  const { height } = Dimensions.get("window");
  const [durationIndex, setDurationIndex] = React.useState(0)
  const [history, setHistory] = React.useState([])
  const [cost, setTotalCost] = React.useState([])

  const filterHistory = (callHistory, filterType) => {
    const today = new Date();
    const todayDay = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();
  
    const startOfWeek = new Date(today);
    startOfWeek.setDate(todayDay - today.getDay()); // Set to the start of the week (Sunday)
  
    const startOfMonth = new Date(today);
    startOfMonth.setDate(1); // Set to the first day of the month
  
    let filteredHistory = [];
    let totalCost = 0; // Variable to hold the total cost
  
    switch (filterType) {
      case "today":
        // Filter calls for today
        filteredHistory = callHistory.filter(call => {
          const dateStr = call?.time;
          if (!dateStr) return false;
  
          const callDate = new Date(dateStr);
          const isToday =
            callDate.getDate() === todayDay &&
            callDate.getMonth() === todayMonth &&
            callDate.getFullYear() === todayYear;
          
          if (isToday) totalCost += Number(call.cost) || 0; // Add cost to totalCost if the call is from today
          return isToday;
        });
        break;
  
      case "week":
        // Filter calls for the current week
        filteredHistory = callHistory.filter(call => {
          const dateStr = call?.time;
          if (!dateStr) return false;
  
          const callDate = new Date(dateStr);
          const isThisWeek = callDate >= startOfWeek && callDate <= today;
  
          if (isThisWeek) totalCost += Number(call.cost) || 0; // Add cost to totalCost if the call is from the current week
          return isThisWeek;
        });
        break;
  
      case "month":
        // Filter calls for the current month
        filteredHistory = callHistory.filter(call => {
          const dateStr = call?.time;
          if (!dateStr) return false;
  
          const callDate = new Date(dateStr);
          const isThisMonth =
            callDate.getMonth() === todayMonth && callDate.getFullYear() === todayYear;
  
          if (isThisMonth) totalCost += Number(call.cost) || 0; // Add cost to totalCost if the call is from the current month
          return isThisMonth;
        });
        break;
  
      default:
        break;
    }
  
    // Update state for filtered history and total cost
    setHistory(filteredHistory);
    setTotalCost(Number(totalCost.toFixed(2))); // Store total cost with 2 decimal places
  };
  
  React.useEffect(() => {
    if (user?.history?.length !== 0) {
      filterHistory(user?.history, ["today", "week", "month"][durationIndex]);
    }
  }, [user?.history, durationIndex]);
  
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
          title={"Earnings Details"}
          titleLeft
          backAction={() => {navigation.goBack()}}
        />

        <ScrollView>
          <View style={{padding: 16}}>
          <Modal visible={modal} transparent onLayout={() => setModal(false)}>
            <TouchableWithoutFeedback onPress={() => setModal(false)}>
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: "rgba(0,0,0,0.5)",
                      justifyContent: "center",
                      alignContent: "center",
                     
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: colors.cardBg,
                        borderWidth: 1,
                        borderColor: colors.border,
                        margin: 20,
                        borderRadius: 10,
                        padding: 16,
                        gap: 10,
                        height: height * 0.4,
                        overflow: "hidden",
                        // backgroundColor: "blue",
                      }}
                    >
                      <View style={{ padding: 16 }}>
                        <Text
                          style={{
                            ...FONTS.h5,
                            // flex: 1,
                            textAlign: "center",
                            color: colors.title,
                          }}
                        >
                          Select Duration
                        </Text>
                      </View>
                   
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                      {["Today", "Weekly", "Monthly"]?.map((data, index) => {
                        return (
                        <CheckList
                            onPress={() => {
                              setDurationIndex(index)
                            setModal(false)
                            }}
                            item={data}
                            checked={index === durationIndex ?  true: false}
                            key={index}
                        />
                        );
                    })}
                      </View>
                    </View>
                  </View>
                  </TouchableWithoutFeedback>
                </Modal>  
            <CheckList
              onPress={() => {
              setModal(true)
            }}
              item={[["Today", "Weekly", "Monthly"][durationIndex]]}
              dropdown={true}
              checked={false}
            /> 
            <View>
              {history?.map((itm, index) =>(<View
              key={index}
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginBottom: 8,
                  // justifyContent: 'space-between',
                  // alignItems: 'center'
                }}
              >
                <View
                  style={{
                    width: '100%',
                    borderWidth: 1,
                    borderColor: COLORS.borderColor,
                    paddingHorizontal: 16,
                    paddingVertical: 6,
                    borderRadius: 10,
  
                    // Shadow for iOS
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
  
                    // Elevation for Android
                    elevation: 4,
                    backgroundColor: '#fff', // Required for shadow to be visible
                  }}
                >
                  <Text
                    style={{
                      ...FONTS.font,
                      ...FONTS.fontBold,
                      color: colors.title,
                      paddingBottom: 8,
                      marginBottom: 5,
                      borderBottomWidth: 0.5,
                      borderBottomColor: colors.borderColor,
                    }}
                  >
                    {itm?.cost} Rs
                  </Text>
                  <Text
                    style={{
                      ...FONTS.font,
                      // ...FONTS.fontBold,
                      color: colors.title,
                      paddingBottom: 8,
                      // marginBottom: 5,
                      // borderBottomWidth: 1,
                      // borderBottomColor: colors.borderColor,
                    }}
                  >
                    {itm?.name}
                  </Text>
                </View>
              </View>))}
            </View>
          </View>
             </ScrollView>
             <View style={{paddingVertical: 20, paddingHorizontal:20, gap: 40}}>
      <ButtonLight
        onPress={() => navigation.navigate("EarningDetails")}
        title={`Total:  Rs ${cost}`}
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

export default EarningDetails;
