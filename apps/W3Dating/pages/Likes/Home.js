import React, { useRef, useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, Dimensions, TouchableWithoutFeedback } from "react-native";
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
import ButtonOutline from "../../../../app/components/Button/ButtonOutline";
import ButtonLight from "../../../../app/components/Button/ButtonLight";
import CheckList from "../components/CheckList";
import GradientBtn from "../components/GradientBtn";

const Home = ({ navigation }) => {
  const theme = useTheme();
  const { colors } = theme;
  const dispatch = useDispatch();
  const feedUsers = useSelector((state) => state?.user?.feedUsers);
  const role = useSelector((state) => state.user.currentUser?.role)
  const [feed, setFeed] = React.useState([])
  const amount = useSelector((state) => state?.user?.currentUser?.wallet);
  const [modal, setModal] = React.useState(false)
  const { height } = Dimensions.get("window");
  const [filter, setFilter] = React.useState(0)

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


  const timeAgo = (timestamp) => {
    const now = Date.now();
    const diffMs = now - new Date(timestamp).getTime();
  
    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
    if (minutes < 2) return 'Online';
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    if (days < 30) return `${days} days ago`;
  
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} months ago`;
  
    const years = Math.floor(months / 12);
    return `${years} years ago`;
  };

  const getActiveColor = (timestamp) => {
    const now = Date.now();
    const diffMs = now - new Date(timestamp).getTime();
    const minutes = diffMs / (1000 * 60);
  
    if (minutes < 1) return COLORS.success;   // Online
    if (minutes < 5) return COLORS.warning;  // Recently active
    return COLORS.red;                      // Away/Inactive
  };

  
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
            onPress={() => setModal(true)}
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
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <Modal visible={modal} transparent onLayout={() => setModal(false)}>
            <TouchableWithoutFeedback onPress={() => setModal(false)}>
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: "rgba(0,0,0,0.5)",
                      justifyContent: "center",
                      alignContent: "center",
                     
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: colors.cardBg,
                        borderWidth: 1,
                        borderColor: colors.border,
                        margin: 20,
                        borderRadius: 10,
                        padding: 16,
                        gap: 10,
                        height: height * 0.55,
                        overflow: "hidden",
                        // backgroundColor: "blue",
                      }}
                    >
                      <View style={{ padding: 16 }}>
                        <Text
                          style={{
                            ...FONTS.h5,
                            // flex: 1,
                            textAlign: "center",
                            color: colors.title,
                          }}
                        >
                          Filter
                        </Text>
                      </View>
                   
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                      {["Newest", "Online Now", "Top Rated", "Age Range", "Language"]?.map((data, index) => {
                        return (
                        <CheckList
                            onPress={() => {
                              setFilter(index)
                            setModal(false)
                            }}
                            item={data}
                            checked={index === filter ?  true: false}
                            key={index}
                        />
                        );
                    })}
                      </View>
                    {/* <GradientBtn title={"Apply Filter"}/> */}
                      {/* <View
                        style={{
                          padding: 16,
                          flexDirection: "row",
                          justifyContent: "space-around",
                          // backgroundColor: "red",
                        }}
                      >
                        <View style={{ width: "40%" }}>
                          <TouchableOpacity
                            // onPress={() => setDeleteModal(false)}
                            activeOpacity={0.5}
                            style={{
                              width: "100%",
                              borderRadius: 40,
                              backgroundColor: theme?.dark ? "#F5F5F520" : "#F5F5F5",
                              height: 45,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Text
                              style={{
                                ...FONTS.fontMedium,
                                fontSize: 16,
                                color: theme?.dark ? COLORS.white : "#141414",
                              }}
                            >
                              Close
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View style={{ width: "40%" }}>
                          <TouchableOpacity
                            // onPress={async () => {
                            
                            // }}
                            activeOpacity={0.5}
                            style={{
                              width: "100%",
                              borderRadius: 40,
                              //backgroundColor:'#F5F5F5',
                              borderWidth: 1,
                              borderColor: COLORS.primary,
                              height: 45,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {!true ? (
                              <Text style={{ ...FONTS.fontSemiBold, fontSize: 16, color: COLORS.primary }}>
                                Confirm
                              </Text>
                            ) : (
                              <View style={GlobalStyleSheet.spinner}>
                                <ActivityIndicator size="small" color={COLORS.primary} />
                              </View>
                            )}
                          </TouchableOpacity>
                        </View>
                      </View> */}
                    </View>
                  </View>
                  </TouchableWithoutFeedback>
                </Modal> 
          <View style={GlobalStyleSheet.container}>
            <View style={[GlobalStyleSheet.row]}>
              {feed?.map((data, index) => {
                if (!data?.profilePhotos?.length === 0 ) return null;
                return (
                  <View style={[GlobalStyleSheet.col50,{ borderRadius: 10, marginVertical: 8, gap: 4}]} key={index}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => navigation.navigate("ProfileDetails", { item: data })}
                     
                    >
                      <Image
                        style={{
                          width: "100%",
                          height: 220,
                          borderRadius: 10,
                          resizeMode:'cover',
                        }}
                        source={data?.profilePhotos[0] ? {uri: data?.profilePhotos[0]} : IMAGES?.avtar2}
                      />
                      <View style={{ position: 'absolute', left: 2, top: 2, flexDirection: 'row', justifyContent: 'space-between', width: '96%'}}>
                        <View style={{backgroundColor: `${COLORS.dark}80`, width: '50%', flexDirection:'row', gap: 6, alignItems:'center',borderRadius: 10, padding: 2}}>
                          <View>
                          <View style={{height: 8, width: 8, borderRadius: 8, backgroundColor: data?.lastActive && getActiveColor(data?.lastActive)}}/>
                          </View>
                          <Text style={{color: COLORS.light, fontSize: 12}}>{data?.lastActive && timeAgo(data?.lastActive)}</Text>
                        </View>
                        <View>
                        <TouchableOpacity>
                         <Image
                          source={IMAGES.unstar}
                          style={{
                              height:22,
                              width:22,
                              resizeMode:'contain',
                          }}
                          tintColor={COLORS.primary}
                      />
                      </TouchableOpacity> 
                        </View>
                      </View>
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
                        <View style={{backgroundColor: COLORS.primary, paddingHorizontal: 8, borderRadius: 10}}>
                        <Text style={{ ...FONTS.fontBold, fontSize: 16, color: COLORS.white }}>
                        ₹ {data?.rate} 
                        </Text>
                        </View>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
         
                      
                    <ButtonLight title="Call" paddingHorizontal={4} paddingVertical={4}  height={36}/>
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
