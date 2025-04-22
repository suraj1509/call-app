import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { FONTS, IMAGES } from '../../../../app/constants/theme';
import Header from '../../../../app/layout/Header';
import { GlobalStyleSheet } from '../../../../app/constants/StyleSheet';

const Settings = ({navigation}) => {

    const {colors} = useTheme();

    return (
        <SafeAreaView
            style={{
                flex:1,
                backgroundColor:colors.cardBg,
            }}
        >
            <Header
                titleLeft
                leftIcon={'back'}
                title={'Settings'}
            />
            <ScrollView>
                <View
                    style={GlobalStyleSheet.container}
                >
                    <TouchableOpacity
                        onPress={() => navigation.navigate('BasicInfo')}
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            borderBottomWidth:1,
                            borderBlockColor:colors.borderColor,
                            paddingVertical:15,
                        }}
                    >
                        <Image
                            style={{
                                height:18,
                                width:18,
                                resizeMode:'contain',
                                tintColor:colors.textLight,
                                marginRight:12,
                            }}
                            source={IMAGES.user}
                        />
                        <Text style={{...FONTS.h6,...FONTS.fontSemiBold,color:colors.title,flex:1}}>Basic info</Text>
                        <FeatherIcon color={colors.title} size={20} name="chevron-right"/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('About')}
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            borderBottomWidth:1,
                            borderBlockColor:colors.borderColor,
                            paddingVertical:15,
                        }}
                    >
                        <Image
                            style={{
                                height:18,
                                width:18,
                                resizeMode:'contain',
                                tintColor:colors.textLight,
                                marginRight:12,
                            }}
                            source={IMAGES.info}
                        />
                        <Text style={{...FONTS.h6,...FONTS.fontSemiBold,color:colors.title,flex:1}}>About</Text>
                        <FeatherIcon color={colors.title} size={20} name="chevron-right"/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Notification')}
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            borderBottomWidth:1,
                            borderBlockColor:colors.borderColor,
                            paddingVertical:15,
                        }}
                    >
                        <Image
                            style={{
                                height:18,
                                width:18,
                                resizeMode:'contain',
                                tintColor:colors.textLight,
                                marginRight:12,
                            }}
                            source={IMAGES.bell}
                        />
                        <Text style={{...FONTS.h6,...FONTS.fontSemiBold,color:colors.title,flex:1}}>Notification</Text>
                        <FeatherIcon color={colors.title} size={20} name="chevron-right"/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ThemeMode')}
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            borderBottomWidth:1,
                            borderBlockColor:colors.borderColor,
                            paddingVertical:15,
                        }}
                    >
                        <Image
                            style={{
                                height:18,
                                width:18,
                                resizeMode:'contain',
                                tintColor:colors.textLight,
                                marginRight:12,
                            }}
                            source={IMAGES.brush}
                        />
                        <Text style={{...FONTS.h6,...FONTS.fontSemiBold,color:colors.title,flex:1}}>Theme</Text>
                        <FeatherIcon color={colors.title} size={20} name="chevron-right"/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            borderBottomWidth:1,
                            borderBlockColor:colors.borderColor,
                            paddingVertical:15,
                        }}
                    >
                        <Image
                            style={{
                                height:18,
                                width:18,
                                resizeMode:'contain',
                                tintColor:colors.textLight,
                                marginRight:12,
                            }}
                            source={IMAGES.logOut}
                        />
                        <Text style={{...FONTS.h6,...FONTS.fontSemiBold,color:colors.title,flex:1}}>Log out</Text>
                        <FeatherIcon color={colors.title} size={20} name="chevron-right"/>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Settings;