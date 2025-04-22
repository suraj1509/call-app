import React from 'react';
import {  KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import OTPTextInput from 'react-native-otp-textinput';
import { GlobalStyleSheet } from '../../../app/constants/StyleSheet';
import { COLORS, FONTS } from '../../../app/constants/theme';
import GradientBtn from './components/GradientBtn';

const EnterCode = ({navigation}) => {

    const {colors} = useTheme();

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
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Text style={{...FONTS.h2,color:colors.title,marginBottom:20}}>Enter your code</Text>
                                <TouchableOpacity
                                    style={{
                                        paddingHorizontal:15,
                                        paddingVertical:8,
                                        backgroundColor:colors.bgLight,
                                        borderRadius:30,
                                        marginLeft:10,
                                        top:-10,
                                    }}
                                >
                                    <Text style={{...FONTS.fontLg,color:COLORS.primary2}}>Resend</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{alignItems:'center'}}>
                                <OTPTextInput 
                                    tintColor={COLORS.primary2}
                                    inputCount={6}
                                    textInputStyle={{
                                        borderBottomWidth : 2,
                                        fontSize:30,
                                        color : colors.title,
                                    }}
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
                        onPress={() => navigation.navigate('WelcomePolicy')}
                        title={'Next'}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};


export default EnterCode;