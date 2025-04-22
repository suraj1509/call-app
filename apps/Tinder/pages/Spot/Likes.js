import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { GlobalStyleSheet } from '../../../../app/constants/StyleSheet';
import { COLORS, FONTS, IMAGES } from '../../../../app/constants/theme';

const Likes = () => {

    const navigation = useNavigation();

    const LikedData = [
        {
            image : IMAGES.likedPic1,
            name : "Chelsea",
            age : 25,
            about : "Harward University",
        },
        {
            image : IMAGES.likedPic2,
            name : "Abby",
            age : 27,
            about : "Chapman University",
        },
        {
            image : IMAGES.likedPic3,
            name : "Javelle",
            age : 23,
            about : "Law student at stanford",
        },
        {
            image : IMAGES.likedPic4,
            name : "Veronica",
            age : 25,
            about : "Chapman University",
        },
        {
            image : IMAGES.likedPic5,
            name : "Richard",
            age : 22,
            about : "Harward University",
        },
        {
            image : IMAGES.likedPic6,
            name : "chelsea",
            age : 25,
            about : "Harward University",
        },
        {
            image : IMAGES.likedPic1,
            name : "Chelsea",
            age : 25,
            about : "Harward University",
        },
        {
            image : IMAGES.likedPic2,
            name : "Abby",
            age : 27,
            about : "Chapman University",
        },
        {
            image : IMAGES.likedPic3,
            name : "Javelle",
            age : 23,
            about : "Law student at stanford",
        },
        {
            image : IMAGES.likedPic4,
            name : "Veronica",
            age : 25,
            about : "Chapman University",
        },
        {
            image : IMAGES.likedPic5,
            name : "Richard",
            age : 22,
            about : "Harward University",
        },
        {
            image : IMAGES.likedPic6,
            name : "chelsea",
            age : 25,
            about : "Harward University",
        },
    ]

    return (
        <ScrollView
            contentContainerStyle={{
                paddingBottom:60,
            }}
        >
            <View
                style={GlobalStyleSheet.container}
            >
                <View style={[GlobalStyleSheet.row,{marginHorizontal:-10}]}>
                    {LikedData.map((data,index) => {
                        return(
                            <View
                                style={GlobalStyleSheet.col50}
                                key={index}
                            >
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('ProfileDetails',{item : data})}
                                    activeOpacity={.8}
                                    style={{
                                       marginBottom:10
                                    }}
                                >
                                    <Image
                                        style={{
                                            width:'100%',
                                            height:220,
                                            borderRadius:10,
                                        }}
                                        source={data.image}
                                    />
                                    <LinearGradient
                                        colors={['rgba(0,0,0,0.1)','rgba(0,0,0,.7)']}
                                        style={{
                                            position : 'absolute',
                                            height: '100%',
                                            width:'100%',
                                            top:0,
                                            borderRadius:10,
                                            paddingHorizontal:10,
                                            paddingVertical:12,
                                            flexDirection:'row',
                                            alignItems:'flex-end',
                                        }}
                                    >
                                        <View style={{flex:1,marginRight:10}}>
                                            <Text numberOfLines={1} style={{...FONTS.h6,color:COLORS.white,lineHeight:22}}>{data.name}, {data.age}</Text>
                                            <Text style={{...FONTS.fontSm,color:COLORS.white,opacity:.75}} numberOfLines={1}>{data.about}</Text>
                                        </View>
                                        <TouchableOpacity>
                                            <LinearGradient
                                                colors={["#ea3d85","#ff864e"]}
                                                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                                style={{
                                                    height:35,
                                                    width:35,
                                                    borderRadius:35,
                                                    alignItems:'center',
                                                    justifyContent:'center',
                                                }}
                                            >
                                                <Image
                                                    style={{
                                                        height:20,
                                                        width:20,
                                                        tintColor:COLORS.white,
                                                    }}
                                                    source={IMAGES.star}
                                                />
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </View>
            </View>
        </ScrollView>
    );
};

export default Likes;