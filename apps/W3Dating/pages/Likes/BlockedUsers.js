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
    Modal,
    Dimensions,
    TouchableWithoutFeedback,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { List } from "react-native-paper";
import uuid from "react-native-uuid";
import FeatherIcon from "react-native-vector-icons/Feather";
import { launchImageLibrary } from "react-native-image-picker";
import RBSheet from "react-native-raw-bottom-sheet";
import Header from "../../../../app/layout/Header";
import { GlobalStyleSheet } from "../../../../app/constants/StyleSheet";
import { COLORS, FONTS, IMAGES, SIZES } from "../../../../app/constants/theme";
import storage from "@react-native-firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../../redux/Actions";
import LanguageSheet from "../components/LanguageSheet";
import AboutSheet from "../components/AboutSheet";
import ImageResizer from "react-native-image-resizer";
import * as services from "../../../../services/user";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import TimeSlotSheet from "../components/TimeSlotSheet";
import TabButtonStyle1 from "../../../../app/components/Tabs/TabButtonStyle1";
import TabButtonStyle2 from "../../../../app/components/Tabs/TabButtonStyle2";
import ButtonLight from "../../../../app/components/Button/ButtonLight";
import ButtonOutline from "../../../../app/components/Button/ButtonOutline";
import TabStyle1 from "../../../../app/components/Footers/FooterStyle1";
import CheckList from "../components/CheckList";
import Buttons from "../../../../app/Screens/Components/Buttons";

const BlockedUsers = ({ navigation }) => {
    const user = useSelector((state) => state?.user?.currentUser);
    const { colors } = useTheme();

    const dispatch = useDispatch();

    const handleUnBlockPress = async (userId) => {
        try {
            const updatedBlockedUsers = await (user?.blockedUsers || [])
            .map(u => {
              if (typeof u === 'string') return u;
              if (u && typeof u === 'object') return u._id?.toString() || u.id?.toString();
              return null;
            })
            .filter(id => id && id !== userId.toString());
        
          // Dispatch update
          await dispatch(Actions.updateCurrentUser({ blockedUsers: updatedBlockedUsers }));
          dispatch(Actions.fetchCurrentUser());
      
          ToastAndroid.show("User Unblocked", ToastAndroid.SHORT);
          navigation.goBack();
        } catch (error) {
          console.error("Unblock error:", error);
        }
      };
      
      

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
                    title={"Blocked Users"}
                    titleLeft
                    backAction={() => { navigation.goBack() }}
                />

                <ScrollView>
                    <View style={{ padding: 16 }}>
                        <View>
                            <View>
                                <Text style={{ ...FONTS.h6, flex: 1 }}>Blocked User List</Text>
                                {user?.blockedUsers?.map((itm, index) => {
                                    return(<View
                                      key={index}
                                    style={{
                                        flexDirection: "row",
                                        flexWrap: "wrap",
                                        marginBottom: 32,
                                        // justifyContent: 'space-between',
                                        // alignItems: 'center'
                                    }}
                                >
                                    <View
                                        style={{
                                            width: '100%',
                                            borderWidth: 1,
                                            borderColor: COLORS.borderColor,
                                            paddingHorizontal: 10,
                                            paddingVertical: 10,
                                            borderRadius: 10,

                                            // Shadow for iOS
                                            shadowColor: '#000',
                                            shadowOffset: { width: 0, height: 2 },
                                            shadowOpacity: 0.1,
                                            shadowRadius: 4,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',

                                            gap: 20,

                                            // Elevation for Android
                                            elevation: 4,
                                            backgroundColor: '#fff', // Required for shadow to be visible
                                        }}
                                    >
                                        <View style={{flexDirection: 'row'}}>
                                        <Image
                                            source={itm?.profilePhotos?.[0] ? {uri: itm?.profilePhotos?.[0]} : IMAGES.userPic4}
                                            // height={40}
                                            // width={40}
                                            style={{ borderRadius: 20,  height: 40, width: 40 }}
                                            resizeMode="cover"

                                        />
                                        </View>
                                        <Text
                                            style={{
                                                ...FONTS.font,
                                                ...FONTS.fontBold,
                                                color: colors.title,
                                                // paddingBottom: 8,
                                                // marginBottom: 5,
                                                borderBottomWidth: 0.5,
                                                borderBottomColor: colors.borderColor,
                                            }}
                                        >
                                        {itm?.name}
                                        </Text>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                flexWrap: "wrap",
                                                // marginBottom: 8,
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}
                                        >
                                            {/* <Text style={{ ...FONTS.h6, fontSize: 15, color: colors.title, marginBottom: 4 }}>Rating</Text> */}
                                            {/* <View style={{ flexDirection: 'row' }}>
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
                                                            }, starValue <= 4 ? {
                                                                color: COLORS.primary,
                                                            } : {
                                                                color: '#ccc',
                                                            }]}>
                                                                ★
                                                            </Text>
                                                        </TouchableOpacity>

                                                    );
                                                })}
                                            </View> */}
                                        </View>
                                    
                                <View>
                                    <ButtonLight title="Unblock" height={40} paddingVertical={2} onPress={()=>handleUnBlockPress(itm?.id)}/>
                                </View>
                                    </View>
                                </View>)})}
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default BlockedUsers;
