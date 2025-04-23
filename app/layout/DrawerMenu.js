import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import FeatherIcon from "react-native-vector-icons/Feather";
import { CommonActions, useNavigation, useTheme, DrawerActions } from "@react-navigation/native";
import { COLORS, FONTS, ICONS, IMAGES } from "../constants/theme";
import Divider from "../components/Dividers/Divider";
import ToggleStyle1 from "../components/Toggles/ToggleStyle1";
import themeContext from "../constants/themeContext";
import auth from "@react-native-firebase/auth";
import { useSelector } from "react-redux";

const DrawerMenu = () => {
  const user = useSelector((state) => state?.user?.currentUser);
  const navigation = useNavigation();
  const { colors } = useTheme();
  const theme = useTheme();
  const { setDarkTheme, setLightTheme } = React.useContext(themeContext);

  return (
    <>
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 15,
            paddingVertical: 15,
            backgroundColor: COLORS.primary,
          }}
        >
          {user.profilePhotos[0] ? (<View
            style={{
              borderRadius: 50,
              borderWidth: 2,
              borderColor: COLORS.white,
              marginRight: 12,
            }}
          >
            <Image
              style={{
                height: 48,
                width: 48,
                borderRadius: 50,
              }}
              source={{ uri: user.profilePhotos[0] }}
            />
          </View>):(
          <View
            style={{
              borderRadius: 50,
              borderWidth: 2,
              borderColor: COLORS.white,
              marginRight: 12,
              height: 52,
              width: 52,
              justifyContent:"center",
              alignItems:"center",
            }}
          >
            <Image
              style={{
                height: 38,
                width: 38,
                borderRadius: 50,
              }}
              source={IMAGES.avtar2}
            />
          </View>)}
          <View>
            <Text style={{ ...FONTS.h6, color: COLORS.white, lineHeight: 20 }}>{user?.name}</Text>
            {user?.email ? (
              <Text style={{ ...FONTS.font, color: COLORS.white }}>{user?.email}</Text>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  navigation.dispatch(DrawerActions.closeDrawer());
                  navigation.navigate("EditProfile");
                }}
              >
                <Text style={{ ...FONTS.fontBold, color: COLORS.white }}>Add Email</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={{ paddingHorizontal: 15, paddingVertical: 20, flex: 1 }}>
          <Text style={{ ...FONTS.h6, color: colors.title, marginBottom: 5 }}>Main menu</Text>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("BottomNavigation", { screen: "Home" });
            }}
            style={[styles.navLink]}
          >
            <SvgXml style={{ marginRight: 10 }} xml={ICONS.home} />
            <Text style={[styles.navText, { color: colors.text }]}>Home</Text>
            <FeatherIcon size={16} color={colors.text} name={"chevron-right"} />
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => navigation.navigate("Components")} style={[styles.navLink]}>
            <SvgXml style={{ marginRight: 10 }} xml={ICONS.components} />
            <Text style={[styles.navText, { color: colors.text }]}>Components</Text>
            <FeatherIcon size={16} color={colors.text} name={"chevron-right"} />
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => navigation.navigate("EditProfile")} style={[styles.navLink]}>
            <SvgXml style={{ marginRight: 12 }} height={22} width={22} stroke={"#bfc9da"} xml={ICONS.setting} />
            <Text style={[styles.navText, { color: colors.text }]}>Settings</Text>
            <FeatherIcon size={16} color={colors.text} name={"chevron-right"} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              await auth().signOut();
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: "OnBoarding" }],
                }),
              );
            }}
            style={[styles.navLink]}
          >
            <SvgXml style={{ marginRight: 10 }} xml={ICONS.logout} />
            <Text style={[styles.navText, { color: colors.text }]}>Logout</Text>
            <FeatherIcon size={16} color={colors.text} name={"chevron-right"} />
          </TouchableOpacity>
          {/* <Divider /> */}

          {/* <Text style={{ ...FONTS.h6, color: colors.title, marginBottom: 5 }}>Settings</Text> */}
          {/* <TouchableOpacity style={[styles.navLink]}>
            <SvgXml style={{ marginRight: 10 }} xml={ICONS.dark} />
            <Text style={[styles.navText, { color: colors.text }]}>Dark Mode</Text>
            <ToggleStyle1
              active={theme.dark}
              onToggle={(value) => {
                if (value) {
                  setLightTheme();
                } else {
                  setDarkTheme();
                }
              }}
            />
          </TouchableOpacity> */}
        </View>
        <View style={{ paddingBottom: 30, paddingHorizontal: 15, paddingTop: 20 }}>
          {/* <Text style={{ ...FONTS.h6, color: colors.title }}>Dating - Mobile Template</Text>
          <Text style={{ ...FONTS.font, color: colors.text }}>App Version 1.0</Text> */}
          <TouchableOpacity
            style={[styles.navLink]}
            onPress={() => {
              if (theme?.dark) {
                setLightTheme();
              } else {
                setDarkTheme();
              }
            }}
          >
            <SvgXml style={{ marginRight: 10 }} xml={ICONS.dark} />
            <Text style={[styles.navText, { color: colors.text }]}>Dark Mode</Text>
            <ToggleStyle1
              active={theme.dark}
              onToggle={(value) => {
                if (value) {
                  setLightTheme();
                } else {
                  setDarkTheme();
                }
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  navLink: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  navText: {
    ...FONTS.font,
    color: COLORS.title,
    flex: 1,
  },
});

export default DrawerMenu;
