import React, { useState } from 'react';
import {  SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { GlobalStyleSheet } from '../../../app/constants/StyleSheet';
import { COLORS, FONTS } from '../../../app/constants/theme';
import CheckList from './components/CheckList';
import GradientBtn from './components/GradientBtn';
import Button from '../../../app/components/Button/Button';

const Intrested = ({navigation}) => {

    const theme = useTheme();
    const {colors} = theme;

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
                                backgroundColor:'#FFEDB3',
                                alignItems:'center',
                                justifyContent:'center',
                                marginBottom:15,
                            }}
                        >
                            <FeatherIcon size={26} color={'#141414'} name={'arrow-left'}/>
                        </TouchableOpacity>
                        <Text style={{...FONTS.fontBold,fontSize:28,color:theme.dark ? colors.title :'#141414',marginBottom:15}}>Who are you interested in seeing ?</Text>
                        
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
                    paddingHorizontal:35,
                    paddingBottom:20
                }}
            >
                <Button
                    title={'Next'}
                    onPress={() => navigation.navigate('LookingFor')}
                    btnRounded
                    fontSize
                    textColor={'#141414'}
                    color={COLORS.primary4} 
                />
            </View>
        </SafeAreaView>
    );
};


export default Intrested;