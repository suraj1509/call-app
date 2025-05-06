import { View, Text, SafeAreaView, TouchableOpacity, PermissionsAndroid, Platform, TextInput, FlatList, StyleSheet } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { COLORS } from '../../../app/constants/theme'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, useTheme, useRoute } from '@react-navigation/native';
import {
    createAgoraRtcEngine,
    ChannelProfileType,
    ClientRoleType,
    RtcSurfaceView,
    VideoSourceType,
} from 'react-native-agora';
import {
    ChatClient,
    ChatOptions,
    ChatMessageChatType,
    ChatMessage,
} from 'react-native-agora-chat';
import database from '@react-native-firebase/database';
import * as Actions from '../../../redux/Actions';
import { useDispatch, useSelector } from 'react-redux';


const SocialConnect = () => {
    const theme = useTheme();
    const { colors } = theme;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const route = useRoute();
    const currentUser = useSelector((state) => state?.user?.currentUser)
    
    const appId = '2b6418eee4074ad685c6b404f547c796'; 
    const chatAppKey = '611324218#1525977'; 
    const token = route?.params?.token; 
    const channelName = route?.params?.channelName; 
    const localUid = 0;
    const callMode = route?.params?.mode || 'video';
    
    const agoraEngineRef = useRef();
    const rtcEventHandlerRef = useRef();
    const timerRef = useRef(null);
    
    // Call states
    const [isJoined, setIsJoined] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const [remoteUid, setRemoteUid] = useState(0);
    
    // New states for duration tracking
    // const [callStartTime, setCallStartTime] = useState(null);
    const [callDuration, setCallDuration] = useState(0);
    const [isCallActive, setIsCallActive] = useState(false);
    const lastDurationRef = useRef(0);
    // const [callConnected, setCallConnected] = useState(false);
    // const [historyKey, setHistoryKey] = useState(null);
    
    // Chat states
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isRtmConnected, setIsRtmConnected] = useState(false);
    const [userId, setUserId] = useState(`434234343vcbfdvsdc`);
    const [chatToken, setChatToken] = useState('007eJxTYLj7L0hrq6DDOeaEJVutdy4WLH04te9JuKyyUsPjlT8frdqhwGCUZGZiaJGammpiYG6SmGJmYZpslmRiYJJmamKebG5plhj3Nr0hkJHhEZ8RAyMDKxAzMoD4KgyWZsaWqRbmBroGaSmJuoaGaQa6lhaGJrqWhmYp5hZpJqmpZskAzCQnzw==');
    

    React.useEffect(() => {
        if (isCallActive) {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
            timerRef.current = setInterval(() => {
                setCallDuration(prev => prev + 1);
            }, 1000);
        } else {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
        
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isCallActive]);

    React.useEffect(() => {
        if (isJoined && remoteUid !== 0) {
            setIsCallActive(true);
        } else {
            setIsCallActive(false);
            if (callDuration > 0) {
                lastDurationRef.current = callDuration;
                leave();
            }
        }
    }, [isJoined, remoteUid]);

    React.useEffect(() => {
        const init = async () => {
            await setupSDKEngine();
            
            if (callMode === 'video' || callMode === 'voice') {
                joinRtcChannel();
            }
        };
        
        init();
        
        return () => {
            leaveChannel();
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    
    const setupSDKEngine = async () => {
            await getPermission(); 
        
        try {
            const engine = createAgoraRtcEngine();
            agoraEngineRef.current = engine;
            await engine.initialize({ appId });
        
            rtcEventHandlerRef.current = {
                onJoinChannelSuccess: () => {
                    setIsJoined(true);
                    if (callMode === 'video') {
                        agoraEngineRef.current.startPreview();
                    }
                    setCallDuration(0);
                    lastDurationRef.current = 0;

                },
                onUserJoined: (_connection, uid) => {
                    console.log('Remote user joined:', uid);
                    setRemoteUid(uid);
                },
                onUserOffline: (_connection, uid) => {
                    console.log('Remote user left:', uid);
                    setRemoteUid(0);
                },
                onError: (err) => {
                    console.error('Agora RTC error:', err);
                },
                onRtcStats: (_connection, stats) => {
                    if (isCallActive) {
                        setCallDuration(stats.duration);
                    }
                  }
            };
            engine.registerEventHandler(rtcEventHandlerRef.current);
            engine.setParameters(JSON.stringify({
                "rtc.stats_interval": 1000 
              }));
        } catch (error) {
            console.error('Failed to initialize Agora RTC engine:', error);
        }
    };
    
    const leaveChannel = async () => {
        if (agoraEngineRef.current) {
            if (isJoined) {
                agoraEngineRef.current.leaveChannel();
            }
            agoraEngineRef.current.unregisterEventHandler(rtcEventHandlerRef.current);
            agoraEngineRef.current.release();
        }
        
        if (isRtmConnected) {
            try {
                const chatClient = ChatClient.getInstance();
                if (callMode === 'chat') {
                    try {
                        if (chatClient.chatroomManager && chatClient.chatroomManager.leaveChatroom) {
                            await chatClient.chatroomManager.leaveChatroom(channelName);
                        }
                    } catch (chatRoomError) {
                        console.error('Error leaving chatroom:', chatRoomError);
                    }
                    await chatClient.logout();
                    console.log('Logged out from Agora Chat');
                }
                setIsRtmConnected(false);
            } catch (error) {
                console.error('Error leaving Agora Chat:', error);
            }
        }
        
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        
        const finalDuration = lastDurationRef.current > 0 ? lastDurationRef.current : callDuration;
        
        console.log("Final call duration on leave:", finalDuration);
    };
    const joinRtcChannel = async () => {
        if (isJoined) return;
        
        try {
            console.log(`Joining ${callMode} channel:`, channelName);
            
            agoraEngineRef.current?.setClientRole(ClientRoleType.ClientRoleBroadcaster);
            agoraEngineRef.current?.enableAudio();
            
            if (callMode === 'video') {
                agoraEngineRef.current?.enableVideo();
            } else {
                agoraEngineRef.current?.disableVideo();
            }
            
            agoraEngineRef.current?.joinChannel(token, channelName, localUid, {
                channelProfile: ChannelProfileType.ChannelProfileCommunication,
                clientRoleType: ClientRoleType.ClientRoleBroadcaster,
                publishMicrophoneTrack: true,
                publishCameraTrack: callMode === 'video',
                autoSubscribeAudio: true,
                autoSubscribeVideo: callMode === 'video',
            });
        } catch (error) {
            console.error('Error joining RTC channel:', error);
        }
    };

    const leave = async() => {
        const durationInMinutes = callDuration / 60;
        const ratePerMinute = route?.params?.rate || 0; 
        const callCost = parseFloat((durationInMinutes * ratePerMinute).toFixed(2));

        const currentWalletBalance = route?.params?.wallet || 0;

        const updatedWalletBalance = Math.max(currentWalletBalance - callCost, 0);

        dispatch(Actions.updateCurrentUser({ wallet: updatedWalletBalance, history: [...currentUser?.history, {name: route?.params?.recieverName || route?.params?.callerName, duration: callDuration, cost: callCost, type: route?.params?.callerId === currentUser?.id ? "outgoing" : "incoming"}] }));
        // Remove connection if needed
        if (route.params.localUid) {
            await database()
              .ref(`connect/${route.params.localUid}`)
              .remove()
              .then(() => {
                console.log('Connection removed.');
              })
              .catch(error => {
                console.error('Error removing connection:', error);
              });
        }
        
        leaveChannel();
        setIsJoined(false);
        setRemoteUid(0);
        setIsRtmConnected(false);
        if(route?.params?.activeProfileDetails){
            navigation.navigate("Rating", {item: route?.params?.activeProfileDetails});
        }else if(route?.params?.callerProfileDetails){
            navigation.navigate("Rating", {item: route?.params?.callerProfileDetails});
        }
    };

    const toggleMic = () => {
        const newMutedState = !isMuted;
        agoraEngineRef.current?.enableLocalAudio(!newMutedState);
        setIsMuted(newMutedState);
    };
    
    const toggleVideo = () => {
        const newVideoState = !isVideoEnabled;
        agoraEngineRef.current?.enableLocalVideo(newVideoState);
        setIsVideoEnabled(newVideoState);
    };
    
    const switchCamera = () => {
        agoraEngineRef.current?.switchCamera();
    };

    const sendMessage = async () => {
        if (!newMessage.trim() || !isRtmConnected) return;
        
        try {
            console.log('Sending message to channel:', channelName);
            const chatClient = ChatClient.getInstance();
            
            // Create message
            const msgType = ChatMessageChatType.ChatRoom; // Use ChatRoom for group chats
            const msg = ChatMessage.createTextMessage(channelName, newMessage, msgType);
            
            // Create callback
            const callback = {
                onProgress(localMsgId, progress) {
                    console.log(`Send progress: ${localMsgId}, ${progress}`);
                },
                onError(localMsgId, error) {
                    console.error(`Send failed: ${localMsgId}`, error);
                },
                onSuccess(message) {
                    console.log('Message sent successfully:', message.msgId);
                }
            };
            
            // Send message
            await chatClient.chatManager.sendMessage(msg, callback);
            
            // Add to local state
            setMessages(prev => [...prev, {
                text: newMessage,
                sender: userId,
                timestamp: new Date().getTime(),
                isSelf: true
            }]);
            setNewMessage('');
            
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const renderCallStatus = () => {
        if (!isJoined) {
            return <View style={{position: 'absolute', zIndex: 1, left: 20, top: 20}}><Text>Connecting...</Text></View>;
        } else if (remoteUid === 0) {
            if (lastDurationRef.current > 0) {
                return <View style={{position: 'absolute', zIndex: 1, left: 20, top: 20}}><Text>Call ended {formatDuration(lastDurationRef.current)}</Text></View>;
            } else {
                return <View style={{position: 'absolute', zIndex: 1, left: 20, top: 20}}><Text>Waiting for user...</Text></View>;
            }
        } else {
            return <View style={{position: 'absolute', zIndex: 1, left: 20, top: 20}}><Text>{formatDuration(callDuration)}</Text></View>;
        }
    };
      

    const renderChatInterface = () => (
        <View style={{
            flex: 1,
            paddingTop: 20,
        }}>
            <FlatList
                data={messages}
                keyExtractor={(item, index) => `msg-${index}-${item.timestamp}`}
                renderItem={({ item }) => (
                    <View style={[{
                        maxWidth: '80%',
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        borderRadius: 18,
                        marginBottom: 10,
                    }, item.sender === userId || item.isSelf ? {
                        alignSelf: 'flex-end',
                        backgroundColor: '#F9823B',
                    } : {
                        alignSelf: 'flex-start',
                        backgroundColor: '#484848',
                    }]}>
                        {!item.isSelf && item.sender !== userId && (
                            <Text style={{
                                color: '#DDDDDD',
                                fontSize: 12,
                                marginBottom: 2,
                            }}>{item.sender}</Text>
                        )}
                        <Text style={{
        color: COLORS.textLight,
        fontSize: 16,
    }}>{item.text}</Text>
                    </View>
                )}
                style={{
                    flex: 1,
                    paddingHorizontal: 15,
                }}
                inverted={false}
            />
            <View style={{
        flexDirection: 'row',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
    }}>
                <TextInput
                    value={newMessage}
                    onChangeText={setNewMessage}
                    placeholder="Type a message..."
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        borderRadius: 20,
                        paddingHorizontal: 15,
                        paddingVertical: 8,
                        color: COLORS.textLight,
                        maxHeight: 100,
                    }}
                    placeholderTextColor="gray"
                    multiline
                />
                <TouchableOpacity onPress={sendMessage} style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F9823B',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    }} disabled={!isRtmConnected}>
                    <FontAwesome name="send" size={20} color={COLORS.white} />
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderVideoCall = () => (
        <>
        
            {isJoined && (
                <RtcSurfaceView 
                    canvas={{ uid: localUid, sourceType: VideoSourceType.VideoSourceCamera, renderMode: 1 }}
                    style={{ width: '100%', height: '100%' }} 
                />
            )}
            {remoteUid !== 0 && (
                <RtcSurfaceView 
                    canvas={{ uid: remoteUid, sourceType: VideoSourceType.VideoSourceRemote, renderMode: 1 }}
                    style={{ width: 110, height: 150, position: 'absolute', right: 20, top: 50, borderRadius: 12 }}
                />
            )}
        </>
    );

    const renderVoiceCall = () => (
        <>
        <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
    }}>
            <View style={{
        alignItems: 'center',
    }}>
                {/* <Image source={{uri: }}/> */}
                <FontAwesome5 name="user-circle" size={100} color={COLORS.white} />
                <Text style={{
        color: COLORS.white,
        fontSize: 18,
        marginTop: 20,
        fontWeight: '600',
    }}>Voice Call in Progress</Text>
                {remoteUid !== 0 && <Text style={{
        color: '#4CAF50',
        fontSize: 16,
        marginTop: 10,
    }}>Connected</Text>}
            </View>
        </View>
        </>
    );

    const renderCallControls = () => (
        <View style={{
            width: '100%',
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            position: 'absolute',
            bottom: 50,
        }}>   
            {callMode !== 'chat' && (
                <TouchableOpacity onPress={toggleMic} activeOpacity={0.5} style={{
                    height: 50,
                    width: 50,
                    borderRadius: 25,
                    backgroundColor: 'rgba(0,0,0,.4)',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <FontAwesome color={COLORS.white} size={24} name={isMuted ? 'microphone-slash' : 'microphone'} />
                </TouchableOpacity>
            )}
            
            <TouchableOpacity activeOpacity={0.5} onPress={leave} style={{
        alignItems: 'center',
        justifyContent: 'center',
    }}>
                <LinearGradient colors={['#F75B49', '#F9823B']} style={{
        height: 60,
        width: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    }}>
                    <FontAwesome5 size={24} color={COLORS.white} name={callMode === 'chat' ? 'times' : 'phone-alt'} />  
                </LinearGradient>
            </TouchableOpacity>
            
            {callMode === 'video' && (
                <>
                    <TouchableOpacity onPress={toggleVideo} activeOpacity={0.5} style={{
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(0,0,0,.4)',
        alignItems: 'center',
        justifyContent: 'center',
    }}>
                        {isVideoEnabled ? 
                            <FontAwesome size={24} color={COLORS.white} name='video-camera' /> :
                            <MaterialCommunityIcons size={28} color={COLORS.white} name='camera-off' />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={switchCamera} activeOpacity={0.5} style={{
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(0,0,0,.4)',
        alignItems: 'center',
        justifyContent: 'center',
    }}>
                        <Ionicons size={28} color={COLORS.white} name="camera-reverse" />
                    </TouchableOpacity>
                </>
            )}
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: callMode === 'chat' ? colors.background : '#000' }}>
            {callMode !== 'chat' && renderCallStatus()}
            {callMode === 'video' && renderVideoCall()}
            {callMode === 'voice' && renderVoiceCall()}
            {callMode === 'chat' && renderChatInterface()}
            
            {renderCallControls()}
        </SafeAreaView>
    );
};

const getPermission = async () => {
    if (Platform.OS === 'android') {
        await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            PermissionsAndroid.PERMISSIONS.CAMERA,
        ]);
    }
};

export default SocialConnect;