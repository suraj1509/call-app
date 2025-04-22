import React from 'react';
import {  KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { GlobalStyleSheet } from '../../../app/constants/StyleSheet';
import { COLORS, FONTS, SIZES } from '../../../app/constants/theme';
import Button from '../../../app/components/Button/Button';

const FirstName = ({navigation}) => {

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
                        <View style={GlobalStyleSheet.container}>
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
                            <Text style={{...FONTS.fontBold,fontSize:28,color:theme.dark ? colors.title :'#141414',marginBottom:15}}>Enter your first name ?</Text>
                            <View style={[styles.inputStyle,{borderColor:theme.dark ? colors.title :'#141414',}]}>
                                <TextInput
                                    style={{
                                        ...FONTS.fontSemiBold,
                                        fontSize:18,
                                        color:colors.title,
                                        flex:1,
                                        top:0,
                                        paddingVertical:0,
                                        paddingLeft:10,
                                    }}
                                    autoFocus
                                    placeholder='Enter first name'
                                    placeholderTextColor={theme.dark ? colors.title :'#141414'}
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
                        onPress={() => navigation.navigate('EnterBirthDate')}
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


const styles = StyleSheet.create({

    inputStyle:{
        height:55,
        padding:5,
        paddingHorizontal:15,
        borderWidth : 1,
        borderBottomWidth:3,
        borderRadius: SIZES.radius,
        marginBottom:15,
        flexDirection:'row',
        alignItems:'center',
        borderColor:'#141414'
       // backgroundColor:'green'
        //backgroundColor:'rgba(255,255,255,.05)',
    },
    
})


export default FirstName;