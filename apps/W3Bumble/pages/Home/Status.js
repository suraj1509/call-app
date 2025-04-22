import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useTheme } from "@react-navigation/native";
import { COLORS, FONTS, IMAGES } from "../../../../app/constants/theme";
import { BlurView } from "@react-native-community/blur";
import LinearGradient from "react-native-linear-gradient";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const Status = ({ route, navigation }) => {
  const { name, image, statusData } = route.params;

  //const moresheet = React.useRef();

  const [current, setCurrent] = useState({ data: statusData[0], index: 0 });

  //const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (current.index === statusData.length - 1) {
        return navigation.goBack();
      }
      setCurrent({
        ...current,
        index: current.index + 1,
        data: statusData[current.index + 1],
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, [current]);

  const ProgressView = (props) => {
    const progressAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.timing(progressAnim, {
        toValue: (width - 40) / statusData.length,
        duration: 3000,
        useNativeDriver: false,
      }).start();
    }, [progressAnim]);

    return <Animated.Text style={{ backgroundColor: "#fff", width: progressAnim }}></Animated.Text>;
  };

  const handlePressIn = () => {};

  const handlePressOut = () => {};

  const theme = useTheme();
  const { colors } = theme;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <StatusBar barStyle="light-content" backgroundColor={"#000"} />
      <Image
        style={{ width: "100%", height: undefined, aspectRatio: 1 / 2.1, position: "absolute" }}
        source={current.data}
      />
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.70)",
          position: "absolute",
        }}
      />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : ""}>
        <ScrollView
          //flexglow={1}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.statusTabContainer}>
            {statusData.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.statusTab,
                  {
                    marginHorizontal: 2,
                    backgroundColor: "rgba(255,255,255,.2)",
                  },
                ]}>
                {current.index === index ? <ProgressView /> : null}
              </View>
            ))}
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 10, paddingTop: 10 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FeatherIcon size={18} color={COLORS.white} name={"arrow-left"} />
            </TouchableOpacity>
            <View
              style={{
                height: 48,
                width: 48,
                backgroundColor: COLORS.white,
                borderRadius: 50,
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Image
                style={{
                  height: 45,
                  width: 45,
                  borderRadius: 50,
                  //marginRight: 10,
                }}
                source={image}
              />
            </View>
            <View>
              <Text style={{ ...FONTS.fontBold, fontSize: 18, color: COLORS.white, flex: 1 }}>{name}</Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 5, marginTop: 2 }}>
                <Image
                  style={{
                    height: 15,
                    width: 9,
                    resizeMode: "contain",
                    tintColor: COLORS.white,
                  }}
                  source={IMAGES.pin2}
                />
                <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: COLORS.white }} numberOfLines={1}>
                  Bali, Indonesia
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={current.data}
              //source={IMAGES.slderPic6}
              resizeMode="contain"
              style={styles.imageStyle}
            />
          </View>

          <Pressable
            onLongPress={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => {
              if (current.index === 0) {
                return navigation.goBack();
              }
              setCurrent({
                ...current,
                index: current.index - 1,
                data: statusData[current.index - 1],
              });
            }}
            style={[styles.controller]}></Pressable>
          <TouchableOpacity
            onPress={() => {
              if (current.index === statusData.length - 1) {
                return navigation.goBack();
              }
              setCurrent({
                ...current,
                index: current.index + 1,
                data: statusData[current.index + 1],
              });
            }}
            style={[styles.controller, { right: 0 }]}></TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 30,
              position: "absolute",
              // backgroundColor:'red',
              width: "100%",
              bottom: 30,
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              activeOpacity={0.5}
              style={{
                height: 60,
                width: 60,
                borderRadius: 50,
                backgroundColor: "#141414",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <FeatherIcon color={COLORS.white} size={30} name={"x"} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5}>
              <LinearGradient
                colors={["#F75B49", "#F9823B"]}
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 50,
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <FontAwesome size={24} color={COLORS.white} name="heart" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  statusTabContainer: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 12,
    paddingBottom: 10,
    paddingTop: 10,
  },
  statusTab: {
    height: 2,
    // backgroundColor: '#fff',
    backgroundColor: "rgba(255,255,255,.2)",
    flex: 1,
  },
  controller: {
    position: "absolute",
    width: width / 2,
    height: height * 0.85,
    bottom: 0,
  },
  imageContainer: {
    flex: 1,
    paddingBottom: 80,
    justifyContent: "center",
    minHeight: 600,
    //backgroundColor:'green'
  },
  imageStyle: {
    width: "100%",
    height: height / 1.4,
    maxHeight: height / 1.4,
  },
});

export default Status;
