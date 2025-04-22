import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Header from '../../../../app/layout/Header';
import { GlobalStyleSheet } from '../../../../app/constants/StyleSheet';
import { FONTS } from '../../../../app/constants/theme';
import ToggleStyle1 from '../../../../app/components/Toggles/ToggleStyle1';

const Notification = () => {

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
                title={'Notification'}
            />
            <ScrollView>
                <View
                    style={GlobalStyleSheet.container}
                >   
                    <View
                        style={{
                            flexDirection:'row',
                            paddingVertical:10,
                            alignItems:'center',
                        }}
                    >
                        <Text style={[FONTS.fontLg,FONTS.fontSemiBold,{color:colors.title,flex:1}]}>Push notification</Text>
                        <ToggleStyle1/>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Notification;