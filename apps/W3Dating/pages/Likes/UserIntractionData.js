import React, { useEffect, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import { COLORS, FONTS, IMAGES } from "../../../../app/constants/theme";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { GlobalStyleSheet } from "../../../../app/constants/StyleSheet";
import * as services from "../../../../services/user";
import { CommonActions, useNavigation, useTheme } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../../redux/Actions";
import GradientBtn from "../components/GradientBtn";
import Button from "../../../../app/components/Button/Button";

const { height } = Dimensions.get("window");

const UserIntractionData = ({ userIntractionType }) => {
  const chatUsers = useSelector((state) => state?.user?.chatUsers);
  const usersData = useSelector((state) => state?.user?.currentUser);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState([]);
  const [userDataLoading, setUserDataLoading] = useState([]);
  const [savedUsers, setSavedUsers] = useState({});
  const { colors } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setUserDataLoading(true);
        setUserData([]);
        if (!["Matches", "My Likes", "My Favourites"]?.includes(userIntractionType.title)) {
          const allUsersData = await services.getInteractionUserData(userIntractionType.value);
          setUserData(allUsersData);
        } else if (userIntractionType.title === "Matches") {
          setUserData(chatUsers);
        } else if (userIntractionType.title === "My Likes") {
          setUserData(usersData?.likedUsers || []);
        } else if (userIntractionType.title === "My Favourites") {
          setUserData(usersData?.savedUsers || []);
        }
      } catch (error) {
        setUserData([]);
        console.error("Error fetching user data:", error);
      } finally {
        setUserDataLoading(false);
      }
    };
    fetchData();
  }, [chatUsers, userIntractionType, usersData]);

  function calculateAge(dobString) {
    const dob = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const hasBirthdayPassed =
      today.getMonth() > dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());
    if (!hasBirthdayPassed) {
      age--;
    }

    return age;
  }

  const genderMap = ["Women", "Men", "Others"];
  const lookingForMap = [
    "Long-term partner",
    "Long-term, open to short",
    "Short-term, open to long",
    "Short-term fun",
    "New friends",
    "Still figuring it out",
  ];

  React.useEffect(() => {
    if (userData?.length > 0) {
      const updatedSavedUsers = {};
      userData.forEach((data) => {
        if (usersData?.savedUsers?.some(({ id }) => id === data?.id)) {
          updatedSavedUsers[data?.id] = true;
        } else {
          updatedSavedUsers[data?.id] = false;
        }
      });

      setSavedUsers((prev) => ({ ...prev, ...updatedSavedUsers }));
    }
  }, [userData]);

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
      <View style={GlobalStyleSheet.container}>
        <View style={GlobalStyleSheet.row}>
          {userDataLoading ? (
            <View style={styles.container}>
              <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
          ) : userData.length ? (
            userData.map((data, index) => {
              const uri = data.profilePhotos?.[0]?.url;
              // const saveUsers = usersData?.savedUsers?.some(({ id }) => [data?._id, data?.id]?.includes(id))
              //   ? IMAGES.star
              //   : IMAGES.unstar;
              return (
                <View style={[GlobalStyleSheet.col50, { marginBottom: 10 }]} key={index}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("ProfileDetails", {
                        item: {
                          ...data,
                          gender: genderMap[data.gender],
                          lookingFor: lookingForMap[data.preferences.lookingFor],
                          genderPreference: genderMap[data.preferences.genderPreference],
                        },
                      })
                    }
                  >
                    {uri && (
                      <Image
                        style={{
                          width: "100%",
                          height: 220,
                          borderRadius: 10,
                        }}
                        source={{ uri }}
                      />
                    )}
                    <View
                      style={{
                        position: "absolute",
                        top: 6,
                        right: 0,
                        zIndex: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: 10,
                        paddingVertical: 3,
                      }}
                    >
                      <TouchableOpacity
                        onPress={async () => {
                          if (savedUsers[data?._id] === true || savedUsers[data?.id] === true) {
                            const userId = data?._id || data?.id;
                            setSavedUsers((prev) => ({ ...prev, [userId]: false }));
                            services?.updateFeedUser("unsave", userId);
                          } else {
                            const userId = data?._id || data?.id;
                            setSavedUsers((prev) => ({ ...prev, [userId]: true }));
                            services.updateFeedUser("save", userId);
                          }
                        }}
                      >
                        <Image
                          style={{ height: 24, width: 24, top: 1, tintColor: COLORS.primary }}
                          source={
                            savedUsers[data?._id] === true || savedUsers[data?.id] === true
                              ? IMAGES.star
                              : IMAGES.unstar
                          }
                        />
                      </TouchableOpacity>
                    </View>
                    <LinearGradient
                      colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,.4)"]}
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        top: 0,
                        borderRadius: 10,
                        paddingHorizontal: 15,
                        paddingVertical: 15,
                        justifyContent: "flex-end",
                      }}
                    >
                      <Text style={{ ...FONTS.h6, color: COLORS.white }}>
                        {data.name}, {calculateAge(data.dob)}
                      </Text>
                      <View style={{ flexDirection: "row", alignItems: "center", gap: 5, marginTop: 2 }}>
                        <Image
                          style={{
                            height: 14,
                            width: 12,
                            resizeMode: "contain",
                            tintColor: COLORS.primary,
                          }}
                          source={IMAGES.pin2}
                        />
                        <Text style={{ ...FONTS.font, color: COLORS.white, opacity: 0.75 }} numberOfLines={1}>
                          {data?.currentAddress}
                        </Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              );
            })
          ) : (
            <View style={[styles.container, { flexDirection: "column", gap: 10 }]}>
              <View style={{ alignItems: "center", paddingVertical: 20 }}>
                <View style={{ paddingVertical: 20 }}>
                  <Image
                    style={{
                      height: 200,
                      width: 200,
                    }}
                    source={{ uri: "https://static.thenounproject.com/png/4604295-200.png" }}
                    tintColor={COLORS.primary}
                  />
                </View>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                  <Text style={{ ...FONTS.h3, color: colors.text, marginBottom: 20 }}>{userIntractionType?.line}</Text>
                  <View style={{ gap: 2, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ ...FONTS.fontLg, color: colors.text }}>{userIntractionType.subline}</Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  paddingHorizontal: 45,
                  paddingVertical: 35,
                  gap: 10,
                  width: "100%",
                }}
              >
                <GradientBtn
                  title={userIntractionType?.buttonTitle}
                  onPress={() => {
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes: [{ name: "DrawerNavigation" }],
                      }),
                    );
                  }}
                />
                {/* <Button title={"Not Now"} btnRounded color="transparent" textColor={COLORS.primary} /> */}
              </View>
            </View>
            //   <Image
            //     style={{
            //       height: 28,
            //       width: 28,
            //     }}
            //     source={IMAGES.think}
            //   />
            //   <Text
            //     style={[FONTS.fontBold, FONTS.fontLg, { color: colors.text }]}
            //   >{`!!! No ${userIntractionType?.description} Users Found`}</Text>
            // </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default UserIntractionData;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: height - 200,
    justifyContent: "center",
    alignItems: "center",
  },
});
