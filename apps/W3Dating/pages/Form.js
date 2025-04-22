import React, { useState } from "react";
import {
  BackHandler,
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
  Modal,
  Dimensions,
  ActivityIndicator,
  TouchableWithoutFeedback
} from "react-native";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import FeatherIcon from "react-native-vector-icons/Feather";
import DateTimePicker from "@react-native-community/datetimepicker";
import { GlobalStyleSheet } from "../../../app/constants/StyleSheet";
import { COLORS, FONTS, SIZES } from "../../../app/constants/theme";
import GradientBtn from "./components/GradientBtn";
import userServices from "../../../services/user";
import CheckList from "./components/CheckList";
import { languagesData } from "../Utilities/Languages";
import { menProfilePhotos, womenProfilePhotos } from "../Utilities/profilePhotos";

const Form = ({ navigation, route }) => {
  const [name, setName] = useState("");
const [isLoading, setIsLoading] = useState(false);
const eighteenYearsBack = new Date();
eighteenYearsBack.setFullYear(eighteenYearsBack.getFullYear() - 18);
const [datePicker, setDatePicker] = useState(false);
const [date, setDate] = useState(new Date(eighteenYearsBack));
const [birthDate, setBirthDate] = useState(true);
const genderData = ["Female", "Male", "Others"];
const [activeGender, setGender] = useState(null);
const [modal, setModal] = useState(false);
const [modalMode, setModalMode] = useState("gender");
const [language, setLanguage] = useState("");
const [role, setRole] = useState("");
const [referalCode, setReferalCode] = useState("");
const { height } = Dimensions.get("window");
const theme = useTheme();

  function onDateSelected(event, value) {
    setDate(value);
    setDatePicker(false);
    setBirthDate(true);
  }

  const setProfilePhoto = () => {
    const getRandomPhoto = (photos) => photos[Math.floor(Math.random() * photos.length)];
  
    if (genderData[activeGender] === "male") {
      return getRandomPhoto(menProfilePhotos);
    } else if (genderData[activeGender] === "female") {
      return getRandomPhoto(womenProfilePhotos);
    } else {
      return getRandomPhoto(menProfilePhotos);
    }
  };
  

  const handleNext = async () => {
    try {
      const trimmedName = name?.trim() || "";
      const isValidName = /^[a-zA-Z\s]+$/.test(trimmedName);
      if (!trimmedName || trimmedName?.length === 0 || trimmedName.length < 3 || !isValidName) {
        ToastAndroid.show("Please enter a valid name", ToastAndroid.SHORT);
        return;
      }

        const newbirthDate = new Date(date);
            const today = new Date();
      
            newbirthDate.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);
      
            const ageCutoff = new Date(today);
            ageCutoff.setFullYear(today.getFullYear() - 18);
      
            if (newbirthDate > ageCutoff) {
              ToastAndroid.show("You must be at least 18 years old.", ToastAndroid.SHORT);
              return;
            }
      
      if(!language || language?.length == 0 ){
        ToastAndroid.show("Please select a language to proceed", ToastAndroid.SHORT);
        return;
      }
      if(!role || role?.length == 0 ){
        ToastAndroid.show("Please select a role to proceed", ToastAndroid.SHORT);
        return;
      }
      
      if(!activeGender || genderData[activeGender].length == 0 ){
        ToastAndroid.show("Please select a gender to proceed", ToastAndroid.SHORT);
        return;
      }

      const profilePhoto = await setProfilePhoto();        
      // setIsLoading(true);
      userServices.updateUser({
        name: trimmedName,
        language: language,
        dob: date,
        referalCode,
        gender: genderData[activeGender],
        role,
        profilePhoto,
        onboardingStage: 2,
      });
     
      // setIsLoading(false);
      navigation.navigate("DrawerNavigation");
    } catch (error) {
      // setIsLoading(false);
      ToastAndroid.show("Error: Form Submit Error", ToastAndroid.SHORT);
    }
  };
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.cardBg,
      }}
    >
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : ""}>
        <View style={{ paddingHorizontal: 4, paddingVertical: 4 }}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  height: 48,
                  width: 48,
                  borderRadius: 48,
                  backgroundColor: colors.bgLight,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
              >
                <FeatherIcon size={26} color={colors.title} name={"chevron-left"} />
              </TouchableOpacity>
              </View>
        <View style={{ flex: 1 }}>
          <ScrollView>
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
                        height: height * (modalMode === "gender" ? 0.4 : 0.7 ),
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
                          Please select your {modalMode}
                        </Text>
                      </View>
                      {modalMode === "gender" ? (
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                      {genderData?.map((data, index) => {
                        return (
                        <CheckList
                            onPress={() => {
                                setGender(index)
                            setModal(false)
                            }}
                            item={data}
                            checked={data == genderData[activeGender] ? true : false}
                            key={index}
                        />
                        );
                    })}
                      </View>
                      ):( 
                      <View >
                        <ScrollView >
                      {languagesData?.map((data, index) => {
                      return (
                        <CheckList
                          onPress={() => {
                            setLanguage(data)
                            setModal(false)
                        }}
                          item={data}
                          checked={false}
                          key={index}
                        />
                      );
                    })}
                    </ScrollView>
                      </View>)}
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
            <View style={GlobalStyleSheet.container}>
              <Text style={{ color: COLORS.dark }}>Name</Text>
              <TextInput
                style={{
                  ...FONTS.font,
                  fontSize: 14,
                  color: colors.title,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.borderColor,
                  paddingHorizontal: 8,
                  paddingVertical: 8,
                }}
                value={name}
                onChangeText={(input) => setName(input)}
                autoFocus
                placeholder="Enter first name"
                placeholderTextColor={colors.textLight}
              />
            </View>
            {datePicker && (
        <DateTimePicker
          value={date}
          mode={"date"}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          is24Hour={true}
          onChange={onDateSelected}
          maximumDate={eighteenYearsBack}
        />
      )}
      <View style={{ flex: 1 }}>
          <View style={GlobalStyleSheet.container}>
            <Text style={{color: COLORS.dark }}>DOB</Text>

            <View>
              <TextInput
                style={{
                  ...FONTS.font,
                  fontSize: 14,
                  color: colors.title,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.borderColor,
                  paddingHorizontal: 8,
                  paddingVertical: 8,
                }}
                value={
                  birthDate
                    ? String(date.getDate()).padStart(2, "0") +
                      "/" +
                      String(date.getMonth() + 1).padStart(2, "0") +
                      "/" +
                      date.getFullYear()
                    : ""
                }
                editable={false}
                placeholder="DD/MM/YYYY"
                placeholderTextColor={colors.textLight}
              />
              <TouchableOpacity
                onPress={() => setDatePicker(true)}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                }}
              />
            </View>
          </View>
      </View>
       
        <View style={{ flex: 1 }}>
          <View style={GlobalStyleSheet.container}>
          <Text style={{color: COLORS.dark, paddingVertical:10 }}>Gender</Text>

            <View>
          
                  <CheckList
                    onPress={() => {setModalMode("gender")
                        setModal(true)}}
                    item={genderData[activeGender] ? genderData[activeGender] : ["Select gender"]}
                    dropdown={true}
                    checked={genderData[activeGender] ? true : false}
               
                  />
            
            </View>
                  <Text style={{color: COLORS.dark, paddingVertical: 10 }}>Language</Text>
                  
                        <CheckList
                          onPress={() => {setModalMode("language")
                            setModal(true)}}
                            dropdown={true}  
                          item={language ? language : ["Select language"]}
                          checked={language ? true : false}
                        
                        />
               
                 
            <Text style={{color: COLORS.dark, paddingVertical: 10 }}>Role</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={GlobalStyleSheet.col50}>
            <CheckList
                    onPress={() => setRole("User")}
                    item={["User"]}
                    checked={role == "User" ? true : false}
                key={0}
                  />
         
              </View>
               <View style={GlobalStyleSheet.col50}>
            <CheckList
                    onPress={() => setRole("Employer")}
                    item={["Employee"]}
                    checked={role == "Employer" ? true : false}
                key={0}
                  />
         
              </View>
            </View>
            </View>
        </View>      
         <View style={{ flex: 1 }}>
            <View style={GlobalStyleSheet.container}>
            <Text style={{color: COLORS.dark, paddingVertical: 10 }}>Referral Code</Text>

              <View style={[styles.inputStyle, { borderColor: colors.borderColor }]}>
                <TextInput
                  style={{
                    ...FONTS.font,
                    fontSize: 16,
                    color: colors.title,
                    flex: 1,
                    // borderLeftWidth: 1,
                    borderLeftColor: colors.borderColor,
                    paddingVertical: 0,
                    // paddingLeft: 12,
                  }}
                  placeholder="Referal Code"
                  placeholderTextColor={colors.textLight}
                  value={referalCode}
                  onChangeText={(text)=>setReferalCode(text)}
                />
              </View>
            </View>
        </View>   
          
      
        <View
          style={{
            paddingHorizontal: 45,
            paddingVertical: 35,
          }}
        >
          <GradientBtn isLoading={isLoading} onPress={handleNext} title={"Next"} />
        </View>
        </ScrollView>
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

export default Form;
