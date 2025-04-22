import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS } from '../../../../app/constants/theme';
import LinearGradient from 'react-native-linear-gradient';

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
                <LinearGradient
                    colors={sender ? ["#ea3d85","#ff864e"] : [theme.dark ?  colors.background : "#eee",theme.dark ?  colors.background : "#eee"]}
                    start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                    style={[
                        {
                            borderRadius:8,
                            paddingHorizontal:15,
                            paddingVertical:12,
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
                </LinearGradient>
                <Text style={{...FONTS.font,color:colors.textLight,marginTop:4}}>{item.time}</Text>
            </View>
        </>
    );
};

export default MsgComponent;