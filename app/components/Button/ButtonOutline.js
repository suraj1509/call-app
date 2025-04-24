import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

const ButtonOutline = (props) => {
    return (
        <TouchableOpacity
            onPress={()=> props.onPress && props.onPress()}
            style={[{
                ...props.style,
                borderWidth:1,
                borderColor: props.color ? props.color : COLORS.primary,
                paddingHorizontal: props.paddingHorizontal ? props.paddingHorizontal : 12,
                paddingVertical: props.paddingVertical ? props.paddingVertical : 12,
                borderRadius: props.btnSquare ? 0 : props.btnRounded ? 30 : SIZES.radius,
                alignItems:'center',
                height: props.height ? props.height : 48,
                justifyContent:'center',
                flexDirection:'row',
            }]}
        >
            <Text style={[{fontSize:15,...FONTS.fontSemiBold,color:props.color ? props.color : COLORS.primary}]}>{props.title}</Text>
        </TouchableOpacity>
    );
};


export default ButtonOutline;