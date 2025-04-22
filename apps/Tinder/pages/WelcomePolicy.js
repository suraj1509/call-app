import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { GlobalStyleSheet } from '../../../app/constants/StyleSheet';
import GradientBtn from './components/GradientBtn';
import { FONTS } from '../../../app/constants/theme';

const WelcomePolicy = ({navigation}) => {

    const {colors} = useTheme();

    return (
        <SafeAreaView
            style={{
                flex:1,
                backgroundColor:colors.cardBg,
            }}
        >
            <ScrollView
                contentContainerStyle={{
                    flexGrow:1,
                }}
            >
                <View style={GlobalStyleSheet.container}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            marginBottom:25
                        }}
                    >
                        <FeatherIcon color={colors.title} size={40} name="x"/>
                    </TouchableOpacity>
                    <View style={{
                        borderBottomWidth:1,
                        borderBottomColor:colors.borderColor,
                        paddingBottom:15,
                        marginBottom:25,
                    }}>
                        <Text style={{...FONTS.h2,color:colors.title}}>Welcome to Tinder.</Text>
                        <Text style={{...FONTS.font,fontSize:16,color:colors.text}}>Please follow these House Rules.</Text>
                    </View>
                    
                    <View style={{marginBottom:20}}>
                        <Text style={{...FONTS.h4,color:colors.title}}>Be yourself.</Text>
                        <Text style={{...FONTS.font,fontSize:16,color:colors.text}}>Make sure your photos, age , and bio are true to who are you.</Text>
                    </View>
                    <View style={{marginBottom:20}}>
                        <Text style={{...FONTS.h4,color:colors.title}}>Stay safe.</Text>
                        <Text style={{...FONTS.font,fontSize:16,color:colors.text}}>Don't be too quick to give out personal information.</Text>
                    </View>
                    <View style={{marginBottom:20}}>
                        <Text style={{...FONTS.h4,color:colors.title}}>Play it cool.</Text>
                        <Text style={{...FONTS.font,fontSize:16,color:colors.text}}>Respect others and treat them as you would like to be treated.</Text>
                    </View>
                    <View style={{marginBottom:20}}>
                        <Text style={{...FONTS.h4,color:colors.title}}>Be Proactive.</Text>
                        <Text style={{...FONTS.font,fontSize:16,color:colors.text}}>Don't be too quick to give out personal information.</Text>
                    </View>
                </View>
            </ScrollView>
            <View
                style={{
                    paddingHorizontal:45,
                    paddingVertical:35,
                }}
            >
                <GradientBtn
                    onPress={() => navigation.navigate('FirstName')}
                    title={'I agree'}
                />
            </View>
        </SafeAreaView>
    );
};

export default WelcomePolicy;