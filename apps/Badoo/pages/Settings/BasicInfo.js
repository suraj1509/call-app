import React, { useRef, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from '../../../../app/layout/Header';
import { GlobalStyleSheet } from '../../../../app/constants/StyleSheet';
import { COLORS, FONTS, IMAGES, SIZES } from '../../../../app/constants/theme';
import RBSheet from 'react-native-raw-bottom-sheet';
import Button from '../../../../app/components/Button/Button';
import CustomInput from '../../../../app/components/Input/CustomInput';
import CheckList from '../components/CheckList';

const BasicInfo = () => {

    const {colors} = useTheme();
    const refRBSheet = useRef();

    const [activeSheet , setActiveSheet] = useState('');

    const [datePicker, setDatePicker] = useState(false);
    const [date, setDate] = useState(new Date());
    const [birthDate, setBirthDate] = useState(true);

    const genderData= ["Women" , "Men", "Other"];
    const [activeGender , setGender] = useState(genderData[1]);

    function onDateSelected(event, value) {
        setDate(value);
        setDatePicker(false);
        setBirthDate(true);
    };

    return (
        <SafeAreaView
            style={{
                flex:1,
                backgroundColor:colors.cardBg,
            }}
        >
            {datePicker && (
                <DateTimePicker
                    value={date}
                    mode={'date'}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    is24Hour={true}
                    onChange={onDateSelected}
                />
            )}

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
                {activeSheet === "name" ?
                <View
                    style={{
                        paddingHorizontal:15,
                        paddingVertical:15
                    }}
                >
                    <Text style={[FONTS.h6,{color:colors.title,marginBottom:12}]}>Change your name</Text>
                    <View
                        style={{
                            marginBottom:18,
                        }}
                    >
                        <CustomInput
                            icon={<Image style={{height:18,width:18,tintColor:colors.textLight}} source={IMAGES.user}/>}
                            value={'Richard'}
                        />
                    </View>
                    <Button 
                        onPress={() => refRBSheet.current.close()}
                        btnRounded 
                        color={COLORS.primary3} 
                        title={'Save'}
                    />
                </View>
                :
                activeSheet === "birthday" ?
                <View
                    style={{
                        paddingHorizontal:15,
                        paddingVertical:15
                    }}
                >
                    <Text style={[FONTS.h6,{color:colors.title,marginBottom:12}]}>Change birth date</Text>
                    <TouchableOpacity
                        onPress={() => setDatePicker(true)}
                        style={{
                            marginBottom:18
                        }}
                    >
                        <Image
                            source={IMAGES.calendar}
                            style={{
                                height:18,
                                width:18,
                                resizeMode:'contain',
                                tintColor:colors.textLight,
                                position:'absolute',
                                left:15,
                                top:16,
                            }}
                        />
                        <TextInput
                            style={{
                                ...FONTS.font,
                                fontSize:16,
                                color:colors.title,
                                borderWidth:1,
                                borderColor:colors.borderColor,
                                paddingHorizontal:15,
                                paddingVertical:12,
                                paddingLeft:45,
                                borderRadius:SIZES.radius,
                            }}
                            value={birthDate ?  date.getDate() +"/"+ date.getMonth() +"/"+ date.getFullYear() : ""}
                            editable={false}
                            placeholder='DD/MM/YYYY'
                            placeholderTextColor={colors.textLight}
                        />
                    </TouchableOpacity>
                    <Button 
                        onPress={() => refRBSheet.current.close()}
                        btnRounded 
                        color={COLORS.primary3} 
                        title={'Save'}
                    />
                </View>
                :
                activeSheet === "location" ?
                <View
                    style={{
                        paddingHorizontal:15,
                        paddingVertical:15
                    }}
                >
                    <Text style={[FONTS.h6,{color:colors.title,marginBottom:12}]}>Change your location</Text>
                    <View style={{marginBottom:18}}>
                        <CustomInput
                            icon={<Image style={{height:18,width:18,tintColor:colors.textLight}} source={IMAGES.location}/>}
                            value={'Kota'}
                        />
                    </View>
                    <Button 
                        onPress={() => refRBSheet.current.close()}
                        btnRounded 
                        color={COLORS.primary3} 
                        title={'Save'}
                    />
                </View>
                :
                activeSheet === "gender" ?
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
                :
                null
                }
            </RBSheet>

            <Header
                titleLeft
                leftIcon={'back'}
                title={'Basic Info'}
            />
            <ScrollView>
                <View style={GlobalStyleSheet.container}>
                    <TouchableOpacity
                        onPress={() => {setActiveSheet('name');refRBSheet.current.open()}}
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            borderBottomWidth:1,
                            borderBlockColor:colors.borderColor,
                            paddingVertical:15,
                        }}
                    >
                        <Image
                            style={{
                                height:18,
                                width:18,
                                resizeMode:'contain',
                                tintColor:colors.textLight,
                                marginRight:12,
                            }}
                            source={IMAGES.user}
                        />
                        <Text style={{...FONTS.h6,...FONTS.fontSemiBold,color:colors.title,flex:1}}>Name</Text>
                        <Text style={{...FONTS.font,fontSize:15,color:colors.text,marginRight:10}}>Richard</Text>
                        <FeatherIcon color={colors.title} size={20} name="chevron-right"/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {setActiveSheet('birthday');refRBSheet.current.open()}}
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            borderBottomWidth:1,
                            borderBlockColor:colors.borderColor,
                            paddingVertical:15,
                        }}
                    >
                        <Image
                            style={{
                                height:18,
                                width:18,
                                resizeMode:'contain',
                                tintColor:colors.textLight,
                                marginRight:12,
                            }}
                            source={IMAGES.calendar}
                        />
                        <Text style={{...FONTS.h6,...FONTS.fontSemiBold,color:colors.title,flex:1}}>Birth Date</Text>
                        <Text style={{...FONTS.font,fontSize:15,color:colors.text,marginRight:10}}>11/07/2002</Text>
                        <FeatherIcon color={colors.title} size={20} name="chevron-right"/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {setActiveSheet('gender');refRBSheet.current.open()}}
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            borderBottomWidth:1,
                            borderBlockColor:colors.borderColor,
                            paddingVertical:15,
                        }}
                    >
                        <Image
                            style={{
                                height:18,
                                width:18,
                                resizeMode:'contain',
                                tintColor:colors.textLight,
                                marginRight:12,
                            }}
                            source={IMAGES.genders}
                        />
                        <Text style={{...FONTS.h6,...FONTS.fontSemiBold,color:colors.title,flex:1}}>Gender</Text>
                        <Text style={{...FONTS.font,fontSize:15,color:colors.text,marginRight:10}}>Male</Text>
                        <FeatherIcon color={colors.title} size={20} name="chevron-right"/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {setActiveSheet('location');refRBSheet.current.open()}}
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            borderBottomWidth:1,
                            borderBlockColor:colors.borderColor,
                            paddingVertical:15,
                        }}
                    >
                        <Image
                            style={{
                                height:18,
                                width:18,
                                resizeMode:'contain',
                                tintColor:colors.textLight,
                                marginRight:12,
                            }}
                            source={IMAGES.location}
                        />
                        <Text style={{...FONTS.h6,...FONTS.fontSemiBold,color:colors.title,flex:1}}>Location</Text>
                        <Text style={{...FONTS.font,fontSize:15,color:colors.text,marginRight:10}}>Kota</Text>
                        <FeatherIcon color={colors.title} size={20} name="chevron-right"/>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default BasicInfo;