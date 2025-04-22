import React, { useRef, useState } from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { IconButton, List } from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { COLORS, FONTS, IMAGES, SIZES } from '../../../../app/constants/theme';
import { GlobalStyleSheet } from '../../../../app/constants/StyleSheet';
import MainSlider from '../components/MainSlider';
import GenderSheet from '../components/GenderSheet';

const Home = ({navigation}) => {

    const {colors} = useTheme();
    const filterSheet = useRef();
    const genderSheet = useRef();
    const [ageValue , setAgeValue] = useState([18 , 30]);
    const [distanceVal , setDistanceVal] = useState([30]);

    return (
        <>

            <RBSheet
                ref={filterSheet}
                height={410}
                openDuration={100}
                closeOnDragDown={true}
                customStyles={{
                    wrapper: {
                    },
                    container:{
                        backgroundColor: colors.cardBg,
                        borderTopLeftRadius:SIZES.radius,
                        borderTopRightRadius:SIZES.radius,
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
                <View style={{
                    paddingHorizontal:15,
                    borderBottomWidth:1,
                    borderColor:colors.borderColor,
                    paddingVertical:10,
                    flexDirection:'row',
                    alignItems:'center',
                }}>
                    <Text style={{...FONTS.h5,color:colors.title,flex:1}}>Discovery Settings</Text>
                    <TouchableOpacity
                        onPress={() => filterSheet.current.close()}
                        style={{
                            padding:5,
                        }}
                    >
                        <FeatherIcon size={24} color={colors.title} name='x'/>
                    </TouchableOpacity>
                </View>
                
                <View style={GlobalStyleSheet.container}>
                    <View
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'space-between',
                            marginTop:10,
                            marginBottom:-2,
                        }}
                    >
                        <Text style={{...FONTS.h6,color:colors.title}}>Maximum Distance</Text>
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
                        sliderLength={SIZES.width - 30}
                        min={1}
                        max={100}
                    />
                    
                    <Text style={{...FONTS.h6,color:colors.title,marginTop:10,marginBottom:4}}>Show Me</Text>
                    <List.Item
                        onPress={() => {genderSheet.current.open()}}
                        style={{
                            backgroundColor:colors.bgLight,
                            borderRadius:SIZES.radius,
                        }}
                        right={() => <FeatherIcon size={18} color={colors.text} name='chevron-right'/>}
                        titleStyle={{...FONTS.font,fontSize:16,color:colors.title}}
                        title={'Women'}
                    />


                    <View
                        style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                            alignItems:'center',
                            marginBottom:-2,
                            marginTop:25,
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
                        sliderLength={SIZES.width - 30}
                        min={18}
                        max={100}
                    />

                </View>

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
                <View
                    style={{
                        flexDirection:'row',
                        paddingHorizontal:15,
                        paddingVertical:2,
                        alignItems:'center',
                        marginBottom:-5,
                    }}
                >
                    <Image
                        style={{
                            width:120,
                            height:30,
                            resizeMode:'contain',
                            top:-1,
                        }}
                        source={IMAGES.tinder}
                    />
                    <View style={{flex:1,justifyContent:'flex-end',flexDirection:'row',marginRight:-8}}>
                        <IconButton
                            onPress={() => filterSheet.current.open()}
                            size={30}
                            icon={() => 
                                <Image 
                                    source={IMAGES.filter}
                                    style={{
                                        height:24,
                                        width:24,
                                        tintColor:colors.text,
                                    }}
                                />
                            }
                        />
                        <IconButton
                            onPress={() => navigation.openDrawer()}
                            size={30}
                            icon={() => 
                                <FeatherIcon size={24} color={colors.text} name='grid'/>
                            }
                        />
                    </View>
                </View>

                <MainSlider navigation={navigation}/>

            </SafeAreaView>

        </>
    );
};

export default Home;