import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';
// import DropShadow from 'react-native-shadow-2';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, IMAGES, SIZES } from '../../../../app/constants/theme';
import { GlobalStyleSheet } from '../../../../app/constants/StyleSheet';
import PricingSwiper from '../components/PricingSwiper';

const Profile = ({navigation}) => {
    
    const {colors} = useTheme();

    const [activeIndex , setActiveIndex] = useState(0);

    const pricingData = [
        [
            {
                title : "Unlimited Likes",
                lock : false,
            },
            {
                title : "See Who Likes You",
                lock : true,
            },
            {
                title : "Priority Likes",
                lock : true,
            },
            {
                title : "Unlimited Rewinds",
                lock : false,
            },
            {
                title : "1 Free Boost per month",
                lock : true,
            },
            {
                title : "5 Free Super Likes per week",
                lock : true,
            },
            {
                title : "Message Before Matching",
                lock : true,
            },
            {
                title : "Passport",
                lock : false,
            },
            {
                title : "Top Picks",
                lock : true,
            },
            {
                title : "Control Your Profile",
                lock : false,
            },
            {
                title : "Control Who Sees You",
                lock : false,
            },
            {
                title : "Control Who You See",
                lock : false,
            },
            {
                title : "Hide Ads",
                lock : false,
            },
        ],
        [
            {
                title : "Unlimited Likes",
                lock : false,
            },
            {
                title : "See Who Likes You",
                lock : false,
            },
            {
                title : "Priority Likes",
                lock : false,
            },
            {
                title : "Unlimited Rewinds",
                lock : false,
            },
            {
                title : "1 Free Boost per month",
                lock : false,
            },
            {
                title : "5 Free Super Likes per week",
                lock : false,
            },
            {
                title : "Message Before Matching",
                lock : false,
            },
            {
                title : "Passport",
                lock : false,
            },
            {
                title : "Top Picks",
                lock : false,
            },
            {
                title : "Control Your Profile",
                lock : false,
            },
            {
                title : "Control Who Sees You",
                lock : false,
            },
            {
                title : "Control Who You See",
                lock : false,
            },
            {
                title : "Hide Ads",
                lock : false,
            },
        ]
    ]


    return (
        <SafeAreaView
            style={{
                flex:1,
                backgroundColor:colors.cardBg,
            }}
        >   
            <View style={{
                flexDirection:'row',
                alignItems:'center',
                paddingHorizontal:15,
                paddingVertical:5,
            }}>
                <Text style={{...FONTS.h4,color:colors.title,flex:1}}>Profile</Text>
                <IconButton
                    onPress={() => navigation.navigate('Settings')}
                    size={28}
                    style={{
                        backgroundColor:colors.bgLight
                    }}
                    icon={() => <Ionicons size={24} color={colors.text} name='settings-sharp'/>}
                />
                <IconButton
                    onPress={() => navigation.navigate('EditProfile')}
                    size={28}
                    style={{
                        backgroundColor:colors.bgLight
                    }}
                    icon={() => <FontAwesome size={22} color={colors.text} name='pencil'/>}
                />
            </View>
            <ScrollView
                contentContainerStyle={{
                    paddingBottom:90,
                }}
            >
                <View style={[GlobalStyleSheet.container,{paddingTop:5}]}>
                    <View
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            paddingBottom:25,
                            marginBottom:10,
                        }}
                    >

                        <View
                            style={{
                                alignItems:'center',
                                justifyContent:'center',
                                marginRight:20,
                            }}
                        >
                            <View
                                style={{transform:[{rotate : '180deg'}]}}
                            >
                                <Progress.Circle 
                                    borderWidth={0}
                                    unfilledColor={'#d4e8f2'}
                                    color={COLORS.primary3}
                                    progress={0.4} 
                                    size={120} 
                                    thickness={5}
                                    strokeCap={'round'}
                                />
                            </View>
                            <Image
                                style={{
                                    height:110,
                                    width:110,
                                    borderRadius:100,
                                    position:'absolute',
                                }}
                                source={IMAGES.userPic5}
                            />
                            <View
                                style={[styles.profileProgress,{
                                    borderColor:colors.cardBg,
                                    backgroundColor:COLORS.primary3
                                }]}
                            >
                                
                                <Text style={{...FONTS.font,...FONTS.fontBold,color:COLORS.white,top:-1}}>40%</Text>
                            </View>
                        </View>

                        <View
                            style={{
                                alignItems:'flex-start',
                            }}
                        >
                            <Text style={{...FONTS.h4,color:colors.title,lineHeight:24,marginBottom:2,marginTop:10}}>Richard, 20</Text>
                            <Text style={{...FONTS.font,color:colors.text,marginBottom:14}}>Web Designer</Text>
                            <TouchableOpacity
                                style={{
                                    backgroundColor:colors.bgLight,
                                    flexDirection:'row',
                                    paddingHorizontal:16,
                                    alignItems:'center',
                                    paddingVertical:8,
                                    borderRadius:30,
                                }}
                            >
                                <Ionicons style={{marginRight:5}} size={16} color={colors.text} name='chatbubble'/>
                                <Text style={{...FONTS.font,fontSize:16,color:colors.title}}>Open to chat</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    <View style={GlobalStyleSheet.row}>
                        <View style={GlobalStyleSheet.col50}>
                            
                                <TouchableOpacity
                                    style={{
                                        flexDirection:'row',
                                        alignItems:'center',
                                        backgroundColor:colors.cardBg,
                                        borderRadius:SIZES.radius,
                                        paddingVertical:10,
                                        paddingHorizontal:10,
                                        borderWidth:1,
                                        borderStyle:'dashed',
                                        borderColor:colors.borderColor,
                                        ...GlobalStyleSheet.shadow,
                                    }}
                                >
                                    <Image
                                        source={IMAGES.performancemeter}
                                        style={{
                                            height:32,
                                            width:32,
                                            resizeMode:'contain',
                                            marginRight:12,
                                            marginLeft:5,
                                        }}
                                    />
                                    <View>
                                        <Text style={{...FONTS.font,color:colors.textLight,marginBottom:2,top:-2}}>Your activity</Text>
                                        <Text style={{...FONTS.font,...FONTS.fontSemiBold,fontSize:15,color:colors.title}}>Very high</Text>
                                    </View>
                                </TouchableOpacity>
                        </View>
                        <View style={GlobalStyleSheet.col50}>
                            
                                <TouchableOpacity
                                    style={{
                                        flexDirection:'row',
                                        alignItems:'center',
                                        backgroundColor:colors.cardBg,
                                        borderRadius:SIZES.radius,
                                        paddingVertical:10,
                                        paddingHorizontal:10,
                                        borderWidth:1,
                                        borderStyle:'dashed',
                                        borderColor:colors.borderColor,
                                        ...GlobalStyleSheet.shadow,
                                    }}
                                >
                                    <Image
                                        source={IMAGES.coin}
                                        style={{
                                            height:32,
                                            width:32,
                                            resizeMode:'contain',
                                            marginRight:12,
                                            marginLeft:5,
                                        }}
                                    />
                                    <View>
                                        <Text style={{...FONTS.font,color:colors.textLight,marginBottom:2,top:-2}}>Credits</Text>
                                        <Text style={{...FONTS.font,...FONTS.fontSemiBold,fontSize:15,color:colors.title}}>₹1550</Text>
                                    </View>
                                </TouchableOpacity>
                        </View>
                    </View>
                    
                </View>
                <View
                    style={{
                        height:225
                    }}
                >
                    <PricingSwiper
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                    />
                </View>

                <View
                    style={{
                        paddingHorizontal:25,
                        paddingVertical:0,
                    }}
                >
                    {pricingData[activeIndex].map((data,index) => {
                        return(
                            <View 
                                key={index}
                                style={{
                                    paddingVertical:12,
                                    flexDirection:'row',
                                    alignItems:'center',
                                }}
                            >
                                <FeatherIcon style={{marginRight:12 , opacity : data.lock ?  .8 : 1}} size={20} color={data.lock ? colors.textLight : COLORS.primary3} name={data.lock ? 'lock' :'check'}/>
                                <Text style={[{...FONTS.font,fontSize:15,...FONTS.fontSemiBold,color:colors.title},
                                    data.lock && {
                                        color:colors.textLight,
                                        opacity:.8,
                                    }
                                ]}>{data.title}</Text>
                            </View>
                        )
                    })}
                </View>

            </ScrollView>
            
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    profileProgress : {
        position:'absolute',
        bottom:-10,
        backgroundColor:COLORS.primary,
        borderWidth:3,
        paddingHorizontal:12,
        paddingVertical:3,
        borderRadius:20,
    },
})

export default Profile;