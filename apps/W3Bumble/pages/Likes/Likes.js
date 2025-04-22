import React, { useRef, useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import { COLORS, FONTS, IMAGES, SIZES } from "../../../../app/constants/theme";
import { GlobalStyleSheet } from "../../../../app/constants/StyleSheet";
import RBSheet from "react-native-raw-bottom-sheet";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import FeatherIcon from "react-native-vector-icons/Feather";
import Button from "../../../../app/components/Button/Button";

const btnData = [
  {
    name: "Men",
  },
  {
    name: "Women",
  },
  {
    name: "Everyone",
  },
];

const Likes = ({ navigation }) => {
  const theme = useTheme();
  const { colors } = theme;

  const filterSheet = useRef();

  const [ageValue, setAgeValue] = useState([18, 40]);
  const [distanceVal, setDistanceVal] = useState([80]);

  const [isChecked, setIsChecked] = useState(btnData[1]);

  const LikedData = [
    {
      image: IMAGES.likedPic7,
      name: "Charlotte",
      age: 23,
      about: "Bali, Indonesia",
    },
    {
      image: IMAGES.likedPic8,
      name: "Sophia",
      age: 27,
      about: "Bali, Indonesia",
    },
    {
      image: IMAGES.likedPic9,
      name: "Javelle",
      age: 22,
      about: "Bali, Indonesia",
    },
    {
      image: IMAGES.likedPic10,
      name: "Harper",
      age: 24,
      about: "Bali, Indonesia",
    },
    {
      image: IMAGES.likedPic11,
      name: "Richard",
      age: 35,
      about: "Bali, Indonesia",
    },
    {
      image: IMAGES.likedPic12,
      name: "Chelsea",
      age: 32,
      about: "Bali, Indonesia",
    },
    {
      image: IMAGES.likedPic7,
      name: "Charlotte",
      age: 23,
      about: "Bali, Indonesia",
    },
    {
      image: IMAGES.likedPic8,
      name: "Sophia",
      age: 27,
      about: "Bali, Indonesia",
    },
    {
      image: IMAGES.likedPic9,
      name: "Javelle",
      age: 22,
      about: "Bali, Indonesia",
    },
    {
      image: IMAGES.likedPic10,
      name: "Harper",
      age: 24,
      about: "Bali, Indonesia",
    },
    {
      image: IMAGES.likedPic11,
      name: "Richard",
      age: 35,
      about: "Bali, Indonesia",
    },
    {
      image: IMAGES.likedPic12,
      name: "Chelsea",
      age: 32,
      about: "Bali, Indonesia",
    },
  ];

  return (
    <>
      <RBSheet
        ref={filterSheet}
        height={410}
        openDuration={100}
        closeOnDragDown={true}
        customStyles={{
          wrapper: {},
          container: {
            backgroundColor: colors.cardBg,
            borderTopLeftRadius: SIZES.radius,
            borderTopRightRadius: SIZES.radius,
            paddingTop: 20,
          },
          draggableIcon: {
            marginTop: 5,
            marginBottom: 0,
            height: 5,
            width: 90,
            backgroundColor: colors.borderColor,
          },
        }}
      >
        <View
          style={{
            //paddingVertical:10,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <Text style={{ ...FONTS.fontSemiBold, fontSize: 20, color: colors.title, flex: 1 }}>Filters</Text>
          <TouchableOpacity
            onPress={() => filterSheet.current.close()}
            style={{
              padding: 5,
            }}
          >
            <FeatherIcon size={24} color={colors.title} name="x" />
          </TouchableOpacity>
        </View>

        <View style={[GlobalStyleSheet.container, { paddingHorizontal: 30 }]}>
          <View>
            <Text
              style={{
                ...FONTS.fontSemiBold,
                fontSize: 16,
                color: theme.dark ? colors.title : "#141414",
              }}
            >
              Age Between {ageValue[0]} and {ageValue[1]}
            </Text>
          </View>
          <MultiSlider
            trackStyle={{ height: 3, borderRadius: 2, backgroundColor: "#D9D9D9" }}
            selectedStyle={{
              backgroundColor: theme.dark ? colors.title : "#141414",
            }}
            values={ageValue}
            markerStyle={{
              backgroundColor: theme.dark ? colors.title : "#141414",
              top: 1,
              height: 18,
              width: 18,
            }}
            onValuesChange={(val) => setAgeValue(val)}
            sliderLength={SIZES.width - 60}
            min={18}
            max={100}
          />

          <View
            style={{
              marginTop: 10,
            }}
          >
            <Text
              style={{
                ...FONTS.fontSemiBold,
                fontSize: 16,
                color: theme.dark ? colors.title : "#141414",
              }}
            >
              Distance Up to {distanceVal[0]} Kilometers away
            </Text>
          </View>
          <MultiSlider
            trackStyle={{ height: 3, borderRadius: 2, backgroundColor: "#D9D9D9" }}
            selectedStyle={{
              backgroundColor: theme.dark ? colors.title : "#141414",
            }}
            values={distanceVal}
            markerStyle={{
              backgroundColor: theme.dark ? colors.title : "#141414",
              top: 1,
              height: 18,
              width: 18,
            }}
            onValuesChange={(val) => setDistanceVal(val)}
            sliderLength={SIZES.width - 50}
            min={1}
            max={100}
          />

          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                ...FONTS.fontSemiBold,
                fontSize: 16,
                color: theme.dark ? colors.title : "#141414",
              }}
            >
              Your preferred dating partner
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 20 }}
          >
            {btnData.map((data, index) => {
              return (
                <TouchableOpacity
                  onPress={() => setIsChecked(data)}
                  key={index}
                  style={[
                    {
                      height: 40,
                      padding: 10,
                      borderRadius: 30,
                      paddingHorizontal: 18,
                      backgroundColor: "#F5F5F5",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 5,
                    },
                    isChecked === data && {
                      backgroundColor: theme.dark ? colors.title : "#141414",
                    },
                  ]}
                >
                  <View
                    style={[
                      {
                        height: 16,
                        width: 16,
                        borderRadius: 4,
                        borderWidth: 2,
                        borderColor: theme.dark ? colors.title : "#141414",
                      },
                      isChecked === data && {
                        borderColor: COLORS.white,
                        backgroundColor: COLORS.white,
                      },
                    ]}
                  >
                    {isChecked === data ? (
                      <FeatherIcon size={12} color={theme.dark ? colors.title : "#141414"} name="check" />
                    ) : null}
                  </View>
                  <Text
                    style={{
                      ...FONTS.fontSemiBold,
                      fontSize: 15,
                      color: isChecked === data ? COLORS.white : theme.dark ? colors.title : "#141414",
                    }}
                  >
                    {data.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={{ marginTop: 20 }}>
            <Button
              title={"Save"}
              btnRounded
              fontSize
              textColor={theme.dark ? colors.title : "#141414"}
              color={COLORS.primary4}
              onPress={() => filterSheet.current.close()}
            />
          </View>
        </View>
      </RBSheet>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
      >
        <LinearGradient colors={["#FFD95C", "#FEC629"]} style={[GlobalStyleSheet.container, styles.headerArea, {}]}>
          <Text style={{ ...FONTS.fontBold, fontSize: 20, color: colors.title }}>Like you</Text>
          <TouchableOpacity onPress={() => filterSheet.current.open()}>
            <Image
              style={{
                height: 22,
                width: 22,
                tintColor: colors.title,
              }}
              source={IMAGES.filter}
            />
          </TouchableOpacity>
        </LinearGradient>

        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          <View style={GlobalStyleSheet.container}>
            <View style={GlobalStyleSheet.row}>
              {LikedData.map((data, index) => {
                return (
                  <View style={[GlobalStyleSheet.col50, { marginBottom: 10 }]} key={index}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => navigation.navigate("ProfileDetails", { item: data })}
                    >
                      <Image
                        style={{
                          width: "100%",
                          height: 220,
                          borderRadius: 10,
                          // resizeMode:'contain'
                        }}
                        source={data.image}
                      />
                      <LinearGradient
                        colors={["rgba(0,0,0,.0)", "rgba(0,0,0,.7)"]}
                        style={{
                          position: "absolute",
                          height: 110,
                          width: "100%",
                          //top:0,
                          bottom: 0,
                          borderRadius: 10,
                          paddingHorizontal: 15,
                          paddingVertical: 15,
                          justifyContent: "flex-end",
                        }}
                      >
                        <Text style={{ ...FONTS.fontBold, fontSize: 16, color: COLORS.white }}>
                          {data.name}, {data.age}
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
                          <Text
                            style={{ ...FONTS.fontMedium, fontSize: 13, color: COLORS.white, opacity: 0.75 }}
                            numberOfLines={1}
                          >
                            {data.about}
                          </Text>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  headerArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
});

export default Likes;
