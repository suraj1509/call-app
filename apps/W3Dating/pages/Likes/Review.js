import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  Image,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  Animated,
  View,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import Header from "../../../../app/layout/Header";
import { COLORS, FONTS, IMAGES, SIZES } from "../../../../app/constants/theme";
import { useDispatch, useSelector } from "react-redux";

const Review = ({ navigation }) => {
  const user = useSelector((state) => state?.user?.currentUser);
  const { colors } = useTheme();
  const [reviews, setReviews] = React.useState(
    [
      {img: user?.profilePhotos[0], name: "Aman", rating: 3, msg: "you are so polite to the customer" },
      {img: user?.profilePhotos[0], name: "Sahil", rating: 1, msg: "you are so polite to the customer" },
      {img: user?.profilePhotos[0], name: "Sanam", rating: 4, msg: "you are so polite to the customer" },
      {img: user?.profilePhotos[0], name: "Rahul", rating: 5, msg: "you are so polite to the customer" },
      {img: user?.profilePhotos[0], name: "Rahul", rating: 2, msg: "you are so polite to the customer" },
    ]
  )

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
      >
        <Header
          leftIcon={"back"}
          title={"Reviews and Ratings"}
          titleLeft
          backAction={() => {navigation.goBack()}}
        />

        <ScrollView>
          <View style={{padding: 16}}>
            <View>
              {reviews?.map((itm, index) =>(<View
              key={index}
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
                    paddingVertical: 10,
                    borderRadius: 10,
  
                    // Shadow for iOS
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    gap: 30,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
  
                    // Elevation for Android
                    elevation: 4,
                    backgroundColor: '#fff', // Required for shadow to be visible
                  }}
                >
                  <View style={{flexDirection: 'row',
                    alignItems: 'center', gap: 20}}>
                  <Image 
                  source={{uri: itm?.img}}
                  height={40}
                  width={40}
                  style={{borderRadius: 20}}
                  resizeMode="cover"

                  />
                  <Text
                    style={{
                      ...FONTS.font,
                      ...FONTS.fontBold,
                      color: colors.title,
                      // paddingBottom: 8,
                      // marginBottom: 5,
                      // borderBottomWidth: 0.5,
                      // borderBottomColor: colors.borderColor,
                    }}
                  >
                    {itm?.name}
                  </Text>
                  </View>
                    <View
                                style={{
                                  flexDirection: "row",
                                  flexWrap: "wrap",
                                  // marginBottom: 8,
                                  gap: 60,
                                  alignItems: 'center',
                                }}
                              >
                                {/* <Text style={{ ...FONTS.h6, fontSize: 15, color: colors.title, marginBottom: 4 }}>Rating</Text> */}
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
                                          marginHorizontal: 0,
                                        }, starValue <= itm?.rating ? {
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
                        <TouchableOpacity onPress={()=>setReviews(reviews.filter((_, i) => i !== index))} style={{padding: 8}}>
                          <Text style={{color: COLORS?.primary}}>Hide</Text>
                        </TouchableOpacity>
                              </View>
                </View>
              </View>))}
            </View>
          </View>
             </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Review;
