import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

const ButtonLight = (props) => {
    return (
        <View style={{position:'relative'}}>
            <View
                style={{
                    position:'absolute',
                    height:'100%',
                    width:'100%',
                    borderRadius: props.btnSquare ? 0 : props.btnRounded ? 30 : SIZES.radius,
                    backgroundColor: props.color ? props.color :  COLORS.primary,
                    opacity: .2,
                }}
            />
            <TouchableOpacity
                onPress={()=> props.onPress && props.onPress()}
                style={[{
                    ...props.style,
                    paddingHorizontal: props.paddingHorizontal ? props.paddingHorizontal : 12,
                    paddingVertical: props.paddingVertical ? props.paddingVertical : 12,
                    alignItems:'center',
                    height: props.height ? props.height: 48,
                    justifyContent:'center',
                    flexDirection:'row',
                }]}
                >
                <Text style={[{fontSize:15,...FONTS.fontSemiBold,color: props.color ? props.color : COLORS.primary}]}>{props.title}</Text>
            </TouchableOpacity>
        </View>
    );
};


export default ButtonLight;