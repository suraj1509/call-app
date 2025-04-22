import React from 'react';
import {  KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import OTPTextInput from 'react-native-otp-textinput';
import { GlobalStyleSheet } from '../../../app/constants/StyleSheet';
import { COLORS, FONTS } from '../../../app/constants/theme';
import GradientBtn from './components/GradientBtn';
import Button from '../../../app/components/Button/Button';

const EnterCode = ({navigation}) => {

    const theme = useTheme();
    const {colors} = theme;

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
                        <View style={[GlobalStyleSheet.container,{paddingHorizontal:25}]}>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={{
                                    height:48,
                                    width:48,
                                    borderRadius:48,
                                    backgroundColor:'#FFEDB3',
                                    alignItems:'center',
                                    justifyContent:'center',
                                    marginBottom:15,
                                }}
                            >
                                <FeatherIcon size={26} color={'#141414'} name={'arrow-left'}/>
                            </TouchableOpacity>
                            <Text style={{...FONTS.fontBold,fontSize:28,color:theme.dark ? colors.title :'#141414',marginBottom:15}}>Enter your code</Text>
                            <View style={{alignItems:'center'}}>
                                <OTPTextInput 
                                    tintColor={COLORS.primary4}
                                    textInputStyle={{
                                        borderBottomWidth : 2,
                                        color :colors.title,
                                    }}
                                    containerStyle={{
                                        width : 300,
                                    }}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View
                    style={{
                        paddingHorizontal:35,
                        paddingBottom:20
                    }}
                >
                    <Button
                        title={'Next'}
                        onPress={() => navigation.navigate('FirstName')}
                        btnRounded
                        fontSize
                        textColor={'#141414'}
                        color={COLORS.primary4} 
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};


export default EnterCode;