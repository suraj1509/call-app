import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import LinearGradient from "react-native-linear-gradient";
import {Shadow} from "react-native-shadow-2";
import { COLORS, FONTS, IMAGES, SIZES } from "../../../app/constants/theme";

const CustomNavigation = ({ state, navigation, descriptors }) => {
  const { colors } = useTheme();

  const offset = useSharedValue(0);

  const tabShapeStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: offset.value,
        },
      ],
    };
  });

  React.useEffect(() => {
    let a = 0;

    if (state.index === 0) {
      a = 0;
    } else if (state.index === 1) {
      a = SIZES.width / 4;
    } else if (state.index === 2) {
      a = SIZES.width / 4 + SIZES.width / 4;
    } else if (state.index === 3) {
      a = SIZES.width / 4 + SIZES.width / 4 + SIZES.width / 4;
    } else if (state.index === 4) {
      a = SIZES.width - SIZES.width / 4;
    }

    offset.value = withTiming(a, { duration: 100 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.index]);

  return (
    <>
      <View
        style={{
          height: 60,
          flexDirection: "row",
          position: "absolute",
          width: "auto",
          left: 0,
          right: 0,
          bottom: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: colors.cardBg,
          shadowColor: "rgba(0,0,0,.6)",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4.65,

          elevation: 8,
        }}
      >
        <Animated.View style={[tabShapeStyle]}>
          <View
            style={{
              width: SIZES.width / 4,
              position: "absolute",
              zIndex: 1,
              top: 7.5,
              left: 0,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Shadow
              style={{
                shadowColor: COLORS.primary,
                shadowOffset: {
                  width: 0,
                  height: 5,
                },
                shadowOpacity: 0.5,
                shadowRadius: 12,
              }}
            >
              <LinearGradient
                colors={["#f481a1", "#fb6d7d"]}
                style={{
                  height: 45,
                  width: 45,
                  borderRadius: 45,
                }}
              ></LinearGradient>
            </Shadow>
          </View>
        </Animated.View>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({ name: route.name, merge: true });
            }

            if (route.name == "Home") {
              var a = 0;
            } else if (route.name == "Cards") {
              var a = SIZES.width / 4;
            } else if (route.name == "Likes") {
              var a = SIZES.width / 4 + SIZES.width / 4;
            } else if (route.name == "Chat") {
              var a = SIZES.width / 4 + SIZES.width / 4 + SIZES.width / 4;
            } else if (route.name == "Profile") {
              var a = SIZES.width - SIZES.width / 4;
            }

            var b = withTiming(a);
            offset.value = b;
          };

          return (
            <View style={styles.tabItem} key={index}>
              <TouchableOpacity style={styles.tabLink} onPress={onPress}>
                <Image
                  style={{
                    height: 22,
                    width: 22,
                    resizeMode: "contain",
                    opacity: isFocused ? 1 : 0.6,
                    tintColor: isFocused ? COLORS.white : colors.text,
                  }}
                  source={
                    label === "Home"
                      ? IMAGES.home
                      : label === "Cards"
                      ? IMAGES.home
                      : label === "Likes"
                      ? IMAGES.shield
                      : label === "Chat"
                      ? IMAGES.notification
                      : label === "Profile" && IMAGES.user
                  }
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  tabLink: {
    alignItems: "center",
    padding: 15,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  navText: {
    ...FONTS.fontSm,
  },
});

export default CustomNavigation;
