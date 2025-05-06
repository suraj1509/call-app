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

const ReportUser = ({ navigation }) => {
    const user = useSelector((state) => state?.user?.currentUser);
    const { colors } = useTheme();

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
                    title={"Support And Safety"}
                    titleLeft
                    backAction={() => { navigation.goBack() }}
                />

                <ScrollView>
                    <View style={{ padding: 16 }}>
                        <View>
                            <View>
                                <Text style={{ ...FONTS.h6, flex: 1 }}>Blocked User List</Text>
                                <View
                                    //   key={index}
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

                                            gap: 20,

                                            // Elevation for Android
                                            elevation: 4,
                                            backgroundColor: '#fff', // Required for shadow to be visible
                                        }}
                                    >
                                        <View style={{flexDirection: 'row'}}>
                                        <Image
                                            source={IMAGES.userPic4}
                                            // height={40}
                                            // width={40}
                                            style={{ borderRadius: 20, position: 'relative', zIndex: 2,  height: 40, width: 40 }}
                                            resizeMode="cover"

                                        />
                                        <Image
                                            source={IMAGES.userPic3}
                                            // height={10}
                                            // width={10}
                                            style={{ borderRadius: 20, position: 'relative', left: -16, zIndex: 1, height: 40, width: 40 }}
                                            resizeMode="cover"

                                        />
                                        <Image
                                            source={IMAGES.userPic7}
                                            // height={40}
                                            // width={40}
                                            style={{ borderRadius: 20, position: 'relative', left: -28, height: 40, width: 40 }}
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
                                         Count   3
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
                                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 66}}>
                                        <TouchableOpacity>
                                            <Text style={{ color: COLORS?.primary }}>View</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <Text style={{ color: COLORS?.primary }}>Add</Text>
                                        </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <Text style={{ ...FONTS.h6, flex: 1 }}>Contact Support</Text>
                                <View
                                    //   key={index}
                                    style={{
                                        flexDirection: "row",
                                        flexWrap: "wrap",
                                        marginBottom: 32,
                                        gap: 16
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
                                            paddingVertical: 16,
                                            borderRadius: 10,

                                            // Shadow for iOS
                                            shadowColor: '#000',
                                            shadowOffset: { width: 0, height: 2 },
                                            shadowOpacity: 0.1,
                                            shadowRadius: 4,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',

                                            // Elevation for Android
                                            elevation: 4,
                                            backgroundColor: '#fff', // Required for shadow to be visible
                                        }}
                                    >

                                        <Text
                                            style={{
                                                ...FONTS.font,
                                                ...FONTS.fontBold,
                                                color: colors.title,
                                                //   paddingBottom: 8,
                                                //   marginBottom: 5,
                                                //   borderBottomWidth: 0.5,
                                                //   borderBottomColor: colors.borderColor,
                                            }}
                                        >
                                            Email
                                        </Text>
                                        <Text
                                            style={{
                                                ...FONTS.font,
                                                ...FONTS.fontBold,
                                                color: colors.title,
                                                //   paddingBottom: 8,
                                                //   marginBottom: 5,
                                                //   borderBottomWidth: 0.5,
                                                //   borderBottomColor: colors.borderColor,
                                            }}
                                        >
                                            support@livechat.com
                                        </Text>
                                    </View><View
                                        style={{
                                            width: '100%',
                                            borderWidth: 1,
                                            borderColor: COLORS.borderColor,
                                            paddingHorizontal: 16,
                                            paddingVertical: 16,
                                            borderRadius: 10,

                                            // Shadow for iOS
                                            shadowColor: '#000',
                                            shadowOffset: { width: 0, height: 2 },
                                            shadowOpacity: 0.1,
                                            shadowRadius: 4,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',

                                            // Elevation for Android
                                            elevation: 4,
                                            backgroundColor: '#fff', // Required for shadow to be visible
                                        }}
                                    >

                                        <Text
                                            style={{
                                                ...FONTS.font,
                                                ...FONTS.fontBold,
                                                color: colors.title,
                                                //   paddingBottom: 8,
                                                //   marginBottom: 5,
                                                //   borderBottomWidth: 0.5,
                                                //   borderBottomColor: colors.borderColor,
                                            }}
                                        >
                                            Contact
                                        </Text>
                                        <Text
                                            style={{
                                                ...FONTS.font,
                                                ...FONTS.fontBold,
                                                color: colors.title,
                                                //   paddingBottom: 8,
                                                //   marginBottom: 5,
                                                //   borderBottomWidth: 0.5,
                                                //   borderBottomColor: colors.borderColor,
                                            }}
                                        >
                                            (928) 333-5728
                                        </Text>
                                    </View><View
                                        style={{
                                            width: '100%',
                                            borderWidth: 1,
                                            borderColor: COLORS.borderColor,
                                            paddingHorizontal: 16,
                                            paddingVertical: 16,
                                            borderRadius: 10,

                                            // Shadow for iOS
                                            shadowColor: '#000',
                                            shadowOffset: { width: 0, height: 2 },
                                            shadowOpacity: 0.1,
                                            shadowRadius: 4,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',

                                            // Elevation for Android
                                            elevation: 4,
                                            backgroundColor: '#fff', // Required for shadow to be visible
                                        }}
                                    >

                                        <Text
                                            style={{
                                                ...FONTS.font,
                                                ...FONTS.fontBold,
                                                color: colors.title,
                                                //   paddingBottom: 8,
                                                //   marginBottom: 5,
                                                //   borderBottomWidth: 0.5,
                                                //   borderBottomColor: colors.borderColor,
                                            }}
                                        >
                                            Address
                                        </Text>
                                        <Text
                                            style={{
                                                ...FONTS.font,
                                                ...FONTS.fontBold,
                                                color: colors.title,
                                                //   paddingBottom: 8,
                                                //   marginBottom: 5,
                                                //   borderBottomWidth: 0.5,
                                                //   borderBottomColor: colors.borderColor,
                                            }}
                                        >
                                            Location: Eagar, Arizona(AZ)
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <Text style={{ ...FONTS.h6, flex: 1 }}>Report Harassment</Text>
                                <View
                                    //   key={index}
                                    style={{
                                        flexDirection: "row",
                                        flexWrap: "wrap",
                                        marginVertical: 8,
                                        // justifyContent: 'space-between',
                                        // alignItems: 'center'
                                    }}
                                >
                                    {/* <View
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
                                            flexDirection: 'row',
                                            alignItems: 'center',

                                            gap: 30,

                                            // Elevation for Android
                                            elevation: 4,
                                            backgroundColor: '#fff', // Required for shadow to be visible
                                        }}
                                    > */}
                                        <View style={{width: "100%"}}>
                                       <ButtonOutline title="Report" btnRounded/>
                                        </View>
                                        {/* <TouchableOpacity>
                                            <Text style={{ color: COLORS?.textLight }}>Hide</Text>
                                        </TouchableOpacity> */}
                                    {/* </View> */}
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default ReportUser;
