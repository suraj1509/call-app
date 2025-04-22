import React, { Component } from "react";
import { Animated, Image, PanResponder, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { COLORS, FONTS, IMAGES, SIZES } from "../../../../app/constants/theme";
import EmptyCard from "./EmptyCard";
import { connect } from "react-redux";
import * as Actions from "../../../../redux/Actions";

class MainSlider extends Component {
  constructor(props) {
    super(props);
    this.position = new Animated.ValueXY();
    this.state = {
      currentIndex: 0,
      isEmpty: false,
      isSaved: false,
    };
    this.rotate = this.position.x.interpolate({
      inputRange: [-SIZES.width / 2, 0, SIZES.width / 2],
      outputRange: ["-10deg", "0deg", "10deg"],
      extrapolate: "clamp",
    });
    this.rotateAndTranslate = {
      transform: [
        {
          rotate: this.rotate,
        },
        ...this.position.getTranslateTransform(),
      ],
    };
    this.likeOpacity = this.position.x.interpolate({
      inputRange: [-SIZES.width / 2, 0, SIZES.width / 2],
      outputRange: [0, 0, 1],
      extrapolate: "clamp",
    });
    this.layerlikeOpacity = this.position.x.interpolate({
      inputRange: [-SIZES.width / 2, 0, SIZES.width / 2],
      outputRange: [0, 0, 0.4],
      extrapolate: "clamp",
    });
    this.nopeOpacity = this.position.x.interpolate({
      inputRange: [-SIZES.width / 2, 0, SIZES.width / 2],
      outputRange: [1, 0, 0],
      extrapolate: "clamp",
    });
    this.nlayerOpacity = this.position.x.interpolate({
      inputRange: [-SIZES.width / 2, 0, SIZES.width / 2],
      outputRange: [0.4, 0, 0],
      extrapolate: "clamp",
    });
    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SIZES.width / 2, 0, SIZES.width / 2],
      outputRange: [1, 0, 1],
      extrapolate: "clamp",
    });
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SIZES.width / 2, 0, SIZES.width / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: "clamp",
    });
  }

  PanResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderMove: (_, gestureState) => {
      this.position.setValue({ x: gestureState.dx, y: 0 });
    },
    onPanResponderRelease: async (_, gestureState) => {
      const isTap = Math.abs(gestureState.dx) < 5 && Math.abs(gestureState.dy) < 5;
      const { users } = this.props;
      if (isTap) {
        this.props.navigation.navigate("ProfileDetails", {
          item: users[this.state.currentIndex],
        });
      } else if (gestureState.dx > 120) {
        Animated.spring(this.position, {
          toValue: { x: SIZES.width + 100, y: gestureState.dy },
          useNativeDriver: false,
        }).start(() => {
          this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
            this.position.setValue({ x: 0, y: 0 });
          });
        });
        if (users.length === this.state.currentIndex + 1) {
          this.setState({ isEmpty: true });
        }
        const { dispatch } = this.props;
        dispatch(Actions?.updateFeedUserInfo({ type: "like", userId: users?.[this.state.currentIndex]?._id }));
      } else if (gestureState.dx < -120) {
        Animated.spring(this.position, {
          toValue: { x: -SIZES.width - 100, y: gestureState.dy },
          useNativeDriver: false,
        }).start(() => {
          this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
            this.position.setValue({ x: 0, y: 0 });
          });
        });
        if (users.length === this.state.currentIndex + 1) {
          this.setState({ isEmpty: true });
        }
        const { dispatch } = this.props;
        dispatch(Actions?.updateFeedUserInfo({ type: "reject", userId: users?.[this.state.currentIndex]?._id }));
      } else {
        Animated.spring(this.position, {
          toValue: { x: 0, y: 0 },
          friction: 4,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  calculateAge(dobString) {
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

  renderFeeds = () => {
    const { users } = this.props;
    return users
      ?.map((item, i) => {
        const isCurrent = i === this.state.currentIndex;
        const isNext = i === this.state.currentIndex + 1;
        // if (i === this.state.currentIndex) {
        return (
          <Animated.View
            {...this.PanResponder.panHandlers}
            key={i}
            style={[
              isCurrent ? this.rotateAndTranslate : { opacity: isNext ? 1 : 0 },
              {
                height: "100%",
                width: SIZES.width,
                padding: 10,
                position: "absolute",
              },
            ]}
          >
            {isCurrent && (
              <>
                {/* Current Card: Show overlays and swipe icons */}
                <Animated.View
                  style={{
                    opacity: this.likeOpacity,
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    top: 50,
                    left: 40,
                    height: 50,
                    width: 50,
                    borderRadius: 50,
                    backgroundColor: COLORS.success,
                    zIndex: 1000,
                  }}
                >
                  <FontAwesome5 size={24} color={COLORS.white} name="check" />
                </Animated.View>
                <Animated.View
                  style={{
                    opacity: this.nopeOpacity,
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    top: 50,
                    right: 40,
                    height: 50,
                    width: 50,
                    borderRadius: 50,
                    backgroundColor: COLORS.danger,
                    zIndex: 1000,
                  }}
                >
                  <FontAwesome5 size={24} color={COLORS.white} name="times" />
                </Animated.View>
              </>
            )}

            <View style={{ flex: 1, backgroundColor: "#A9A9A9", borderRadius: 20 }}>
              {item?.profilePhoto && (
                <Image
                  style={{
                    flex: 1,
                    height: null,
                    width: null,
                    resizeMode: "cover",
                    borderRadius: 20,
                  }}
                  source={{ uri: item.profilePhoto }}
                />
              )}

              {isCurrent && (
                <Animated.View
                  style={{
                    opacity: this.nlayerOpacity,
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    top: 0,
                    left: 0,
                    backgroundColor: COLORS.danger,
                    borderRadius: 20,
                  }}
                />
              )}
              {isCurrent && (
                <Animated.View
                  style={{
                    opacity: this.layerlikeOpacity,
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    top: 0,
                    left: 0,
                    backgroundColor: "#00c37b",
                    borderRadius: 20,
                  }}
                />
              )}
              <LinearGradient
                colors={["rgba(0,0,0,0)", "rgba(0,0,0,.8)"]}
                style={{
                  position: "absolute",
                  height: 200,
                  width: "100%",
                  bottom: 0,
                  borderRadius: 20,
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                }}
              >
                <TouchableOpacity
                  onPress={async () => {
                    this.props.navigation.navigate("ProfileDetails", {
                      item: item,
                    });
                  }}
                  style={{
                    paddingVertical: 25,
                    paddingHorizontal: 20,
                    paddingBottom: 80,
                  }}
                >
                  <Text style={{ ...FONTS.h4, color: COLORS.white }}>
                    {item.name} , {item.dob && this.calculateAge(item.dob)}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                    <Image style={{ height: 16, width: 12 }} source={IMAGES.pin2} />
                    <Text style={{ ...FONTS.fontMedium, fontSize: 16, color: COLORS.white }}>
                      {item?.currentAddress || ""}
                    </Text>
                  </View>
                  <Text style={{ ...FONTS.font, color: COLORS.white, opacity: 0.75 }}>
                    {item?.about ? (item.about.length > 50 ? `${item.about.slice(0, 50)}...` : item.about) : ""}
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
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
                onPress={async () => {
                  this.props.navigation.navigate("SingleChat", {
                    data: {
                      ...item,
                      image: item.profilePhoto,
                      id: item._id,
                    },
                  });
                }}
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
                  this.setState({
                    isSaved: !this.state.isSaved,
                  });
                  const { dispatch } = this.props;
                  // ToastAndroid.show(`User added to favorite list`, ToastAndroid.SHORT);
                  dispatch(Actions?.updateFeedUserInfo({ type: "save", userId: item._id }));
                }}
              >
                <Image
                  style={{
                    height: 28,
                    width: 28,
                    top: 1,
                    tintColor: COLORS.white,
                    // backgroundColor: "transparent",
                  }}
                  source={this.state.isSaved ? IMAGES.star : IMAGES.unstar}
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
                onPress={() => {
                  const { dispatch } = this.props;
                  dispatch(Actions?.updateFeedUserInfo({ type: "like", userId: item._id }));
                  // ToastAndroid.show(`User added to liked list`, ToastAndroid.SHORT);
                  this.setState((prevState) => ({
                    currentIndex: prevState.currentIndex + 1,
                  }));
                }}
              >
                <Image
                  style={{
                    height: 28,
                    width: 28,
                    top: 1,
                    tintColor: COLORS.white,
                  }}
                  source={IMAGES.heart2}
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
          </Animated.View>
        );
      })
      .reverse();
  };

  render() {
    return (
      <>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, paddingBottom: 60 }}>
            {this.renderFeeds()}
            {(this.state.isEmpty || this.props.users.length === 0) && <EmptyCard />}
          </View>
        </View>
      </>
    );
  }
}

export default connect()(MainSlider);
