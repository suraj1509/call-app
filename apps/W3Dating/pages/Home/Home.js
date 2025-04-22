/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useFocusEffect, useIsFocused, useTheme } from "@react-navigation/native";
import { ActivityIndicator, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { GlobalStyleSheet } from "../../../../app/constants/StyleSheet";
import { COLORS, FONTS, IMAGES, VIDEOS } from "../../../../app/constants/theme";
import MainSlider from "../components/MainSlider";
// import Geolocation from "react-native-geolocation-service";
// import * as services from "../../../../services/user";
import * as Actions from "../../../../redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import Story from "./Story";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";

const Home = ({ navigation }) => {
  const [users, setUsers] = React.useState([]);
  const dispatch = useDispatch();
  const theme = useTheme();
  const currentUser = useSelector((state) => state?.user?.currentUser);
  const feedUsers = useSelector((state) => state?.user?.feedUsers);
  const [loader, setLoader] = React.useState(false);
  const fetchFeedLoader = useSelector((state) => state?.user?.fetchFeedLoader);

  const calculateDistance = React.useCallback((lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of Earth in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }, []);

  const fetcFeedUsers = async () => {
    setLoader(true);
    const maxDistance = currentUser?.preferences?.maxDistance || null;
    const filteredUsers = await feedUsers?.filter((user) => {
      // Todo: Remove this condition after testing
      if (user._id) return true;

      if (!user?.location?.latitude || !user?.location?.longitude) {
        console.warn(`User ${user?.name} is missing coordinates`);
        return false;
      }

      const distance = calculateDistance(
        currentUser?.location?.latitude,
        currentUser?.location?.longitude,
        user?.location?.latitude,
        user?.location?.longitude,
      );
      return maxDistance ? distance <= maxDistance : true;
    });
    setLoader(false);
    setUsers(filteredUsers);
  };

  React.useEffect(() => {
    // requestLocationPermission();
    setLoader(true);
    dispatch(Actions?.fetchCurrentUser());
    setLoader(false);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const isSwiping = true;
      if (currentUser) {
        dispatch(
          Actions?.fetchFeedUsers(
            currentUser?.preferences?.genderPreference,
            currentUser?.preferences?.ageRange?.max,
            isSwiping,
          ),
        );
      }

      // If you need cleanup logic, return a function
      return () => {
        console.log("Screen unfocused or cleanup logic runs");
      };
    }, [currentUser?.preferences?.genderPreference, currentUser?.preferences?.ageRange?.max]),
  );

  React.useEffect(() => {
    if (currentUser && feedUsers) {
      fetcFeedUsers();
    }
  }, [feedUsers, currentUser]);

  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <View style={GlobalStyleSheet.homeHeader}>
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
          Home
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Filter")}
          style={[GlobalStyleSheet.headerBtn, { borderColor: colors.borderColor }]}
        >
          <Image
            style={{
              height: 22,
              width: 22,
              tintColor: colors.title,
            }}
            source={IMAGES.filter}
          />
        </TouchableOpacity>
      </View>
      {fetchFeedLoader ? (
        <View style={[GlobalStyleSheet.spinner, { padding: 10 }]}>
          <FastImage
            source={VIDEOS.loader}
            style={{ width: "100%", height: "84%", borderRadius: 20 }}
            resizeMode="cover"
          />
          <LinearGradient
            colors={["rgba(0,0,0,0)", "rgba(0,0,0,.8)"]}
            style={{
              position: "absolute",
              height: "84%",
              width: "100%",
              opacity: 0.5,
              // bottom: 0,
              borderRadius: 20,
              justifyContent: "flex-end",
              alignItems: "flex-start",
            }}
          />
        </View>
      ) : (
        <>
          <View
            style={{
              paddingHorizontal: 15,
            }}
          >
            <Story theme={theme} users={users} />
          </View>
          <MainSlider navigation={navigation} users={users} />
        </>
      )}
    </SafeAreaView>
  );
};

export default Home;
