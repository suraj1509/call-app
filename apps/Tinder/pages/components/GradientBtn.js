import React from 'react';
import { TouchableOpacity, Text, Platform } from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../../../../app/constants/theme';

const GradientBtn = ({title,onPress,gradient}) => {
    return (
        <TouchableOpacity
            activeOpacity={.8}
            onPress={() => onPress && onPress()}
        >
            <Shadow
                style={[{
                    shadowColor: gradient ? gradient[0] : "#ea3d85",
                    shadowOffset: {
                        width: 0,
                        height: 5,
                    },
                    shadowOpacity: .4,
                    shadowRadius: 8,
                },Platform.OS === 'ios' && {
                    backgroundColor : COLORS.primary2,
                    borderRadius:30,
                }]}
            >
                <LinearGradient
                    colors={gradient ? gradient : ["#ea3d85","#ff864e"]}
                    start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                    style={{
                        height:55,
                        alignItems:'center',
                        justifyContent:'center',
                        paddingHorizontal:20,
                        paddingVertical:12,
                        borderRadius:30,
                    }}
                >
                    <Text style={{
                        fontSize:18,
                        fontFamily:"Poppins-Medium",
                        color:COLORS.white,
                        top:1,
                    }}>{title}</Text>
                </LinearGradient>
            </Shadow>
        </TouchableOpacity>
    );
};

export default GradientBtn;