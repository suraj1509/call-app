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
import Story from "../Home/Story";
import * as Actions from "../../../../redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Home = ({ navigation }) => {
  const theme = useTheme();
  const { colors } = theme;
  const dispatch = useDispatch();
  const feedUsers = useSelector((state) => state?.user?.feedUsers);
  const role = useSelector((state) => state.user.currentUser?.role)
  const [feed, setFeed] = React.useState([])
  const amount = useSelector((state) => state?.user?.currentUser?.wallet);

  React.useEffect(() => {
    dispatch(Actions?.fetchCurrentUser());
  }, []);
  
  React.useEffect(() => {
    if(role){
      dispatch(Actions?.fetchFeedUsers(role));
    }
  }, [role]);

  React.useEffect(()=>{
    if(feedUsers){
      setFeed(feedUsers)
    }else{
      return;
    }
  },[feedUsers])

  return (
    <>
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
          Users
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Likes")}
          style={[GlobalStyleSheet.headerBtn, { borderColor: colors.text, justifyContent:"center", alignItems:"center", flexDirection:"row", width:80 }]}
        >
          <Text style={{ ...FONTS.fontBold, fontSize: 16, color: COLORS.success }}>
                          {amount}
                        </Text>
           <MaterialIcons size={18} color={colors.title} style={{left:4}} name="attach-money"  />
        </TouchableOpacity>
      </View>    
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          <View style={GlobalStyleSheet.container}>
            <View style={GlobalStyleSheet.row}>
              {feed?.map((data, index) => {
                if (!data?.profilePhoto) return null;
                return (
                  <View style={[GlobalStyleSheet.col50,{ borderRadius: 10}]} key={index}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => navigation.navigate("ProfileDetails", { item: data })}
                    >
                      
                      <Image
                        style={{
                          width: "100%",
                          height: 260,
                          borderRadius: 10,
                          resizeMode:'cover',
                        }}
                        source={{uri: data?.profilePhoto}}
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
                          paddingVertical: 10,
                          justifyContent: "flex-end",
                        }}
                      >
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                        <Text style={{ ...FONTS.fontBold, fontSize: 16, color: COLORS.white }}>
                          {data.name}
                        </Text>
                        <Text style={{ ...FONTS.fontBold, fontSize: 16, color: COLORS.white }}>
                        {data?.rate} $
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

export default Home;
