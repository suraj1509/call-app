import React, {useState} from 'react';
import { Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import SelectDropdown from 'react-native-select-dropdown';
import { COLORS, FONTS, IMAGES, SIZES } from '../../../app/constants/theme';
import GradientBtn from './components/GradientBtn';

import {CountryPicker} from "react-native-country-codes-picker";

const PhoneNumber = ({navigation}) => {

    const {colors} = useTheme();

    const [show, setShow] = useState(false);
    const [countryCode, setCountryCode] = useState('+91');
    const [countryName, setCountryName] = useState('IN');

    return (
        <SafeAreaView
            style={{
                flex:1,
                backgroundColor:colors.cardBg,
            }}
        >
            <KeyboardAvoidingView
                style={{flex: 1}}
                behavior={Platform.OS === 'ios' ? 'padding' : ''}>
                <CountryPicker
                    show={show}
                    pickerButtonOnPress={(item) => {
                        setCountryName(item.code);
                        setCountryCode(item.dial_code);
                        setShow(false);
                    }}
                    onBackdropPress={() => setShow(false)}
                    style={{
                        modal : {
                            height : '60%',
                            backgroundColor: colors.cardBg,
                        },
                        textInput : {
                            paddingHorizontal:12,
                            height:48,
                            color: colors.title,
                            backgroundColor:colors.bgLight
                        },
                        dialCode: {
                            ...FONTS.fontLg,
                            ...FONTS.fontSemiBold,
                            color: colors.title,
                        },
                        countryName : {
                            ...FONTS.font,
                            ...FONTS.fontSemiBold,
                            color: colors.text,
                        },
                        countryButtonStyles: {
                            height: 50,
                            backgroundColor:colors.cardBg,
                            borderRadius:0,
                            borderBottomWidth:1,
                            borderBottomColor:colors.borderColor,
                            marginBottom:0,
                        },
                    }}
                />

                <View style={{flex:1}}>
                    <ScrollView>
                        <View style={{paddingHorizontal:20,paddingVertical:15}}>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={{
                                    height:48,
                                    width:48,
                                    borderRadius:48,
                                    alignItems:'center',
                                    justifyContent:'center',
                                    marginBottom:15,
                                    marginLeft:-15,
                                }}
                            >
                                <FeatherIcon size={26} color={colors.title} name={'arrow-left'}/>
                            </TouchableOpacity>
                            <Text style={{...FONTS.h2,color:colors.title,marginBottom:20}}>Can we get your number ?</Text>

                            <View
                                style={{
                                    flexDirection:'row',
                                    alignItems:'center',
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => setShow(true)}
                                    style={{
                                        borderBottomWidth:2,
                                        borderBottomColor:colors.borderColor,
                                        paddingVertical:10,
                                        top:4,
                                        marginRight:12,
                                        flexDirection:'row',
                                        alignItems:'center',
                                    }}
                                >
                                    <Text style={{
                                        ...FONTS.font,
                                        fontSize:20,
                                        lineHeight:23,
                                        ...FONTS.fontSemiBold,
                                        color:colors.title,
                                    }}>{countryName} {countryCode}</Text>
                                    <FeatherIcon style={{top:-2,marginLeft:3}} color={colors.title} size={20} name='chevron-down'/>
                                </TouchableOpacity>
                                <TextInput
                                    style={{
                                        ...FONTS.font,
                                        fontSize:20,
                                        height:50,
                                        lineHeight:26,
                                        color:colors.title,
                                        ...FONTS.fontSemiBold,
                                        borderBottomWidth:2,
                                        borderBottomColor:COLORS.primary2,
                                        flex:1,
                                    }}
                                    autoFocus
                                    placeholderTextColor={colors.textLight}
                                    placeholder='000 0000 0000'
                                />
                            </View>

                        </View>
                    </ScrollView>
                </View>
                <View
                    style={{
                        paddingHorizontal:45,
                        paddingVertical:35,
                    }}
                >
                    <GradientBtn
                        onPress={() => navigation.navigate('EnterCode')}
                        title={'Next'}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

    inputStyle:{
        height:55,
        padding:5,
        paddingHorizontal:15,
        borderWidth : 1,
        borderRadius: SIZES.radius,
        marginBottom:15,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'rgba(255,255,255,.05)',
    },
    
})


export default PhoneNumber;