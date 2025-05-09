import React, { useEffect } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import FeatherIcon from "react-native-vector-icons/Feather";
import Header from "../../../../app/layout/Header";
import { GlobalStyleSheet } from "../../../../app/constants/StyleSheet";
import { COLORS, FONTS, IMAGES, SIZES } from "../../../../app/constants/theme";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../../redux/Actions";
import * as services from "../../../../services/socialConnect";
import database from '@react-native-firebase/database';
import GradientBtn from "../components/GradientBtn";
// import FontAwesome from "react-native-vector-icons/FontAwesome";

const ProfileDetails = ({ route }) => {
  const { colors } = useTheme();
  // const theme = useTheme();
  const { item } = route.params;
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state?.user?.currentUser);
  const feedUsers = useSelector((state) => state.user.feedUsers);
  const [activeColor, setActiveColor] = React.useState(COLORS.success);
  const [lastActiveTime, setLastActiveTime] = React.useState("");
  const [activeProfileDetails, setActiveProfileDetails] = React.useState(item);

  const navigation = useNavigation();

  const calculateTimeAgo = (createdAt) => {
    if (!createdAt) {
      return "";
    }
    const now = new Date();
    const messageTime = new Date(createdAt);
    const diffInSeconds = Math.floor((now - messageTime) / 1000);

    if (diffInSeconds < 60) {
      setActiveColor(COLORS.success);
      setLastActiveTime("Active just now");
      return;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      if(diffInMinutes < 5) {
        setActiveColor(COLORS?.warning)
      }else{
        setActiveColor(COLORS.danger)
      }
      setActiveColor(COLORS.danger);
      setLastActiveTime(`Active ${diffInMinutes}m ago`);
      return;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      setActiveColor(COLORS.danger);
      setLastActiveTime(`Active ${diffInHours} hr${diffInHours > 1 ? "s" : ""} ago`);
      return;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) {
      setActiveColor(COLORS.danger);
      setLastActiveTime("Active yesterday");
      return;
    }
    if (diffInDays < 30) {
      // Fixed from 7 to 30 for better day handling
      setActiveColor(COLORS.danger);
      setLastActiveTime(`Active ${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`);
      return;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      setActiveColor(COLORS.danger);
      setLastActiveTime(
        diffInMonths > 0
          ? `Active ${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`
          : `Active ${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`,
      );
      return;
    }

    const diffInYears = Math.floor(diffInMonths / 12);
    setActiveColor(COLORS.danger);
    setLastActiveTime(`Active ${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`);
  };

  React.useEffect(() => {
    if (activeProfileDetails.lastActive) {
      calculateTimeAgo(activeProfileDetails.lastActive);
    }
  }, [activeProfileDetails.lastActive]);

  async function getOrCreateChannel(userId1, userId2) {
    try {
      const channelRef = database().ref('groups');


      const snapshot = await channelRef.once('value');
      const channels = snapshot.val() || {};

      let existingChannel = null;

      Object.entries(channels).forEach(([channelId, channelData]) => {
        if (channelData?.participants) {
          const participantIds = Object.keys(channelData.participants);
          if (
            participantIds.length === 2 &&
            participantIds.includes(userId1) &&
            participantIds.includes(userId2)
          ) {
            existingChannel = { channelId, ...channelData };
          }
        }
      });

      if (existingChannel) {
        return `channel${existingChannel.channelId}`;
      }

      const newChannelRef = channelRef.push();
      const newChannelId = newChannelRef.key;
      // database().ref(`records/${activeProfileDetails?.id}`).push(`channel${newChannelId}`);
      // database().ref(`records/${currentUser?.id}`).push(`channel${newChannelId}`);;

      const initialCallDetails = {
        createdAt: Date.now(),
        participants: {
          [userId1]: true,
          [userId2]: true,
        },
        calls: {},
      };

      await newChannelRef.set(initialCallDetails);
      return `channel${newChannelId}`;

    } catch (error) {
      console.error('Error in getOrCreateChannel:', error);
      throw error;
    }
  }

  function getValidSeconds(walletAmount, amountPerMinute) {
    if (amountPerMinute <= 0) return 0; // prevent divide-by-zero
    const totalMinutes = walletAmount / amountPerMinute;
    const totalSeconds = totalMinutes * 60;
    return Math.floor(totalSeconds); // floor to nearest second
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.cardBg,
      }}
    >
      <Header leftIcon={"back"} title={"Profile Details"} titleLeft />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={GlobalStyleSheet.container}>
          <View style={{ marginBottom: 15, marginHorizontal: -5 }}>
            <Image
              style={{
                width: "100%",
                height: undefined,
                aspectRatio: 1 / 1.3,
                borderRadius: SIZES.radius,
              }}
              source={{ uri: activeProfileDetails?.profilePhoto || activeProfileDetails?.profilePhotos?.[0] }}
            />
            <LinearGradient
              colors={["rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(0,0,0,.7)"]}
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                top: 0,
                borderRadius: 10,
                paddingHorizontal: 18,
                paddingVertical: 25,
                justifyContent: "flex-end",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    position: "absolute",
                    bottom: 60,
                    left: 0,
                    flexDirection: "row",
                    alignItems: "center",
                    // paddingHorizontal: 10,
                    justifyContent: 'space-between',
                    paddingVertical: 3,
                    width: '100%'
                  }}
                >
                  <Text style={{ ...FONTS.h6, color: COLORS.white }}>
                    {activeProfileDetails.name}
                  </Text>

                  {/* <Text style={{ ...FONTS.font, color: COLORS.white, opacity: 0.75 }} numberOfLines={1}>
                    {item.about}
                  </Text> */}
                  {/* <View style={{ flexDirection: "row", alignItems: "center", gap: 5, marginTop: 2 }}>
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
                      {activeProfileDetails?.currentAddress}
                    </Text>
                  </View> */}
                  <Text style={{ ...FONTS.fontBold, color: COLORS.white, }} numberOfLines={1}>
                      ₹ {activeProfileDetails?.rate}
                    </Text>
                </View>
                {/* <View
                  style={{
                    flex: 1,
                    position: "absolute",
                    bottom: 60,
                    right: 0,
                    // flexDirection: "row",
                    // alignItems: "center",
                    // paddingHorizontal: 10,
                    paddingVertical: 3,
                  }}
                > */}
                  {/* <Text style={{ ...FONTS.h6, color: COLORS.white, display: "none" }}>
                    {activeProfileDetails.name}, {activeProfileDetails.dob}
                  </Text> */}

                  {/* <Text style={{ ...FONTS.font, color: COLORS.white, opacity: 0.75 }} numberOfLines={1}>
                    {item.about}
                  </Text> */}
                  {/* <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'center', backgroundColor:'red' }}>
                  <Text style={{ ...FONTS.h6, color: COLORS.white, display: "none" }}>
                    {activeProfileDetails.name}, {activeProfileDetails.dob}
                  </Text> */}
                    {/* {activeProfileDetails?.permanentAddress && (
                      <Image
                        style={{
                          height: 14,
                          width: 12,
                          resizeMode: "contain",
                          tintColor: COLORS.primary,
                        }}
                        source={IMAGES.home3}
                      />
                    )} */}
                    {/* <Text style={{ ...FONTS.fontBold, color: COLORS.white, }} numberOfLines={1}>
                      ₹ {activeProfileDetails?.rate}
                    </Text> */}
                  {/* </View>
                </View> */}
                {/* <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("SingleChat", {
                      data: {
                        ...item,
                        image: item.profilePhoto,
                        id: item._id,
                      },
                    })
                  }
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: COLORS.primary,
                  }}
                >
                  <Image style={{ height: 28, width: 28, top: 1, tintColor: COLORS.white }} source={IMAGES.chat3} />
                </TouchableOpacity> */}
              </View>
            </LinearGradient>
            <View
              style={{
                position: "absolute",
                top: 15,
                left: 15,
                backgroundColor: "rgba(0,0,0,.8)",
                borderRadius: 20,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 10,
                paddingVertical: 3,
              }}
            >
              <View
                style={{
                  height: 8,
                  width: 8,
                  backgroundColor: activeColor,
                  borderRadius: 8,
                  marginRight: 6,
                }}
              />
              <Text style={{ ...FONTS.fontSm, color: COLORS.white, top: -1 }}>{lastActiveTime}</Text>
            </View>
            {/* <View
              style={{
                position: "absolute",
                top: 6,
                right: 0,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 10,
                paddingVertical: 3,
              }}
            > */}
            {/* <TouchableOpacity
               
              >
                <Image style={{ height: 28, width: 28, top: 1, tintColor: COLORS.primary }} source={saveUsers} />
              </TouchableOpacity> */}
            <TouchableOpacity
              style={{
                height: 50,
                width: 50,
                borderRadius: 50,
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                bottom: 20,
                right: 20,
                backgroundColor: COLORS.primary,
              }}
              // onPress={() =>
              //   navigation.navigate("SingleChat", {
              //     data: {
              //       ...activeProfileDetails,
              //       image: activeProfileDetails.profilePhoto,
              //       id: activeProfileDetails._id,
              //     },
              //   })
              // }
              onPress={async () => {
                try {
                  const maxDuration = getValidSeconds(currentUser?.wallet, activeProfileDetails?.rate);
                  const channelName = await getOrCreateChannel(currentUser?.id, activeProfileDetails?.id)
                  const token = await services.createConnect({ channelName: channelName, uid: activeProfileDetails?.id, mode: "chat", id: currentUser?.id, callerName: currentUser?.name, img: currentUser?.profilePhotos[0] });
                  navigation.navigate("SocialConnect", { mode: "chat", channelName: channelName, localUid: activeProfileDetails?.id, token, recieverName: activeProfileDetails?.name, callerName: currentUser?.name, callerId: currentUser?.id, maxDuration, role: currentUser?.role, rate: activeProfileDetails?.rate, wallet: currentUser?.wallet, activeProfileDetails })
                } catch (error) {
                  console.log(error, "error token")
                }
              }}
            // onPress={async () => {})}
            >
              <Image
                style={{
                  height: 28,
                  width: 28,
                  top: 1,
                  tintColor: COLORS.white,
                }}
                source={IMAGES.chat3}
              />
            </TouchableOpacity>
            {/* </View> */}
            <TouchableOpacity
              style={{
                height: 50,
                width: 50,
                borderRadius: 50,
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                bottom: 20,
                right: "42.5%",
                backgroundColor: COLORS.primary,
              }}
              onPress={async () => {
                try {
                  const maxDuration = getValidSeconds(currentUser?.wallet, activeProfileDetails?.rate);
                  const channelName = await getOrCreateChannel(currentUser?.id, activeProfileDetails?.id)
                  const token = await services.createConnect({ channelName: channelName, uid: activeProfileDetails?.id, mode: "video", id: currentUser?.id, callerName: currentUser?.name, img: currentUser?.profilePhotos[0] });
                  navigation.navigate("SocialConnect", { mode: "video", channelName: channelName, localUid: activeProfileDetails?.id, token, recieverName: activeProfileDetails?.name, callerName: currentUser?.name, callerId: currentUser?.id, maxDuration, role: currentUser?.role, rate: activeProfileDetails?.rate, wallet: currentUser?.wallet, activeProfileDetails })
                } catch (error) {
                  console.log(error, "error token")
                }
              }}
            // onPress={async () => {
            //   dispatch(
            //     Actions?.updateFeedUserInfo({
            //       type: saveUsers === IMAGES.star ? "unsave" : "save",
            //       userId: activeProfileDetails?._id || activeProfileDetails?.id,
            //     }),
            //   );
            //   // ToastAndroid.show(
            //   //   `User ${saveUsers === IMAGES.star ? "remove from favorite list" : "added to favorite list"}`,
            //   //   ToastAndroid.SHORT,
            //   // );
            // }}
            >
              <Image
                style={{
                  height: 28,
                  width: 28,
                  top: 1,
                  tintColor: COLORS.white,
                  // backgroundColor: "transparent",
                }}
                source={IMAGES.videoCall}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 50,
                width: 50,
                borderRadius: 50,
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                bottom: 20,
                left: 20,
                backgroundColor: COLORS.primary,
              }}
              // onPress={() => {
              //   setViewedProfiles((prev) => new Set([...prev, activeProfileDetails._id]));
              //   dispatch(Actions.updateFeedUserInfo({ type: "like", userId: activeProfileDetails._id }));
              //   const remainingUsers = feedUsers.filter(
              //     (user) => user._id !== activeProfileDetails._id && !viewedProfiles.has(user._id),
              //   );

              //   if (remainingUsers.length > 0) {
              //     setActiveProfileDetails(remainingUsers[0]);
              //   } else {
              //     navigation.goBack();
              //   }
              // }}
              onPress={async () => {
                try {
                  const maxDuration = getValidSeconds(currentUser?.wallet, activeProfileDetails?.rate);
                  const channelName = await getOrCreateChannel(currentUser?.id, activeProfileDetails?.id)
                  const token = await services.createConnect({ channelName: channelName, uid: activeProfileDetails?.id, mode: "voice", id: currentUser?.id, callerName: currentUser?.name, img: currentUser?.profilePhotos[0] });
                  navigation.navigate("SocialConnect", { mode: "voice", channelName: channelName, localUid: activeProfileDetails?.id, token, recieverName: activeProfileDetails?.name, callerName: currentUser?.name, callerId: currentUser?.id, maxDuration, role: currentUser?.role, rate: activeProfileDetails?.rate, wallet: currentUser?.wallet, activeProfileDetails })
                } catch (error) {
                  console.log(error, "error token")
                }
              }}
            // onPress={()=>navigation.navigate("SocialConnectResponse")}
            >
              <Image
                style={{
                  height: 28,
                  width: 28,
                  top: 1,
                  tintColor: COLORS.white,
                }}
                source={IMAGES.telephone}
              />
            </TouchableOpacity>
            <View
              style={{
                position: "absolute",
                top: 15,
                right: 2,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 10,
                paddingVertical: 3,
              }}
            >
              <Image style={{ height: 48, width: 48, top: 1 }} source={IMAGES.verified} />
            </View>
          </View>
          <View style={{ paddingHorizontal: 8 }}>
            {/* <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 4,
              }}
            > */}
            {/* <Text style={{ ...FONTS.h6, color: COLORS.textLight }}>{activeProfileDetails?.gender}</Text> */}
            {/* <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8 }}>
                <FeatherIcon color={COLORS.textLight} size={20} name="eye" />
                <Text style={{ ...FONTS.h6, color: COLORS.textLight }}>{activeProfileDetails?.genderPreference}</Text>
              </View> */}
            {/* </View> */}
            {/* <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 4,
              }}
            >
              <Text style={{ ...FONTS.h6, color: COLORS.textLight }}>{activeProfileDetails?.lookingFor}</Text>
            </View> */}
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginBottom: 8,
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Text style={{ ...FONTS.h6, fontSize: 15, color: colors.title, marginBottom: 4 }}>Rating</Text>
              <View style={{ flexDirection: 'row' }}>
                {Array.from({ length: 5 }).map((_, index) => {
                  const starValue = index + 1;
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handlePress(starValue)}
                      activeOpacity={0.7}
                    >
                      <Text style={[{
                        fontSize: 24,
                        marginHorizontal: 4,
                      }, starValue <= 4 ? {
                        color: COLORS.primary,
                      } : {
                        color: '#ccc',
                      }]}>
                        ★
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            {activeProfileDetails?.about?.length !== 0 && (<Text style={{ ...FONTS.h6, fontSize: 15, color: colors.title, marginBottom: 2 }}>About Me</Text>)}
            {activeProfileDetails?.about?.length !== 0 && (<Text style={{ ...FONTS.font, color: colors.textLight, lineHeight: 18, marginBottom: 15 }}>
              {activeProfileDetails?.about}
            </Text>)}
            <Text style={{ ...FONTS.h6, fontSize: 15, color: colors.title, marginBottom: 4 }}>Languages</Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginBottom: 8,
              }}
            >
              {["hindi", "marathi", "english"].map((data, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      backgroundColor: "rgba(0,0,0,0.03)",
                      marginRight: 8,
                      marginBottom: 8,
                      flexDirection: "row",
                      alignItems: "center",
                      borderWidth: 1,
                      borderColor: colors.borderColor,
                      borderRadius: 30,
                      paddingHorizontal: 12,
                      paddingVertical: 4,
                    }}
                  >
                    <Text style={{ ...FONTS.font, color: colors.title, top: -1 }}>{data}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Text style={{ ...FONTS.h6, fontSize: 15, color: colors.title, marginBottom: 4 }}>Comments</Text>
            <View
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
                  Set Rate
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
                  This is a sample text for comment
                </Text>
              </View>
            </View>
          </View>
          <GradientBtn title={activeColor === COLORS?.success  ? "Call Now" : "Request A CallBack"}/> 
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileDetails;
