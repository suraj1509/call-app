import React from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS, IMAGES, SIZES } from '../../../../app/constants/theme';
import LinearGradient from 'react-native-linear-gradient';

const ExploreData = [
    {
        image : IMAGES.explore1,
        title : "Free Tonight",
        desc : "Down for something spontaneous",
    },
    {
        image : IMAGES.explore2,
        title : "Looking for Love",
        desc : "Sweep me off my feet",
    },
    {
        image : IMAGES.explore3,
        title : "Let's be Friends",
        desc : "Maybe even besties",
    },
    {
        image : IMAGES.explore4,
        title : "Cofee Date",
        desc : "Take me to your facorite cafe",
    },
    {
        image : IMAGES.explore5,
        title : "Get Photo Verified",
        desc : "Get Verified On Tinder",
    }
]

const Explore = () => {

    const {colors} = useTheme();

    return (
        <SafeAreaView
            style={{
                flex:1,
            }}
        >
            <View
                style={{
                    flexDirection:'row',
                    paddingHorizontal:15,
                    paddingVertical:12,
                    alignItems:'center',
                }}
            >
                <Image
                    style={{
                        width:120,
                        height:30,
                        resizeMode:'contain',
                        top:-1,
                    }}
                    source={IMAGES.tinder}
                />
            </View>
            <ScrollView
                contentContainerStyle={{
                    paddingBottom:80,
                }}
            >
                <View style={{padding:10}}>
                    {ExploreData.map((data,index) => {
                        return(
                            <TouchableOpacity
                                activeOpacity={.8}
                                key={index}
                                style={{
                                    marginBottom:10,
                                }}
                            >
                                <Image
                                    style={{
                                        width:'100%',
                                        height:undefined,
                                        aspectRatio : 1 / 1.4,
                                        borderRadius:SIZES.radius,
                                    }}
                                    source={data.image}
                                />
                                <LinearGradient
                                    colors={["rgba(0,0,0,0)","rgba(0,0,0,.8)"]}
                                    style={{
                                        position:'absolute',
                                        height:'100%',
                                        width:'100%',
                                        borderRadius:SIZES.radius,
                                        justifyContent:'flex-end',
                                        paddingHorizontal:20,
                                        paddingVertical:30,
                                        alignItems:'center',
                                    }}
                                >
                                    <Text style={{...FONTS.h3,color:COLORS.white}}>{data.title}</Text>
                                    <Text style={{...FONTS.font,fontSize:15,color:COLORS.white,marginBottom:20}}>{data.desc}</Text>
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor:COLORS.white,
                                            paddingHorizontal:35,
                                            paddingVertical:12,
                                            borderRadius:30,
                                        }}
                                    >
                                        <Text style={{...FONTS.fontLg,color:"#000",top:1}}>JOIN NOW</Text>
                                    </TouchableOpacity>
                                </LinearGradient>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Explore;