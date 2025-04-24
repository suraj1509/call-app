import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { CommonActions, useTheme } from "@react-navigation/native";
import * as Progress from "react-native-progress";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FeatherIcon from "react-native-vector-icons/Feather";
// import DropShadow from "react-native-shadow-2";
import { COLORS, FONTS, IMAGES } from "../../../../app/constants/theme";
import { GlobalStyleSheet } from "../../../../app/constants/StyleSheet";
// import GradientBtn from "../components/GradientBtn";
// import Divider from "../../../../app/components/Dividers/Divider";
import { useSelector } from "react-redux";
import themeContext from "../../../../app/constants/themeContext";
import ToggleStyle5 from "../../../../app/components/Toggles/ToggleStyle5";
import auth from "@react-native-firebase/auth";
import GradientBtn from "../components/GradientBtn";
import RBSheet from "react-native-raw-bottom-sheet";
import PrivacyPolicyBottomSheet from "../components/PrivacyPolicyBottomSheet";
import * as userServices from "../../../../services/user";
import * as fcmServices from "../../../../services/fcm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {Shadow} from 'react-native-shadow-2';
import LinearGradient from 'react-native-linear-gradient';

const Profile = ({ navigation, route }) => {
  const user = useSelector((state) => state?.user?.currentUser);
  const [profileStatus, setProfileStatus] = React.useState(40);
  const [profileCircle, setProfileCircle] = React.useState(0.4);
  const [age, setAge] = React.useState(18);
  const theme = useTheme();
  // const { colors } = theme;
  const { colors } = useTheme();
  const { setDarkTheme, setLightTheme } = React.useContext(themeContext);
  const [isVisible, setIsVisible] = React.useState(false);
  // const [language, setLanguage] = React.useState();
  const { height } = Dimensions.get("window");
  const sheetRef = React.useRef();
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
    const amount = useSelector((state) => state?.user?.currentUser?.wallet);

  const profileData = [
    {
      id: "0",
      title: "Dark Mode",
    },
    {
      id: "1",
      title: "Notifications",
      route: "Notifications",
    },
    {
      id: "2",
      title: "Language",
      subtitle: user?.appLanguage || "English - (US)",
      route: "Languages",
    },
    // {
    //   id: "3",
    //   title: "Location",
    // },
    // {
    //   id: "4",
    //   title: "Terms of Service",
    // },
    {
      id: "5",
      title: "Privacy Policy",
    },
  ];

  function calculateAge(dobString) {
    const dob = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const hasBirthdayPassed =
      today.getMonth() > dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());
    if (!hasBirthdayPassed) {
      age--;
    }

    setAge(age);
  }

  const calculateProfileCompletion = async (profileStatus, totalFields = 13) => {
    if (!Array.isArray(profileStatus)) return 0;
    const uniqueFields = await new Set(profileStatus);
    const completedFields = uniqueFields.size;

    const percentage = await Math.min((completedFields / totalFields) * 100, 100);

    setProfileStatus(Math.round(percentage));
  };

  const calculateProfileCompletionProgress = (profileStatus, totalFields = 13) => {
    if (!Array.isArray(profileStatus) || profileStatus.length === 0) {
      return 0.4;
    }
    const uniqueFields = new Set(profileStatus);
    const completedFields = uniqueFields.size;

    const progress = Math.min(completedFields / totalFields, 1);

    setProfileCircle(Number(progress.toFixed(2)));
  };

  React.useEffect(() => {
    calculateProfileCompletion(user?.profileStatus);
    calculateProfileCompletionProgress(user?.profileStatus);
  }, [user?.profileStatus]);

  React.useEffect(() => {
    calculateAge(user?.dob);
  }, [user?.dob]);

  const handleOnPress = (data) => {
    if (data.id === "4") {
      setIsVisible(true);
    } else if (data.id === "5") {
      sheetRef.current.open();
    } else if (data.id === "1" || data.id === "2") {
      navigation.navigate(data.route);
    } else if (data.id === "0") {
      if (theme?.dark) {
        setLightTheme();
      } else {
        setDarkTheme();
      }
    }
  };

  return (
    <>
      <RBSheet
        ref={sheetRef}
        height={height * 0.98}
        openDuration={500}
        closeOnDragDown={true}
        customStyles={{
          wrapper: {},
          container: {
            backgroundColor: colors.cardBg,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          },
          draggableIcon: {
            marginTop: 5,
            marginBottom: 0,
            height: 5,
            width: 90,
            backgroundColor: colors.borderColor,
          },
        }}
        closeOnPressBack
      >
        <PrivacyPolicyBottomSheet user={user} sheetRef={sheetRef} />
      </RBSheet>

      <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }}>
        <View style={[GlobalStyleSheet.homeHeader, { backgroundColor: colors.background }]}>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={[GlobalStyleSheet.headerBtn, { borderColor: colors.borderColor }]}
          >
            <FeatherIcon color={colors.title} size={22} name={"grid"} />
          </TouchableOpacity>
          <Text
            style={{
              ...FONTS.h5,
              flex: 1,
              textAlign: "center",
              color: colors.title,
            }}
          >
            Profile
          </Text>
         <TouchableOpacity
                               onPress={() => navigation.navigate("Filter")}
                               style={[GlobalStyleSheet.headerBtn, { borderColor: colors.text, justifyContent:"center", alignItems:"center", flexDirection:"row", width:80 }]}
                             >
                               <Text style={{ ...FONTS.fontBold, fontSize: 16, color: COLORS.success }}>
                                               {amount}
                                             </Text>
                                <MaterialIcons size={18} color={colors.title} style={{left:4}} name="attach-money"  />
                             </TouchableOpacity>
        </View>
        <ScrollView style={{ backgroundColor: colors.background }}>
          <View
            style={[
              styles.profileArea,
              {
                backgroundColor: colors.background,
              },
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                marginBottom: 20,
              }}
            >
              <TouchableOpacity  style={styles.actionBtn}>
                <FontAwesome5 color={COLORS.primary} size={22} name={"cog"} />
              </TouchableOpacity>
              <TouchableOpacity >
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View style={{ transform: [{ rotate: "180deg" }] }}>
                    <Progress.Circle
                      borderWidth={0}
                      unfilledColor={"#d4e8f2"}
                      color={COLORS.primary}
                      progress={profileCircle}
                      size={130}
                      thickness={5}
                      strokeCap={"round"}
                    />
                  </View>
                  {user.profilePhotos?.length > 0 ? (<Image
                    style={{
                      height: 120,
                      width: 120,
                      borderRadius: 120,
                      position: "absolute",
                    }}
                    source={{ uri: user.profilePhotos[0] }}
                  /> ): (
                  <Image
                    style={{
                      height: 100,
                      width: 100,
                      borderRadius: 100,
                      position: "absolute",
                    }}
                    source={IMAGES.avtar2}
                  />)}
                  <View
                    style={[
                      styles.profileProgress,
                      {
                        borderColor: colors.cardBg,
                      },
                    ]}
                  >
                    <Text
                      style={{
                        ...FONTS.font,
                        ...FONTS.fontBold,
                        color: COLORS.white,
                      }}
                    >
                      {profileStatus}%
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("EditProfile", { user })} style={styles.actionBtn}>
                <FontAwesome5 color={COLORS.primary} size={20} name={"pencil-alt"} />
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ ...FONTS.h4, color: colors.title, lineHeight: 22 }}>
                {user?.name} , {age}
              </Text>
              {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FeatherIcon color={colors.text} size={13} style={{ marginRight: 5, top: 1 }} name="map-pin" />
                <Text style={{ ...FONTS.font, color: colors.text }}>{user?.currentAddress}</Text>
              </View> */}
            </View>
          </View>
          <View style={{ backgroundColor: colors.background }}>
            <View style={[GlobalStyleSheet.container]}>
              <View>
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
                              Terms Of Service
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
                                <GradientBtn title={"Close"} onPress={() => setIsVisible(false)} />
                              </View>
                            </View>
                          </TouchableWithoutFeedback>
                        </ScrollView>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </Modal>
                <Modal visible={deleteModal} transparent>
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
                        height: height * 0.3,
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
                          Delete Account
                        </Text>
                      </View>
                      <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: colors.text, ...FONTS.fontBold }}>
                          Are you sure you wish to delete the account?
                        </Text>
                        <Text style={{ color: colors.text, ...FONTS.fontBold }}>
                          Deleting Account is irreversible and cannot be undone
                        </Text>
                      </View>
                      <View
                        style={{
                          padding: 16,
                          flexDirection: "row",
                          justifyContent: "space-around",
                          // backgroundColor: "red",
                        }}
                      >
                        <View style={{ width: "40%" }}>
                          <TouchableOpacity
                            onPress={() => setDeleteModal(false)}
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
                            onPress={async () => {
                              setDeleteLoading(true);
                              await userServices?.deleteCurrentUser(user?.id);
                              await AsyncStorage.clear();
                              if (theme?.dark) {
                                await AsyncStorage.setItem("isDarkTheme", `1`);
                              }
                              setDeleteLoading(false);
                              setDeleteModal(false);
                              navigation.dispatch(
                                CommonActions.reset({
                                  index: 0,
                                  routes: [{ name: "OnBoarding" }],
                                }),
                              );
                            }}
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
                            {!deleteLoading ? (
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
                      </View>
                    </View>
                  </View>
                </Modal>
                 <View
                                            // key={index}
                                            style={{
                                                // paddingHorizontal:20,
                                                // paddingTop:15,
                                                // backgroundColor:"red",
                                                // width: '100%'
                                                marginVertical: 10
                                               
                                            }}
                                        >
                                            <Shadow
                                                style={[{
                                                    shadowColor:["#ea3d85","#ff864e"][0],
                                                    shadowOffset: {
                                                        width: 0,
                                                        height: 5,
                                                    },
                                                    shadowOpacity: .4,
                                                    shadowRadius: 8,
                                                },Platform.OS === 'ios' && {
                                                    backgroundColor: ["#ea3d85","#ff864e"][0],
                                                    borderRadius:8,
                                                }]}
                                            >
                                                <LinearGradient
                                                    colors={["#ea3d85","#ff864e"]}
                                                    start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                                    style={{
                                                        paddingHorizontal:30,
                                                        paddingVertical:16,
                                                        borderRadius:34,
                                                        flexDirection:'row',
                                                        justifyContent:'center',
                                                        alignItems:'center',
                                                        width: '100%'
                                                    }}
                                                >
                                                    <Image
                                                        style={{
                                                            tintColor:COLORS.white,
                                                            width:200,
                                                            resizeMode:'contain',
                                                            height:25,
                                                        }}
                                                        source={IMAGES.tinder}
                                                    />
                                                    <View
                                                        style={{
                                                            borderRadius:20,
                                                            paddingHorizontal:20,
                                                            paddingVertical: 8,
                                                            top: 2,
                                                            backgroundColor:'#fff',
                                                            marginLeft:6,
                                                        }}
                                                    >
                                                        <Text style={{...FONTS.fontJostBold,color:["#ea3d85","#ff864e"][0],...FONTS.fontBold}}>Refer</Text>
                                                    </View>
                                                </LinearGradient>
                                            </Shadow>
                                        </View>
                {profileData.map((data, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => handleOnPress(data)}
                      activeOpacity={index === 2 ? 1 : 0.5}
                      key={index}
                      style={{
                        height: 45,
                        borderRadius: 30,
                        borderWidth: 1,
                        borderColor: theme.dark ? "#CECECE36" : "#CECECE",
                        marginBottom: 10,
                        paddingHorizontal: 20,
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        backgroundColor: colors.cardBg,
                      }}
                    >
                      <Text style={{ ...FONTS.fontMedium, fontSize: 16, color: theme.dark ? colors.title : "#141414" }}>
                        {data.title}{" "}
                        <Text style={{ ...FONTS.font, fontSize: 14, color: "#999999" }}>{data.subtitle}</Text>
                      </Text>
                      {data.id === "0" ? (
                        <ToggleStyle5
                          active={theme.dark}
                          onToggle={(value) => {
                            if (value) {
                              setLightTheme();
                            } else {
                              setDarkTheme();
                            }
                          }}
                        />
                      ) : (
                        <FeatherIcon color={theme.dark ? colors.title : "#141414"} size={20} name={"chevron-right"} />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 10,
                  paddingHorizontal: 10,
                  paddingLeft: 5,
                  marginTop: 5,
                }}
              >
                <View style={{ width: "50%" }}>
                  <TouchableOpacity
                    // onPress={() => setDeleteModal(true)}
                    onPress={() => {
                      try {
                        fcmServices.createFcmMessage({ title: "testing title1", body: "testing message body" });
                        console.log("message created by Fcm");
                      } catch (error) {
                        console.log("error", error);
                      }
                    }}
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
                    <Text style={{ ...FONTS.fontMedium, fontSize: 16, color: theme?.dark ? COLORS.white : "#141414" }}>
                      Delete Account
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ width: "50%" }}>
                  <TouchableOpacity
                    onPress={async () => {
                      await auth().signOut();
                      await AsyncStorage.clear();
                      if (theme?.dark) {
                        await AsyncStorage.setItem("isDarkTheme", `1`);
                      }
                      navigation.dispatch(
                        CommonActions.reset({
                          index: 0,
                          routes: [{ name: "OnBoarding" }],
                        }),
                      );
                    }}
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
                    <Text style={{ ...FONTS.fontSemiBold, fontSize: 16, color: COLORS.primary }}>Logout</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  headerArea: {
    flexDirection: "row",
    paddingTop: 15,
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  actionBtn: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: COLORS.primayLight,
    alignItems: "center",
    justifyContent: "center",
  },
  profileArea: {
    // paddingBottom: 10,
    paddingHorizontal: 15,
  },
  profileProgress: {
    position: "absolute",
    bottom: -10,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
    borderWidth: 2,
  },
  priceListItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
});

export default Profile;
