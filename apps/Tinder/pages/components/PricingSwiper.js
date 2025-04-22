import React from 'react';
import { Image, Platform, Text, View } from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
import { COLORS, FONTS, IMAGES, SIZES } from '../../../../app/constants/theme';

const PricingSwiper = ({setActiveIndex, activeIndex}) => {

    const theme = useTheme();

    const SwiperData = [
        {
            title : "PLUS",
            colors : ["#ea3d85","#ff864e"],
        },
        {
            title : "GOLD",
            colors : ["#e89e44","#f0cc6e"],
        },
        {
            title : "PLATINUM",
            colors : ["#090A0C","#374550"],
        },
    ]

    return (
        <>
            <Swiper
                activeDotColor={COLORS.primary2}
                dotColor={theme.dark ? 'rgba(255,255,255,.15)' : '#dfdfdf'}
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
                                    backgroundColor: data.colors[0],
                                    borderRadius:8,
                                }]}
                            >
                                <LinearGradient
                                    colors={data.colors}
                                    start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                    style={{
                                        paddingHorizontal:30,
                                        paddingVertical:25,
                                        borderRadius:8,
                                        flexDirection:'row',
                                        justifyContent:'center',
                                        alignItems:'center',
                                    }}
                                >
                                    <Image
                                        style={{
                                            tintColor:COLORS.white,
                                            width:120,
                                            resizeMode:'contain',
                                            height:25,
                                        }}
                                        source={IMAGES.tinder}
                                    />
                                    <View
                                        style={{
                                            borderRadius:20,
                                            paddingHorizontal:8,
                                            paddingVertical:4,
                                            top: 2,
                                            backgroundColor:'#fff',
                                            marginLeft:6,
                                        }}
                                    >
                                        <Text style={{...FONTS.fontXs,color:data.colors[0],...FONTS.fontBold,top:2}}>{data.title}</Text>
                                    </View>
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