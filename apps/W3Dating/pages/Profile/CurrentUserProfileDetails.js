import React, { useEffect } from "react";
import { Image, SafeAreaView, ScrollView, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import FeatherIcon from "react-native-vector-icons/Feather";
import Header from "../../../../app/layout/Header";
import { GlobalStyleSheet } from "../../../../app/constants/StyleSheet";
import { COLORS, FONTS, IMAGES, SIZES } from "../../../../app/constants/theme";
import { useSelector } from "react-redux";

const CurrentUserProfileDetails = ({ route }) => {
  const { colors } = useTheme();
  const currentUser = useSelector((state) => state?.user?.currentUser);

  const lookingFor = {
    0: "Long-term partner",
    1: "Long-term, open to short",
    2: "Short-term, open to long",
    3: "Short-term fun",
    4: "New friends",
    5: "Stil figuring it out",
  };

  const getGender = (num) => {
    if (num === 0) {
      return "Women";
    } else if (num === 1) {
      return "Men";
    } else {
      return "Others";
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.cardBg,
      }}
    >
      <Header leftIcon={"back"} title={"Profile Details"} titleLeft />
      <ScrollView>
        <View style={GlobalStyleSheet.container}>
          <View style={{ marginBottom: 15, marginHorizontal: -5 }}>
            <Image
              style={{
                width: "100%",
                height: undefined,
                aspectRatio: 1 / 1.3,
                borderRadius: SIZES.radius,
              }}
              source={{ uri: currentUser.profilePhotos[0]?.url }}
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
                  style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}
                >
                  <View>
                    <Text style={{ ...FONTS.h6, color: COLORS.white }}>
                      {currentUser.name}, {route?.params?.age}
                    </Text>
                    {/* <Text style={{ ...FONTS.font, color: COLORS.white, opacity: 0.75 }} numberOfLines={1}>
                    {item.about}
                  </Text> */}
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
                        {currentUser?.currentAddress}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text style={{ ...FONTS.h6, color: COLORS.white, display: "none" }}>
                      {currentUser.name}, {route?.params?.age}
                    </Text>
                    {/* <Text style={{ ...FONTS.font, color: COLORS.white, opacity: 0.75 }} numberOfLines={1}>
                    {item.about}
                  </Text> */}
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5, marginTop: 2 }}>
                      {currentUser?.permanentAddress && (
                        <Image
                          style={{
                            height: 14,
                            width: 12,
                            resizeMode: "contain",
                            tintColor: COLORS.primary,
                          }}
                          source={IMAGES.home3}
                        />
                      )}
                      <Text style={{ ...FONTS.font, color: COLORS.white, opacity: 0.75 }} numberOfLines={1}>
                        {currentUser?.permanentAddress}
                      </Text>
                    </View>
                  </View>
                </View>
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
                display: "none",
              }}
            >
              <View
                style={{
                  height: 8,
                  width: 8,
                  backgroundColor: COLORS.success,
                  borderRadius: 8,
                  marginRight: 6,
                }}
              />
              <Text style={{ ...FONTS.fontSm, color: COLORS.white, top: -1 }}>Recently active</Text>
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
            >
              <TouchableOpacity
                onPress={async () => {
                  dispatch(
                    Actions?.updateFeedUserInfo({
                      type: saveUsers === IMAGES.save ? "unsave" : "save",
                      userId: item?._id || item?.id,
                    }),
                  );
                  ToastAndroid.show(
                    `User ${saveUsers === IMAGES.save ? "remove from favorite list" : "added to favorite list"}`,
                    ToastAndroid.SHORT,
                  );
                }}
              >
                <Image style={{ height: 28, width: 28, top: 1, tintColor: COLORS.primary }} source={saveUsers} />
              </TouchableOpacity>
            </View> */}
          </View>
          <View style={{ paddingHorizontal: 8 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 4,
              }}
            >
              <Text style={{ ...FONTS.h6, color: COLORS.textLight }}>{getGender(currentUser?.gender)}</Text>
              <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8 }}>
                <FeatherIcon color={COLORS.textLight} size={20} name="eye" />
                <Text style={{ ...FONTS.h6, color: COLORS.textLight }}>
                  {getGender(currentUser?.preferences?.genderPreference)}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 4,
              }}
            >
              <Text style={{ ...FONTS.h6, color: COLORS.textLight }}>
                {lookingFor[currentUser?.preferences?.lookingFor]}
              </Text>
            </View>
            <Text style={{ ...FONTS.h6, fontSize: 15, color: colors.title, marginBottom: 2 }}>About Me</Text>
            <Text style={{ ...FONTS.font, color: colors.textLight, lineHeight: 18, marginBottom: 15 }}>
              {currentUser?.about}
            </Text>
            {currentUser?.basics && (
              <Text style={{ ...FONTS.h6, fontSize: 15, color: colors.title, marginBottom: 4 }}>Basics</Text>
            )}
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginBottom: 8,
              }}
            >
              {/* {!item?.basics && (
                <TouchableOpacity
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
                  <Text style={{ ...FONTS.font, color: colors.title, top: -1 }}>! No Available Basics</Text>
                </TouchableOpacity>
              )} */}

              {currentUser?.basics?.map((data, index) => {
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
                    <FeatherIcon color={colors.textLight} size={14} style={{ marginRight: 6 }} name={data.icon} />
                    <Text style={{ ...FONTS.font, color: colors.title, top: -1 }}>{data.title}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            {!(currentUser?.interests?.length === 0) && (
              <Text style={{ ...FONTS.h6, fontSize: 15, color: colors.title, marginBottom: 4 }}>Interests</Text>
            )}
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginBottom: 8,
              }}
            >
              {/* {item?.interests?.length === 0 && (
                <TouchableOpacity
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
                  <Text style={{ ...FONTS.font, color: colors.title, top: -1 }}>! No Available Interests</Text>
                </TouchableOpacity>
              )} */}
              {currentUser?.interests?.map((data, index) => {
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
                    <FeatherIcon color={colors.textLight} size={14} style={{ marginRight: 6 }} name={data.icon} />
                    <Text style={{ ...FONTS.font, color: colors.title, top: -1 }}>{data.title}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            {!(currentUser?.languagesSpoken?.length === 0) && (
              <Text style={{ ...FONTS.h6, fontSize: 15, color: colors.title, marginBottom: 4 }}>Languages</Text>
            )}
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginBottom: 8,
              }}
            >
              {/* {item?.languagesSpoken?.length === 0 && (
                <TouchableOpacity
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
                  <Text style={{ ...FONTS.font, color: colors.title, top: -1 }}>! No Available Languages</Text>
                </TouchableOpacity>
              )} */}
              {currentUser?.languagesSpoken?.map((data, index) => {
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
                    <Image
                      style={{ height: 14, width: 14, resizeMode: "contain", marginRight: 6 }}
                      source={IMAGES.messages}
                      tintColor={colors.textLight}
                    />
                    <Text style={{ ...FONTS.font, color: colors.title, top: -1 }}>{data}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <View style={{ marginTop: 5 }}>
            {currentUser?.profilePhotos.length !== 0 &&
              currentUser?.profilePhotos?.slice(1)?.map((itm, index) => {
                const isLastPhoto = index === currentUser.profilePhotos.length - 2;
                const imageUrl = typeof itm === "object" ? itm.url : itm;
                return (
                  <Image
                    key={index}
                    style={{
                      width: "100%",
                      height: undefined,
                      aspectRatio: isLastPhoto ? 1 / 1 : 1 / 0.8,
                      borderRadius: 10,
                      marginBottom: 10,
                    }}
                    source={{ uri: imageUrl }}
                  />
                );
              })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CurrentUserProfileDetails;
