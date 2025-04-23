import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { COLORS, FONTS, IMAGES } from "../../../app/constants/theme";
import * as services from "../../../services/auth";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import * as authServices from "../../../services/auth";
import firebase from "@react-native-firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getOnboardingScreen } from "../../W3Dating/pages/Index";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";

const OnBoarding = ({ navigation }) => {
  const [googleSigninProgress, setGoogleSigningProgress] = React.useState(false);

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      await GoogleSignin.configure({
        webClientId: "267049210022-728ie0ugk9l1gcte6rq5bbva6bqtt66v.apps.googleusercontent.com",
      });
      if (googleSigninProgress) {
        return;
      }
      setGoogleSigningProgress(true);
      const userInfo = await GoogleSignin.signIn();
      if (userInfo?.data === null && userInfo?.type === "cancelled") {
        return;
      }

      const idToken = userInfo?.data?.idToken;
      const credential = firebase.auth.GoogleAuthProvider.credential(idToken);

      await firebase.auth().signInWithCredential(credential);
      const response = await authServices?.loginWithGoogle({
        token: idToken,
      });
      const { user, onBoardingStage } = response;
      if (user && onBoardingStage) {
        const stage = await getOnboardingScreen(onBoardingStage);
        setGoogleSigningProgress(false);
        navigation.navigate(stage);
      }
      setGoogleSigningProgress(false);
    } catch (error) {
      setGoogleSigningProgress(false);
      if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Google Sign-In is already in progress.");
        return; // Exit early if sign-in is already in progress
      } else if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User canceled the Google Sign-In process.");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Google Play Services are not available.");
      } else {
        console.error("Google Login Error:", error);
      }
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      const result = await LoginManager.logInWithPermissions(["public_profile", "email"]);
      if (result.isCancelled) {
        console.log("User cancelled the login process");
        return;
      }
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        console.log("Failed to get Facebook access token");
        return;
      }
      const facebookCredential = await firebase.auth.FacebookAuthProvider.credential(data.accessToken);
      await firebase.auth().signInWithCredential(facebookCredential);

      const response = await authServices.loginWithFacebook({
        token: data.accessToken,
      });
      const { user, onBoardingStage } = response;
      if (user && onBoardingStage) {
        await AsyncStorage.multiRemove(["firstName", "dob", "gender", "interested", "lookingFor", "address"]);
        const stage = await getOnboardingScreen(onBoardingStage);
        navigation.navigate(stage);
      }
    } catch (error) {
      if (error?.code === "auth/account-exists-with-different-credential") {
        ToastAndroid.show("Email in this facebook id is already associated with another user", ToastAndroid.SHORT);
        return;
      } else {
        console.error("Facebook Login Error", error);
      }
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <LinearGradient
        colors={["#ff864e", "#ea3d85"]}
        style={{
          flex: 1,
        }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 40,
            }}
          >
            {/* <Image
              style={{
                height: 35,
                marginBottom: 20,
                resizeMode: "contain",
              }}
              source={IMAGES.tinderLogo}
            /> */}
            <Text
              style={{
                // ...FONTS.font,
                fontWeight: "bold",
                fontSize: 30,
                color: COLORS.white,
                textAlign: "center",
              }}
            >
              Match-o-Match
            </Text>
            <Text
              style={{
                ...FONTS.font,
                fontSize: 16,
                color: COLORS.white,
                textAlign: "center",
              }}
            >
              Join us with other millions of people and find your best matches.
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 35,
              paddingVertical: 40,
            }}
          >
            <TouchableWithoutFeedback onPress={() => handleGoogleSignIn()}>
              <View
                style={{
                  backgroundColor: "rgba(255,255,255,.15)",
                  paddingHorizontal: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  height: 55,
                  borderRadius: 30,
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    backgroundColor: COLORS.white,
                    height: 46,
                    width: 46,
                    position: "absolute",
                    left: 4,
                    borderRadius: 40,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    style={{
                      height: 22,
                      width: 22,
                    }}
                    source={IMAGES.google}
                  />
                </View>
                <Text style={{ ...FONTS.fontLg, color: COLORS.white }}>Sign in with Google</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={handleFacebookSignIn}>
              <View
                style={{
                  backgroundColor: "#305CCD",
                  paddingHorizontal: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  height: 55,
                  borderRadius: 30,
                  marginBottom: 10,
                  display:"none"
                }}
              >
                <View
                  style={{
                    backgroundColor: "rgba(255,255,255,.15)",
                    height: 46,
                    width: 46,
                    position: "absolute",
                    left: 4,
                    borderRadius: 40,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    style={{
                      height: 20,
                      width: 18,
                      tintColor: COLORS.white,
                    }}
                    source={IMAGES.fb}
                  />
                </View>
                <Text style={{ ...FONTS.fontLg, color: COLORS.white }}>Sign in with Facebook</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => navigation.navigate("PhoneNumber")}>
              <View
                style={{
                  backgroundColor: "rgba(255,255,255,1)",
                  paddingHorizontal: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  height: 55,
                  borderRadius: 30,
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    height: 35,
                    width: 46,
                    position: "absolute",
                    left: 8,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRightWidth: 1,
                    borderColor: COLORS.borderColor,
                  }}
                >
                  <Image
                    style={{
                      height: 22,
                      width: 22,
                    }}
                    source={IMAGES.telephone}
                  />
                </View>
                <Text style={{ ...FONTS.fontLg, color: COLORS.title }}>Sign in with phone No.</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default OnBoarding;
