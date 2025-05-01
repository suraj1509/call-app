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

const EarningDetails = ({ navigation }) => {
  const user = useSelector((state) => state?.user?.currentUser);
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [modal, setModal] = React.useState(false)
  const { height } = Dimensions.get("window");
  const [durationIndex, setDurationIndex] = React.useState(0)

  const scrollX = useRef(new Animated.Value(0)).current; // Important: useRef so it doesn't recreate
  const scrollViewRef = useRef();
  const buttons = ['Home', 'Profile', 'Settings'];

  const handleTabClick = (i) => {
    if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ x: i * (SIZES.width - 60 ), animated: true });
      }
  };

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
                      {/* <View
                        style={{
                          padding: 16,
                          flexDirection: "row",
                          justifyContent: "space-around",
                          // backgroundColor: "red",
                        }}
                      >
                        <View style={{ width: "40%" }}>
                          <TouchableOpacity
                            // onPress={() => setDeleteModal(false)}
                            activeOpacity={0.5}
                            style={{
                              width: "100%",
                              borderRadius: 40,
                              backgroundColor: theme?.dark ? "#F5F5F520" : "#F5F5F5",
                              height: 45,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Text
                              style={{
                                ...FONTS.fontMedium,
                                fontSize: 16,
                                color: theme?.dark ? COLORS.white : "#141414",
                              }}
                            >
                              Close
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View style={{ width: "40%" }}>
                          <TouchableOpacity
                            // onPress={async () => {
                            
                            // }}
                            activeOpacity={0.5}
                            style={{
                              width: "100%",
                              borderRadius: 40,
                              //backgroundColor:'#F5F5F5',
                              borderWidth: 1,
                              borderColor: COLORS.primary,
                              height: 45,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {!true ? (
                              <Text style={{ ...FONTS.fontSemiBold, fontSize: 16, color: COLORS.primary }}>
                                Confirm
                              </Text>
                            ) : (
                              <View style={GlobalStyleSheet.spinner}>
                                <ActivityIndicator size="small" color={COLORS.primary} />
                              </View>
                            )}
                          </TouchableOpacity>
                        </View>
                      </View> */}
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
              {Array.from({ length: 5 }).map((_, index) =>(<View
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
                    20 Rs
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
                    Adnan
                  </Text>
                </View>
              </View>))}
            </View>
          </View>
             </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default EarningDetails;
