import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { GlobalStyleSheet } from '../../../../app/constants/StyleSheet';
import { IMAGES, FONTS, SIZES, COLORS } from '../../../../app/constants/theme';
import { IconButton } from 'react-native-paper';
import MainSlider from '../components/MainSlider';
import RBSheet from 'react-native-raw-bottom-sheet';
import Button from '../../../../app/components/Button/Button';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import CheckList from '../components/CheckList';

const genderData= ["Women" , "Men", "Other"];

const Encounters = ({navigation}) => {

    const {colors} = useTheme();
    const refRBSheet = useRef();
    const filterSheet = useRef();

    const [age, setAge] = useState([18 , 35]);
    const [distance, setDistance] = useState([20]);

    const [activeGender , setGender] = useState(genderData[1]);

    return (
        <SafeAreaView
            style={{
                flex:1,
                backgroundColor:colors.cardBg,
            }}
        >
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                height={250}
                openDuration={100}
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
                        paddingHorizontal:15,
                        paddingVertical:15,
                    }}
                >
                    {genderData.map((data,index) => {
                        return(
                            <CheckList
                                onPress={() => {setGender(data); refRBSheet.current.close()}}
                                item={data}
                                checked={data == activeGender ? true : false}
                                key={index}
                            />
                        )
                    })}
                </View>
            </RBSheet>
            <RBSheet
                ref={filterSheet}
                closeOnDragDown={true}
                height={500}
                openDuration={100}
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
                    style={GlobalStyleSheet.container}
                >
                    <View
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            borderBottomWidth:1,
                            borderBottomColor:colors.borderColor,
                            paddingBottom:12,
                            marginBottom:12,
                        }}
                    >
                        <Text style={[FONTS.h4,{color:colors.title,flex:1}]}>Filter</Text>
                        <TouchableOpacity
                            onPress={() => filterSheet.current.close()}
                            style={{
                                padding:12,
                                backgroundColor:colors.bgLight,
                                borderRadius:30,
                            }}
                        >
                            <Image
                                style={{
                                    height:14,
                                    width:14,
                                    resizeMode:'contain',
                                    tintColor:colors.title,
                                }}
                                source={IMAGES.close}
                            />
                        </TouchableOpacity>
                    </View>
                    
                    <Text style={[FONTS.h6,FONTS.fontSemiBold,{color:colors.text,marginBottom:8}]}>Show me</Text>
                    
                    <TouchableOpacity
                        onPress={() => refRBSheet.current.open()}
                        activeOpacity={.8}
                        style={{
                            flexDirection:'row',
                            backgroundColor:colors.bgLight,
                            height:48,
                            marginBottom:18,
                            borderRadius:SIZES.radius,
                            alignItems:'center',
                            paddingHorizontal:15,
                        }}
                    >
                        <Text style={[FONTS.h6,FONTS.fontSemiBold,{color:colors.title,flex:1,bottom:2}]}>{activeGender}</Text>
                        <FeatherIcon color={colors.title} size={24} name="chevron-down"/>
                    </TouchableOpacity>

                    <View
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                        }}
                    >
                        <Text style={[FONTS.h6,FONTS.fontSemiBold,{color:colors.text,flex:1}]}>Age</Text>
                        <Text style={[FONTS.h6,{color:colors.title}]}>{age[0]} - {age[1]}</Text>
                    </View>
                    <MultiSlider
                        trackStyle={{height:4,borderRadius:2,backgroundColor:'rgba(142,165,200,.3)'}}
                        selectedStyle={{
                            backgroundColor:COLORS.primary3,
                        }}
                        values={age}
                        markerStyle={{
                            backgroundColor:COLORS.white,
                            top:1,
                            height:16,
                            width:16,
                            borderWidth:3,
                            borderColor:COLORS.primary3,
                        }}
                        onValuesChange={(val) => setAge(val)}
                        min={18}
                        sliderLength={SIZES.width - 30}
                        max={100}
                    />
                    <View
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            marginTop:10,
                        }}
                    >
                        <Text style={[FONTS.h6,FONTS.fontSemiBold,{color:colors.text,flex:1}]}>Distance</Text>
                        <Text style={[FONTS.h6,{color:colors.title}]}>{distance[0]}km</Text>
                    </View>
                    <MultiSlider
                        trackStyle={{height:4,borderRadius:2,backgroundColor:'rgba(142,165,200,.3)'}}
                        selectedStyle={{
                            backgroundColor:COLORS.primary3,
                        }}
                        values={distance}
                        markerStyle={{
                            backgroundColor:COLORS.white,
                            top:1,
                            height:16,
                            width:16,
                            borderWidth:3,
                            borderColor:COLORS.primary3,
                        }}
                        onValuesChange={(val) => setDistance(val)}
                        min={0}
                        sliderLength={SIZES.width - 30}
                        max={100}
                    />
                    <View
                        style={{
                            marginTop:15,
                        }}
                    >
                        <Button
                            onPress={() => filterSheet.current.close()}
                            btnRounded
                            color={COLORS.primary3}
                            title={'Apply'}
                        />
                    </View>

                </View>
            </RBSheet>

            <View
                style={[GlobalStyleSheet.homeHeader,{paddingBottom:0}]}
            >
                <IconButton
                    onPress={() => navigation.openDrawer()}
                    size={28}
                    style={{
                        backgroundColor:colors.bgLight
                    }}
                    icon={() => <FeatherIcon color={colors.title} size={22} name={'grid'}/> }
                />
                <Text style={{...FONTS.h5,flex:1,textAlign:'center',color:colors.title}}>Encounters</Text>
                <IconButton
                    onPress={() => filterSheet.current.open()}
                    size={28}
                    style={{
                        backgroundColor:colors.bgLight
                    }}
                    icon={() => <Image
                        style={{
                            height:22,
                            width:22,
                            tintColor:colors.title,
                        }}
                        source={IMAGES.filter}
                    /> }
                />
            </View>
            <MainSlider navigation={navigation}/>
        </SafeAreaView>
    )
}

export default Encounters;