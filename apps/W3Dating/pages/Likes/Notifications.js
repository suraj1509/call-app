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

const Notifications = ({ navigation }) => {
    const user = useSelector((state) => state?.user?.currentUser);
    const { colors } = useTheme();
    const [notifications, setNotifications] = React.useState([{ msg: "You’ve earned ₹X today!", img: "", time: "03.02pm" }, { msg: "You have a new review", time: "01.05am", img: "" }, { msg: "A favorite caller is online now", time: "12.01pm", img: user?.profilePhotos[0]}])
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
                    title={"Notifications"}
                    titleLeft
                    backAction={() => { navigation.goBack() }}
                />

                <ScrollView>
                    <View style={{ padding: 16 }}>
                        <View>
                            {notifications?.map((note, index) => (<View
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
                                        flexDirection: 'row',
                                        alignItems: 'center',

                                        gap: 30,

                                        // Elevation for Android
                                        elevation: 4,
                                        backgroundColor: '#fff', // Required for shadow to be visible
                                    }}
                                >
                                    {note?.img ? (<Image
                                        source={{ uri: note?.img }}
                                        height={40}
                                        width={40}
                                        style={{ borderRadius: 20 }}
                                        resizeMode="cover"

                                    />) : ( <Image
                                        source={IMAGES.logo}
                                        style={{ borderRadius: 20, height: 40, width: 40 }}
                                        resizeMode="contain"

                                    />)}
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
                                        {note?.msg?.slice(0, 26)}
                                    </Text>

                                    {/* <TouchableOpacity> */}
                                    {/* </TouchableOpacity> */}
                                    <Text style={{ color: COLORS?.textLight }}>{note?.time}</Text>
                                </View>
                            </View>))}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default Notifications;
