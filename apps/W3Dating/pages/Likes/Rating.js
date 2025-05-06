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
    TextInput,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import Header from "../../../../app/layout/Header";
import { COLORS, FONTS, IMAGES, SIZES } from "../../../../app/constants/theme";
import { useDispatch, useSelector } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import GradientBtn from "../components/GradientBtn";
import * as Actions from "../../../../redux/Actions"

const Rating = ({ navigation, route }) => {
    const user = useSelector((state) => state?.user?.currentUser);
    const [activeProfileDetails, setActiveProfileDetails] = React.useState(route?.params?.item);
    const [activeColor, setActiveColor] = React.useState(COLORS.success);
    const { colors } = useTheme();
    const dispatch = useDispatch()

    const [rating, setRating] = useState(0);
    const [comment, setComment] = React.useState('')

    const handlePress = (value) => {
        setRating(value);
        // if (onRate) onRate(value);
    };
    const handleReviewSubmit = () => {
        console.log("activeProfileDetails", activeProfileDetails?._id || activeProfileDetails?.id)
        dispatch(Actions.updateFeedUserInfo({
            type: "review",
            userId: activeProfileDetails?._id || activeProfileDetails?.id,
            body: {
                rating: rating,
                comment: comment,
                img: user?.profilePhotos?.[0] || activeProfileDetails?.img,
                name: user?.name,
            }}))
            navigation.navigate("DrawerNavigation");
    }
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
                    backAction={() => { navigation.navigate("DrawerNavigation") }}
                />

                <ScrollView>
                    <View style={{ padding: 16 }}>
                        <View>
                            <View style={{ marginBottom: 15, marginHorizontal: -5 }}>
                                <Image
                                    style={{
                                        width: "100%",
                                        height: undefined,
                                        aspectRatio: 1 / 1.2,
                                        borderRadius: SIZES.radius,
                                    }}
                                    source={activeProfileDetails?.profilePhotos?.length > 0 ? { uri: activeProfileDetails?.profilePhotos[0] } : IMAGES?.avtar2}
                                />
                                <LinearGradient
                                    colors={["rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(0,0,0,.7)"]}
                                    style={{
                                        position: "absolute",
                                        height: "100%",
                                        width: "100%",
                                        top: 0,
                                        borderRadius: 10,
                                        paddingHorizontal: 18,
                                        paddingVertical: 25,
                                        justifyContent: "flex-end",
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <View
                                            style={{
                                                flex: 1,
                                                position: "absolute",
                                                bottom: 60,
                                                left: 0,
                                                flexDirection: "row",
                                                alignItems: "center",
                                                // paddingHorizontal: 10,
                                                justifyContent: 'space-between',
                                                paddingVertical: 3,
                                                width: '100%'
                                            }}
                                        >
                                            <Text style={{ ...FONTS.h6, color: COLORS.white }}>
                                                {activeProfileDetails?.name}
                                            </Text>
                                            <Text style={{ ...FONTS.fontBold, color: COLORS.white, }} numberOfLines={1}>
                                                ₹ {activeProfileDetails?.rate}
                                            </Text>
                                        </View>

                                    </View>
                                </LinearGradient>
                                <View
                                    style={{
                                        position: "absolute",
                                        top: 15,
                                        left: 15,
                                        backgroundColor: "rgba(0,0,0,.8)",
                                        borderRadius: 20,
                                        flexDirection: "row",
                                        alignItems: "center",
                                        paddingHorizontal: 10,
                                        paddingVertical: 3,
                                    }}
                                >
                                    <View
                                        style={{
                                            height: 8,
                                            width: 8,
                                            backgroundColor: activeColor,
                                            borderRadius: 8,
                                            marginRight: 6,
                                        }}
                                    />
                                    <Text style={{ ...FONTS.fontSm, color: COLORS.white, top: -1 }}>active 2 mins ago</Text>
                                </View>
                                {/* <View
                           style={{
                             position: "absolute",
                             top: 6,
                             right: 0,
                             flexDirection: "row",
                             alignItems: "center",
                             paddingHorizontal: 10,
                             paddingVertical: 3,
                           }}
                         > */}
                                {/* <TouchableOpacity
                            
                           >
                             <Image style={{ height: 28, width: 28, top: 1, tintColor: COLORS.primary }} source={saveUsers} />
                           </TouchableOpacity> */}
                                {/* <TouchableOpacity
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
                           // onPress={() =>
                           //   navigation.navigate("SingleChat", {
                           //     data: {
                           //       ...activeProfileDetails,
                           //       image: activeProfileDetails.profilePhoto,
                           //       id: activeProfileDetails._id,
                           //     },
                           //   })
                           // }
                       
                         // onPress={async () => {})}
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
                         </TouchableOpacity> */}
                                {/* </View> */}
                                {/* <TouchableOpacity
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
                     
                         // onPress={async () => {
                         //   dispatch(
                         //     Actions?.updateFeedUserInfo({
                         //       type: saveUsers === IMAGES.star ? "unsave" : "save",
                         //       userId: activeProfileDetails?._id || activeProfileDetails?.id,
                         //     }),
                         //   );
                         //   // ToastAndroid.show(
                         //   //   `User ${saveUsers === IMAGES.star ? "remove from favorite list" : "added to favorite list"}`,
                         //   //   ToastAndroid.SHORT,
                         //   // );
                         // }}
                         >
                           <Image
                             style={{
                               height: 28,
                               width: 28,
                               top: 1,
                               tintColor: COLORS.white,
                               // backgroundColor: "transparent",
                             }}
                             source={IMAGES.videoCall}
                           />
                         </TouchableOpacity> */}
                                {/* <TouchableOpacity
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
                           // onPress={() => {
                           //   setViewedProfiles((prev) => new Set([...prev, activeProfileDetails._id]));
                           //   dispatch(Actions.updateFeedUserInfo({ type: "like", userId: activeProfileDetails._id }));
                           //   const remainingUsers = feedUsers.filter(
                           //     (user) => user._id !== activeProfileDetails._id && !viewedProfiles.has(user._id),
                           //   );
             
                           //   if (remainingUsers.length > 0) {
                           //     setActiveProfileDetails(remainingUsers[0]);
                           //   } else {
                           //     navigation.goBack();
                           //   }
                           // }}
                     
                         // onPress={()=>navigation.navigate("SocialConnectResponse")}
                         >
                           <Image
                             style={{
                               height: 28,
                               width: 28,
                               top: 1,
                               tintColor: COLORS.white,
                             }}
                             source={IMAGES.telephone}
                           />
                         </TouchableOpacity> */}
                                <View
                                    style={{
                                        position: "absolute",
                                        top: 6,
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
                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, justifyContent: 'space-between' }}>
                                <Text style={{ ...FONTS.fontBold, marginLeft: 10, fontSize: 18, color: COLORS.textLight, }}>Rate</Text>
                                <View style={{ flexDirection: 'row', }}>
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <TouchableOpacity key={i} onPress={() => handlePress(i + 1)}>
                                            <Text style={{ fontSize: 30, marginHorizontal: 5, color: COLORS.primary }}>{i < rating ? '★' : '☆'}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                            <View style={{ padding: 10, justifyContent: 'space-between' }}>
                                <Text style={{ ...FONTS.fontBold, marginLeft: 10, fontSize: 18, color: COLORS.textLight, }}>Comment</Text>
                                <View style={{ flexDirection: 'row', }}>
                                    <TextInput
                                        onChangeText={(val) => setComment(val)}
                                        value={comment}
                                        style={{
                                            ...FONTS.fontMedium,
                                            backgroundColor: colors.cardBg,
                                            borderWidth: 1,
                                            borderColor: '#CDCDCD',
                                            paddingHorizontal: 20,
                                            paddingLeft: 20,
                                            paddingRight: 20,
                                            fontSize: 15,
                                            borderRadius: 8,
                                            height: 120,
                                            width: "94%",
                                            color: colors.title,
                                            textAlignVertical: 'top',
                                            lineHeight: 28,

                                        }}
                                        placeholder='Your Message'
                                        multiline={true}
                                        numberOfLines={6}
                                    // placeholderTextColor={theme.dark ? COLORS.white :'#99999'}
                                    />
                                </View>
                            </View>
                            <View>
                                {/* <GradientBtn title="Submit" onPress={() => dispatch(Actions.updateFeedUserInfo{{}})} /> */}
                                <GradientBtn title="Submit"  onPress={handleReviewSubmit}/>
                            </View>

                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default Rating;
