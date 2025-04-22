import React, { useRef } from 'react';
import { 
    Image, 
    SafeAreaView, 
    ScrollView, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View 
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, IMAGES, SIZES } from '../../../../app/constants/theme';
import { GlobalStyleSheet } from '../../../../app/constants/StyleSheet';
import RBSheet from 'react-native-raw-bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../../../app/components/Button/Button';
import ToggleStyle5 from '../../../../app/components/Toggles/ToggleStyle5';
import themeContext from '../../../../app/constants/themeContext';


const profileData = [
    {
        id:"0",
        title:"Dark Mode"
    },
    {
        id:"1",
        title:"Notifications"
    },
    {
        id:"2",
        title:"Language",
        subtitle:"English - (US)",
    },
    {
        id:"3",
        title:"Location"
    },
    {
        id:"4",
        title:"Terms of Service"
    },
    {
        id:"5",
        title:"Privacy Policy"
    },
]

const basicsData = [
    {
        icon :IMAGES.rulercombined,
        title : "160 cm",
    },
    {
        icon :IMAGES.gym,
        title : "Active",
    },
    {
        icon :IMAGES.graduationcap,
        title : "In College",
    },
    {
        icon :IMAGES.smoking,
        title : "Smoke",
    },
    {
        icon :IMAGES.prayinghands,
        title : "Hindu",
    },
]

const interestsData = [
     {
        icon :IMAGES.dog,
        title : "Dogs",
    },
    {
        icon :IMAGES.microphonealt,
        title : "Singing",
    },
    {
        icon :IMAGES.tvretro,
        title : "Hollywood",
    },
    {
        icon :IMAGES.utensils,
        title : "Cooking",
    },
];

const languageData = [
    {
        icon :IMAGES.messages,
        title : "English",
    },
    {
        icon :IMAGES.messages,
        title : "Hindi",
    },
    {
        icon :IMAGES.messages,
        title : "French",
    },
]

const Profile = ({navigation}) => {
    
    const theme = useTheme();
    const {colors} = theme;

    const profileSheet = useRef();
    
    const {setDarkTheme,setLightTheme} = React.useContext(themeContext);

    return (
        <>
            <RBSheet
                ref={profileSheet}
                height={720}
                openDuration={100}
                closeOnDragDown={true}
                customStyles={{
                    wrapper: {
                    },
                    container:{
                        backgroundColor: colors.cardBg,
                        borderTopLeftRadius:SIZES.radius,
                        borderTopRightRadius:SIZES.radius,
                        paddingTop:20
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
                <View style={[GlobalStyleSheet.container,{paddingTop:0}]}>
                    <View style={{
                        flexDirection:'row',
                        alignItems:'center',
                        paddingBottom:15,
                        borderBottomLeftRadius:25,
                        borderBottomRightRadius:25
                    }}>
                        <Text style={{...FONTS.fontSemiBold,fontSize:20,color:colors.title,flex:1}}>My Profile</Text>
                        <TouchableOpacity
                            onPress={() => profileSheet.current.close()}
                            style={{
                                padding:5,
                            }}
                        >
                            <FeatherIcon size={24} color={colors.title} name='x'/>
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom:50}}
                    >
                        <View style={{marginTop:0}}>
                            <Image
                                style={{
                                    width:'100%',
                                    height:undefined,
                                    aspectRatio : 1 / 1.2,
                                    borderRadius:20,
                                }}
                                source={IMAGES.slderPic11}
                            />
                             <LinearGradient
                                colors={['rgba(0,0,0,0)','rgba(0,0,0,0)','rgba(0,0,0,.7)']}
                                style={{
                                    position : 'absolute',
                                    height: '100%',
                                    width:'100%',
                                    top:0,
                                    borderRadius:10,
                                    paddingHorizontal:30,
                                    paddingVertical:30,
                                    justifyContent:'flex-end',
                                }}
                            >
                                <View>
                                    <Text style={{...FONTS.fontBold,fontSize:24,color:COLORS.white}}>Jonathan Smith, 27</Text>
                                    <View style={{flexDirection:'row',alignItems:'center',gap:10,marginTop:5}}>
                                        <Image
                                            style={{height:15,width:12}}
                                            source={IMAGES.pin2}
                                        />
                                        <Text style={{...FONTS.fontMedium,fontSize:16,color:COLORS.white}}>Bali, Indonesia</Text>
                                    </View>
                                </View>
                            </LinearGradient>
                        </View>
                        <View style={{marginTop:20}}>
                            <Text style={{...FONTS.fontSemiBold,fontSize:18,color:theme.dark ? colors.title :'#141414',marginBottom:10}}>About Me</Text>
                            <Text style={{...FONTS.font,color:'#666666',fontSize:16,lineHeight:18,marginBottom:15,paddingRight:50}}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</Text>
                            <Text style={{...FONTS.fontSemiBold,fontSize:18,color:theme.dark ? colors.title :'#141414',marginBottom:10}}>My basics</Text>
                            <View
                                style={{
                                    flexDirection:'row',
                                    flexWrap:'wrap',
                                    marginBottom:8,
                                }}
                            >
                                {basicsData.map((data,index) => {
                                    return(
                                        <TouchableOpacity
                                            key={index}
                                            style={{
                                                backgroundColor:'#FFF8DE',
                                                marginRight:8,
                                                marginBottom:8,
                                                flexDirection:'row',
                                                alignItems:'center',
                                                borderRadius:30,
                                                paddingHorizontal:15,
                                                paddingVertical:5,
                                            }}
                                        >
                                            <Image
                                                style={{height:14,width:14,resizeMode:'contain',marginRight:6}}
                                                source={data.icon}
                                            />
                                            <Text style={{...FONTS.fontMedium,fontSize:14,color:'#141414',top:-1}}>{data.title}</Text>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                            <Text style={{...FONTS.fontSemiBold,fontSize:18,color:theme.dark ? colors.title :'#141414',marginBottom:10}}>My interests</Text>
                            <View
                                style={{
                                    flexDirection:'row',
                                    flexWrap:'wrap',
                                    marginBottom:8,
                                }}
                            >
                                {interestsData.map((data,index) => {
                                    return(
                                        <TouchableOpacity
                                            key={index}
                                            style={{
                                                backgroundColor:'#FFF8DE',
                                                marginRight:8,
                                                marginBottom:8,
                                                flexDirection:'row',
                                                alignItems:'center',
                                                borderRadius:30,
                                                paddingHorizontal:15,
                                                paddingVertical:5,
                                            }}
                                        >
                                            <Image
                                                style={{height:14,width:14,resizeMode:'contain',marginRight:6}}
                                                source={data.icon}
                                            />
                                            <Text style={{...FONTS.fontMedium,fontSize:14,color:'#141414',top:-1}}>{data.title}</Text>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                            <Text style={{...FONTS.fontSemiBold,fontSize:18,color:theme.dark ? colors.title :'#141414',marginBottom:10}}>Languages</Text>
                            <View
                                style={{
                                    flexDirection:'row',
                                    flexWrap:'wrap',
                                    marginBottom:8,
                                }}
                            >
                                {languageData.map((data,index) => {
                                    return(
                                        <TouchableOpacity
                                            key={index}
                                            style={{
                                                backgroundColor:'#FFF8DE',
                                                marginRight:8,
                                                marginBottom:8,
                                                flexDirection:'row',
                                                alignItems:'center',
                                                borderRadius:30,
                                                paddingHorizontal:15,
                                                paddingVertical:5,
                                            }}
                                        >
                                            <Image
                                                style={{height:14,width:14,resizeMode:'contain',marginRight:6}}
                                                source={data.icon}
                                            />
                                            <Text style={{...FONTS.fontMedium,fontSize:14,color:'#141414',top:-1}}>{data.title}</Text>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        </View>
                        <View style={{marginTop:5}}>
                            <Image
                                style={{
                                    width:'100%',
                                    height:undefined,
                                    aspectRatio : 1 / .8,
                                    borderRadius:10,
                                    marginBottom:10
                                }}
                                source={IMAGES.slderPic8}
                            />
                            <Image
                                style={{
                                    width:'100%',
                                    height:undefined,
                                    aspectRatio : 1 / .8,
                                    borderRadius:10,
                                }}
                                source={IMAGES.slderPic9}
                            />
                        </View>
                        <View style={{paddingVertical:25}}>
                            <Text style={{...FONTS.fontSemiBold,fontSize:18,color:theme.dark ? colors.title :'#141414',marginBottom:5}}>My location</Text>
                            <Text style={{...FONTS.font,fontSize:16,color:'#666666'}}>Melbourne, Australia</Text>
                        </View>
                        <View>
                            <Button
                                title={'Edit Profile'}
                                btnRounded
                                fontSize
                                textColor={'#141414'}
                                color={COLORS.primary4}
                                onPress={() => profileSheet.current.close()} 
                            />
                        </View>
                    </ScrollView>
                </View>
            </RBSheet>
            <SafeAreaView style={{flex:1,backgroundColor:colors.background}}>
                <ScrollView>
                    <View
                        style={[styles.profileArea,{
                            backgroundColor:colors.background,  
                        }]}
                    >
                        <View>
                            <TouchableOpacity
                                activeOpacity={0.8} 
                                style={{
                                    flexDirection:'row',
                                    alignItems:'center',
                                    gap:5,
                                    marginTop:15,
                                    justifyContent:'flex-end'
                                }}
                            >
                                <FontAwesome5 color={theme.dark ? colors.title :'#141414'} size={14} name={'pen'}/>
                                <Text style={{...FONTS.font,fontSize:16,color:theme.dark ? colors.title :'#141414',top:1}}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                                justifyContent:'center',
                                marginBottom:25,
                                marginTop:20
                            }}
                        >
                            <View
                                style={{
                                    alignItems:'center',
                                    justifyContent:'center',
                                }}
                            >
                                <View
                                    style={{transform:[{rotate : '180deg'}]}}
                                >
                                    <Progress.Circle 
                                        borderWidth={0}
                                        unfilledColor={'#F5F5F5'}
                                        color={'#F75B48'}
                                        progress={0.6} 
                                        size={190} 
                                        thickness={8}
                                        strokeCap={'round'}
                                    />
                                </View>
                                <Image
                                    style={{
                                        height:160,
                                        width:160,
                                        borderRadius:100,
                                        position:'absolute',
                                    }}
                                    source={IMAGES.userPic19}
                                />
                                <View
                                    style={[styles.profileProgress,{
                                        borderColor:colors.cardBg,
                                    }]}
                                >
                                    <Text style={{...FONTS.fontMedium,fontSize:16,color:COLORS.title}}>65%</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <Text style={{...FONTS.fontBold,fontSize:24,color:theme.dark ? colors.title :'#141414',lineHeight:28}}>Jonathan Smith, 27</Text>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => profileSheet.current.open()}
                                style={{
                                    backgroundColor:'#F5F5F5',
                                    borderRadius:30,
                                    paddingHorizontal:15,
                                    paddingVertical:5,
                                    marginTop:5
                                }}
                            >
                                <Text style={{...FONTS.fontMedium,fontSize:14,color:'#141414'}}>Complete Profile</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[GlobalStyleSheet.container]}>
                        <View>
                            {profileData.map((data,index) => {
                                return(
                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                        key={index}
                                        style={{
                                            height:45,
                                            borderRadius:30,
                                            borderWidth:1,
                                            borderColor:'#CECECE',
                                            marginBottom:10,
                                            paddingHorizontal:20,
                                            alignItems:'center',
                                            flexDirection:'row',
                                            justifyContent:'space-between'
                                        }}
                                    >
                                        <Text style={{...FONTS.fontMedium,fontSize:16,color:theme.dark ? colors.title :'#141414'}}>{data.title} <Text style={{...FONTS.font,fontSize:14,color:'#999999'}}>{data.subtitle}</Text></Text>
                                        {data.id === '0' ? 
                                            <ToggleStyle5
                                                active={theme.dark}
                                                onToggle={(value) => {
                                                    if(value){
                                                        setLightTheme();
                                                    }else{
                                                        setDarkTheme();
                                                    }
                                                }}
                                            />
                                        :
                                             <FeatherIcon color={theme.dark ? colors.title :'#141414'} size={20}  name={'chevron-right'}/>
                                        }
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between',gap:10,paddingHorizontal:10,paddingLeft:5,marginTop:5}}>
                            <View style={{width:'50%'}}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('OnBoarding')}
                                    activeOpacity={0.5}
                                    style={{
                                        width:'100%',
                                        borderRadius:40,
                                        backgroundColor:'#F5F5F5',
                                        height:45,
                                        alignItems:'center',
                                        justifyContent:'center'
                                    }}
                                >
                                    <Text style={{...FONTS.fontMedium,fontSize:16,color:'#141414'}}>Delete Account</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{width:'50%'}}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('OnBoarding')}
                                    activeOpacity={0.5}
                                    style={{
                                        width:'100%',
                                        borderRadius:40,
                                        //backgroundColor:'#F5F5F5',
                                        borderWidth:1,
                                        borderColor:COLORS.danger,
                                        height:45,
                                        alignItems:'center',
                                        justifyContent:'center'
                                    }}
                                >
                                    <Text style={{...FONTS.fontSemiBold,fontSize:16,color:COLORS.danger}}>Logout</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    headerArea : {
        flexDirection:'row',
        paddingTop:15,
        paddingBottom:20,
        alignItems:'center',
        justifyContent:'space-between',
    },
    actionBtn : {
        height:50,
        width:50,
        borderRadius:50,
        backgroundColor:COLORS.primayLight,
        alignItems:'center',
        justifyContent:'center',
    },
    profileArea : {
        paddingBottom:20,
        paddingHorizontal:15,
    },
    profileProgress : {
        position:'absolute',
        bottom:-5,
        backgroundColor:COLORS.primary4,
        paddingHorizontal:17,
        paddingVertical:2,
        borderRadius:30,
        borderWidth:2,
    },
    priceListItem:{
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:8,
    }
})

export default Profile;