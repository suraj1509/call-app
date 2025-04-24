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
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { set } from "@react-native-firebase/database";
import { useDispatch } from "react-redux";
import * as Actions from '../../../redux/Actions'

const Form = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch()
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
const [referralCode, setReferralCode] = useState(null);
const [consent, setConsent] = useState(false);
const [isVisible, setIsVisible] = useState(false);
const { height } = Dimensions.get("window");
const theme = useTheme();

  function onDateSelected(event, value) {
    setDate(value);
    setDatePicker(false);
    setBirthDate(true);
  }
  

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
      
      if(!language || language?.length === 0 ){
        ToastAndroid.show("Please select a language to proceed", ToastAndroid.SHORT);
        return;
      }
      if(!role || role?.length === 0 ){
        ToastAndroid.show("Please select a role to proceed", ToastAndroid.SHORT);
        return;
      }
      
      if(genderData[activeGender]?.length === 0 ){
        ToastAndroid.show("Please select a gender to proceed", ToastAndroid.SHORT);
        return;
      }
       if(!consent){
        ToastAndroid.show("Please agree to terms and conditions", ToastAndroid.SHORT);
        return;
      }
       
      // setIsLoading(true);
      userServices.updateUser({
        name: trimmedName,
        language: language,
        dob: date,
        referralCode,
        gender: genderData[activeGender],
        role,
        onboardingStage: 2,
      });
     
      // setIsLoading(false);
      await dispatch(Actions.fetchCurrentUser())
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
                    onPress={() => setRole("Employee")}
                    item={["Employee"]}
                    checked={role == "Employee" ? true : false}
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
                  value={referralCode}
                  onChangeText={(text)=>setReferralCode(text)}
                />
              </View>
            </View>
        </View><View style={{ flex: 1 }}>
        <Modal visible={isVisible} transparent onRequestClose={() => setIsVisible(false)}>
                  <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
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
                          margin: 20,
                          borderRadius: 10,
                          borderColor: colors.border,
                          borderWidth: 1,
                          // padding: 6,
                          height: height * 0.8,
                        }}
                      >
                        <TouchableWithoutFeedback onPress={() => {}}>
                          <View
                            style={{
                              padding: 16,
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Text
                              style={{
                                ...FONTS.h5,
                                // flex: 1,
                                textAlign: "center",
                                color: colors.title,
                              }}
                            >
                              Terms & Conditions
                            </Text>
                            <TouchableOpacity style={{ padding: 10 }} onPress={() => setIsVisible(false)}>
                              <FeatherIcon name={"x"} size={14} color={colors.title} />
                            </TouchableOpacity>
                          </View>
                        </TouchableWithoutFeedback>
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                          <TouchableWithoutFeedback onPress={() => {}}>
                            <View style={{ paddingHorizontal: 20, paddingVertical: 10, gap: 10 }}>
                              <Text style={{ color: colors.text }}>
                                Welcome to W3 Dating! These Terms of Service ("Terms") govern your use of our mobile
                                application and related services. By accessing or using the service, you agree to be
                                bound by these Terms. If you do not agree, please do not use the service.
                              </Text>
                              <Text style={{ ...FONTS.fontPoppins, color: colors.text }}>1. Eligibility</Text>
                              <Text style={{ color: colors.text }}>
                                You must be at least 18 years old to use W3 Dating.
                              </Text>
                              <Text style={{ color: colors.text }}>
                                By using the service, you represent that you have the right, authority, and capacity to
                                enter into this agreement and abide by all terms.
                              </Text>
                              <Text style={{ ...FONTS.fontPoppins, color: colors.text }}>2. Account Registration</Text>
                              <Text style={{ color: colors.text }}>
                                You must create an account using accurate information.
                              </Text>
                              <Text style={{ color: colors.text }}>
                                You are responsible for maintaining the confidentiality of your account credentials.
                              </Text>
                              <Text style={{ color: colors.text }}>
                                You may not create more than one account or impersonate others.
                              </Text>

                              <Text style={{ ...FONTS.fontPoppins, color: colors.text }}>3. User Conduct</Text>
                              <Text style={{ color: colors.text }}>
                                Use the service in a manner that is lawful and respectful to other users.
                              </Text>
                              <Text style={{ color: colors.text }}>
                                Not post content that is offensive, discriminatory, defamatory, or otherwise
                                inappropriate.
                              </Text>
                              <Text style={{ color: colors.text }}>
                                Not use the service for spam, harassment, or fraudulent activity.
                              </Text>

                              <Text style={{ ...FONTS.fontPoppins, color: colors.text }}>4. Privacy</Text>
                              <Text style={{ color: colors.text }}>
                                Your privacy is important to us. Please refer to our Privacy Policy to understand how we
                                collect, use, and share your information.
                              </Text>

                              <Text style={{ ...FONTS.fontPoppins, color: colors.text }}>
                                5. Payments and Subscriptions
                              </Text>
                              <Text style={{ color: colors.text }}>
                                Some features may require a paid subscription or purchase.
                              </Text>
                              <Text style={{ color: colors.text }}>
                                All payments are non-refundable unless otherwise specified by applicable law.
                              </Text>

                              <Text style={{ ...FONTS.fontPoppins, color: colors.text }}>6. Third-Party Services</Text>
                              <Text style={{ color: colors.text }}>
                                The app may contain links to third-party services. We are not responsible for their
                                content or practices.
                              </Text>

                              <Text style={{ ...FONTS.fontPoppins, color: colors.text }}>
                                7. Limitation of Liability
                              </Text>
                              <Text style={{ color: colors.text }}>
                                W3DATING APP is provided "as is" without warranties of any kind.
                              </Text>
                              <Text style={{ color: colors.text }}>
                                We are not responsible for any interactions or outcomes resulting from the use of our
                                service.
                              </Text>

                              <Text style={{ ...FONTS.fontPoppins, color: colors.text }}>8. Termination</Text>
                              <Text style={{ color: colors.text }}>
                                We may suspend or terminate your account if you violate these Terms or engage in
                                behavior that we consider harmful to the community.
                              </Text>
                              <Text style={{ ...FONTS.fontPoppins, color: colors.text }}>9. Changes to Terms</Text>
                              <Text style={{ color: colors.text }}>
                                We may modify these Terms at any time. Your continued use of the service after changes
                                constitutes your acceptance of the updated Terms.
                              </Text>
                              <Text style={{ ...FONTS.fontPoppins, color: colors.text }}>10. Governing Law</Text>
                              <Text style={{ color: colors.text }}>
                                These Terms are governed by the laws of INDIA/DELHI, without regard to its conflict of
                                laws principles
                              </Text>

                              <Text style={{ ...FONTS.fontPoppins, color: colors.text }}>11. Contact Us</Text>
                              <Text style={{ color: colors.text }}>
                                If you have questions about these Terms, please contact us at support@w3dating.com
                                email.
                              </Text>
                              <View
                                style={{
                                  marginBottom: 16,
                                }}
                              >
                                <GradientBtn title={"Agree"} onPress={() => {
                                  setConsent(true)
                                  setIsVisible(false)
                                  }} />
                              </View>
                            </View>
                          </TouchableWithoutFeedback>
                        </ScrollView>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </Modal>
            <View style={[GlobalStyleSheet.container, {justifyContent:"center", alignItems:"center"}]}>
            {/* <Text style={{color: COLORS.dark, paddingVertical: 10 }}>Referral Code</Text> */}

              <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                <TouchableOpacity onPress={() => setConsent(!consent)} style={{padding: 10}}>
                <View style={{height: 18, width: 18, borderWidth: 1, borderColor: COLORS.borderColor}}>
                {consent && (<FontAwesome5  name={"check"} size={16} color={COLORS.success} />)}
               </View>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: "row", justifyContent: "space-around", alignItems: "center"}} onPress={()=>setIsVisible(true)}>
                  <Text style={{color:COLORS.textLight}}>I agree to {" "}</Text>
                  <Text style={{color:COLORS.info}}>terms and conditions</Text>
                </TouchableOpacity>
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
