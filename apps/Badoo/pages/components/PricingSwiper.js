import React from 'react';
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
import { COLORS, FONTS, IMAGES, SIZES } from '../../../../app/constants/theme';

const PricingSwiper = ({setActiveIndex, activeIndex}) => {

    const {colors} = useTheme();

    const SwiperData = [
        {
            title : "W3Badoo Premium Plus",
            desc : "Maximize your dating with all the benefits of Premium, plus extra features included",
            colors : ["#430076","#890cf1"],
        },
        {
            title : "W3Badoo Premium",
            desc : "Maximize your dating with all the benefits of Premium, plus extra features included",
            colors : ["#090A0C","#374550"],
        },
    ]

    return (
        <>
            <Swiper
                activeDotColor={COLORS.primary3}
                //dotColor={colors.bgLight}
                loop={false}
                paginationStyle={{
                    bottom:12,
                }}
                index={activeIndex}
                onIndexChanged={(val) => setActiveIndex(val)}
            >

                {SwiperData.map((data,index) => {
                    return(
                        <View
                            key={index}
                            style={{
                                paddingHorizontal:20,
                                paddingTop:15,
                            }}
                        >
                            <Shadow
                                style={[{
                                    shadowColor:data.colors[0],
                                    shadowOffset: {
                                        width: 0,
                                        height: 5,
                                    },
                                    shadowOpacity: .4,
                                    shadowRadius: 8,
                                },Platform.OS === 'ios' && {
                                    backgroundColor : data.colors[0],
                                    borderRadius:SIZES.radius,
                                }]}
                            >
                                <LinearGradient
                                    colors={data.colors}
                                    start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                    style={{
                                        paddingHorizontal:30,
                                        paddingVertical:25,
                                        borderRadius:SIZES.radius,
                                        alignItems:'center',
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection:'row',
                                            alignItems:'center',
                                            justifyContent:'center',
                                            marginBottom:10,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                height:20,
                                                width:20,
                                                tintColor:COLORS.white,
                                                marginRight:5,
                                            }}
                                            source={IMAGES.fire}
                                        />
                                        <Text style={{...FONTS.h5,color:COLORS.white,textAlign:'center',top:2}}>{data.title}</Text>
                                    </View>
                                    <Text style={{textAlign:'center',...FONTS.font,color:COLORS.white,opacity:.8,lineHeight:18}}>{data.desc}</Text>
                                    <TouchableOpacity
                                        style={{
                                            marginBottom:5,
                                            marginTop:10,
                                        }}
                                    >
                                        <LinearGradient
                                            colors={["#df9b48","#f6e8bb"]}
                                            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                            style={{
                                                paddingHorizontal:15,
                                                paddingVertical:5,
                                                borderRadius:30,
                                            }}
                                        >
                                            <Text style={{...FONTS.font,fontSize:15,color:COLORS.title}}>Upgrade From 1,125.00 INR</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </LinearGradient>
                            </Shadow>
                        </View>
                    )
                })}

            </Swiper>

        </>
    );
};

export default PricingSwiper;