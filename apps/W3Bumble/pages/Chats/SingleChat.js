import React, { useRef, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, IMAGES } from '../../../../app/constants/theme';
import { GlobalStyleSheet } from '../../../../app/constants/StyleSheet';
import LinearGradient from 'react-native-linear-gradient';


const ChatData = [
    {
        id: '1',
        title: 'Good morning!',
        send: false,
    },
    {
        id: '2',
        title: " I'm looking for a new laptop",
        time: "4.40pm",
        send: false,
    },
    {
        id: '3',
        title: 'Good morning!',
        send: true,
    },
    {
        id: '4',
        title: 'Of course, we have a great selection of laptops.',
        time: "4.50pm",
        send: true,
    },
    {
        id: '5',
        title: "I'll mainly use it for work, so something with good processing power and a comfortable keyboard is essential.",
        time: "4.55pm",
        send: false,
    },
    {
        id: '6',
        title: 'Got it!',
        time: "4.56pm",
        send: true,
    },
    {
        id: '7',
        title: 'We have several options that would suit your needs. Let me show you a few models that match your criteria.',
        time: "4.57pm",
        send: true,
    },
    {
        id: '8',
        title: "I'm looking to spend around $800 to $1,000.",
        time: "4.58pm",
        send: false,
    },
    {
        id: '9',
        title: "That's a good budget.I'll show you a few options within that range. Are you interested in Windows or Mac laptops?",
        time: "4.40pm",
        send: true,
    },
    {
        id: '1',
        title: 'Good morning!',
        send: false,
    },
    {
        id: '2',
        title: " I'm looking for a new laptop",
        time: "4.40pm",
        send: false,
    },
    {
        id: '3',
        title: 'Good morning!',
        send: true,
    },
    {
        id: '4',
        title: 'Of course, we have a great selection of laptops.',
        time: "4.50pm",
        send: true,
    },
    {
        id: '5',
        title: "I'll mainly use it for work, so something with good processing power and a comfortable keyboard is essential.",
        time: "4.55pm",
        send: false,
    },
    {
        id: '6',
        title: 'Got it!',
        time: "4.56pm",
        send: true,
    },
    {
        id: '7',
        title: 'We have several options that would suit your needs. Let me show you a few models that match your criteria.',
        time: "4.57pm",
        send: true,
    },
    {
        id: '8',
        title: "I'm looking to spend around $800 to $1,000.",
        time: "4.58pm",
        send: false,
    },
    {
        id: '9',
        title: "That's a good budget.I'll show you a few options within that range. Are you interested in Windows or Mac laptops?",
        time: "4.40pm",
        send: true,
    },
]

const SingleChat = ({navigation,route}) => {
    
    const theme = useTheme();
    const {colors} = theme;

    const { data } = route.params;

    const scrollViewRef = useRef(null);

    const [messageList, setMessageList] = useState(ChatData);
    const [message, setMessage] = useState("");

    const sendMessage = () => {
        if(message.length > 0){
            setMessageList([
                ...messageList,
                {
                    id: '0',
                    title: message,
                    time: "4.40pm",
                    send: true,
                },
            ])
            setMessage("");
        }
    }

    return (
        <>
            <SafeAreaView
                style={{
                    flex:1,
                    backgroundColor:colors.cardBg,
                }}
            >
                <KeyboardAvoidingView
                    style={{flex: 1}}
                    behavior={Platform.OS === 'ios' ? 'padding' : ''}>
                    <View
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            paddingHorizontal:15,
                            paddingVertical:15,
                            paddingBottom:10,
                            backgroundColor:colors.cardBg,
                            borderBottomWidth:1,
                            borderBottomColor:colors.borderColor,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{
                               // padding:10,
                                marginRight:10,
                            }}
                        >
                            <FeatherIcon color={'#666666'} size={24} name='arrow-left'/>
                        </TouchableOpacity>
                        <View
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                                flex:1,
                            }}
                        >
                            <Image
                                style={{
                                    height:40,
                                    width:40,
                                    borderRadius:40,
                                    marginRight:15,
                                }}
                                source={data.image}
                            />
                            <View>
                                <Text style={{...FONTS.fontBold,fontSize:16,color:colors.title}}>{data.name}</Text>
                            </View>
                        </View>
                        <TouchableOpacity
                             onPress={() => navigation.navigate('VideoCall')}
                            activeOpacity={0.5}
                            style={{
                               padding:8
                            }}
                        >
                            <FontAwesome5 size={18} color={'#999999'} name='phone-alt'/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('VideoCall')}
                            activeOpacity={0.5}
                            style={{
                                padding:8
                            }}
                        >
                            <FontAwesome size={18} color={'#999999'} name='video-camera'/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={{
                                padding:8
                            }}
                        >
                            <FontAwesome5 size={18} color={'#999999'} name='ellipsis-v'/>
                        </TouchableOpacity>
                    </View>
                    <View style={[GlobalStyleSheet.container,{flex:1}]}>
                        <ScrollView 
                            showsVerticalScrollIndicator={false}
                            //contentContainerStyle={{ paddingBottom: 120 }}
                            ref={scrollViewRef} onContentSizeChange={() => {scrollViewRef.current?.scrollToEnd()}}
                        >
                            <View style={{ flex: 1 }}>
                                {messageList.map((data, index) => {
                                    return (
                                        <View key={index}>
                                            <View
                                                style={[{
                                                    width: '75%',
                                                    marginBottom: 10,
                                                },
                                                data.send == false
                                                    ?
                                                    {
                                                        marginRight: 'auto',
                                                        alignItems: 'flex-start',
                                                    }
                                                    :
                                                    {
                                                        marginLeft: 'auto',
                                                        alignItems: 'flex-end',
                                                    }
                                                ]}
                                            >
                                                <View
                                                    style={[
                                                        data.send == false
                                                            ?
                                                            {
                                                                backgroundColor: '#FFDE7A',
                                                                borderTopLeftRadius: 10,
                                                                borderTopRightRadius: 10,
                                                                borderBottomRightRadius: 10,

                                                            }
                                                            :
                                                            {
                                                                backgroundColor: colors.background,
                                                                borderTopLeftRadius: 10,
                                                                borderTopRightRadius: 10,
                                                                borderBottomLeftRadius: 10,

                                                            }

                                                    ]}
                                                >
                                                    <Text style={{ ...FONTS.fontSemiBold, fontSize: 14, color: data.send ? colors.title : COLORS.title, paddingVertical: 10, paddingHorizontal: 10 }}>{data.title}</Text>
                                                </View>
                                                {data.time &&
                                                    <Text style={{ ...FONTS.fontXs, ...FONTS.fontRegular, color: COLORS.title, opacity: .5, marginTop: 3 }}>{data.time}</Text>
                                                }
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                        </ScrollView>
                    </View>
                    <View style={{paddingHorizontal:20,paddingBottom:10}}>
                        <TextInput
                            onChangeText={(val) => setMessage(val)}
                            value={message}
                            style={{
                                ...FONTS.fontMedium,
                                backgroundColor:colors.cardBg,
                                borderWidth:1,
                                borderColor:'#CDCDCD',
                                paddingHorizontal:20,
                                paddingLeft:40,
                                paddingRight:70,
                                fontSize:15,
                                borderRadius:30,
                                height:50,
                                width:310,
                                color:colors.title
                            }}
                            placeholder='Your Message'
                            placeholderTextColor={theme.dark ? COLORS.white :'#99999'}
                        />
                        <View 
                            style={{
                                position:'absolute',
                                top:13,
                                left:32
                            }}
                        >
                            <FontAwesome size={24} color={'#999999'} name='smile-o'/>
                        </View>
                        <View 
                            style={{
                                position:'absolute',
                                top:13,
                                right:125
                            }}
                        >
                            <FontAwesome size={20} color={'#999999'} name='camera'/>
                        </View>
                        <View 
                            style={{
                                position:'absolute',
                                top:13,
                                right:98
                            }}
                        >
                            <FontAwesome size={20} color={'#999999'} name='paperclip'/>
                        </View>
                        <TouchableOpacity
                            onPress={() => sendMessage()} 
                            disabled={message.length == 0 ? true : false}
                            style={{
                                height:50,
                                width:50,
                                borderRadius:50,
                                position:'absolute',
                                right:20,
                                top:0,
                                backgroundColor:'#F9823B',
                                alignItems:'center',
                                justifyContent:'center',
                            }}
                        >
                            <LinearGradient
                                 colors={['#F75B49', '#F9823B']}
                                 style={{
                                    height:50,
                                    width:50,
                                    borderRadius:50,
                                    alignItems:'center',
                                    justifyContent:'center',
                                }}
                            >
                                <FontAwesome color={COLORS.white} size={22} name='send'/>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
};

export default SingleChat;