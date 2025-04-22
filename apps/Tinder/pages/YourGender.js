import React, { useState } from 'react';
import {  SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { GlobalStyleSheet } from '../../../app/constants/StyleSheet';
import { COLORS, FONTS } from '../../../app/constants/theme';
import CheckList from './components/CheckList';
import GradientBtn from './components/GradientBtn';
import { List } from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';

const YourGender = ({navigation}) => {

    const {colors} = useTheme();
    const [checked , setChecked] = useState(false);
    const genderData= ["Women" , "Men", "Other"];
    const [activeGender , setGender] = useState(genderData[1]);

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
                        <Text style={{...FONTS.h2,color:colors.title,marginBottom:25}}>What's your gender ?</Text>
                        
                        <View>
                            {genderData.map((data,index) => {
                                return(
                                    <CheckList
                                        onPress={() => setGender(data)}
                                        item={data}
                                        checked={data == activeGender ? true : false}
                                        key={index}
                                    />
                                )
                            })}
                        </View>

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
                <Text  style={{...FONTS.font,fontSize:16,...FONTS.fontMedium,color:colors.text}}>Show my gender on my profile</Text>
            </View>
            <View
                style={{
                    paddingHorizontal:45,
                    paddingBottom:35,
                }}
            >
                <GradientBtn
                    onPress={() => navigation.navigate('Orientation')}
                    title={'Next'}
                />
            </View>
        </SafeAreaView>
    );
};


export default YourGender;