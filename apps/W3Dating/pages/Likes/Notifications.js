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
    const [notifications, setNotifications] = React.useState(user?.notifications)

    function formatDateTime12h(timestamp) {
        const date = new Date(timestamp);
        let hours = date.getHours();
        const minutes = `${date.getMinutes()}`.padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12; // convert 0 to 12
        return `${date.toLocaleDateString()} ${hours}:${minutes} ${ampm}`;
      }

    //   React.useEffect(()=>{

    //     dispatch(Actions.updateCurrentUser([]))
    //   },[])

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
                                        // flexDirection: 'row',
                                        // alignItems: 'space-between',

                                        // gap: 30,

                                        // Elevation for Android
                                        elevation: 4,
                                        backgroundColor: '#fff', // Required for shadow to be visible
                                    }}
                                >
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>

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
                                        {note?.message?.slice(0, 46)}
                                    </Text>
                                    </View>

                                    {/* <TouchableOpacity> */}
                                    {/* </TouchableOpacity> */}
                                    <Text style={{ color: COLORS?.textLight }}>{formatDateTime12h(note?.time)}</Text>
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
