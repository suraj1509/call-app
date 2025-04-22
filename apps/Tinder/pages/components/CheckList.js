import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS, SIZES } from '../../../../app/constants/theme';

const CheckList = ({item,checked,onPress}) => {

    const {colors} = useTheme();

    return (
        <>
            <TouchableOpacity
                onPress={() => onPress()}
                >
                <LinearGradient
                    colors={checked ? ["#ea3d85","#ff864e"] : [colors.bgLight,colors.bgLight]}
                    start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                    style={[{
                        marginBottom:14,
                        paddingHorizontal:18,
                        paddingVertical:18,
                        borderRadius:30,
                        alignItems:'center',
                        minHeight:55,
                    }]}
                >
                    <Text style={[{...FONTS.fontLg,color:colors.title,fontSize:18,top:2,flex:1},checked && {color:COLORS.white}]}>{item}</Text>
                </LinearGradient>
            </TouchableOpacity>
        </>
    );
};

export default CheckList;