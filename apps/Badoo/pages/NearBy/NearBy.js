import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS, IMAGES, SIZES } from '../../../../app/constants/theme';
import { GlobalStyleSheet } from '../../../../app/constants/StyleSheet';
import LinearGradient from 'react-native-linear-gradient';

const data = [
    { id: "1", image: IMAGES.slderPic1, name : "Harleen", age : "24" ,about : "Product Designer" },
    { id: "2", image: IMAGES.slderPic2, name : "Richard", age : "22" ,about : "Job Holder" },
    { id: "3", image: IMAGES.slderPic3, name : "Harleen", age : "25" ,about : "Product Designer" },
    { id: "4", image: IMAGES.slderPic4, name : "Harleen", age : "22" ,about : "Product Designer" },
    { id: "5", image: IMAGES.slderPic5, name : "Harleen", age : "21" ,about : "Product Designer" },
    { id: "6", image: IMAGES.likedPic1, name : "Harleen", age : "24" ,about : "Product Designer" },
    { id: "7", image: IMAGES.likedPic2, name : "Richard", age : "22" ,about : "Job Holder" },
    { id: "8", image: IMAGES.likedPic3, name : "Harleen", age : "25" ,about : "Product Designer" },
    { id: "9", image: IMAGES.likedPic4, name : "Harleen", age : "22" ,about : "Product Designer" },
    { id: "10", image: IMAGES.likedPic5, name : "Harleen", age : "21" ,about : "Product Designer" },
    { id: "11", image: IMAGES.likedPic6, name : "Harleen", age : "21" ,about : "Product Designer" },
    { id: "12", image: IMAGES.slderPic1, name : "Harleen", age : "24" ,about : "Product Designer" },
    { id: "13", image: IMAGES.slderPic2, name : "Richard", age : "22" ,about : "Job Holder" },
    { id: "14", image: IMAGES.slderPic3, name : "Harleen", age : "25" ,about : "Product Designer" },
    { id: "15", image: IMAGES.slderPic4, name : "Harleen", age : "22" ,about : "Product Designer" },
    { id: "16", image: IMAGES.slderPic5, name : "Harleen", age : "21" ,about : "Product Designer" },
    { id: "17", image: IMAGES.likedPic1, name : "Harleen", age : "24" ,about : "Product Designer" },
    { id: "18", image: IMAGES.likedPic2, name : "Richard", age : "22" ,about : "Job Holder" },
    { id: "19", image: IMAGES.likedPic3, name : "Harleen", age : "25" ,about : "Product Designer" },
    { id: "20", image: IMAGES.likedPic4, name : "Harleen", age : "22" ,about : "Product Designer" },
    { id: "21", image: IMAGES.likedPic5, name : "Harleen", age : "21" ,about : "Product Designer" },
    { id: "22", image: IMAGES.likedPic6, name : "Harleen", age : "21" ,about : "Product Designer" },
]

const NearBy = ({navigation}) => {

    const {colors} = useTheme();

    return (
        <SafeAreaView
            style={{
                flex:1,
                backgroundColor:colors.card,
            }}
        >
            <View
                style={GlobalStyleSheet.container}
            >
                <View style={{
                    flexDirection:'row',
                    alignItems:'center',
                    paddingVertical:5,
                }}>
                    <Text style={{...FONTS.h4,color:colors.title,flex:1}}>NearBy</Text>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom:100,
                    }}
                >
                    <View
                        style={GlobalStyleSheet.row}
                    >
                        {data.map((data,index) => {
                            return(
                                <View
                                    style={[GlobalStyleSheet.col50,{
                                        marginBottom:10,
                                    }]}
                                    key={index}
                                >
                                    <TouchableOpacity
                                        activeOpacity={.9}
                                        onPress={() => {navigation.navigate('ProfileDetail',{item : data})}}
                                    >
                                        <Image
                                            style={{
                                                width:'100%',
                                                height:undefined,
                                                aspectRatio: 1/1.3,
                                                borderRadius:SIZES.radius,
                                            }}
                                            source={data.image}
                                        />
                                        <LinearGradient
                                            colors={["rgba(0,0,0,0)", "rgba(0,0,0,0)","rgba(0,0,0,.8)"]}
                                            style={{
                                                position : "absolute",
                                                height : "100%",
                                                width:"100%",
                                                bottom : 0,
                                                borderRadius:SIZES.radius,
                                                justifyContent: "flex-end",
                                                paddingHorizontal : 15,
                                                paddingVertical : 15,
                                            }}
                                        >
                                            <Text style={{...FONTS.h6,color:COLORS.white,lineHeight:18,marginBottom:3}}>{data.name} , {data.age}</Text>
                                            <Text style={{...FONTS.fontSm,color:COLORS.white,opacity:.75}}>{data.about}</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default NearBy;