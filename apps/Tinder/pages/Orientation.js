import React, { useState } from 'react';
import {  Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import CheckBox from '@react-native-community/checkbox';
import { List } from 'react-native-paper';
import { GlobalStyleSheet } from '../../../app/constants/StyleSheet';
import { COLORS, FONTS } from '../../../app/constants/theme';
import GradientBtn from './components/GradientBtn';

const Orientation = ({navigation}) => {

    const {colors} = useTheme();

    const Data = [
        {
            title : "Straight",
            checked : false,
        },
        {
            title : "Gay",
            checked : false,
        },
        {
            title : "Lesbian",
            checked : false,
        },
        {
            title : "Bisexual",
            checked : false,
        },
        {
            title : "Asexual",
            checked : false,
        },
        {
            title : "Queer",
            checked : false,
        },
        {
            title : "Demisexual",
            checked : false,
        },
    ]

    const [ orientationData , setOrientationData] = useState(Data);
    const [checked , setChecked] = useState(false);

    const handleOrientationSelected = (val) => {
        let Data = orientationData.map((data) => {
            if (val === data.title) {
                return { ...data, checked: !data.checked };
            }
            return data;
        });
        setOrientationData(Data);
    }

    return (
        <SafeAreaView
            style={{
                flex:1,
                backgroundColor:colors.cardBg,
            }}
        >
            <View style={{flex:1}}>
                <ScrollView>
                    <View style={GlobalStyleSheet.container}>
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
                        <Text style={{...FONTS.h2,color:colors.title,marginBottom:20}}>Your sexual orientation ?</Text>
                        
                        {orientationData.map((data,index) => {
                            return(
                                <List.Item
                                    onPress={() => handleOrientationSelected(data.title)}
                                    key={index}
                                    rippleColor={colors.bgLight}
                                    style={{
                                        paddingVertical:12,
                                    }}
                                    title={data.title}
                                    titleStyle={[{
                                        ...FONTS.font,
                                        fontSize:20,
                                        lineHeight:22,
                                        top:1,
                                        color:colors.text
                                    }, data.checked && {
                                        color:COLORS.primary2
                                    }]}
                                    right={() => data.checked && <FeatherIcon size={20} color={colors.title} name='check'/>}
                                ></List.Item>
                            )
                        })}

                    </View>
                </ScrollView>
            </View>
            <View style={{paddingHorizontal:20,paddingVertical:5,marginBottom:10,flexDirection:'row',alignItems:'center'}}>
                <View
                    style={[{
                        marginRight:10
                    },
                        Platform.OS === 'ios' && {
                            transform : [{scale:.75}]
                        }
                    ]}
                >
                    <CheckBox
                        tintColors={{ true: COLORS.primary2, false: colors.text }}
                        style={{left:10}}
                        boxType='square'
                        tintColor={colors.borderColor}
                        onTintColor={COLORS.primary2}
                        value={checked}
                        onCheckColor={COLORS.white}
                        onFillColor={COLORS.primary2}
                        onValueChange={(val) => setChecked(val)}
                    />
                </View>
                <Text  style={{...FONTS.font,fontSize:16,...FONTS.fontMedium,color:colors.text}}>Show my orientation on my profile</Text>
            </View>
            <View
                style={{
                    paddingHorizontal:45,
                    paddingBottom:35,
                }}
            >
                <GradientBtn
                    onPress={() => navigation.navigate('Intrested')}
                    title={'Next'}
                />
            </View>
        </SafeAreaView>
    );
};


export default Orientation;