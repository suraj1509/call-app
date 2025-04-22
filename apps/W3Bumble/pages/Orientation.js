import React, { useState } from 'react';
import {  Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import CheckBox from '@react-native-community/checkbox';
import { List } from 'react-native-paper';
import { GlobalStyleSheet } from '../../../app/constants/StyleSheet';
import { COLORS, FONTS } from '../../../app/constants/theme';
import GradientBtn from './components/GradientBtn';
import Button from '../../../app/components/Button/Button';

const Orientation = ({navigation}) => {

    const theme = useTheme();
    const {colors} = theme;

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
                                backgroundColor:'#FFEDB3',
                                alignItems:'center',
                                justifyContent:'center',
                                marginBottom:15,
                            }}
                        >
                            <FeatherIcon size={26} color={'#141414'} name={'arrow-left'}/>
                        </TouchableOpacity>
                        <Text style={{...FONTS.fontBold,fontSize:28,color:theme.dark ? colors.title :'#141414',marginBottom:15}}>Your sexual orientation ?</Text>
                        
                        {orientationData.map((data,index) => {
                            return(
                                <List.Item 
                                    onPress={() => handleOrientationSelected(data.title)} 
                                    key={index}
                                    left={() => 
                                        <View
                                            style={[
                                                Platform.OS === 'ios' && {
                                                    transform : [{scale:.75}]
                                                }
                                            ]}
                                        >
                                            <CheckBox
                                                tintColors={{ true: COLORS.primary4, false: colors.text }}
                                                style={{left:10}}
                                                boxType='square'
                                                tintColor={colors.borderColor}
                                                onTintColor={COLORS.primary4}
                                                value={data.checked}
                                                onCheckColor={COLORS.white}
                                                onFillColor={COLORS.primary4}
                                                disabled
                                            />
                                        </View>
                                    }
                                    title={() => <Text  style={{...FONTS.font,...FONTS.fontMedium,top:-1,color:theme.dark ? colors.title :'#141414'}}>{data.title}</Text>}
                                />
                            )
                        })}

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
                    onPress={() => navigation.navigate('Intrested')}
                    btnRounded
                    fontSize
                    textColor={'#141414'}
                    color={COLORS.primary4} 
                />
            </View>
        </SafeAreaView>
    );
};


export default Orientation;