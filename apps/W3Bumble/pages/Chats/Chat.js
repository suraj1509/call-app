import React from 'react';
import { 
    Image, 
    SafeAreaView, 
    ScrollView, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    View 
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../../../app/constants/StyleSheet';
import { COLORS, FONTS, ICONS, IMAGES } from '../../../../app/constants/theme';
import LinearGradient from 'react-native-linear-gradient';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Story from '../Home/Story';

const Chat = ({navigation}) => {
    
    const theme = useTheme()
    const {colors} = theme; 

    const MessagesData = [
        {
            image : IMAGES.userPic14,
            name : "Charlotte",
            lastMsg : "You're my heart's melody.",
            date : '2 Hours ago',
            active : true,
            messageCount :"6",
            messageSent : true,
        },
        {
            image : IMAGES.userPic15,
            name : "Amelia",
            lastMsg : "Forever yours, my darling.",
            date : '4 Hours ago',
            active : true,
            messageCount :"2",
            messageSent : true,
        },
        {
            image : IMAGES.userPic16,
            name : "Emma",
            lastMsg : "You're my eternal love.",
            date : '5 Day ago',
        },
        {
            image : IMAGES.userPic17,
            name : "Sophia",
            lastMsg : "You complete me perfectly.",
            date : '2 Week ago',
            active : true,
            messageCount :"4",
            messageSent : true,
        },
        {
            image : IMAGES.userPic13,
            name : "Charlotte",
            lastMsg : "Love you to infinity",
            date : '12 Hours ago',
            messageCount :"7",
            messageSent : true,
        },
        {
            image : IMAGES.userPic9,
            name : "Harper",
            lastMsg : "You're my eternal love.",
            date : '5 Hours ago',
            active : true,
            messageCount :"10",
            messageSent : true,
        },
        {
            image : IMAGES.userPic10,
            name : "Amelia",
            lastMsg : "Forever yours, my darling.",
            date : '2 Day ago',
        },
        {
            image : IMAGES.userPic11,
            name : "Isabella",
            lastMsg : "Love you to infinity",
            date : '2 Hours ago',
            messageCount : "12",
            messageSent : true,
        },
    ]

    return (
        <>
            <SafeAreaView style={{flex:1,backgroundColor:theme.dark ? colors.background :colors.card}}>
                <LinearGradient
                    colors={['#FFD95C', '#FEC629']} 
                    style={[GlobalStyleSheet.container,{
                        borderBottomLeftRadius:30,
                        borderBottomRightRadius:30,
                        paddingTop:20
                    }]}
                >
                    <TextInput
                        style={{
                            ...FONTS.fontMedium,
                            fontSize:16,
                            width:'100%',
                            color:colors.title,
                            backgroundColor:colors.card,
                            borderRadius:30,
                            paddingHorizontal:20,
                            paddingLeft:50
                        }}
                        placeholder='Search your matches'
                        placeholderTextColor={'#999999'}
                    />
                    <View style={{position:'absolute',top:33,left:35}}>
                        <FeatherIcon color={'#999999'} size={22}  name={'search'}/>
                    </View>
                </LinearGradient>
                <View style={[GlobalStyleSheet.container,{paddingBottom:5}]}>
                    <Text style={{...FONTS.fontBold,fontSize:16,color:theme.dark ? colors.title :'#141414'}}>Match Queue <Text style={{color:'#B1B1B1'}}>(7)</Text></Text>
                </View>
                <View 
                    style={{
                        paddingHorizontal:15
                    }}
                >
                    <Story 
                        theme={theme}
                        backgroundColor={true}
                    />
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View style={[GlobalStyleSheet.container,{paddingHorizontal:20,paddingVertical:10,paddingBottom:0}]}>
                        <Text style={{...FONTS.h6,color:colors.title}}>Chats</Text>
                    </View>
                    <View style={{marginBottom:80}}>
                        {MessagesData.map((data,index) => {
                            return(
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    onPress={() => navigation.navigate('SingleChat',{data : data})}
                                    key={index}
                                    style={{
                                        flexDirection:'row',
                                        paddingHorizontal:-15,
                                        alignItems:'center',
                                        borderBottomWidth:1,
                                        borderColor:colors.borderColor,
                                        marginHorizontal:15
                                    }}
                                >
                                    <View
                                        style={{
                                            marginRight:12,
                                        }}
                                    >
                                        {data.active ?

                                            <LinearGradient
                                                colors={['#F75B48', '#F9803B']}
                                                style={{
                                                    height:60,
                                                    width:60,
                                                    borderRadius:50,
                                                    alignItems:'center',
                                                    justifyContent:'center',
                                                    //borderWidth:2,
                                                }}
                                            >
                                                <LinearGradient
                                                    colors={[theme.dark ? colors.background : '#ffffff', theme.dark ? colors.background : '#ffffff']}
                                                    style={{
                                                        width:57,
                                                        height:57,
                                                        borderRadius:50,
                                                        alignItems:'center',
                                                        justifyContent:'center',
                                                        //borderWidth:2,
                                                    }}
                                                >
                                                    <Image
                                                        style={{
                                                            height:54,
                                                            width:54,
                                                            borderRadius:50,
                                                            resizeMode:'contain'
                                                        }}
                                                        source={data.image}
                                                    />
                                                </LinearGradient>
                                            </LinearGradient>

                                            :

                                            <Image
                                                style={{
                                                    height:55,
                                                    width:55,
                                                    borderRadius:60,
                                                }}
                                                source={data.image}
                                            />
                                        }
                                    </View>
                                    <View
                                        style={{
                                            paddingVertical:16,
                                            flex:1,
                                            paddingRight:15,
                                        }}
                                    >
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <Text style={{...FONTS.fontSemiBold,fontSize:16,color:colors.title}}>{data.name}</Text>
                                        </View>
                                        <Text numberOfLines={1} style={{...FONTS.fontMedium,fontSize:14,color:'#999999'}}>{data.lastMsg}</Text>
                                    </View>
                                    <View style={{alignItems:'flex-end'}}>
                                        <Text style={{...FONTS.fontSemiBold,fontSize:11,color:'#888888',marginBottom:8}}>{data.date}</Text>
                                        { data.messageSent &&
                                            <View
                                                style={[{
                                                    paddingVertical:2,
                                                    paddingHorizontal:6,
                                                    borderRadius:11,
                                                    alignItems:'center',
                                                    justifyContent:'center',
                                                    backgroundColor:COLORS.primary4
                                                }]}
                                            >
                                                <Text style={{...FONTS.fontSemiBold,fontSize:13,color:'#000000'}}>{data.messageCount}</Text>
                                            </View>
                                        }

                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default Chat;