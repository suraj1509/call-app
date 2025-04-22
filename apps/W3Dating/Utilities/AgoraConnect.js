// Import React Hooks
import React, { useRef, useState, useEffect } from 'react';
// Import user interface elements
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Switch,
    TouchableOpacity,
} from 'react-native';
// Import components related to obtaining Android device permissions
import { PermissionsAndroid, Platform } from 'react-native';
// Import Agora SDK
import {
    createAgoraRtcEngine,
    ChannelProfileType,
    ClientRoleType,
    RtcSurfaceView,
    VideoSourceType,
} from 'react-native-agora';

// Define basic information
const appId = '2b6418eee4074ad685c6b404f547c796';
const token = null; // Use null for testing without token auth
const channelName = 'test';
const localUid = 0; // Local user Uid, no need to modify

const App = () => {
    const agoraEngineRef = useRef();
    const [isJoined, setIsJoined] = useState(false);
    const [isHost, setIsHost] = useState(true);
    const [remoteUid, setRemoteUid] = useState(0);
    const [message, setMessage] = useState('');
    const eventHandler = useRef();
    
    // New state variables for controls
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);

    useEffect(() => {
        const init = async () => {
            await setupVideoSDKEngine();
            setupEventHandler();
        };
        init();
        
        // Return the actual cleanup function
        return () => {
            if (agoraEngineRef.current) {
                agoraEngineRef.current.unregisterEventHandler(eventHandler.current);
                agoraEngineRef.current.release();
            }
        };
    }, []);

    const setupEventHandler = () => {
        eventHandler.current = {
            onJoinChannelSuccess: () => {
                console.log('Successfully joined channel:', channelName);
                setMessage('Successfully joined channel: ' + channelName);
                setupLocalVideo();
                setIsJoined(true);
            },
            onUserJoined: (_connection, uid) => {
                console.log('Remote user joined:', uid);
                setMessage('Remote user ' + uid + ' joined');
                setRemoteUid(uid);
            },
            onUserOffline: (_connection, uid) => {
                console.log('Remote user left:', uid);
                setMessage('Remote user ' + uid + ' left the channel');
                setRemoteUid(0); // Set to 0 when user leaves
            },
        };
        
        if (agoraEngineRef.current) {
            agoraEngineRef.current.registerEventHandler(eventHandler.current);
        }
    };

    const setupVideoSDKEngine = async () => {
        try {
            if (Platform.OS === 'android') { 
                await getPermission(); 
            }
            
            // Create the engine
            const engine = createAgoraRtcEngine();
            agoraEngineRef.current = engine;
            
            // Initialize with app ID
            await engine.initialize({ appId: appId });
            console.log('Agora engine initialized successfully');
            
        } catch (e) {
            console.error('Failed to initialize Agora engine:', e);
        }
    };

    const setupLocalVideo = () => {
        try {
            console.log('Setting up local video');
            agoraEngineRef.current?.enableVideo();
            agoraEngineRef.current?.startPreview();
        } catch (e) {
            console.error('Failed to set up local video:', e);
        }
    };

    // Define the join method called after clicking the join channel button
    const join = async () => {
        if (isJoined) {
            console.log('Already joined channel');
            return;
        }
        
        try {
            console.log('Joining channel as', isHost ? 'host' : 'audience');
            
            if (isHost) {
                // Join the channel as a broadcaster
                agoraEngineRef.current?.joinChannel(token, channelName, localUid, {
                    // Set channel profile to live broadcast
                    channelProfile: ChannelProfileType.ChannelProfileCommunication,
                    // Set user role to broadcaster
                    clientRoleType: ClientRoleType.ClientRoleBroadcaster,
                    // Publish audio collected by the microphone
                    publishMicrophoneTrack: true,
                    // Publish video collected by the camera
                    publishCameraTrack: true,
                    // Automatically subscribe to all audio streams
                    autoSubscribeAudio: true,
                    // Automatically subscribe to all video streams
                    autoSubscribeVideo: true,
                });
            } else {
                // Join the channel as an audience
                agoraEngineRef.current?.joinChannel(token, channelName, localUid, {
                    // Set channel profile to live broadcast
                    channelProfile: ChannelProfileType.ChannelProfileCommunication,
                    // Set user role to audience
                    clientRoleType: ClientRoleType.ClientRoleAudience,
                    // Do not publish audio collected by the microphone
                    publishMicrophoneTrack: false,
                    // Do not publish video collected by the camera
                    publishCameraTrack: false,
                    // Automatically subscribe to all audio streams
                    autoSubscribeAudio: true,
                    // Automatically subscribe to all video streams
                    autoSubscribeVideo: true,
                });
            }
        } catch (e) {
            console.error('Failed to join channel:', e);
        }
    };

    // Define the leave method called after clicking the leave channel button
    const leave = () => {
        try {
            console.log('Leaving channel');
            // Call leaveChannel method to leave the channel
            agoraEngineRef.current?.leaveChannel();
            setRemoteUid(0);
            setIsJoined(false);
            showMessage('Left the channel');
        } catch (e) {
            console.error('Failed to leave channel:', e);
        }
    };
    
    // New methods for mic and video controls
    const toggleMic = () => {
        try {
            agoraEngineRef.current?.muteLocalAudioStream(!isMuted);
            setIsMuted(!isMuted);
            showMessage(isMuted ? 'Microphone unmuted' : 'Microphone muted');
        } catch (e) {
            console.error('Failed to toggle microphone:', e);
        }
    };
    
    const toggleVideo = () => {
        try {
            if (isVideoEnabled) {
                agoraEngineRef.current?.muteLocalVideoStream(true);
            } else {
                agoraEngineRef.current?.muteLocalVideoStream(false);
            }
            setIsVideoEnabled(!isVideoEnabled);
            showMessage(isVideoEnabled ? 'Video disabled' : 'Video enabled');
        } catch (e) {
            console.error('Failed to toggle video:', e);
        }
    };
    
    const switchCamera = () => {
        try {
            agoraEngineRef.current?.switchCamera();
            showMessage('Camera switched');
        } catch (e) {
            console.error('Failed to switch camera:', e);
        }
    };

    // Display information
    function showMessage(msg) {
        setMessage(msg);
    }

    // Render user interface
    return (
        <SafeAreaView style={styles.main}>
            <Text style={styles.head}>Agora Video SDK Quickstart</Text>
            <View style={styles.btnContainer}>
                {!isJoined ? (
                    <Text onPress={join} style={styles.button}>
                        Join Channel
                    </Text>
                ) : (
                    <Text onPress={leave} style={[styles.button, styles.endCallButton]}>
                        End Call
                    </Text>
                )}
            </View>
            <View style={styles.btnContainer}>
                <Text>Audience</Text>
                <Switch
                    onValueChange={switchValue => {
                        setIsHost(switchValue);
                        if (isJoined) {
                            leave();
                        }
                    }}
                    value={isHost}
                />
                <Text>Host</Text>
            </View>
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContainer}>
                {isJoined && isHost ? (
                    <React.Fragment key={localUid}>
                        <Text>Local user uid: {localUid}</Text>
                        <View style={styles.videoContainer}>
                            <RtcSurfaceView 
                                canvas={{ 
                                    uid: localUid, 
                                    sourceType: VideoSourceType.VideoSourceCamera,
                                    renderMode: 1, // Add render mode (HIDDEN)
                                }} 
                                style={styles.videoView} 
                            />
                            {!isVideoEnabled && (
                                <View style={styles.videoDisabledOverlay}>
                                    <Text style={styles.videoDisabledText}>Camera Off</Text>
                                </View>
                            )}
                        </View>
                    </React.Fragment>
                ) : (
                    <Text>Join a channel</Text>
                )}
                {isJoined && remoteUid !== 0 ? (
                    <React.Fragment key={remoteUid}>
                        <Text>Remote user uid: {remoteUid}</Text>
                        <RtcSurfaceView 
                            canvas={{ 
                                uid: remoteUid, 
                                sourceType: VideoSourceType.VideoSourceRemote,
                                renderMode: 1, // Add render mode (HIDDEN)
                            }} 
                            style={styles.videoView} 
                        />
                    </React.Fragment>
                ) : (
                    <Text>{isJoined && !isHost ? 'Waiting for remote user to join' : ''}</Text>
                )}
                <Text style={styles.info}>{message}</Text>
            </ScrollView>
            
            {/* Call Controls */}
            {isJoined && isHost && (
                <View style={styles.controlsContainer}>
                    <TouchableOpacity 
                        onPress={toggleMic} 
                        style={[styles.controlButton, isMuted && styles.controlButtonActive]}
                    >
                        <Text style={styles.controlButtonText}>
                            {isMuted ? 'Unmute' : 'Mute'}
                        </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        onPress={toggleVideo} 
                        style={[styles.controlButton, !isVideoEnabled && styles.controlButtonActive]}
                    >
                        <Text style={styles.controlButtonText}>
                            {isVideoEnabled ? 'Hide Video' : 'Show Video'}
                        </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        onPress={switchCamera} 
                        style={styles.controlButton}
                    >
                        <Text style={styles.controlButtonText}>
                            Switch Camera
                        </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        onPress={leave} 
                        style={[styles.controlButton, styles.endCallButton]}
                    >
                        <Text style={styles.controlButtonText}>
                            End Call
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
};

// Define user interface styles
const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 25,
        paddingVertical: 4,
        fontWeight: 'bold',
        color: '#ffffff',
        backgroundColor: '#0055cc',
        margin: 5,
    },
    main: { 
        flex: 1, 
        alignItems: 'center',
        position: 'relative',
    },
    scroll: { 
        flex: 1, 
        backgroundColor: '#ddeeff', 
        width: '100%' 
    },
    scrollContainer: { 
        alignItems: 'center',
        paddingBottom: 80, // Add padding to account for controls at bottom
    },
    videoContainer: {
        position: 'relative',
        width: '90%',
        height: 200,
    },
    videoView: { 
        width: '100%', 
        height: 200
    },
    videoDisabledOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoDisabledText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    btnContainer: { 
        flexDirection: 'row', 
        justifyContent: 'center' 
    },
    head: { 
        fontSize: 20 
    },
    info: { 
        backgroundColor: '#ffffe0', 
        paddingHorizontal: 8, 
        color: '#0000ff',
        marginTop: 10, 
    },
    controlsContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
    },
    controlButton: {
        backgroundColor: '#444',
        padding: 8,
        borderRadius: 20,
        width: 80,
        alignItems: 'center',
    },
    controlButtonActive: {
        backgroundColor: '#cc0000',
    },
    controlButtonText: {
        color: 'white',
        fontSize: 12,
    },
    endCallButton: {
        backgroundColor: '#dc3545',
    },
});

const getPermission = async () => {
    if (Platform.OS === 'android') {
        await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            PermissionsAndroid.PERMISSIONS.CAMERA,
        ]);
    }
};

export default SocialConnect;