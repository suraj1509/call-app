import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../../../app/constants/StyleSheet';
import { COLORS, FONTS, IMAGES } from '../../../../app/constants/theme';
import LinearGradient from 'react-native-linear-gradient';

const TopPicks = () => {

    const {colors} = useTheme();
    
    const navigation = useNavigation();

    const RecentData = [
        {
            image : IMAGES.likedPic1,
            name : "Chelsea",
            about : "Harward University",
            age : 25,
        },
        {
            image : IMAGES.likedPic2,
            name : "Abby",
            about : "Harward University",
            age : 27,
        },
        {
            image : IMAGES.likedPic3,
            name : "Javelle",
            about : "Harward University",
            age : 23,
        },
        {
            image : IMAGES.likedPic4,
            name : "Javelle",
            about : "Harward University",
            age : 23,
        },
    ]

    const CommonData = [
        {
            image : IMAGES.likedPic5,
            name : "Chelsea",
            tag : "Photography",
            about : "Harward University",
            age : 25,
        },
        {
            image : IMAGES.likedPic6,
            name : "Abby",
            tag : "Instagram",
            about : "Harward University",
            age : 27,
        },
        {
            image : IMAGES.likedPic4,
            name : "Javelle",
            tag : "Travelling",
            about : "Harward University",
            age : 23,
        },
        {
            image : IMAGES.likedPic2,
            name : "Richard",
            tag : "Dancing",
            about : "Harward University",
            age : 23,
        },
    ]
    const RecommendedData = [
        {
            image : IMAGES.likedPic4,
            name : "Chelsea",
            about : "Harward University",
            age : 25,
        },
        {
            image : IMAGES.likedPic3,
            name : "Abby",
            about : "Harward University",
            age : 27,
        },
        {
            image : IMAGES.likedPic6,
            name : "Javelle",
            about : "Harward University",
            age : 23,
        },
        {
            image : IMAGES.likedPic1,
            name : "Javelle",
            about : "Harward University",
            age : 23,
        },
    ]

    return (
        <ScrollView
            contentContainerStyle={{
                paddingBottom:50,
            }}
        >
            <View style={GlobalStyleSheet.container}>
                <Text style={{...FONTS.h6,color:colors.title,marginBottom:8}}>Recently Active</Text>

                <View
                    style={{
                        marginHorizontal:-15,
                        marginBottom:30,
                    }}
                >
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingLeft:15,
                        }}
                    >
                        <View
                            style={{
                                flexDirection:'row'
                            }}
                        >
                            {RecentData.map((data,index) => {
                                return(
                                    
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('ProfileDetails',{item : data})}
                                        activeOpacity={.8}
                                        key={index}
                                        style={{
                                            width:175,
                                            marginRight:8,
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
                                            <View style={{flex:1}}>
                                                <Text numberOfLines={1} style={{...FONTS.h6,color:COLORS.white,lineHeight:22}}>{data.name}, {data.age}</Text>
                                                <View
                                                    style={{
                                                        flexDirection:'row',
                                                        alignItems:'center',
                                                    }}
                                                >
                                                    <View
                                                        style={{
                                                            height:8,
                                                            width:8,
                                                            borderRadius:8,
                                                            backgroundColor:COLORS.success,
                                                            marginRight:4,
                                                        }}
                                                    />
                                                    <Text style={{...FONTS.fontSm,color:COLORS.white,opacity:.75}}>Recently Active</Text>
                                                </View>
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
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>
                
                <Text style={{...FONTS.h6,color:colors.title,marginBottom:8}}>Common Passions</Text>

                <View
                    style={{
                        marginHorizontal:-15,
                        marginBottom:30
                    }}
                >
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingLeft:15,
                        }}
                    >
                        <View
                            style={{
                                flexDirection:'row'
                            }}
                        >
                            {CommonData.map((data,index) => {
                                return(
                                    
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('ProfileDetails',{item : data})}
                                        activeOpacity={.8}
                                        key={index}
                                        style={{
                                            width:175,
                                            marginRight:8,
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
                                            <View style={{flex:1,alignItems:'flex-start'}}>
                                                <Text numberOfLines={1} style={{...FONTS.h6,color:COLORS.white,lineHeight:22,marginBottom:4}}>{data.name}, {data.age}</Text>
                                                <View
                                                    style={{
                                                        paddingHorizontal:10,
                                                        paddingVertical:2,
                                                        backgroundColor:'rgba(255,255,255,.08)',
                                                        borderWidth:1,
                                                        borderRadius:30,
                                                        borderColor:'rgba(255,255,255,.2)'
                                                    }}
                                                >
                                                    <Text style={{...FONTS.fontSm,color:COLORS.white,top:-1}}>{data.tag}</Text>
                                                </View>
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
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>

                <Text style={{...FONTS.h6,color:colors.title,marginBottom:8}}>Recommended</Text>

                <View
                    style={{
                        marginHorizontal:-15,
                        marginBottom:30
                    }}
                >
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingLeft:15,
                        }}
                    >
                        <View
                            style={{
                                flexDirection:'row'
                            }}
                        >
                            {RecommendedData.map((data,index) => {
                                return(
                                    
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('ProfileDetails',{item : data})}
                                        activeOpacity={.8}
                                        key={index}
                                        style={{
                                            width:175,
                                            marginRight:8,
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
                                            <View style={{flex:1}}>
                                                <Text numberOfLines={1} style={{...FONTS.h6,color:COLORS.white,lineHeight:22}}>{data.name}, {data.age}</Text>
                                                <View
                                                    style={{
                                                        flexDirection:'row',
                                                        alignItems:'center',
                                                    }}
                                                >
                                                    <View
                                                        style={{
                                                            height:8,
                                                            width:8,
                                                            borderRadius:8,
                                                            backgroundColor:COLORS.success,
                                                            marginRight:4,
                                                        }}
                                                    />
                                                    <Text style={{...FONTS.fontSm,color:COLORS.white,opacity:.75}}>Recently Active</Text>
                                                </View>
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
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>

            </View>
        </ScrollView>
    );
};

export default TopPicks;