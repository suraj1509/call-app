import React, { useRef, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import RBSheet from 'react-native-raw-bottom-sheet';
import { List } from 'react-native-paper';
// import DropShadow from 'react-native-shadow-2';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../../../app/layout/Header';
import { GlobalStyleSheet } from '../../../../app/constants/StyleSheet';
import { COLORS, FONTS, IMAGES, SIZES } from '../../../../app/constants/theme';
import PhoneNumberSheet from '../components/PhoneNumberSheet';
import EmailSheet from '../components/EmailSheet';
import LocationSheet from '../components/LocationSheet';
import GenderSheet from '../components/GenderSheet';
import SuperLikeSheet from '../components/SuperLikeSheet';

const Settings = ({navigation}) => {

    const {colors} = useTheme();
    const theme = useTheme();

    const superLikeSheet = useRef();
    const settingSheet = useRef();
    const genderSheet = useRef();
    const [sheetType , setSettingSheet] = useState();
    const [ageValue , setAgeValue] = useState([18 , 30]);
    const [distanceVal , setDistanceVal] = useState([30]);
    
    return (
        <>
            <SuperLikeSheet sheetRef={superLikeSheet}/>
            <RBSheet
                ref={settingSheet}
                height={240}
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
                {sheetType == "phoneNumber" ? <PhoneNumberSheet/> :
                sheetType == "email" ? <EmailSheet/> :
                sheetType == "location" ? <LocationSheet/> :
                <></>
                }
            </RBSheet>
            <RBSheet
                ref={genderSheet}
                height={320}
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
                <GenderSheet/>
            </RBSheet>

            <SafeAreaView
                style={{
                    flex:1,
                    backgroundColor:colors.background,
                }}
            >
                <Header
                    leftIcon={'back'}
                    titleLeft
                    title={'Settings'}
                />
                <ScrollView>
                    <View style={GlobalStyleSheet.container}>

                        <View style={[GlobalStyleSheet.row,{marginBottom:30}]}>
                            <View style={GlobalStyleSheet.col100}>
                                <View
                                    style={{
                                        backgroundColor:colors.cardBg,
                                        ...GlobalStyleSheet.shadow,
                                        marginBottom:10,
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Subscriptions',{activeSlide : 1})}
                                        style={{
                                            paddingHorizontal:20,
                                            paddingVertical:15,
                                            backgroundColor:colors.cardBg,
                                            borderRadius:4,
                                            alignItems:'center',
                                        }}
                                    >
                                        <View style={{
                                            marginBottom:12,
                                            flexDirection:'row',
                                            alignItems:'center',
                                        }}>
                                            <Image
                                                source={IMAGES.tinder}
                                                style={{
                                                    height:25,
                                                    width:115,
                                                    resizeMode:'contain',
                                                }}
                                            />
                                            <LinearGradient
                                                colors={["#e89e44","#f0cc6e"]}
                                                style={{
                                                    borderRadius:20,
                                                    paddingHorizontal:6,
                                                    paddingVertical:3,
                                                    top: 3,
                                                    marginLeft:6,
                                                }}
                                            >
                                                <Text style={{...FONTS.fontXs,color:COLORS.white,...FONTS.fontBold,top:2}}>GOLD</Text>
                                            </LinearGradient>
                                        </View>
                                        <Text style={{...FONTS.font,fontSize:16,textAlign:'center',color:colors.text}}>Unlock Our Most Exclusive Features</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={GlobalStyleSheet.col100}>
                                <View
                                    style={{
                                        backgroundColor:colors.cardBg,
                                        ...GlobalStyleSheet.shadow,
                                        marginBottom:10,
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Subscriptions',{activeSlide : 0})}
                                        style={{
                                            paddingHorizontal:20,
                                            paddingVertical:15,
                                            backgroundColor:colors.cardBg,
                                            borderRadius:4,
                                            alignItems:'center',
                                        }}
                                    >
                                        <View style={{
                                            marginBottom:12,
                                            flexDirection:'row',
                                            alignItems:'center',
                                        }}>
                                            <Image
                                                source={theme.dark ? IMAGES.tinder : IMAGES.tinder2}
                                                style={{
                                                    height:25,
                                                    width:115,
                                                    resizeMode:'contain',
                                                }}
                                            />
                                            <LinearGradient
                                                colors={["#ea3d85","#ff864e"]}
                                                style={{
                                                    borderRadius:20,
                                                    paddingHorizontal:6,
                                                    paddingVertical:3,
                                                    top: 3,
                                                    marginLeft:6,
                                                }}
                                            >
                                                <Text style={{...FONTS.fontXs,color:COLORS.white,...FONTS.fontBold,top:2}}>PLUS</Text>
                                            </LinearGradient>
                                        </View>
                                        <Text style={{...FONTS.font,fontSize:16,textAlign:'center',color:colors.text}}>Unlock Our Most Exclusive Features</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={GlobalStyleSheet.col50}>
                                <View
                                    style={{
                                        backgroundColor:colors.cardBg,
                                        ...GlobalStyleSheet.shadow,
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => superLikeSheet.current.open()}
                                        activeOpacity={.8}
                                        style={{
                                            alignItems:'center',
                                            paddingHorizontal:10,
                                            paddingVertical:15,
                                            backgroundColor:colors.cardBg,
                                            borderRadius:4,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                tintColor:COLORS.info,
                                                height:28,
                                                width:28,
                                                marginTop:5,
                                                marginBottom:7,
                                            }}
                                            source={IMAGES.star}
                                        />
                                        <Text style={{...FONTS.font,fontSize:16,color:colors.title}}>Get Super Likes</Text>
                                        <View
                                            style={{
                                                height:30,
                                                width:30,
                                                borderWidth:2,
                                                borderRadius:30,
                                                borderColor:colors.borderColor,
                                                alignItems:'center',
                                                justifyContent:'center',
                                                borderStyle:'dotted',
                                                marginTop:15,
                                                marginBottom:-28,
                                                backgroundColor:colors.cardBg,
                                            }}
                                        >
                                            <FeatherIcon
                                                size={18}
                                                color={colors.text}
                                                name={'plus'}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={GlobalStyleSheet.col50}>
                                <View
                                    style={{
                                        backgroundColor:colors.cardBg,
                                        ...GlobalStyleSheet.shadow,
                                    }}
                                >
                                    <TouchableOpacity
                                        activeOpacity={.8}
                                        style={{
                                            alignItems:'center',
                                            paddingHorizontal:10,
                                            paddingVertical:15,
                                            backgroundColor:colors.cardBg,
                                            borderRadius:4,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                tintColor:COLORS.primary2,
                                                height:24,
                                                width:24,
                                                marginTop:7,
                                                marginBottom:10,
                                            }}
                                            source={IMAGES.shuttle}
                                        />
                                        <Text style={{...FONTS.font,fontSize:16,color:colors.title}}>Get Boosts</Text>
                                        <View
                                            style={{
                                                height:30,
                                                width:30,
                                                borderWidth:2,
                                                borderRadius:30,
                                                borderColor:colors.borderColor,
                                                alignItems:'center',
                                                justifyContent:'center',
                                                borderStyle:'dotted',
                                                marginTop:15,
                                                marginBottom:-28,
                                                backgroundColor:colors.cardBg,
                                            }}
                                        >
                                            <FeatherIcon
                                                size={18}
                                                color={colors.text}
                                                name={'plus'}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <Text style={{...FONTS.h6,color:colors.title,marginBottom:8}}>Account Setting</Text>
                        
                            <View
                                style={[styles.card,GlobalStyleSheet.shadow,{
                                    backgroundColor:colors.cardBg,
                                }]}
                            >
                                <Text style={{
                                    ...FONTS.h6,
                                    color:colors.title,
                                    paddingBottom:8,
                                    marginBottom:5,
                                    borderBottomWidth:1,
                                    borderBottomColor:colors.borderColor,
                                }}>Phone Number</Text>
                                <List.Item
                                    onPress={() => {setSettingSheet('phoneNumber'); settingSheet.current.open()}}
                                    style={{
                                        marginHorizontal:-15,
                                    }}
                                    right={() => <FeatherIcon size={18} color={colors.text} name='chevron-right'/>}
                                    left={() => <FeatherIcon style={{marginLeft:12,left:5}} size={18} color={colors.textLight} name='phone-call'/>}
                                    titleStyle={{...FONTS.font,fontSize:16,color:colors.text}}
                                    title={'+00 0540 4705'}
                                />
                            </View>
                            
                            <View
                                style={[styles.card,GlobalStyleSheet.shadow,{
                                    backgroundColor:colors.cardBg,
                                }]}
                            >
                                <Text style={{
                                    ...FONTS.h6,
                                    color:colors.title,
                                    paddingBottom:8,
                                    marginBottom:5,
                                    borderBottomWidth:1,
                                    borderBottomColor:colors.borderColor,
                                }}>Email Address</Text>
                                <List.Item
                                    onPress={() => {setSettingSheet('email'); settingSheet.current.open()}}
                                    style={{
                                        marginHorizontal:-15,
                                    }}
                                    right={() => <FeatherIcon size={18} color={colors.text} name='chevron-right'/>}
                                    left={() => <FeatherIcon style={{marginLeft:12,left:5}} size={18} color={colors.textLight} name='mail'/>}
                                    titleStyle={{...FONTS.font,fontSize:16,color:colors.text}}
                                    title={'yourname@gmail.com'}
                                />
                            </View>
                        <Text style={{...FONTS.h6,color:colors.title,marginBottom:8,marginTop:10}}>Discovery Setting</Text>
                        
                            <View
                                style={[styles.card,GlobalStyleSheet.shadow,{
                                    backgroundColor:colors.cardBg,
                                }]}
                            >
                                <Text style={{
                                    ...FONTS.h6,
                                    color:colors.title,
                                    paddingBottom:8,
                                    marginBottom:5,
                                    borderBottomWidth:1,
                                    borderBottomColor:colors.borderColor,
                                }}>Location</Text>
                                <List.Item
                                    onPress={() => {setSettingSheet('location'); settingSheet.current.open()}}
                                    style={{
                                        marginHorizontal:-15,
                                    }}
                                    right={() => <FeatherIcon size={18} color={colors.text} name='chevron-right'/>}
                                    left={() => <FeatherIcon style={{marginLeft:12,left:5}} size={18} color={colors.textLight} name='map-pin'/>}
                                    titleStyle={{...FONTS.font,fontSize:16,color:colors.text}}
                                    title={'2300 Traverwood Dr.Ann Arbor, MI 48105 United States'}
                                />
                            </View>
                        <Text style={{...FONTS.h6,color:colors.title,marginBottom:8,marginTop:10}}>Other</Text>
                        
                            <View
                                style={[styles.card,GlobalStyleSheet.shadow,{
                                    backgroundColor:colors.cardBg,
                                }]}
                            >
                                <View
                                    style={{
                                        paddingBottom:8,
                                        marginBottom:5,
                                        borderBottomWidth:1,
                                        borderBottomColor:colors.borderColor,
                                        flexDirection:'row',
                                        justifyContent:'space-between',
                                        alignItems:'center',
                                    }}
                                >
                                    <Text style={{
                                        ...FONTS.h6,
                                        color:colors.title,
                                        
                                    }}>Maximum Distance</Text>
                                    <Text style={{...FONTS.h6,color:colors.title}}>{distanceVal[0]}ml</Text>
                                </View>
                                <MultiSlider
                                    trackStyle={{height:3,borderRadius:2,backgroundColor:'rgba(142,165,200,.3)'}}
                                    selectedStyle={{
                                        backgroundColor:COLORS.primary2,
                                    }}
                                    values={distanceVal}
                                    markerStyle={{
                                        backgroundColor:COLORS.primary2,
                                        top:1,
                                        height:18,
                                        width:18,
                                    }}
                                    onValuesChange={(val) => setDistanceVal(val)}
                                    sliderLength={SIZES.width - 60}
                                    min={1}
                                    max={100}
                                />
                            </View>
                            <View
                                style={[styles.card,GlobalStyleSheet.shadow,{
                                    backgroundColor:colors.cardBg,
                                }]}
                            >
                                <Text style={{
                                    ...FONTS.h6,
                                    color:colors.title,
                                    paddingBottom:8,
                                    marginBottom:5,
                                    borderBottomWidth:1,
                                    borderBottomColor:colors.borderColor,
                                }}>Show Me</Text>
                                <List.Item
                                    onPress={() => {genderSheet.current.open()}}
                                    style={{
                                        marginHorizontal:-15,
                                    }}
                                    right={() => <FeatherIcon size={18} color={colors.text} name='chevron-right'/>}
                                    titleStyle={{...FONTS.font,fontSize:16,color:colors.text}}
                                    title={'Women'}
                                />
                            </View>
                            <View
                                style={[styles.card,GlobalStyleSheet.shadow,{
                                    backgroundColor:colors.cardBg,
                                }]}
                            >
                                <View
                                    style={{
                                        paddingBottom:8,
                                        marginBottom:5,
                                        borderBottomWidth:1,
                                        borderBottomColor:colors.borderColor,
                                        flexDirection:'row',
                                        justifyContent:'space-between',
                                        alignItems:'center',
                                    }}
                                >
                                    <Text style={{
                                        ...FONTS.h6,
                                        color:colors.title,
                                        
                                    }}>Age Range</Text>
                                    <Text style={{...FONTS.h6,color:colors.title}}>{ageValue[0]}-{ageValue[1]}</Text>
                                </View>
                                <MultiSlider
                                    trackStyle={{height:3,borderRadius:2,backgroundColor:'rgba(142,165,200,.3)'}}
                                    selectedStyle={{
                                        backgroundColor:COLORS.primary2,
                                    }}
                                    values={ageValue}
                                    markerStyle={{
                                        backgroundColor:COLORS.primary2,
                                        top:1,
                                        height:18,
                                        width:18,
                                    }}
                                    onValuesChange={(val) => setAgeValue(val)}
                                    sliderLength={SIZES.width - 60}
                                    min={18}
                                    max={100}
                                />
                            </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    card : {
        paddingHorizontal:15,
        marginBottom:12,
        paddingTop:15,
        paddingBottom:6,
        borderRadius:4,
    }
})

export default Settings;