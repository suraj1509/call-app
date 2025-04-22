import React from "react";
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import Header from "../../../../app/layout/Header";
import { GlobalStyleSheet } from "../../../../app/constants/StyleSheet";
import { COLORS, FONTS, IMAGES, SIZES } from "../../../../app/constants/theme";
import FeatherIcon from "react-native-vector-icons/Feather";

const ProfileDetails = ({ route }) => {
  const theme = useTheme();
  const { colors } = theme;
  const { item } = route.params;

  const navigation = useNavigation();

  const basicsData = [
    {
      icon: IMAGES.rulercombined,
      title: "160 cm",
    },
    {
      icon: IMAGES.gym,
      title: "Active",
    },
    {
      icon: IMAGES.graduationcap,
      title: "In College",
    },
    {
      icon: IMAGES.smoking,
      title: "Smoke",
    },
    {
      icon: IMAGES.prayinghands,
      title: "Hindu",
    },
  ];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.cardBg,
      }}
    >
      <Header leftIcon={"back"} title={"Recommendation"} titleLeft />
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
              source={{ uri: item.profilePhoto }}
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
                <View style={{ flex: 1 }}>
                  <Text style={{ ...FONTS.h6, color: COLORS.white }}>
                    {item.name}, {item.age}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 5, marginTop: 2 }}>
                    <Image
                      style={{
                        height: 14,
                        width: 12,
                        resizeMode: "contain",
                        tintColor: COLORS.primary4,
                      }}
                      source={IMAGES.pin2}
                    />
                    <Text style={{ ...FONTS.font, color: COLORS.white, opacity: 0.75 }} numberOfLines={1}>
                      {item?.permanentAddress?.city},{item?.permanentAddress?.country}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("SingleChat", { data: item })}>
                  <Image style={{ height: 55, width: 55, resizeMode: "contain" }} source={IMAGES.chat4} />
                </TouchableOpacity>
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
                  backgroundColor: COLORS.success,
                  borderRadius: 8,
                  marginRight: 6,
                }}
              />
              <Text style={{ ...FONTS.fontSm, color: COLORS.white, top: -1 }}>Recently active</Text>
            </View>
          </View>
          <View style={{ paddingHorizontal: 8 }}>
            <Text
              style={{
                ...FONTS.fontSemiBold,
                fontSize: 18,
                color: theme.dark ? colors.title : "#141414",
                marginBottom: 10,
              }}
            >
              About Me
            </Text>
            <Text
              style={{
                ...FONTS.font,
                color: "#666666",
                fontSize: 16,
                lineHeight: 18,
                marginBottom: 15,
              }}
            >
              {item?.about}
            </Text>
            <Text
              style={{
                ...FONTS.fontSemiBold,
                fontSize: 18,
                color: theme.dark ? colors.title : "#141414",
                marginBottom: 10,
              }}
            >
              My basics
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginBottom: 8,
              }}
            >
              {basicsData.map((data, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      backgroundColor: "#FFF8DE",
                      marginRight: 8,
                      marginBottom: 8,
                      flexDirection: "row",
                      alignItems: "center",
                      borderRadius: 30,
                      paddingHorizontal: 15,
                      paddingVertical: 5,
                    }}
                  >
                    <Image
                      style={{ height: 14, width: 14, resizeMode: "contain", marginRight: 6 }}
                      source={data.icon}
                    />
                    <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: "#141414", top: -1 }}>{data.title}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Text
              style={{
                ...FONTS.fontSemiBold,
                fontSize: 18,
                color: theme.dark ? colors.title : "#141414",
                marginBottom: 10,
              }}
            >
              My interests
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginBottom: 8,
              }}
            >
              {item?.interests?.map((data, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      backgroundColor: "#FFF8DE",
                      marginRight: 8,
                      marginBottom: 8,
                      flexDirection: "row",
                      alignItems: "center",
                      borderRadius: 30,
                      paddingHorizontal: 15,
                      paddingVertical: 5,
                    }}
                  >
                    {/* <Image
                      style={{ height: 14, width: 14, resizeMode: "contain", marginRight: 6 }}
                      source={data.icon}
                    /> */}
                    <FeatherIcon color={COLORS.dark} size={14} style={{ marginRight: 6 }} name={data.icon} />

                    <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: "#141414", top: -1 }}>{data.title}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Text
              style={{
                ...FONTS.fontSemiBold,
                fontSize: 18,
                color: theme.dark ? colors.title : "#141414",
                marginBottom: 10,
              }}
            >
              Languages
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginBottom: 8,
              }}
            >
              {item?.languagesSpoken?.map((data, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      backgroundColor: "#FFF8DE",
                      marginRight: 8,
                      marginBottom: 8,
                      flexDirection: "row",
                      alignItems: "center",
                      borderRadius: 30,
                      paddingHorizontal: 15,
                      paddingVertical: 5,
                    }}
                  >
                    <Image
                      style={{ height: 14, width: 14, resizeMode: "contain", marginRight: 6 }}
                      source={IMAGES.messages}
                    />
                    <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: "#141414", top: -1 }}>{data}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileDetails;
