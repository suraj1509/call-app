import React from 'react';
import {TouchableOpacity,Text,Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@react-navigation/native';	
import { FONTS } from '../../../../app/constants/theme';


const StoryItem = ({ title, image, id,storyItem,backgroundColor }) => {


    const navigation = useNavigation();

    const theme = useTheme();
    const { colors } = theme;

    return(
        
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>  navigation.navigate('Status',{
                name:title,
                image:image,
                statusData: storyItem
            })}
            style={{
                marginRight:10
            }}
        >
            <LinearGradient
                colors={['#F75B48', '#F9803B']}
                style={{
                    height:75,
                    width:75,
                    borderRadius:50,
                    alignItems:'center',
                    justifyContent:'center',
                    //borderWidth:2,
                }}
            >
                <LinearGradient
                    colors={[backgroundColor ?theme.dark ? colors.background : '#ffffff' :'#FECD3E',backgroundColor ?theme.dark ? colors.background : '#ffffff': '#FEC629']}
                    style={{
                        width:70,
                        height:70,
                        borderRadius:50,
                        alignItems:'center',
                        justifyContent:'center',
                        //borderWidth:2,
                    }}
                >
                    <Image
                        style={{
                            height:65,
                            width:65,
                            borderRadius:50,
                            resizeMode:'contain'
                        }}
                        source={image}
                    />
                </LinearGradient>
            </LinearGradient>
            <Text style={{...FONTS.fontBold,fontSize:14,color:backgroundColor ? theme.dark ? colors.title :'#141414' : '#141414',textAlign:'center',marginTop:5}}>{title}</Text>
        </TouchableOpacity>
    );
}

export default StoryItem