import React from 'react';
import { TouchableOpacity, Text, Platform } from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../../../../app/constants/theme';

const GradientBtn = ({title,onPress}) => {
    return (
        <TouchableOpacity
            activeOpacity={.8}
            onPress={() => onPress && onPress()}
        >
            <Shadow
                style={[{
                    shadowColor: COLORS.primary,
                    shadowOffset: {
                        width: 0,
                        height: 5,
                    },
                    shadowOpacity: .5,
                    shadowRadius: 12,
                },Platform.OS === 'ios' && {
                    backgroundColor : COLORS.primary,
                    borderRadius:30,
                }]}
            >
                <LinearGradient
                    colors={["#FF78B7","#FF3C97"]}
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