import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS, IMAGES, SIZES } from '../../../../app/constants/theme';
import { GlobalStyleSheet } from '../../../../app/constants/StyleSheet';

const RelationshipGoalsSheet = () => {

    const {colors} = useTheme();
    
    const genderData= [
        {
            image : IMAGES.love,
            title : "Long-term partner" ,
        },{
            image : IMAGES.inlove,
            title : "Long-term, open to short", 
        },{
            image : IMAGES.drinking,
            title : "Short-term, open to long",
        },{
            image : IMAGES.confetti,
            title : "Short-term fun",
        },{
            image : IMAGES.hello,
            title : "New friends",
        },{
            image : IMAGES.think,
            title : "Stil figuring it out",
        }
    ];
    const [active , setActive] = useState(genderData[1].title);

    return (
        <>
            <View style={{
                    paddingHorizontal:15,
                    borderBottomWidth:1,
                    borderColor:colors.borderColor,
                    paddingVertical:12,
                }}>
                    <Text style={{...FONTS.h5,color:colors.title}}>Relationship Goals</Text>
            </View>
            <View style={{paddingHorizontal:5,paddingVertical:20}}>
                <View
                    style={{
                        flexDirection:'row',
                        flexWrap:'wrap',
                    }}
                >  
                    {genderData.map((data,index) => {
                        return(
                            
                            <View
                                key={index}
                                style={{
                                    width:'33.33%',
                                    paddingHorizontal:5,
                                    marginBottom:10,
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => setActive(data.title)}
                                    style={[{
                                        backgroundColor:colors.bgLight,
                                        borderRadius:SIZES.radius,
                                        paddingHorizontal:6,
                                        height:145,
                                        paddingVertical:15,
                                        borderWidth:2,
                                        borderColor:'transparent',
                                    }, data.title == active && {
                                        borderColor:COLORS.primary2,
                                        backgroundColor:colors.cardBg,
                                    }]}
                                >
                                    <View
                                        style={{
                                            flex:1,
                                            alignItems:'center',
                                            justifyContent:'center',
                                        }}
                                    >
                                        <Image
                                            style={{
                                                height:28,
                                                width:28,
                                            }}
                                            source={data.image}
                                        />
                                    </View>
                                    <Text style={{
                                        ...FONTS.font,
                                        ...FONTS.fontSemiBold,
                                        fontSize:15,
                                        color:colors.title,
                                        textAlign:'center',
                                    }}>{data.title}</Text>
                                </TouchableOpacity>
                            </View>
                            
                        )
                    })}
                </View>
            </View>
        </>
    );
};

export default RelationshipGoalsSheet;