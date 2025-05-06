import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import * as Actions from '../../../redux/Actions'
import { useDispatch, useSelector } from 'react-redux';

const ToggleStyleRevert = (props) => {
    
    const {colors} = useTheme();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state?.user?.currentUser)

    const [active , setActive] = useState(currentUser?.notificationMode);

    const offset = useSharedValue(currentUser?.notificationMode ? 28 : 0);
    const toggleStyle = useAnimatedStyle(() => { 
        return {
            transform: [
                { 
                    translateX:  offset.value
                }
            ],
        };
    });

    return (
        <>
            <TouchableOpacity
                onPress={() => { 
                    let mode = active
                    setActive(!active);
                    if(mode){
                        offset.value = withSpring(0)
                        dispatch(Actions?.updateCurrentUser({notificationMode: false}))
                    }else{
                        offset.value = withSpring(28)
                        dispatch(Actions?.updateCurrentUser({notificationMode: true}))
                    }
                }}
                style={[{
                    height:32,
                    width:60,
                    backgroundColor : active ? COLORS.danger : COLORS.success,
                    borderRadius:30,
                }]}
            >
                <View
                    style={{
                        position:'absolute',
                        height:'100%',
                        width:'100%',
                        flexDirection:'row',
                        alignItems:'center',
                        paddingHorizontal:4,
                        justifyContent:'space-around',
                    }}
                >
                    <Text style={{...FONTS.font,...FONTS.fontBold,fontSize:10,color:COLORS.white}}>ON</Text>
                    <Text style={{...FONTS.font,...FONTS.fontBold,fontSize:10,color:COLORS.white}}>OFF</Text>
                </View>
                <Animated.View
                    style={[toggleStyle,{
                        height:28,
                        width:28,
                        backgroundColor:'#fff',
                        borderRadius:30,
                        top:2,
                        left:2,
                    }]}
                />
            </TouchableOpacity>
        </>
    );
};

export default ToggleStyleRevert;