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
import { useDispatch } from 'react-redux';
import { current } from '@reduxjs/toolkit';


const SocialConnect = () => {
    const theme = useTheme();
    const { colors } = theme;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const route = useRoute();
    
    const appId = '2b6418eee4074ad685c6b404f547c796'; 
    const chatAppKey = '611324218#1525977'; 
    const token = route?.params?.token; 
    const channelName = route?.params?.channelName; 
    const localUid = 0;
    const callMode = route?.params?.mode || 'video';
    
    // Get max duration from params (in seconds) or default to 100 seconds
    const maxDuration = route?.params?.maxDuration;
    
    const agoraEngineRef = useRef();
    const rtcEventHandlerRef = useRef();
    const timerRef = useRef(null);
    
    // Call states
    const [isJoined, setIsJoined] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const [remoteUid, setRemoteUid] = useState(0);
    
    // New states for duration tracking
    const [callStartTime, setCallStartTime] = useState(null);
    const [callDuration, setCallDuration] = useState(0);
    const [callConnected, setCallConnected] = useState(false);
    const [historyKey, setHistoryKey] = useState(null);
    
    // Chat states
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isRtmConnected, setIsRtmConnected] = useState(false);
    const [userId, setUserId] = useState(`434234343vcbfdvsdc`);
    const [chatToken, setChatToken] = useState('007eJxTYLj7L0hrq6DDOeaEJVutdy4WLH04te9JuKyyUsPjlT8frdqhwGCUZGZiaJGammpiYG6SmGJmYZpslmRiYJJmamKebG5plhj3Nr0hkJHhEZ8RAyMDKxAzMoD4KgyWZsaWqRbmBroGaSmJuoaGaQa6lhaGJrqWhmYp5hZpJqmpZskAzCQnzw==');
    
    // Generate a unique call ID for this specific call instance
    const [uniqueCallId, setUniqueCallId] = useState(`channel${channelName}`);
    
    // Call details for Firebase
    const [callDetails, setCallDetails] = useState({
        userId: route?.params?.localUid || userId,
        callType: callMode,
        startTime: null,
        endTime: null,
        duration: 0,
        status: 'connecting'
    });

    useEffect(() => {
        const interval = setInterval(() => {
          database()
            .ref(`connect/${route?.params?.localUid}`)
            .once('value')
            .then(snapshot => {
              if (!snapshot.exists() && route?.params?.callerId !== route?.params?.localUid) {
                leave();
              }
            })
            .catch(error => {
              console.error('Error checking connect:', error);
            });
        }, 2000);
      
        return () => clearInterval(interval); 
      }, []);

    useEffect(() => {
        const init = async () => {
            // Initialize RTC engine for all modes
            await setupVideoSDKEngine();
            
            // For video and voice modes, join the RTC channel
            if (callMode === 'video' || callMode === 'voice') {
                joinRtcChannel();
            }
            
            // For chat mode, set up the Chat client
            if (callMode === 'chat') {
                await setupChatClient();
            }
            
            // Initialize call details in Firebase under the channel history
            const initialCallDetails = {
                recieverId: route?.params?.localUid || userId,
                recieverName: route?.params?.recieverName || 'Unknown',
                callerId: route?.params?.callerId || 'unknown',
                callerName: route?.params?.callerName || 'Unknown',
                callType: callMode,
                startTime: Date.now(), // Set initial start time
                endTime: null,
                duration: 0,
                status: 'connecting'
            };
            
            setCallDetails(initialCallDetails);
            
            // Save initial call details to Firebase under channel history
            // Using channel/callId structure to store all calls for a channel
            if(route.params.role === "User") {
                const { key } =  await database()
                     .ref(`history/${channelName}`)
                     .push(initialCallDetails)
                     .catch(error => {
                         console.error('Error saving initial call details:', error);
                     });
                   await setHistoryKey(key);  
            }
        };
        
        init();
        
        return () => {
            // Clean up when component unmounts
            leaveChannel();
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    // Effect to start timer when connected
    useEffect(() => {
        if (remoteUid !== 0 && !callConnected) {
            // Remote user joined, start the call timer
            const startTime = Date.now();
            setCallStartTime(startTime);
            setCallConnected(true);
            
            // Update call status in Firebase
            const updatedDetails = {
                ...callDetails,
                startTime: startTime,
                status: 'connected'
            };
            
            setCallDetails(updatedDetails);
            
            // Update Firebase
            if(route.params.role === "User") {
                database()
                    .ref(`history/${channelName}/${historyKey}`)
                    .update({
                        startTime: startTime,
                        status: 'connected'
                    })
                    .catch(error => {
                        console.error('Error updating call start time:', error);
                    });
            }
            
            // Start the duration timer
            timerRef.current = setInterval(() => {
                const currentDuration = Math.floor((Date.now() - startTime) / 1000);
                setCallDuration(currentDuration);
                
                if (currentDuration % 1 === 0 && route.params.role === "User") {
                    database()
                        .ref(`history/${channelName}/${historyKey}`)
                        .update({
                            duration: currentDuration
                        })
                        .catch(error => {
                            console.error('Error updating call duration:', error);
                        });
                }
                
                // Check if max duration reached
                if (currentDuration >= maxDuration) {
                    // Max duration reached, end the call
                    console.log('Max duration reached, ending call');
                    leave();
                }
            }, 1000);
        }
        
        return () => {
            if (remoteUid === 0 && callConnected) {
                // Remote user left, clear the timer
                if (timerRef.current) {
                    clearInterval(timerRef.current);
                }
            }
        };
    }, [remoteUid, callConnected]);

    const leaveChannel = async () => {
        // Clean up RTC engine
        if (agoraEngineRef.current) {
            if (isJoined) {
                agoraEngineRef.current.leaveChannel();
            }
            agoraEngineRef.current.unregisterEventHandler(rtcEventHandlerRef.current);
            agoraEngineRef.current.release();
        }
        
        // Clean up Chat client
        if (isRtmConnected) {
            try {
                const chatClient = ChatClient.getInstance();
                if (callMode === 'chat') {
                    // Try to leave chatroom if in one
                    try {
                        // Check if chatroomManager exists and has leaveChatroom method
                        if (chatClient.chatroomManager && chatClient.chatroomManager.leaveChatroom) {
                            await chatClient.chatroomManager.leaveChatroom(channelName);
                        }
                    } catch (chatRoomError) {
                        console.error('Error leaving chatroom:', chatRoomError);
                    }
                    
                    // Logout from Chat
                    await chatClient.logout();
                    console.log('Logged out from Agora Chat');
                }
                setIsRtmConnected(false);
            } catch (error) {
                console.error('Error leaving Agora Chat:', error);
            }
        }
        
        // Stop the timer
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        
        // Calculate the final duration
        let finalDuration = callDuration;
        if (callStartTime) {
            finalDuration = Math.floor((Date.now() - callStartTime) / 1000);
        }
        
        // Update call end details in Firebase - importantly, maintain the duration
        if (uniqueCallId) {
            const endTime = Date.now();
            
            // Update the call history with final data
            if(callStartTime === null || callStartTime === undefined || callStartTime === 0) {
                return 
            }
                
        }
    };

    const setupVideoSDKEngine = async () => {
        if (Platform.OS === 'android') { 
            await getPermission(); 
        }
        
        try {
            const engine = createAgoraRtcEngine();
            agoraEngineRef.current = engine;
            await engine.initialize({ appId });
            console.log('Agora RTC engine initialized successfully');
            
            // Set up RTC event handlers
            rtcEventHandlerRef.current = {
                onJoinChannelSuccess: () => {
                    console.log('Successfully joined RTC channel');
                    setIsJoined(true);
                    if (callMode === 'video') {
                        agoraEngineRef.current.startPreview();
                    }
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
                }
            };
            
            engine.registerEventHandler(rtcEventHandlerRef.current);
        } catch (error) {
            console.error('Failed to initialize Agora RTC engine:', error);
        }
    };

    const setupChatClient = async () => {
        try {
            console.log('Setting up Agora Chat client...');
            
            // Get the ChatClient instance
            const chatClient = ChatClient.getInstance();
            
            // Initialize with options
            const o = new ChatOptions({
                autoLogin: false,
                appKey: chatAppKey,
            });
            
            // Remove any existing listeners
            chatClient.removeAllConnectionListener();
            
            // Initialize client
            await chatClient.init(o);
            console.log('Agora Chat client initialized successfully');
            
            // Set up connection listeners
            chatClient.addConnectionListener({
                onTokenWillExpire() {
                    console.log('Chat token will expire');
                },
                onTokenDidExpire() {
                    console.log('Chat token expired');
                },
                onConnected() {
                    console.log('Connected to Agora Chat');
                    setIsRtmConnected(true);
                    setupMessageListener();
                },
                onDisconnected(errorCode) {
                    console.log('Disconnected from Agora Chat:', errorCode);
                    setIsRtmConnected(false);
                },
            });
            
            // Login to Chat
            await chatClient.loginWithToken(userId, chatToken);
            console.log('Logged in to Agora Chat as:', userId);
            setIsRtmConnected(true);
            setupMessageListener();
            
            // Join chatroom if needed
            try {
                if (chatClient.chatroomManager && chatClient.chatroomManager.joinChatroom) {
                    await chatClient.chatroomManager.joinChatroom(channelName);
                    console.log('Joined chatroom:', channelName);
                }
            } catch (chatRoomError) {
                console.error('Error joining chatroom:', chatRoomError);
            }
            
        } catch (error) {
            console.error('Error setting up Agora Chat client:', error);
        }
    };

    const setupMessageListener = () => {
        const chatClient = ChatClient.getInstance();
        const chatManager = chatClient.chatManager;
        
        // Remove existing listeners
        chatManager.removeAllMessageListener();
        
        // Add new listener
        chatManager.addMessageListener({
            onMessagesReceived(receivedMessages) {
                console.log('Messages received:', receivedMessages);
                
                // Process received messages
                const newMessages = receivedMessages.map(msg => {
                    let messageText = '';
                    
                    // Extract message content based on type
                    if (msg.body && msg.body.type === 'txt') {
                        messageText = msg.body.content;
                    } else if (msg.body) {
                        messageText = 'Unsupported message type';
                    }
                    
                    return {
                        text: messageText,
                        sender: msg.from,
                        timestamp: msg.serverTime || new Date().getTime(),
                        channel: msg.to
                    };
                });
                
                setMessages(prev => [...prev, ...newMessages]);
            },
            // Add other listeners as needed
        });
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

        dispatch(Actions.updateCurrentUser({ wallet: updatedWalletBalance }));
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
        navigation.goBack();
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

    // Format seconds to MM:SS
    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Render the duration counter
    const renderDurationCounter = () => (
        route.params.role === "User" ? (
          <View style={styles.durationContainer}>
            <Text style={styles.durationText}>
              {formatDuration(callDuration)} / {formatDuration(maxDuration)}
            </Text>
          </View>
        ) : (
          <View style={styles.durationContainer}>
            <Text style={styles.durationText}>
              {formatDuration(callDuration)}
            </Text>
          </View>
        )
      );
      

    const renderChatInterface = () => (
        <View style={styles.chatContainer}>
            {renderDurationCounter()}
            <FlatList
                data={messages}
                keyExtractor={(item, index) => `msg-${index}-${item.timestamp}`}
                renderItem={({ item }) => (
                    <View style={[styles.messageBubble, item.sender === userId || item.isSelf ? styles.selfMessage : styles.otherMessage]}>
                        {!item.isSelf && item.sender !== userId && (
                            <Text style={styles.senderName}>{item.sender}</Text>
                        )}
                        <Text style={styles.messageText}>{item.text}</Text>
                    </View>
                )}
                style={styles.messagesList}
                inverted={false}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    value={newMessage}
                    onChangeText={setNewMessage}
                    placeholder="Type a message..."
                    style={styles.input}
                    placeholderTextColor="gray"
                    multiline
                />
                <TouchableOpacity onPress={sendMessage} style={styles.sendButton} disabled={!isRtmConnected}>
                    <FontAwesome name="send" size={20} color={COLORS.white} />
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderVideoCall = () => (
        <>
            {renderDurationCounter()}
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
        <View style={styles.voiceCallContainer}>
            {renderDurationCounter()}
            <View style={styles.profileIconContainer}>
                <FontAwesome5 name="user-circle" size={100} color={COLORS.white} />
                <Text style={styles.callingText}>Voice Call in Progress</Text>
                {remoteUid !== 0 && <Text style={styles.connectedText}>Connected</Text>}
            </View>
        </View>
    );

    const renderCallControls = () => (
        <View style={styles.controls}>   
            {callMode !== 'chat' && (
                <TouchableOpacity onPress={toggleMic} activeOpacity={0.5} style={styles.controlButton}>
                    <FontAwesome color={COLORS.white} size={24} name={isMuted ? 'microphone-slash' : 'microphone'} />
                </TouchableOpacity>
            )}
            
            <TouchableOpacity activeOpacity={0.5} onPress={leave} style={styles.endCallButton}>
                <LinearGradient colors={['#F75B49', '#F9823B']} style={styles.endCallButtonGradient}>
                    <FontAwesome5 size={24} color={COLORS.white} name={callMode === 'chat' ? 'times' : 'phone-alt'} />  
                </LinearGradient>
            </TouchableOpacity>
            
            {callMode === 'video' && (
                <>
                    <TouchableOpacity onPress={toggleVideo} activeOpacity={0.5} style={styles.controlButton}>
                        {isVideoEnabled ? 
                            <FontAwesome size={24} color={COLORS.white} name='video-camera' /> :
                            <MaterialCommunityIcons size={28} color={COLORS.white} name='camera-off' />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={switchCamera} activeOpacity={0.5} style={styles.controlButton}>
                        <Ionicons size={28} color={COLORS.white} name="camera-reverse" />
                    </TouchableOpacity>
                </>
            )}
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: callMode === 'chat' ? colors.background : '#000' }}>
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

const styles = StyleSheet.create({
    voiceCallContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
    },
    profileIconContainer: {
        alignItems: 'center',
    },
    callingText: {
        color: COLORS.white,
        fontSize: 18,
        marginTop: 20,
        fontWeight: '600',
    },
    connectedText: {
        color: '#4CAF50',
        fontSize: 16,
        marginTop: 10,
    },
    controls: {
        width: '100%',
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 50,
    },
    controlButton: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(0,0,0,.4)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    endCallButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    endCallButtonGradient: {
        height: 60,
        width: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    chatContainer: {
        flex: 1,
        paddingTop: 20,
    },
    messagesList: {
        flex: 1,
        paddingHorizontal: 15,
    },
    messageBubble: {
        maxWidth: '80%',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 18,
        marginBottom: 10,
    },
    selfMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#F9823B',
    },
    otherMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#484848',
    },
    senderName: {
        color: '#DDDDDD',
        fontSize: 12,
        marginBottom: 2,
    },
    messageText: {
        color: COLORS.textLight,
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        color: COLORS.textLight,
        maxHeight: 100,
    },
    sendButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F9823B',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
    durationContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        zIndex: 10,
    },
    durationText: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default SocialConnect;