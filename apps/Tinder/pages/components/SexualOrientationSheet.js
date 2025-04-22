import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { List } from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS } from '../../../../app/constants/theme';
import { GlobalStyleSheet } from '../../../../app/constants/StyleSheet';

const SexualOrientationSheet = () => {

    const {colors} = useTheme();
    const Data = [
        {
            title : "Straight",
            checked : true,
        },
        {
            title : "Gay",
            checked : false,
        },
        {
            title : "Lesbian",
            checked : false,
        },
        {
            title : "Bisexual",
            checked : true,
        },
        {
            title : "Asexual",
            checked : true,
        },
        {
            title : "Queer",
            checked : false,
        },
        {
            title : "Demisexual",
            checked : false,
        },
    ]

    const [ orientationData , setOrientationData] = useState(Data);

    const handleOrientationSelected = (val) => {
        let Data = orientationData.map((data) => {
            if (val === data.title) {
                return { ...data, checked: !data.checked };
            }
            return data;
        });
        setOrientationData(Data);
    }

    return (
        <>
            <View style={{
                    paddingHorizontal:15,
                    borderBottomWidth:1,
                    borderColor:colors.borderColor,
                    paddingVertical:12,
                }}>
                    <Text style={{...FONTS.h5,color:colors.title}}>Sexual Orientation</Text>
            </View>
            <ScrollView>
                <View style={GlobalStyleSheet.container}>
                    {orientationData.map((data,index) => {
                        return(
                            <List.Item
                                onPress={() => handleOrientationSelected(data.title)}
                                key={index}
                                style={{
                                    paddingVertical:12,
                                }}
                                title={data.title}
                                titleStyle={[{
                                    ...FONTS.font,
                                    fontSize:20,
                                    lineHeight:22,
                                    top:1,
                                    color:colors.text
                                }, data.checked && {
                                    color:COLORS.primary2
                                }]}
                                right={() => data.checked && <FeatherIcon size={20} color={colors.title} name='check'/>}
                            ></List.Item>
                        )
                    })}
                </View>
            </ScrollView>
        </>
    );
};

export default SexualOrientationSheet;