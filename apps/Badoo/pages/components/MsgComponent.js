import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS } from '../../../../app/constants/theme';

const MsgComponent = ({item,sender}) => {

    const {colors} = useTheme();
    const theme = useTheme();

    return (
        <>
            <View style={[
                {
                    alignItems:'flex-start',
                    marginRight:'25%',
                    marginBottom:15,
                },
                sender && {
                    alignItems:'flex-end',
                    marginLeft:'25%',
                    marginRight:0,
                }
            ]}>
                <View
                    style={[
                        {
                            paddingHorizontal:15,
                            paddingVertical:12,
                            borderRadius:15,
                            backgroundColor:sender ? COLORS.primary3 : colors.bgLight,
                        },
                        sender && {
                            borderBottomRightRadius:0,
                        },
                        !sender && {
                            borderTopLeftRadius:0,
                        }
                    ]}
                >
                    <Text style={[{
                        ...FONTS.font,
                        ...FONTS.fontMedium,
                        color:colors.title,
                    }, sender && {
                        color: COLORS.white,
                    }]}>{item.msg}</Text>
                </View>
                <Text style={{...FONTS.fontXs,color:colors.textLight,marginTop:6}}>{item.time}</Text>
            </View>
        </>
    );
};

export default MsgComponent;