import React, { useRef, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { GlobalStyleSheet } from '../../../../app/constants/StyleSheet';
import Header from '../../../../app/layout/Header';
import { COLORS, FONTS, IMAGES, SIZES } from '../../../../app/constants/theme';
import LinearGradient from 'react-native-linear-gradient';
import GradientBtn from '../components/GradientBtn';
import IntrestSheet from '../components/IntrestSheet';
import RBSheet from 'react-native-raw-bottom-sheet';
import RelationshipGoalsSheet from '../components/RelationshipGoalsSheet';
import SexualOrientationSheet from '../components/SexualOrientationSheet';
// import DropShadow from 'react-native-shadow-2';
import { List } from 'react-native-paper';
import LanguageSheet from '../components/LanguageSheet';

const EditProfile = () => {

    const {colors} = useTheme();

    const languageSheet = useRef();
    const profileSheet = useRef();
    const sheetRef = useRef();

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
    const [sheetType , setSheetType] = useState('');

    return (
        <>
            <IntrestSheet sheetRef={profileSheet}/>
            <LanguageSheet sheetRef={languageSheet}/>

            <RBSheet
                ref={sheetRef}
                height={480}
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
                {sheetType == "relation" ?
                    <RelationshipGoalsSheet/>
                    :
                sheetType == "orientation" ?
                    <SexualOrientationSheet/>
                    :
                    <></>
                }
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
                    title={'Edit Profile'}
                />
                <ScrollView
                    contentContainerStyle={{
                        paddingBottom:30,
                    }}
                >
                    <View style={GlobalStyleSheet.container}>
                        <View
                            style={[GlobalStyleSheet.row,{marginBottom:20}]}
                        >
                            {imageData.map((data,index) => {
                                return(
                                    <View 
                                        key={index}
                                        style={GlobalStyleSheet.col33}>
                                        <TouchableOpacity
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
                        
                        <View
                            style={{
                                marginBottom:20,
                            }}
                        >    
                            <GradientBtn
                                title={"ADD MEDIA"}
                            />
                        </View>

                        
                            <View
                                style={[styles.card,GlobalStyleSheet.shadow,{
                                    backgroundColor:colors.cardBg,
                                }]}
                            >
                                <Text style={{
                                    ...FONTS.h5,
                                    color:colors.title,
                                    paddingBottom:8,
                                    marginBottom:5,
                                    borderBottomWidth:1,
                                    borderBottomColor:colors.borderColor,
                                }}>Intrests</Text>
                                <List.Item
                                    onPress={() => {profileSheet.current.open()}}
                                    style={{
                                        marginHorizontal:-15,
                                    }}
                                    right={() => <FeatherIcon size={18} color={colors.text} name='chevron-right'/>}
                                    titleStyle={{...FONTS.font,fontSize:16,color:colors.text}}
                                    title={'Photography,Tea, Travel'}
                                />
                            </View>
                            <View
                                style={[styles.card,GlobalStyleSheet.shadow,{
                                    backgroundColor:colors.cardBg,
                                    borderColor:colors.borderColor,
                                    paddingBottom:5,
                                }]}
                            >
                                <Text style={{
                                    ...FONTS.h5,
                                    color:colors.title,
                                    paddingBottom:8,
                                    marginBottom:5,
                                    borderBottomWidth:1,
                                    borderBottomColor:colors.borderColor,
                                }}>Relationship Goals</Text>
                                <List.Item
                                    onPress={() => {setSheetType('relation');sheetRef.current.open()}}
                                    style={{
                                        marginHorizontal:-15,
                                    }}
                                    right={() => <FeatherIcon size={18} color={colors.text} name='chevron-right'/>}
                                    titleStyle={{...FONTS.font,fontSize:16,color:colors.text}}
                                    title={'Long-term partner'}
                                />
                            </View>
                            <View
                                style={[styles.card,GlobalStyleSheet.shadow,{
                                    backgroundColor:colors.cardBg,
                                }]}
                            >
                                <Text style={{
                                    ...FONTS.h5,
                                    color:colors.title,
                                    paddingBottom:8,
                                    marginBottom:5,
                                    borderBottomWidth:1,
                                    borderBottomColor:colors.borderColor,
                                }}>Language I Know</Text>
                                <List.Item
                                    onPress={() => {languageSheet.current.open()}}
                                    style={{
                                        marginHorizontal:-15,
                                    }}
                                    right={() => <FeatherIcon size={18} color={colors.text} name='chevron-right'/>}
                                    titleStyle={{...FONTS.font,fontSize:16,color:colors.text}}
                                    title={'English, Hindi'}
                                />
                            </View>
                            <View
                                style={[styles.card,GlobalStyleSheet.shadow,{
                                    backgroundColor:colors.cardBg,
                                }]}
                            >
                                <Text style={{
                                    ...FONTS.h5,
                                    color:colors.title,
                                    paddingBottom:8,
                                    marginBottom:5,
                                    borderBottomWidth:1,
                                    borderBottomColor:colors.borderColor,
                                }}>Sexual Orientation</Text>
                                <List.Item
                                    onPress={() => {setSheetType('orientation');sheetRef.current.open()}}
                                    style={{
                                        marginHorizontal:-15,
                                    }}
                                    right={() => <FeatherIcon size={18} color={colors.text} name='chevron-right'/>}
                                    titleStyle={{...FONTS.font,fontSize:16,color:colors.text}}
                                    title={'Straight'}
                                />
                            </View>
                    </View>
                </ScrollView>
            </SafeAreaView>

        </>
    );
};

const styles = StyleSheet.create({
    imageBox : {
        height: SIZES.width / 2.8,
        borderWidth:2,
        borderRadius:SIZES.radius,
        borderStyle:'dashed',
        marginBottom:10,
    },
    card : {
        paddingHorizontal:15,
        marginBottom:12,
        paddingTop:15,
        paddingBottom:6,
        borderRadius:4,
    }
})

export default EditProfile;