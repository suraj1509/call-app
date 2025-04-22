import React from 'react';
import { View, Text, SafeAreaView , ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { FONTS } from '../../../../app/constants/theme';
import Header from '../../../../app/layout/Header';
import { GlobalStyleSheet } from '../../../../app/constants/StyleSheet';

const About = ({navigation}) => {

    const {colors} = useTheme();
    
    return (
        <SafeAreaView
            style={{flex:1,backgroundColor:colors.cardBg}}
        >
            <Header
                titleLeft
                leftIcon={'back'}
                title={'About'}
            />

            <ScrollView>
                <View style={GlobalStyleSheet.container}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('PrivacyPolicy')}
                        style={{
                            flexDirection:'row',
                            borderBottomWidth:1,
                            borderBottomColor:colors.borderColor,
                            paddingVertical:15,
                        }}
                    >
                        <Text style={{...FONTS.h6,...FONTS.fontSemiBold,color:colors.title,flex:1}}>Privacy Policy</Text>
                        <FeatherIcon color={colors.title} size={20} name="chevron-right"/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('TermsUse')}
                        style={{
                            flexDirection:'row',
                            borderBottomWidth:1,
                            borderBottomColor:colors.borderColor,
                            paddingVertical:15,
                        }}
                    >
                        <Text style={{...FONTS.h6,...FONTS.fontSemiBold,color:colors.title,flex:1}}>Terms of Use</Text>
                        <FeatherIcon color={colors.title} size={20} name="chevron-right"/>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default About;