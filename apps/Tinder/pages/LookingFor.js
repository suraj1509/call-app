import React, { useState } from 'react';
import {  Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { GlobalStyleSheet } from '../../../app/constants/StyleSheet';
import { COLORS, FONTS, IMAGES, SIZES } from '../../../app/constants/theme';
import GradientBtn from './components/GradientBtn';

const LookingFor = ({navigation}) => {

    const {colors} = useTheme();

    const genderData= [
        {
            image : IMAGES.love,
            title : "Long-term partner" ,
        },{
            image : IMAGES.inlove,
            title : "Long-term, open to short", 
        },{
            image : IMAGES.drinking,
            title : "Short-term, open to long",
        },{
            image : IMAGES.confetti,
            title : "Short-term fun",
        },{
            image : IMAGES.hello,
            title : "New friends",
        },{
            image : IMAGES.think,
            title : "Stil figuring it out",
        }
    ];
    const [active , setActive] = useState(genderData[1].title);

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
                        <Text style={{...FONTS.h2,color:colors.title}}>Right now I'm looking for...</Text>
                        <Text style={{...FONTS.font,fontSize:16,color:colors.text,marginBottom:25}}>Increase compatibility by sharing yours!</Text>
                        <View
                            style={{
                                flexDirection:'row',
                                flexWrap:'wrap',
                            }}
                        >  
                            {genderData.map((data,index) => {
                                return(
                                    
                                    <View
                                        key={index}
                                        style={{
                                            width:'33.33%',
                                            paddingHorizontal:3,
                                            marginBottom:6,
                                        }}
                                    >
                                        <TouchableOpacity
                                            onPress={() => setActive(data.title)}
                                            style={[{
                                                backgroundColor:colors.bgLight,
                                                borderRadius:SIZES.radius,
                                                paddingHorizontal:6,
                                                height:135,
                                                paddingVertical:15,
                                                borderWidth:2,
                                                borderColor:'transparent',
                                            }, data.title == active && {
                                                borderColor:COLORS.primary2,
                                                backgroundColor:colors.cardBg,
                                            }]}
                                        >
                                            <View
                                                style={{
                                                    flex:1,
                                                    alignItems:'center',
                                                    justifyContent:'center',
                                                }}
                                            >
                                                <Image
                                                    style={{
                                                        height:28,
                                                        width:28,
                                                    }}
                                                    source={data.image}
                                                />
                                            </View>
                                            <Text style={{
                                                ...FONTS.font,
                                                ...FONTS.fontSemiBold,
                                                fontSize:15,
                                                color:colors.title,
                                                textAlign:'center',
                                            }}>{data.title}</Text>
                                        </TouchableOpacity>
                                    </View>
                                   
                                )
                            })}
                        </View>

                    </View>
                </ScrollView>
            </View>
            <View
                style={{
                    paddingHorizontal:45,
                    paddingVertical:35,
                }}
            >
                <GradientBtn
                    onPress={() => navigation.navigate('YouInto')}
                    title={'Next'}
                />
            </View>
        </SafeAreaView>
    );
};


export default LookingFor;