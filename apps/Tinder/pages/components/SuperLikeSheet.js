import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { FONTS, IMAGES } from '../../../../app/constants/theme';
import GradientBtn from './GradientBtn';

const SuperLikeSheet = ({sheetRef}) => {

    const {colors} = useTheme();
    
    const likeData = [
        {
            likes : "3",
            price : "296.60/ea"
        },
        {
            likes : "15",
            price : "226.60/ea"
        },
        {
            likes : "30",
            price : "173.60/ea"
        },
    ]

    const [activePlan , setAtivePlan] = useState(likeData[1].likes);

    return (
        <RBSheet
            ref={sheetRef}
            height={470}
            openDuration={100}
            closeOnDragDown={true}
            customStyles={{
                wrapper: {
                },
                container:{
                    backgroundColor: colors.cardBg,
                    borderTopLeftRadius:15,
                    borderTopRightRadius:15,
                },
                draggableIcon: {
                    marginTop:5,
                    marginBottom:0,
                    height:5,
                    width:90,
                    backgroundColor: colors.borderColor,
                }
            }}
        >
            <View
                style={{
                    paddingHorizontal:30,
                    paddingTop:30,
                }}
            >
                <View
                    style={{
                        alignItems:'center',
                    }}
                >
                    <View
                        style={{
                            height:75,
                            width:75,
                            alignItems:'center',
                            justifyContent:'center',
                            marginBottom:20,
                            borderRadius:50,
                            backgroundColor:'rgba(0,133,155,.1)',
                        }}
                    >
                        <Image
                            source={IMAGES.star}
                            style={{
                                height:38,
                                top:2,
                                width:38,
                                tintColor: "#0085FF",
                            }}
                        />
                    </View>
                </View>
                <Text style={{...FONTS.h5,color:colors.title,textAlign:'center',marginBottom:3}}>Stant out with Super Like</Text>
                <Text style={{...FONTS.font,fontSize:16,color:colors.text,textAlign:'center'}}>You're 3x more likely to get a match!</Text>
                
                <View
                    style={{
                        flexDirection:'row',
                        marginTop:30,
                        marginBottom:10,
                    }}
                >
                    {likeData.map((data,index) => {
                        return(
                            <TouchableOpacity
                                key={index}
                                activeOpacity={1}
                                onPress={() => setAtivePlan(data.likes)}
                                style={[{
                                    flex:1,
                                    alignItems:'center',
                                    borderWidth:2,
                                    borderColor:colors.borderColor,
                                    paddingVertical:18,
                                    paddingHorizontal:5,
                                    backgroundColor:colors.cardBg,
                                    marginHorizontal:-1,
                                }, activePlan == data.likes && {
                                    borderColor:"#0085FF",
                                    zIndex:1,
                                    transform:[{scale : 1.1}]
                                }]}
                            >
                                <Text style={{...FONTS.h2,color:colors.title,lineHeight:32,marginBottom:2}}>{data.likes}</Text>
                                <Text style={{...FONTS.font,color:colors.text,marginBottom:2,lineHeight:18}}>Super Likes</Text>
                                <Text style={{...FONTS.font,color:colors.title,...FONTS.fontBold}}>{data.price}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
                
                <View
                    style={{
                        paddingHorizontal:15,
                        paddingVertical:25,
                    }}
                >
                    <GradientBtn
                        gradient={["#0085FF","#31B5FF"]}
                        title={'GET SUPER LIKES'}
                    />
                </View>
            </View>
        </RBSheet>
    );
};

export default SuperLikeSheet;