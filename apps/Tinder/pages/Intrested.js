import React, { useState } from 'react';
import {  SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import CheckBox from '@react-native-community/checkbox';
import { GlobalStyleSheet } from '../../../app/constants/StyleSheet';
import { COLORS, FONTS } from '../../../app/constants/theme';
import CheckList from './components/CheckList';
import GradientBtn from './components/GradientBtn';

const Intrested = ({navigation}) => {

    const {colors} = useTheme();
    const genderData= ["Women" , "Men", "Everyone"];
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
                        <Text style={{...FONTS.h2,color:colors.title,marginBottom:25}}>Select Your Preferred Language</Text>
                        
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
            <View
                style={{
                    paddingHorizontal:45,
                    paddingBottom:35,
                }}
            >
                <GradientBtn
                    onPress={() => navigation.navigate('LookingFor')}
                    title={'Next'}
                />
            </View>
        </SafeAreaView>
    );
};


export default Intrested;