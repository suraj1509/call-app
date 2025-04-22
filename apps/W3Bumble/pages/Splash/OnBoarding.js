import React, { useRef } from 'react';
import { 
    SafeAreaView, 
    View,
    ScrollView,
    Text, 
    StyleSheet,
    Animated,
    Image,
    TouchableOpacity,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS, IMAGES, SIZES } from '../../../../app/constants/theme';
import LinearGradient from 'react-native-linear-gradient';
import { GlobalStyleSheet } from '../../../../app/constants/StyleSheet';
import Button from '../../../../app/components/Button/Button';



const OnBoarding = ({navigation}) => {

    const theme = useTheme();
    const {colors} = theme;
    
    return (
        <SafeAreaView
            style={{
                flex:1,
            }}
        >
            <LinearGradient
                colors={['#FFD95C', '#FEC629']}  
                style={{flex:1}}
            >
                <Image
                    style={{
                        width:'100%',
                        height:'100%',
                        position:'absolute',
                        left:0,
                        right:0,
                        top:0,
                        bottom:0
                    }}
                    source={IMAGES.bumblebackground}

                />
                <ScrollView contentContainerStyle={{flexGrow:1}}>
                    <View style={[GlobalStyleSheet.container,{
                        padding:0,
                        flex:1,
                        alignItems:'center',
                        justifyContent:'center',
                        paddingTop:50,
                        paddingBottom:0,
                    }]}>
                        <Text style={{...FONTS.fontBold,fontSize:30,color:theme.dark ? colors.title :'#141414',position:'absolute',top:40}}>W3Bumble</Text>
                        <View
                            style={{
                                alignItems:'center',
                                justifyContent:'center',
                            }}
                        >
                            {/* <PulseAnimation/> */}
                            <Image
                                source={IMAGES.heartCircle2}
                                style={[{
                                    position:'absolute',
                                    height:'100%',
                                    width:'100%',
                                    resizeMode:'contain',
                                    transform:[{scale : 1.52}]
                                }, theme.dark && {
                                    tintColor : "rgba(255,255,255,.1)",
                                }]}
                            />
                            <Image
                                source={IMAGES.heartCircle1}
                                style={{
                                    position:'absolute',
                                    height:'100%',
                                    width:'100%',
                                    transform:[{scale : 1.1}],
                                    resizeMode:'contain',
                                }}
                            />
                            <Image
                                source={IMAGES.userPic9}
                                style={{
                                    height:60,
                                    width:60,
                                    borderRadius:48,
                                    position:'absolute',
                                    bottom:0,
                                    right:5,
                                }}
                            />
                            <Image
                                source={IMAGES.userPic10}
                                style={{
                                    height:50,
                                    width:50,
                                    borderRadius:45,
                                    position:'absolute',
                                    top:-28,
                                    right:60,
                                }}
                            />
                            <Image
                                source={IMAGES.userPic11}
                                style={{
                                    height:40,
                                    width:40,
                                    borderRadius:35,
                                    position:'absolute',
                                    bottom:50,
                                    left:-18,
                                }}
                            />
                            
                            <View
                                style={{
                                    padding:28,
                                }}
                            >
                                <LinearGradient
                                    colors={['rgba(255,255,255,0.10)', 'rgba(0,0,0,0.10)']} 
                                    style={{
                                        height:202,
                                        width:202,
                                        borderRadius:192,
                                    // backgroundColor:"rgba(255,70,157,.07)",
                                        alignItems:'center',
                                        justifyContent:'center',
                                    }}
                                >
                                    <Image
                                        style={{
                                            height:150,
                                            width:150,
                                            resizeMode:'contain',
                                        }}
                                        source={IMAGES.userPic12}
                                    />
                                </LinearGradient >
                            </View>
                        </View>
                    </View>
                    <View style={[GlobalStyleSheet.container,{padding:0,paddingHorizontal:20,paddingBottom:10}]}>
                        <Text style={{...FONTS.fontSemiBold,fontSize:28,color:theme.dark ? colors.title :'#141414',textAlign:'center'}}>Join us and find you life partner with us</Text>
                    </View>
                    <View style={[GlobalStyleSheet.container,{padding:0, paddingHorizontal:35,paddingVertical:20,paddingBottom:15}]}>
                        <View style={{marginBottom:15}}>
                           <TouchableOpacity
                                activeOpacity={0.7}
                                style={{
                                    height:50,
                                    width:'100%',
                                    backgroundColor:COLORS.white,
                                    borderRadius:30,
                                    flexDirection:'row',
                                    alignItems:'center',
                                    justifyContent:'center',
                                    gap:10,
                                }}
                           >    
                                <Image
                                    style={{height:20,width:20,resizeMode:'contain'}}
                                    source={IMAGES.facebook1}
                                />
                                <Text style={{...FONTS.fontSemiBold,fontSize:18,color:'#0D4A98'}}>Continue with facebook</Text>
                           </TouchableOpacity>
                        </View>
                        <View>
                            <Button
                                title={'Use Phone Number'}
                                onPress={() => navigation.navigate('PhoneNumber')}
                                btnRounded
                                fontSize
                                color={'#141414'} 
                            />
                        </View>
                    </View>
                    <View
                        style={[GlobalStyleSheet.container,{paddingHorizontal:30}]}
                    >
                        <Text style={{...FONTS.fontJostRegular,fontSize:16,color:theme.dark ? colors.title :'#141414',textAlign:'center',}}>I agree to all <Text style={{...FONTS.fontJostBold}}>Terms, Privacy</Text> and <Text style={{...FONTS.fontJostSemiBold}}>Fees</Text></Text>
                    </View>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

    slideItem: {
        width: SIZES.width,
        alignItems:'center',
        padding:25,
        paddingBottom:65,
        paddingTop:15,
    },
    indicatorConatiner: {
        alignSelf: 'center',
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
    },
    indicator: {
        height: 10,
        width: 10,
        borderRadius: 5,
        marginHorizontal: 4,
        overflow: 'hidden',
    },
    activeIndicator: {
        height: '100%',
        width: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: 10,

    },
  
})

export default OnBoarding;