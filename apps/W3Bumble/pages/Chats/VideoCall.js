import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS, IMAGES } from '../../../../app/constants/theme'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, useTheme } from '@react-navigation/native';

const VideoCall = () => {

    const theme = useTheme();
    const {colors} = theme;

    const navigation = useNavigation();

    const [show, setshow] = useState('')

    return (
       <SafeAreaView 
            style={{
                flex:1
            }}
       >
            <View>
                <Image
                    style={{width:'100%',height:'100%'}}
                    source={IMAGES.slderPic7}
                />
            </View>
            <View
                style={{
                    width:110,
                    height:150,
                    borderRadius:12,
                    backgroundColor:'rgba(0,0,0,0.1)',
                    position:'absolute',
                    left:20,
                    top:20,
                    alignItems:'center',
                    justifyContent:'center'
                }}
            >
                <Image
                    style={{
                        height:140,
                        width:100,
                        borderRadius:12
                    }}
                    source={IMAGES.userPic18}
                />
            </View>
            <View
                style={{
                    width:'100%',
                    paddingHorizontal:80,
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-between',
                    position:'absolute',
                    bottom:50
                }}
            >   
                <TouchableOpacity
                    onPress={() => setshow(!show)}
                    activeOpacity={0.5}
                    style={{
                        height:50,
                        width:50,
                        borderRadius:50,
                        backgroundColor:'rgba(0,0,0,.4)',
                        alignItems:'center',
                        justifyContent:'center'
                    }}
                >
                     <FontAwesome color={COLORS.white} size={24} name={show ? 'microphone-slash' : 'microphone'}/>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => navigation.goBack()}
                >
                    <LinearGradient
                         colors={['#F75B49', '#F9823B']}
                         style={{
                            height:60,
                            width:60,
                            borderRadius:50,
                            alignItems:'center',
                            justifyContent:'center'
                         }}
                    >
                        <FontAwesome5 size={24} color={COLORS.white} name='phone-alt'/>  
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={{
                        height:50,
                        width:50,
                        borderRadius:50,
                        backgroundColor:'rgba(0,0,0,.4)',
                        alignItems:'center',
                        justifyContent:'center'
                    }}
                >
                     <FontAwesome size={24} color={COLORS.white} name='video-camera'/>
                </TouchableOpacity>
            </View>
       </SafeAreaView>
    )
}

export default VideoCall