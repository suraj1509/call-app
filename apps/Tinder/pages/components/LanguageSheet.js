import React from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS } from '../../../../app/constants/theme';
import LinearGradient from 'react-native-linear-gradient';

const LanguageSheet = ({sheetRef}) => {

    const {colors} = useTheme();
    
    const languageData = [
        {
            title : "English",
        },
        {
            title : "Hindi",
        },
    ]

    const tags = ["English", "Hindi", "Spanish", "Chinese","German","Urdu", "British","Japanese","Turkish","Gujarati","Italian",
"Kannada","Panjabi","Arabic","Nepali","Greek","Tatar","Hungarian","Somali","Madura","Thai"];

    return (
        <RBSheet
            ref={sheetRef}
            height={460}
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
            <View style={{
                paddingHorizontal:15,
                borderBottomWidth:1,
                borderColor:colors.borderColor,
                paddingVertical:10,
                flexDirection:'row',
                alignItems:'center',
            }}>
                <Text style={{...FONTS.h5,color:colors.title,flex:1}}>Language I know</Text>
                <TouchableOpacity
                    onPress={() => sheetRef.current.close()}
                    style={{
                        padding:5,
                    }}
                >
                    <FeatherIcon size={24} color={colors.title} name='x'/>
                </TouchableOpacity>
            </View>
            <View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    <View
                        style={{
                            flexDirection:'row',
                            flexWrap:'wrap',
                            marginTop:12,
                            paddingHorizontal:15,
                        }}
                    >
                        {languageData.map((data,index) => {
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
                                        <Text style={{...FONTS.font,color:COLORS.white,fontSize:15}}>{data.title}</Text>
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
                    paddingHorizontal:15,
                    paddingVertical:5,
                }}
            >
                <View>
                    <TextInput
                        style={{
                            backgroundColor:colors.bgLight,
                            borderRadius:30,
                            paddingLeft:45,
                            paddingRight:15,
                            height:38,
                            paddingVertical:6,
                        }}
                        placeholder='Search...'
                        placeholderTextColor={colors.textLight}
                    />
                    <FeatherIcon 
                        style={{
                            position:'absolute',
                            left:15,
                            top:10,
                        }}
                        name='search' size={18} color={colors.textLight}/>
                </View>
            </View>
            <TouchableOpacity
                activeOpacity={1}
                style={{
                    flex:1,
                }}
            >   
                <ScrollView>
                    <View
                        style={{
                            flexDirection:'row',
                            flexWrap:'wrap',
                            paddingHorizontal:15,
                            paddingVertical:10,
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
                </ScrollView>
            </TouchableOpacity>
        </RBSheet>
    );
};

export default LanguageSheet;