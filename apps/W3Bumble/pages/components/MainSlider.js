import React, { Component } from "react";
import { Animated, Image, View, PanResponder, Text, TouchableOpacity, ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { COLORS, FONTS, IMAGES, SIZES } from "../../../../app/constants/theme";
import EmptyCard from "./EmptyCard";
import FeatherIcon from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useTheme } from "@react-navigation/native";

const Foods = [
  { id: "1", image: IMAGES.slderPic6, name: "Emily", age: "24", about: "Bali, Indonesia" },
  { id: "2", image: IMAGES.slderPic12, name: "Richard", age: "22", about: "Job Holder" },
  { id: "3", image: IMAGES.slderPic13, name: "Harleen", age: "25", about: "Product Designer" },
  { id: "4", image: IMAGES.slderPic14, name: "Harleen", age: "22", about: "Product Designer" },
  { id: "5", image: IMAGES.slderPic15, name: "Harleen", age: "21", about: "Product Designer" },
];

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

const interestsData = [
  {
    icon: IMAGES.dog,
    title: "Dogs",
  },
  {
    icon: IMAGES.microphonealt,
    title: "Singing",
  },
  {
    icon: IMAGES.tvretro,
    title: "Hollywood",
  },
  {
    icon: IMAGES.utensils,
    title: "Cooking",
  },
];

const languageData = [
  {
    icon: IMAGES.messages,
    title: "English",
  },
  {
    icon: IMAGES.messages,
    title: "Hindi",
  },
  {
    icon: IMAGES.messages,
    title: "French",
  },
];

class MainSlider extends Component {
  constructor() {
    super();
    this.position = new Animated.ValueXY();
    this.state = {
      currentIndex: 0,
      isEmpty: false,
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

    // this.topLayerOpacity = this.position.y.interpolate({
    //   inputRange: [-SIZES.width / 2, 0, SIZES.width / 2],
    //   outputRange: [.4, 0, 0],
    //   extrapolate: 'clamp'
    // })

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SIZES.width / 2, 0, SIZES.width / 2],
      outputRange: [1, 0, 1],
      extrapolate: "clamp",
    });

    // this.nextCardOpacityY = this.position.y.interpolate({
    //   inputRange: [-SIZES.width / 2, 0, SIZES.width / 2],
    //   outputRange: [1, 0, 1],
    //   extrapolate: 'clamp'
    // })

    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SIZES.width / 2, 0, SIZES.width / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: "clamp",
    });
  }

  PanResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      this.position.setValue({ x: gestureState.dx, y: 0 });
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 120) {
        Animated.spring(this.position, {
          toValue: { x: SIZES.width + 100, y: gestureState.dy },
          useNativeDriver: false,
        }).start(() => {
          this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
            this.position.setValue({ x: 0, y: 0 });
          });
        });
        if (Foods.length == this.state.currentIndex + 1) {
          this.setState({ isEmpty: true });
        }
      } else if (gestureState.dx < -120) {
        Animated.spring(this.position, {
          toValue: { x: -SIZES.width - 100, y: gestureState.dy },
          useNativeDriver: false,
        }).start(() => {
          this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
            this.position.setValue({ x: 0, y: 0 });
          });
        });
        if (Foods.length == this.state.currentIndex + 1) {
          this.setState({ isEmpty: true });
        }
        // }else if(gestureState.dy < -200){
        //   Animated.spring(this.position, {
        //     toValue: { y: -SIZES.height - 100, x: gestureState.dy },
        //     useNativeDriver: false,
        //   }).start(() => {
        //     this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
        //       this.position.setValue({ x: 0, y: 0 })
        //     })
        //   })
        //   if(Foods.length == this.state.currentIndex + 1){
        //     this.setState({ isEmpty : true })
        //   }
      } else {
        Animated.spring(this.position, {
          toValue: { x: 0, y: 0 },
          friction: 4,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  renderFoods = () => {
    return Foods.map((item, i) => {
      if (i < this.state.currentIndex) {
        return null;
      } else if (i == this.state.currentIndex) {
        return (
          <Animated.View
            {...this.PanResponder.panHandlers}
            key={i}
            style={[
              this.rotateAndTranslate,
              {
                height: "100%",
                width: SIZES.width,
                padding: 10,
                // paddingBottom:20,
                position: "absolute",
              },
            ]}>
            <View
              style={{
                backgroundColor: this.props.theme ? this.props.theme.colors.card : COLORS.white,
                borderRadius: 20,
                overflow: "hidden",
              }}>
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
                }}>
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
                }}>
                <FontAwesome5 size={24} color={COLORS.white} name="times" />
              </Animated.View>
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1 }}>
                  <Image
                    style={{
                      flex: 1,
                      height: SIZES.height - 320,
                      width: null,
                      resizeMode: "cover",
                      borderRadius: 20,
                    }}
                    source={item.image}
                  />
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
                    }}></Animated.View>
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
                    }}></Animated.View>
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
                    }}>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate("ProfileDetails", { item: item })}
                      style={{
                        paddingVertical: 25,
                        paddingHorizontal: 20,
                      }}>
                      <Text style={{ ...FONTS.fontBold, fontSize: 24, color: COLORS.white }}>
                        {item.name} , {item.age}
                      </Text>
                      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                        <Image style={{ height: 15, width: 12 }} source={IMAGES.pin2} />
                        <Text style={{ ...FONTS.fontMedium, fontSize: 16, color: COLORS.white }}>{item.about}</Text>
                      </View>
                    </TouchableOpacity>
                  </LinearGradient>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("SingleChat", { data: item })}
                    style={{
                      position: "absolute",
                      bottom: 20,
                      right: 20,
                    }}>
                    <Image style={{ height: 55, width: 55, resizeMode: "contain" }} source={IMAGES.chat4} />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    paddingHorizontal: 15,
                    flex: 1,
                    backgroundColor: this.props.theme ? this.props.theme.colors.card : COLORS.card,
                    paddingTop: 15,
                  }}>
                  <Text
                    style={{
                      ...FONTS.fontSemiBold,
                      fontSize: 18,
                      color: this.props.theme ? this.props.theme.colors.title : "#141414",
                      marginBottom: 10,
                    }}>
                    About Me
                  </Text>
                  <Text
                    style={{
                      ...FONTS.font,
                      color: "#666666",
                      fontSize: 16,
                      lineHeight: 18,
                      marginBottom: 15,
                      paddingRight: 50,
                    }}>
                    It is a long established fact that a reader will be distracted by the readable content of a page
                    when looking at its layout.
                  </Text>
                  <Text
                    style={{
                      ...FONTS.fontSemiBold,
                      fontSize: 18,
                      color: this.props.theme ? this.props.theme.colors.title : "#141414",
                      marginBottom: 10,
                    }}>
                    My basics
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      marginBottom: 8,
                    }}>
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
                          }}>
                          <Image
                            style={{ height: 14, width: 14, resizeMode: "contain", marginRight: 6 }}
                            source={data.icon}
                          />
                          <Text
                            style={{
                              ...FONTS.fontMedium,
                              fontSize: 14,
                              color: this.props.theme ? this.props.theme.colors.title : "#141414",
                              top: -1,
                            }}>
                            {data.title}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                  <Text
                    style={{
                      ...FONTS.fontSemiBold,
                      fontSize: 18,
                      color: this.props.theme ? this.props.theme.colors.title : "#141414",
                      marginBottom: 10,
                    }}>
                    My interests
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      marginBottom: 8,
                    }}>
                    {interestsData.map((data, index) => {
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
                          }}>
                          <Image
                            style={{ height: 14, width: 14, resizeMode: "contain", marginRight: 6 }}
                            source={data.icon}
                          />
                          <Text
                            style={{
                              ...FONTS.fontMedium,
                              fontSize: 14,
                              color: this.props.theme ? this.props.theme.colors.title : "#141414",
                              top: -1,
                            }}>
                            {data.title}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                  <Text
                    style={{
                      ...FONTS.fontSemiBold,
                      fontSize: 18,
                      color: this.props.theme ? this.props.theme.colors.title : "#141414",
                      marginBottom: 10,
                    }}>
                    Languages
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      marginBottom: 8,
                    }}>
                    {languageData.map((data, index) => {
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
                          }}>
                          <Image
                            style={{ height: 14, width: 14, resizeMode: "contain", marginRight: 6 }}
                            source={data.icon}
                          />
                          <Text
                            style={{
                              ...FONTS.fontMedium,
                              fontSize: 14,
                              color: this.props.theme ? this.props.theme.colors.title : "#141414",
                              top: -1,
                            }}>
                            {data.title}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                  <View style={{ marginTop: 5 }}>
                    <Image
                      style={{
                        width: "100%",
                        height: undefined,
                        aspectRatio: 1 / 0.8,
                        borderRadius: 10,
                        marginBottom: 10,
                      }}
                      source={IMAGES.slderPic8}
                    />
                    <Image
                      style={{
                        width: "100%",
                        height: undefined,
                        aspectRatio: 1 / 0.8,
                        borderRadius: 10,
                        marginBottom: 10,
                      }}
                      source={IMAGES.slderPic9}
                    />
                    <Image
                      style={{
                        width: "100%",
                        height: undefined,
                        aspectRatio: 1 / 1,
                        borderRadius: 10,
                        marginBottom: 10,
                      }}
                      source={IMAGES.slderPic10}
                    />
                  </View>
                  <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                    <Text
                      style={{
                        ...FONTS.fontSemiBold,
                        fontSize: 18,
                        color: this.props.theme ? this.props.theme.colors.title : "#141414",
                        marginBottom: 5,
                      }}>
                      My location
                    </Text>
                    <Text style={{ ...FONTS.font, fontSize: 16, color: "#666666" }}>Melbourne, Australia</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 30,
                      paddingBottom: 50,
                      paddingTop: 20,
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      style={{
                        height: 60,
                        width: 60,
                        borderRadius: 50,
                        backgroundColor: this.props.theme ? this.props.theme.colors.title : "#141414",
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
                </View>
              </ScrollView>
            </View>
          </Animated.View>
        );
      } else {
        return (
          <Animated.View
            key={i}
            style={[
              {
                opacity: this.nextCardOpacity,
                transform: [{ scale: this.nextCardScale }],
                height: "100%",
                width: SIZES.width,
                padding: 10,
                // paddingBottom:20,
                position: "absolute",
              },
            ]}>
            <View style={{ flex: 1 }}>
              <Image
                style={{
                  flex: 1,
                  height: null,
                  width: null,
                  resizeMode: "cover",
                  borderRadius: 20,
                }}
                source={item.image}
              />
              <LinearGradient
                colors={["rgba(0,0,0,0)", "rgba(0,0,0,.8)"]}
                style={{
                  position: "absolute",
                  height: 200,
                  width: "100%",
                  bottom: 0,
                  borderRadius: 20,
                  justifyContent: "flex-end",
                  paddingHorizontal: 20,
                  paddingVertical: 25,
                }}>
                <Text style={{ ...FONTS.fontBold, fontSize: 24, color: COLORS.white }}>
                  {item.name} , {item.age}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                  <Image style={{ height: 15, width: 12 }} source={IMAGES.pin2} />
                  <Text style={{ ...FONTS.fontMedium, fontSize: 16, color: COLORS.white }}>{item.about}</Text>
                </View>
              </LinearGradient>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  bottom: 20,
                  right: 20,
                }}>
                <Image style={{ height: 55, width: 55, resizeMode: "contain" }} source={IMAGES.chat4} />
              </TouchableOpacity>
            </View>
          </Animated.View>
        );
      }
    }).reverse();
  };

  render() {
    return (
      <>
        <View style={{ flex: 1, marginTop: 180 }}>
          <View style={{ flex: 1, paddingBottom: 75 }}>
            {this.renderFoods()}
            {this.state.isEmpty && <EmptyCard onPress={() => this.props.onPress()} />}
          </View>
        </View>
      </>
    );
  }
}

export default MainSlider;
