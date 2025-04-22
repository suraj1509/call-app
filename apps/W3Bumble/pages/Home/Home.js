import React, { useRef, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { GlobalStyleSheet } from '../../../../app/constants/StyleSheet';
import { COLORS, FONTS, IMAGES, SIZES } from '../../../../app/constants/theme';
import MainSlider from '../components/MainSlider';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from 'react-native-raw-bottom-sheet';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Button from '../../../../app/components/Button/Button';
import Story from './Story';

const storyData = [
    {
        id:"0",
        image:IMAGES.userPic12,
        title:"Emily",
    },
    {
        id:"1",
        image:IMAGES.userPic10,
        title:"Sophia",
    },
    {
        id:"2",
        image:IMAGES.userPic9,
        title:"Charlotte",
    },
    {
        id:"3",
        image:IMAGES.userPic11,
        title:"Harper",
    },
    {
        id:"4",
        image:IMAGES.userPic12,
        title:"Emily",
    },
    {
        id:"5",
        image:IMAGES.userPic10,
        title:"Sophia",
    },
    {
        id:"6",
        image:IMAGES.userPic9,
        title:"Charlotte",
    },
    {
        id:"7",
        image:IMAGES.userPic11,
        title:"Harper",
    },
]

const btnData = [
    {
        name:"Men"
    },
    {
        name:"Women"
    },
    {
        name:"Everyone"
    },
]

const Home = ({navigation}) => {

    const theme = useTheme(); 
    const {colors} = theme;

    const filterSheet = useRef();

    const [ageValue , setAgeValue] = useState([18 , 40]);
    const [distanceVal , setDistanceVal] = useState([80]);

    const [isChecked, setIsChecked] = useState(btnData[1]);

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
                <View style={{
                    //paddingVertical:10,
                    flexDirection:'row',
                    alignItems:'center',
                    paddingHorizontal:20
                }}>
                    <Text style={{...FONTS.fontSemiBold,fontSize:20,color:colors.title,flex:1}}>Filters</Text>
                    <TouchableOpacity
                        onPress={() => filterSheet.current.close()}
                        style={{
                            padding:5,
                        }}
                    >
                        <FeatherIcon size={24} color={colors.title} name='x'/>
                    </TouchableOpacity>
                </View>
                
                <View style={[GlobalStyleSheet.container,{ paddingHorizontal:30}]}>
                    <View>
                        <Text style={{
                            ...FONTS.fontSemiBold,
                            fontSize:16,
                            color:theme.dark ? colors.title :theme.dark ? colors.title :'#141414',
                            
                        }}>Age Between {ageValue[0]} and {ageValue[1]}</Text>
                    </View>
                    <MultiSlider
                        trackStyle={{height:3,borderRadius:2,backgroundColor:theme.dark ? colors.card :'#D9D9D9'}}
                        selectedStyle={{
                            backgroundColor:theme.dark ? colors.title :'#141414',
                        }}
                        values={ageValue}
                        markerStyle={{
                            backgroundColor:theme.dark ? colors.title :'#141414',
                            top:1,
                            height:18,
                            width:18,
                        }}
                        theme={theme}
                        onValuesChange={(val) => setAgeValue(val)}
                        sliderLength={SIZES.width - 60}
                        min={18}
                        max={100}
                    />

                    <View
                        style={{
                            marginTop:10,
                        }}
                    >
                        <Text 
                            style={{ 
                                ...FONTS.fontSemiBold,
                                fontSize:16,
                                color:theme.dark ? colors.title :'#141414',
                            }}
                        >Distance Up to {distanceVal[0]} Kilometers away</Text>
                    </View>
                    <MultiSlider
                        trackStyle={{height:3,borderRadius:2,backgroundColor:theme.dark ? colors.card :'#D9D9D9'}}
                        selectedStyle={{
                            backgroundColor:theme.dark ? colors.title :'#141414',
                        }}
                        values={distanceVal}
                        markerStyle={{
                            backgroundColor:theme.dark ? colors.title :'#141414',
                            top:1,
                            height:18,
                            width:18,
                        }}
                        onValuesChange={(val) => setDistanceVal(val)}
                        sliderLength={SIZES.width - 50}
                        min={1}
                        max={100}
                    />

                    <View style={{marginTop:20}}>
                        <Text
                            style={{ 
                                ...FONTS.fontSemiBold,
                                fontSize:16,
                                color:theme.dark ? colors.title :'#141414',
                            }}
                        >Your preferred dating partner</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',gap:10,marginTop:20}}>
                        {btnData.map((data,index) => {
                            return(
                                <TouchableOpacity
                                    onPress={() => setIsChecked(data)}
                                    key={index}
                                    style={[{
                                        height:40,
                                        padding:10,
                                        borderRadius:30,
                                        paddingHorizontal:18,
                                        backgroundColor:'#F5F5F5',
                                        flexDirection:'row',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        gap:5,
                                    },isChecked === data && {
                                        backgroundColor:'#141414'
                                    }]}
                                >
                                    <View
                                        style={[{
                                            height:16,
                                            width:16,
                                            borderRadius:4,
                                            borderWidth:2,
                                            borderColor:'#141414'
                                        },isChecked === data &&{
                                             borderColor:COLORS.white,
                                             backgroundColor:COLORS.white
                                        }]}
                                    >
                                        {isChecked === data ? 
                                        
                                            <FeatherIcon size={12} color={'#141414'} name='check'/>
                                        :
                                            null
                                        }
                                    </View>
                                    <Text style={{...FONTS.fontSemiBold,fontSize:15,color:isChecked === data ? COLORS.white :'#141414'}}>{data.name}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                    <View style={{marginTop:20}}>
                        <Button
                            title={'Save'}
                            btnRounded
                            fontSize
                            textColor={'#141414'}
                            color={COLORS.primary4}
                            onPress={() => filterSheet.current.close()} 
                        />
                    </View>
                </View>
            </RBSheet>
            <SafeAreaView
                style={[GlobalStyleSheet.container,{
                    padding:0,
                    flex:1,
                    backgroundColor:colors.background,
                }]}
            >
                <LinearGradient
                    colors={['#FFD95C', '#FEC629']}
                    style={{
                        width:'100%',
                        height:270,
                        borderBottomLeftRadius:30,
                        borderBottomRightRadius:30,
                        position:'absolute'
                    }} 
                >
                    <View
                        style={[GlobalStyleSheet.homeHeader,{gap:10,paddingTop:20}]}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.openDrawer()}
                        >
                            <Image
                                style={{
                                    height:20,
                                    width:20,
                                    tintColor:'#141414',
                                    resizeMode:'contain'
                                }}
                                source={IMAGES.grid2}
                            />
                        </TouchableOpacity>
                        <Text style={{...FONTS.fontBold,fontSize:20,flex:1,textAlign:'left',color:'#141414'}}>W3Bumble</Text>
                        <TouchableOpacity
                            onPress={() => filterSheet.current.open()}
                        >
                            <Image
                                style={{
                                    height:20,
                                    width:20,
                                    tintColor:'#141414',
                                }}
                                source={IMAGES.filter}
                            />
                        </TouchableOpacity>
                    </View>
                    <View 
                        style={{
                            paddingHorizontal:15
                        }}
                    >
                        <Story theme={theme}/>
                    </View>
                </LinearGradient>
                <MainSlider
                    onPress={() => filterSheet.current.open()}
                    navigation={navigation}
                />
            </SafeAreaView>
        </>
    );
};


export default Home;