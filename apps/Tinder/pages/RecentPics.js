import React, { useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { Image, PermissionsAndroid, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { launchImageLibrary } from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS, IMAGES, SIZES } from '../../../app/constants/theme';
import { GlobalStyleSheet } from '../../../app/constants/StyleSheet';
import GradientBtn from './components/GradientBtn';

const RecentPics = ({navigation}) => {

    const {colors} = useTheme();

    const data = [
        {
            image : IMAGES.likedPic2,
        },
        {
            
        },
        {
            
        },
        {
            
        },
        {
            
        },
        {
            
        },
    ]

    const [imageData , setImageData] = useState(data);

    const UploadFile = async () => {
        try {
            if(Platform.OS === 'ios'){
                let options = {
                    mediaType: "photo",
                    maxWidth: 200,
                    maxHeight: 200,
                    quality: 1,
                };
                launchImageLibrary(options, (response) => {
                    if(!response.didCancel){
                        //setImageData([...imageData , {id : uuid.v4(),image : response.assets[0].uri}])
                    }
                })
            }else{
                await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
                ]).then((result) => {
                    if (result['android.permission.CAMERA']
                    && result['android.permission.READ_EXTERNAL_STORAGE'] === 'granted') {
                        let options = {
                            mediaType: "photo",
                            maxWidth: 200,
                            maxHeight: 200,
                            quality: 1,
                        };
                        launchImageLibrary(options, (response) => {
                            if(!response.didCancel){
                                //setImageData([...imageData , {id : uuid.v4(),image : response.assets[0].uri}])
                            }
                        })
                    }
                });
            }
        } catch (err) {
            console.warn(err);
        }
    }


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
                        <Text style={{...FONTS.h2,color:colors.title}}>Add your recent pics</Text>
                        <Text style={{...FONTS.font,fontSize:16,color:colors.text,marginBottom:25}}>Upload 2 photos to start. Add 4 or more to make your profile stand out.</Text>
                        <View
                            style={GlobalStyleSheet.row}
                        >
                            {imageData.map((data,index) => {
                                return(
                                    <View 
                                        key={index}
                                        style={GlobalStyleSheet.col33}>
                                        <TouchableOpacity
                                            onPress={() => UploadFile()}
                                            activeOpacity={.8}
                                            style={[styles.imageBox,
                                                {backgroundColor:colors.bgLight,
                                                    borderColor:colors.borderColor
                                                }]}
                                                >
                                            {data.image &&
                                                <Image
                                                style={{
                                                    height:'100%',
                                                    width:'100%',
                                                    borderRadius:SIZES.radius,
                                                }}
                                                source={data.image}
                                                />
                                            }
                                            <TouchableOpacity
                                                onPress={() => UploadFile()}
                                                style={{
                                                    position:'absolute',
                                                    bottom:-5,
                                                    right:-5,
                                                }}
                                            >
                                                <LinearGradient
                                                    colors={data.image ?  [colors.cardBg,colors.cardBg] : ["#ea3d85","#ff864e"]}
                                                    start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                                    style={[{
                                                        height:30,
                                                        width:30,
                                                        borderRadius:30,
                                                        alignItems:'center',
                                                        justifyContent:'center',
                                                    }, data.image && {
                                                        borderWidth:1,
                                                        borderColor:colors.borderColor,
                                                    }]}
                                                >
                                                    <FeatherIcon size={18} color={data.image ? colors.title : COLORS.white} name={data.image ? 'x' : 'plus'}/>
                                                </LinearGradient>
                                            </TouchableOpacity>
                                        </TouchableOpacity>
                                    </View>
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
                    onPress={() => navigation.navigate('DrawerNavigation')}
                    title={'Next'}
                />
            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    imageBox : {
        height: SIZES.width / 2.8,
        borderWidth:2,
        borderRadius:SIZES.radius,
        borderStyle:'dashed',
        marginBottom:10,
    }
})

export default RecentPics;