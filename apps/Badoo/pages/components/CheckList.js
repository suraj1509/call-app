import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS, SIZES } from '../../../../app/constants/theme';

const CheckList = ({item,checked,onPress}) => {

    const {colors} = useTheme();

    return (
        <>
            <TouchableOpacity
                onPress={() => onPress()}
                style={[{
                    borderWidth:1,
                    marginBottom:14,
                    borderColor:colors.borderColor,
                    paddingHorizontal:15,
                    paddingVertical:14,
                    borderRadius:15,
                    flexDirection:'row',
                    alignItems:'center',
                }, checked && {
                    backgroundColor:COLORS.primary3,
                    borderColor:COLORS.primary3,
                }]}
            >
                <Text style={{...FONTS.font,...FONTS.fontSemiBold,color:checked ? COLORS.white : colors.title,fontSize:16,top:1,flex:1}}>{item}</Text>
                <View
                    style={[{
                        height:16,
                        width:16,
                        borderWidth:1.5,
                        borderRadius:10,
                        borderColor:colors.borderColor,
                        marginLeft:10,
                        alignItems:'center',
                        justifyContent:'center',
                    }, checked && {
                        borderColor:COLORS.white,
                    }]}
                >
                    {checked &&
                        <View
                            style={{
                                height:8,
                                width:8,
                                borderRadius:8,
                                backgroundColor:COLORS.white,
                            }}
                        />
                    }
                </View>
            </TouchableOpacity>
        </>
    );
};

export default CheckList;