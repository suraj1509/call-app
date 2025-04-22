import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Header from '../../../../app/layout/Header';
import { GlobalStyleSheet } from '../../../../app/constants/StyleSheet';
import themeContext from '../../../../app/constants/themeContext';
import { RadioButton } from 'react-native-paper';
import { COLORS, FONTS} from '../../../../app/constants/theme';

const ThemeMode = () => {

    const theme = useTheme();
    const {colors} = theme;
    const [value, setValue] = useState('');

    const {setDarkTheme,setLightTheme} = React.useContext(themeContext);


    useEffect(()=> {
        if(theme.dark){
            setValue('dark');
        }else{
            setValue('light');
        }
    },[])

    const handleTheme = (val) => {
        if(val === "light"){
            setLightTheme();
        }else if(val === "dark"){
            setDarkTheme();
        }
    }

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
                title={'Set theme'}
            />
            <ScrollView>
                <View style={GlobalStyleSheet.container}>
                    <RadioButton.Group 
                        onValueChange={(value) => {setValue(value);handleTheme(value)}} 
                        value={value}
                    >
                        <RadioButton.Item uncheckedColor={colors.title} color={COLORS.primary3} labelStyle={{...FONTS.h6,color:colors.title}} label="Light" value="light" />
                        <RadioButton.Item uncheckedColor={colors.title} color={COLORS.primary3} labelStyle={{...FONTS.h6,color:colors.title}} label="Dark" value="dark" />
                    </RadioButton.Group>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ThemeMode;