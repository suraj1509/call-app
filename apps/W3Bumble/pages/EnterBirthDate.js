import React, { useState } from 'react';
import {  SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { GlobalStyleSheet } from '../../../app/constants/StyleSheet';
import { COLORS, FONTS, SIZES } from '../../../app/constants/theme';
import Button from '../../../app/components/Button/Button';

const EnterBirthDate = ({navigation}) => {

    const theme = useTheme();
    const {colors} = theme;

    const [datePicker, setDatePicker] = useState(false);
    const [date, setDate] = useState(new Date());
    const [birthDate, setBirthDate] = useState(false);

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

            <View style={{flex:1}}>
                <ScrollView>
                    <View style={GlobalStyleSheet.container}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{
                                height:48,
                                width:48,
                                borderRadius:48,
                                backgroundColor:'#FFEDB3',
                                alignItems:'center',
                                justifyContent:'center',
                                marginBottom:15,
                            }}
                        >
                            <FeatherIcon size={26} color={'#141414'} name={'arrow-left'}/>
                        </TouchableOpacity>
                        <Text style={{...FONTS.fontBold,fontSize:28,color:theme.dark ? colors.title :'#141414',marginBottom:15}}>Enter your Birth Date ?</Text>
                        
                        <View style={[styles.inputStyle,{borderColor:theme.dark ? colors.title :'#141414',}]}>
                            <TextInput
                                style={{
                                    ...FONTS.fontSemiBold,
                                    fontSize:18,
                                    color:colors.title,
                                    flex:1,
                                    top:0,
                                    paddingVertical:0,
                                    paddingLeft:10,
                                }}
                                autoFocus
                                value={birthDate ?  date.getDate() +"/"+ date.getMonth() +"/"+ date.getFullYear() : ""}
                                editable={false}
                                placeholder='DD/MM/YYYY'
                                placeholderTextColor={theme.dark ? colors.title :'#141414'}
                            />
                             <TouchableOpacity
                                onPress={() => setDatePicker(true)}
                                style={{
                                    position:'absolute',
                                    top:0,
                                    left:0,
                                    bottom:0,
                                    right:0,
                                }}
                            >
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <View
                style={{
                    paddingHorizontal:35,
                    paddingBottom:20
                }}
            >
                <Button
                    title={'Next'}
                    onPress={() => navigation.navigate('YourGender')}
                    btnRounded
                    fontSize
                    textColor={'#141414'}
                    color={COLORS.primary4} 
                />
            </View>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({

    inputStyle:{
        height:55,
        padding:5,
        paddingHorizontal:15,
        borderWidth : 1,
        borderBottomWidth:3,
        borderRadius: SIZES.radius,
        marginBottom:15,
        flexDirection:'row',
        alignItems:'center',
        borderColor:'#141414'
       // backgroundColor:'green'
        //backgroundColor:'rgba(255,255,255,.05)',
    },
    
})


export default EnterBirthDate;