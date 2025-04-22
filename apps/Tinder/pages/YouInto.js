import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { GlobalStyleSheet } from '../../../app/constants/StyleSheet';
import { COLORS, FONTS } from '../../../app/constants/theme';
import LinearGradient from 'react-native-linear-gradient';
import GradientBtn from './components/GradientBtn';

const YouInto = ({navigation}) => {

    const {colors} = useTheme();

    const tags = ["Ludo","Football","Cricket","Tea","Brunch","Shopping","Instagram",
    "Collecting","Travel","Cofee","Dancing","Wine","Manga","Anime","Memes","Fashion","Gym","Drawing",
    "Boxing","Walking","Basketball","Running","Movies","Web Series","Cars","Bike","Maggi","Sushi"];

    const selectedTags = ["Tea","Brunch","Shopping","Instagram","Collecting","Travel"]

    return (
        <SafeAreaView
            style={{
                flex:1,
                backgroundColor:colors.cardBg,
            }}
        >
            <View style={{flex:1}}>
                <ScrollView>
                    <View style={GlobalStyleSheet.container}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{
                                height:48,
                                width:48,
                                borderRadius:48,
                                alignItems:'center',
                                justifyContent:'center',
                                marginBottom:15,
                                marginLeft:-15,
                            }}
                        >
                            <FeatherIcon size={26} color={colors.title} name={'arrow-left'}/>
                        </TouchableOpacity>
                        <Text style={{...FONTS.h2,color:colors.title}}>What are you into?</Text>
                        <Text style={{...FONTS.font,fontSize:16,color:colors.text,marginBottom:25}}>Let everyone know that what you're passionate about, by adding it to your profile.</Text>
                        <View
                            style={{
                                marginHorizontal:-15,
                                borderBottomWidth:1,
                                borderBottomColor:colors.borderColor,
                                marginBottom:20,
                            }}
                        >
                            <ScrollView
                                contentContainerStyle={{
                                    paddingLeft:15,
                                }}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            >
                                <View
                                    style={{
                                        flexDirection:'row',
                                        paddingBottom:10,
                                    }}
                                >
                                    {selectedTags.map((data,index) => {
                                        return(
                                            <TouchableOpacity
                                                key={index}
                                                >
                                                <LinearGradient
                                                    colors={["#ea3d85","#ff864e"]}
                                                    start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                                    style={{
                                                        paddingHorizontal:15,
                                                        paddingVertical:6,
                                                        marginRight:10,
                                                        marginBottom:10,
                                                        borderRadius:30,
                                                        flexDirection:'row',
                                                        alignItems:'center',
                                                    }}
                                                >
                                                    <Text style={{...FONTS.font,color:COLORS.white,fontSize:15}}>{data}</Text>
                                                    <FeatherIcon color={COLORS.white} 
                                                    style={{
                                                        marginLeft:5,
                                                    }} 
                                                    size={14} name='x'/>
                                                </LinearGradient>
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>
                            </ScrollView>
                        </View>
                        <View
                            style={{
                                flexDirection:'row',
                                flexWrap:'wrap',
                            }}
                        >
                            {tags.map((data,index) => {
                                return(
                                    <TouchableOpacity
                                        key={index}
                                        style={{
                                            backgroundColor:colors.bgLight,
                                            paddingHorizontal:15,
                                            paddingVertical:6,
                                            marginRight:10,
                                            marginBottom:10,
                                            borderRadius:30,
                                        }}
                                    >
                                        <Text style={{...FONTS.font,color:colors.title,fontSize:15}}>{data}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                </ScrollView>
            </View>
            <View
                style={{
                    paddingHorizontal:45,
                    paddingVertical:35,
                }}
            >
                <GradientBtn
                    onPress={() => navigation.navigate('RecentPics')}
                    title={'Next (5/5)'}
                />
            </View>
        </SafeAreaView>
    );
};

export default YouInto;