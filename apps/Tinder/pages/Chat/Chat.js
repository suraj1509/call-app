import React from 'react';
import { Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, ICONS, IMAGES } from '../../../../app/constants/theme';
import { GlobalStyleSheet } from '../../../../app/constants/StyleSheet';
import LinearGradient from 'react-native-linear-gradient';
import { SvgXml } from 'react-native-svg';

const Chat = ({navigation}) => {

    const {colors} = useTheme();

    const NewMatchData = [
        {
            like : true,
            image : IMAGES.userPic,
            name : "Mitchell",
        },
        {
            image : IMAGES.likedPic1,
            name : "Grayson",
        },
        {
            image : IMAGES.likedPic2,
            name : "Tenzing",
        },
        {
            image : IMAGES.likedPic4,
            name : "Elisha",
        },
        {
            image : IMAGES.likedPic5,
            name : "Mitchell",
        },
        {
            image : IMAGES.likedPic6,
            name : "Mitchell",
        },
        {
            image : IMAGES.userPic7,
            name : "Mitchell",
        },
    ]

    const MessagesData = [
        {
            image : IMAGES.userPic,
            name : "Leneve",
            lastMsg : "Would love to!",
            date : '2m ago',
            active : true,
            messageSeen : true,
            messageSent : true,
        },
        {
            image : IMAGES.likedPic6,
            name : "Matt",
            lastMsg : "Is that because we like the same people.",
            date : '4m ago',
            active : true,
            messageSeen : false,
            messageSent : true,
        },
        {
            image : IMAGES.likedPic2,
            name : "Karthik",
            lastMsg : "How do you know john?",
            date : '10h ago',
            messageReceivedSeen : false,
        },
        {
            image : IMAGES.userPic5,
            name : "Elisha",
            lastMsg : "Have you even been to Laurel Harmes",
            date : '15h ago',
            active : true,
            messageSeen : true,
            messageSent : true,
        },
        {
            image : IMAGES.userPic4,
            name : "Wyatt",
            lastMsg : "that so awesome!",
            date : '2d ago',
            messageSeen : true,
            messageSent : true,
        },
        {
            image : IMAGES.userPic3,
            name : "Leneve",
            lastMsg : "Would love to!",
            date : '8h ago',
            active : true,
            messageSeen : false,
            messageSent : true,
        },
        {
            image : IMAGES.userPic2,
            name : "Leneve",
            lastMsg : "Would love to!",
            date : '5d ago',
            messageReceivedSeen : false,
        },
        {
            image : IMAGES.userPic6,
            name : "Leneve",
            lastMsg : "Would love to!",
            date : '2m ago',
            messageSeen : true,
            messageSent : true,
        },
    ]

    return (
        <SafeAreaView
            style={{
                flex:1,
                backgroundColor:colors.cardBg,
            }}
        >
            <View
                style={{
                    flexDirection:'row',
                    paddingHorizontal:15,
                    paddingVertical:2,
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
                <View style={{flex:1,justifyContent:'flex-end',flexDirection:'row'}}>
                    <IconButton
                        onPress={() => {}}
                        size={28}
                        icon={() => <Ionicons color={colors.text} size={24} name='shield'/>}
                    />
                </View>
            </View>
            <View
                style={{
                    paddingHorizontal:15,
                    paddingBottom:15,
                }}
            >
                <TextInput
                    style={{
                        ...FONTS.font,
                        fontSize:16,
                        height:50,
                        lineHeight:22,
                        color:colors.title,
                        borderBottomWidth:1,
                        borderBottomColor:colors.borderColor,
                        paddingLeft:50,
                    }}
                    placeholder='Search 0 Matches'
                    placeholderTextColor={colors.textLight}
                />
                <FeatherIcon 
                    name='search'
                    size={20}
                    color={COLORS.primary2}
                    style={{
                        position:'absolute',
                        top:15,
                        left:25,
                    }}
                />
            </View>
            <ScrollView>
                <View style={GlobalStyleSheet.container}>
                    <Text style={{...FONTS.h6,color:colors.title}}>New Matches</Text>
                </View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingLeft:15,
                    }}
                >
                    {NewMatchData.map((data,index) => {
                        if(data.like){
                            return(
                                <TouchableOpacity
                                    key={index}
                                    style={{
                                        alignItems:'center',
                                        marginRight:18,
                                    }}
                                >
                                    <View
                                        style={{
                                            height:60,
                                            width:60,
                                            borderRadius:60,
                                            borderWidth:3,
                                            borderColor:COLORS.primary2,
                                            alignItems:'center',
                                            justifyContent:'center',
                                            marginBottom:3,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                height:56,
                                                width:56,
                                                borderRadius:50,
                                            }}
                                            source={data.image}
                                        />
                                        <View
                                            style={{
                                                height:56,
                                                width:56,
                                                borderRadius:56,
                                                position:'absolute',
                                                backgroundColor:'rgba(0,0,0,.5)',
                                            }}
                                        />
                                        <LinearGradient
                                            colors={["#ea3d85","#ff864e"]}
                                            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                            style={{
                                                height:35,
                                                width:35,
                                                borderRadius:40,
                                                backgroundColor:COLORS.primary2,
                                                position:'absolute',
                                                alignItems:'center',
                                                justifyContent:'center',
                                            }}
                                        >
                                            <Text style={{...FONTS.font,...FONTS.fontBold,color:COLORS.white}}>99+</Text>
                                        </LinearGradient>
                                    </View>
                                    <Text style={{...FONTS.font,...FONTS.fontSemiBold,color:colors.title}}>23 Likes</Text>
                                </TouchableOpacity>
                            )
                        }else{
                            return(
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('SingleChat')}
                                    key={index}
                                    style={{
                                        alignItems:'center',
                                        marginRight:18,
                                    }}
                                >
                                    <View
                                        style={{
                                            marginBottom:3,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                height:60,
                                                width:60,
                                                borderRadius:60,
                                            }}
                                            source={data.image}
                                        />
                                    </View>
                                    <Text style={{...FONTS.font,...FONTS.fontSemiBold,color:colors.title}}>{data.name}</Text>
                                </TouchableOpacity>
                            )
                        }
                    })}
                </ScrollView>
                <View style={[GlobalStyleSheet.container,{marginTop:10}]}>
                    <Text style={{...FONTS.h6,color:colors.title}}>Messages</Text>
                </View>
                <View style={{marginBottom:80}}>
                    {MessagesData.map((data,index) => {
                        return(
                            <TouchableOpacity
                                onPress={() => navigation.navigate('SingleChat')}
                                key={index}
                                style={{
                                    flexDirection:'row',
                                    paddingHorizontal:15,
                                    alignItems:'center',
                                }}
                            >
                                <View
                                    style={{
                                        marginRight:12,
                                    }}
                                >
                                    {data.active && 
                                        <View
                                            style={{
                                                height:16,
                                                width:16,
                                                borderRadius:9,
                                                backgroundColor:COLORS.success,
                                                position:'absolute',
                                                zIndex:1,
                                                bottom:-2,
                                                left: 1,
                                                borderWidth:2,
                                                borderColor:colors.cardBg,
                                            }}
                                        />
                                    }
                                    <Image
                                        style={{
                                            height:55,
                                            width:55,
                                            borderRadius:60,
                                        }}
                                        source={data.image}
                                    />
                                </View>
                                <View
                                    style={{
                                        paddingVertical:16,
                                        borderBottomWidth:1,
                                        borderColor:colors.borderColor,
                                        flex:1,
                                        paddingRight:15,
                                    }}
                                >
                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                        {data.messageReceivedSeen == false &&
                                            <View
                                                style={{
                                                    height:8,
                                                    width:8,
                                                    borderRadius:5,
                                                    marginRight:6,
                                                    marginBottom:3,
                                                    backgroundColor:COLORS.primary,
                                                }}
                                            />
                                        }
                                        <Text style={{...FONTS.h6,color:colors.title}}>{data.name}</Text>
                                    </View>
                                    <Text numberOfLines={1} style={{...FONTS.font,color:colors.text}}>{data.lastMsg}</Text>
                                </View>
                                <View style={{alignItems:'flex-end'}}>
                                    <Text style={{...FONTS.fontXs,color:colors.text,marginBottom:8}}>{data.date}</Text>
                                    { data.messageSent &&
                                        <View
                                            style={[{
                                                height:18,
                                                width:18,
                                                borderRadius:12,
                                                borderWidth:1,
                                                borderColor:'#BBB6D0',
                                                alignItems:'center',
                                                justifyContent:'center',
                                            },data.messageSeen === true && {
                                                backgroundColor:COLORS.primayLight,
                                                borderColor:COLORS.primayLight,
                                            } ]}
                                        >
                                            <SvgXml height={12} width={12} stroke={data.messageSeen ? COLORS.primary : '#BBB6D0'} xml={ICONS.check}/>
                                        </View>
                                    }

                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Chat;