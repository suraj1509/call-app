import React from 'react';
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS, IMAGES, SIZES } from '../constants/theme';
import { 
    FlatList,
    Image,
    ImageBackground,
    Linking,
    SafeAreaView, 
    ScrollView, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View 
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import ReviewCard from '../components/ReviewCard';
import Divider from '../components/Dividers/Divider';
import LinearGradient from 'react-native-linear-gradient';

const Home = ({navigation}) => {
    
    const {colors} = useTheme();
    const theme = useTheme();

    const appComponents = ["Accordion", "Action Sheets","Action Modals","Buttons","Charts","Chips","Cards","Column","Collapse","Dividers","File Upload","Header","Footer","Input","List","Pagination","Pricing","Snackbars","Social","Tabs","Table","Toggle"];

    const ReviewData = [
        {
            id : "1",
            image : IMAGES.userPic,
            name : "Wichard Smith",
            desc : "Clean Design, Clean Code, Simple architecture!Thanks!",
        },
        {
            id : "2",
            image : IMAGES.userPic2,
            name : "Wichard Smith",
            desc : "Clean Design, Clean Code, Simple architecture!Thanks!",
        },
        {
            id : "3",
            image : IMAGES.userPic3,
            name : "Wichard Smith",
            desc : "Clean Design, Clean Code, Simple architecture!Thanks!",
        },
    ]

    const demo1Features = [
        {
            title : "Swiper Card",
        },
        {
            title : "Chat Screen",
        },
        {
            title : "Profile Screen",
        },
        {
            title : "Setting Screens",
        },
        {
            title : "Dark mode",
        },
    ]

    const demo2Features = [
        {
            title : "Swiper Card",
        },
        {
            title : "Chat Screen",
        },
        {
            title : "Profile Screen",
        },
        {
            title : "Setting Screens",
        },
        {
            title : "Dark mode",
        },
    ]

    const Demo1Data = [
        {
            image : IMAGES.demo1,
        },
        {
            image : IMAGES.demo1_2,
        },
        {
            image : IMAGES.demo1_1,
        },
        {
            image : IMAGES.demo1_3,
        },
        {
            image : IMAGES.demo1_4,
        },
        {
            image : IMAGES.demo1_5,
        },
        {
            image : IMAGES.demo1_6,
        },
        {
            image : IMAGES.demo1_7,
        },
        {
            image : IMAGES.demo1_8,
        },
    ]
    const Demo2Data = [
        {
            image : IMAGES.demo2,
        },
        {
            image : IMAGES.demo2_1,
        },
        {
            image : IMAGES.demo2_2,
        },
        {
            image : IMAGES.demo2_3,
        },
        {
            image : IMAGES.demo2_4,
        },
        {
            image : IMAGES.demo2_5,
        },
        {
            image : IMAGES.demo2_6,
        },
        {
            image : IMAGES.demo2_7,
        },
    ]
    const Demo3Data = [
        {
            image : IMAGES.demo3_1,
        },
        {
            image : IMAGES.demo3_2,
        },
        {
            image : IMAGES.demo3_3,
        },
        {
            image : IMAGES.demo3_4,
        },
    ]

    const Demo4Data = [
        {
            image : IMAGES.demo4_1,
        },
        {
            image : IMAGES.demo4_2,
        },
        {
            image : IMAGES.demo4_3,
        },
        {
            image : IMAGES.demo4_4,
        },
        {
            image : IMAGES.demo4_5,
        },
        {
            image : IMAGES.demo4_6,
        },
        {
            image : IMAGES.demo4_7,
        },
        {
            image : IMAGES.demo1_7,
        },
        {
            image : IMAGES.demo4_8,
        },
        {
            image : IMAGES.demo4_9,
        },
    ]

    const renderReviewCard = ({item}) => {
        return(
            <ReviewCard
                image={item.image}
                name={item.name}
                desc={item.desc}
            />
        )
    }

    return (
        <>
            <SafeAreaView style={{flex:1,backgroundColor:colors.themeBg}}>
                <ScrollView>
                    <View>
                        <LinearGradient
                            colors={["#FFD6E7","#ED94B3"]}
                            style={{
                                alignItems:'center',
                                paddingBottom:60,
                                paddingTop:40,
                            }}
                        >
                            <Image
                                source={IMAGES.logo}
                                style={{
                                    height:80,
                                    width:80,
                                    resizeMode:'contain',
                                    marginBottom:12,
                                }}
                            />
                            <Text style={{...FONTS.h2,color:COLORS.title,lineHeight:34,marginBottom:4}}>Explore Dating Kit</Text>
                            <Text style={{...FONTS.font,fontSize:15,color:"rgba(35,41,84,.7)"}}>React Native Dating Application </Text>
                        </LinearGradient>
                        <Image
                            source={IMAGES.heartShape}
                            style={{
                                position:'absolute',
                                height:60,
                                width:60,
                                resizeMode:'contain',
                                right:10,
                                top:60,
                                transform:[{rotate:'-20deg'}]
                            }}
                        />
                        <Image
                            source={IMAGES.heartShape}
                            style={{
                                position:'absolute',
                                height:50,
                                width:50,
                                resizeMode:'contain',
                                left:30,
                                top:20,
                                transform:[{rotate:'32deg'}]
                            }}
                        />
                        <Image
                            source={IMAGES.heartShape}
                            style={{
                                position:'absolute',
                                height:30,
                                width:30,
                                resizeMode:'contain',
                                left:15,
                                bottom:90,
                                transform:[{rotate:'-24deg'}]
                            }}
                        />
                        <Image
                            source={theme.dark ? IMAGES.bubbleDark : IMAGES.bubble}
                            style={{
                                width:'100%',
                                height:undefined,
                                aspectRatio:8/1,
                                resizeMode:'stretch',
                                marginTop:-35,
                            }}
                        />
                    </View>
                    <View >
                        <View style={[GlobalStyleSheet.container,{paddingBottom:0}]}>
                            <View  style={{alignItems:'center'}}>
                                <View style={{...GlobalStyleSheet.row,maxWidth:450}}>
                                    <View style={GlobalStyleSheet.col50}>
                                        <View
                                            style={{
                                                borderRadius:30,
                                                height:50,
                                                flexDirection:'row',
                                                alignItems:'center',
                                                paddingHorizontal:16,
                                                borderWidth:1,
                                                borderColor:colors.borderColor,
                                            }}
                                        >
                                            <Text style={{...FONTS.h3,color:COLORS.primary,marginRight:4,top:2}}>4+</Text>
                                            <Text style={{...FONTS.font,...FONTS.fontBold,fontSize:15,color:colors.title}}>Pre Build App</Text>
                                        </View>
                                    </View>
                                    <View style={GlobalStyleSheet.col50}>
                                        <View
                                            style={{
                                                borderRadius:30,
                                                height:50,
                                                flexDirection:'row',
                                                alignItems:'center',
                                                paddingHorizontal:16,
                                                borderWidth:1,
                                                borderColor:colors.borderColor,
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    height:28,
                                                    width:28,
                                                    marginRight:8,
                                                }}
                                                source={IMAGES.react}
                                            />
                                            <Text style={{...FONTS.font,...FONTS.fontBold,fontSize:15,color:colors.title}}>React Native</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View
                                style={{
                                    flexDirection:'row',
                                    alignItems:'center',
                                    marginTop:25,
                                }}
                            >
                                <Image
                                    style={{
                                        height:24,
                                        width:24,
                                        marginRight:6,
                                        marginBottom:3,
                                        tintColor:COLORS.primary2,
                                    }}
                                    source={IMAGES.bag}
                                />
                                <Text style={{...FONTS.h5,color:colors.title}}>Packages</Text>
                            </View>
                        </View>

                    </View>
                    
                    <View style={GlobalStyleSheet.container}>
                        <View style={GlobalStyleSheet.row}>
                        <View style={GlobalStyleSheet.col50}>
                                <Text style={{...FONTS.h5,color:colors.title,marginTop:25,marginBottom:10,textAlign:'right',marginRight:15}}>W3 Bumble App</Text>
                                <View
                                    style={{
                                        alignItems:'flex-end',
                                    }}
                                >
                                    {demo1Features.map((data,index) => {
                                        return(
                                            <View
                                                key={index}
                                                style={{
                                                    flexDirection:'row',
                                                    alignItems:'center',
                                                    marginBottom:5,
                                                    borderRadius:30,
                                                    paddingHorizontal:5,
                                                    paddingVertical:5,
                                                    paddingRight:15,
                                                    gap:10
                                                }}
                                            >
                                                <Text style={{...FONTS.font,fontSize:15,...FONTS.fontSemiBold,color:colors.title}}>{data.title}</Text>
                                                <View
                                                    style={{
                                                        height:20,
                                                        width:20,
                                                        backgroundColor:COLORS.primary4,
                                                        borderRadius:24,
                                                        alignItems:'center',
                                                        justifyContent:'center',
                                                        marginRight:6,
                                                    }}
                                                >
                                                    <FontAwesome size={12} color={COLORS.white} name='star'/>
                                                </View>
                                            </View>
                                        )
                                    })}

                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('W3BumblePage')}
                                        style={{
                                            marginTop:30,
                                        }}
                                    >
                                        <LinearGradient
                                            colors={[COLORS.primary4,COLORS.primary4]}
                                            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                            style={{
                                                paddingHorizontal:20,
                                                paddingVertical:8,
                                                borderRadius:SIZES.radius_sm,
                                            }}
                                        >
                                            <Text style={{
                                                fontSize:16,
                                                fontFamily:"Poppins-Medium",
                                                color:COLORS.title,
                                                top:1,
                                            }}>View demo</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={GlobalStyleSheet.col50}>
                                <View
                                    style={{
                                        borderRadius:SIZES.radius,
                                        backgroundColor:colors.cardBg,
                                        paddingHorizontal:5,
                                        paddingBottom:15,
                                        alignItems:'center',
                                        paddingTop:5,
                                        marginBottom:35,
                                        ...GlobalStyleSheet.shadow,
                                    }}
                                >    
                                    <View style={{marginBottom:12,borderWidth:1,borderRadius:SIZES.radius,borderColor:colors.borderColor}}>
                                        <Image
                                            style={{
                                                width:'100%',
                                                height:undefined,
                                                aspectRatio: 1 / 2,
                                                borderRadius:SIZES.radius,
                                            }}
                                            source={IMAGES.demo4Home}
                                        />
                                    </View>
                                    <Text style={{...FONTS.fontSm,...FONTS.fontBold,color:colors.title,textAlign:'center'}}>W3Bumble App</Text>
                                </View>
                            </View>
                           
                        </View>

                        <View
                            style={{
                                marginHorizontal:-15,
                            }}
                        >
                            <FlatList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{
                                    paddingLeft:15,
                                    paddingRight:10,
                                    paddingBottom:20,
                                    paddingTop:10,
                                }}
                                data={Demo4Data}
                                renderItem={({item}) => {
                                    return(
                                        <View
                                            style={{
                                                backgroundColor:colors.cardBg,
                                                borderRadius:6,
                                                marginRight:10,
                                                ...GlobalStyleSheet.shadow,
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    width:140,
                                                    height:274,
                                                    borderRadius:6,
                                                }}
                                                source={item.image}
                                            />
                                        </View>
                                    )
                                }}
                            />
                        </View>
                    </View>

                    <Divider />

                    <View style={GlobalStyleSheet.container}>
                        <View style={GlobalStyleSheet.row}>
                            <View style={GlobalStyleSheet.col50}>
                                    <View
                                        style={{
                                            borderRadius:SIZES.radius,
                                            backgroundColor:colors.cardBg,
                                            paddingHorizontal:5,
                                            paddingBottom:15,
                                            alignItems:'center',
                                            paddingTop:5,
                                            marginBottom:35,
                                            ...GlobalStyleSheet.shadow,
                                        }}
                                    >    
                                        <View style={{marginBottom:12,borderWidth:1,borderRadius:SIZES.radius,borderColor:colors.borderColor}}>
                                            <Image
                                                style={{
                                                    width:'100%',
                                                    height:undefined,
                                                    aspectRatio: 1 / 2,
                                                    borderRadius:SIZES.radius,
                                                }}
                                                source={IMAGES.demo1Home}
                                            />
                                        </View>
                                        <Text style={{...FONTS.fontSm,...FONTS.fontBold,color:colors.title,textAlign:'center'}}>W3Dating App</Text>
                                    </View>
                            </View>
                            <View style={GlobalStyleSheet.col50}>
                                <Text style={{...FONTS.h5,color:colors.title,marginTop:25,marginBottom:10}}>W3 Dating App</Text>
                                <View
                                    style={{
                                        alignItems:'flex-start',
                                    }}
                                >
                                    {demo1Features.map((data,index) => {
                                        return(
                                            <View
                                                key={index}
                                                style={{
                                                    flexDirection:'row',
                                                    alignItems:'center',
                                                    marginBottom:5,
                                                    borderRadius:30,
                                                    paddingHorizontal:5,
                                                    paddingVertical:5,
                                                    paddingRight:15,
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        height:20,
                                                        width:20,
                                                        backgroundColor:COLORS.primary,
                                                        borderRadius:24,
                                                        alignItems:'center',
                                                        justifyContent:'center',
                                                        marginRight:6,
                                                    }}
                                                >
                                                    <FontAwesome size={12} color={COLORS.white} name='star'/>
                                                </View>
                                                <Text style={{...FONTS.font,fontSize:15,...FONTS.fontSemiBold,color:colors.title}}>{data.title}</Text>
                                            </View>
                                        )
                                    })}

                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('W3DatingPage')}
                                        style={{
                                            marginTop:30,
                                        }}
                                    >
                                        <LinearGradient
                                            colors={[COLORS.primary,COLORS.primary]}
                                            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                            style={{
                                                paddingHorizontal:20,
                                                paddingVertical:8,
                                                borderRadius:SIZES.radius_sm,
                                            }}
                                        >
                                            <Text style={{
                                                fontSize:16,
                                                fontFamily:"Poppins-Medium",
                                                color:COLORS.white,
                                                top:1,
                                            }}>View demo</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View
                            style={{
                                marginHorizontal:-15,
                            }}
                        >
                            <FlatList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{
                                    paddingLeft:15,
                                    paddingRight:10,
                                    paddingBottom:20,
                                    paddingTop:10,
                                }}
                                data={Demo1Data}
                                renderItem={({item}) => {
                                    return(
                                        
                                            <View
                                                style={{
                                                    backgroundColor:colors.cardBg,
                                                    borderRadius:6,
                                                    marginRight:10,
                                                    ...GlobalStyleSheet.shadow,
                                                }}
                                            >
                                                <Image
                                                    style={{
                                                        width:140,
                                                        height:274,
                                                        borderRadius:6,
                                                    }}
                                                    source={item.image}
                                                />
                                            </View>
                                    )
                                }}
                            />
                        </View>
                    </View>
                    
                    <Divider />

                    <View style={GlobalStyleSheet.container}>
                        <View style={GlobalStyleSheet.row}>
                            <View style={GlobalStyleSheet.col50}>
                                <Text style={{...FONTS.h5,color:colors.title,marginTop:25,marginBottom:10,textAlign:'right'}}>W3 Tinder App</Text>
                                <View
                                    style={{
                                        alignItems:'flex-end',
                                    }}
                                >
                                    {demo2Features.map((data,index) => {
                                        return(
                                            <View
                                                key={index}
                                                style={{
                                                    flexDirection:'row',
                                                    alignItems:'center',
                                                    marginBottom:5,
                                                    borderRadius:30,
                                                    paddingHorizontal:5,
                                                    paddingVertical:5,
                                                    paddingLeft:15,
                                                }}
                                            >
                                                <Text style={{...FONTS.font,fontSize:15,...FONTS.fontSemiBold,color:colors.title}}>{data.title}</Text>
                                                <LinearGradient
                                                    colors={["#ea3d85","#ff864e"]}
                                                    style={{
                                                        height:20,
                                                        width:20,
                                                        backgroundColor:COLORS.primary,
                                                        borderRadius:24,
                                                        alignItems:'center',
                                                        justifyContent:'center',
                                                        marginLeft:6,
                                                    }}
                                                >
                                                    <FontAwesome size={12} color={COLORS.white} name='star'/>
                                                </LinearGradient>
                                            </View>
                                        )
                                    })}
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('TinderPage')}
                                        style={{
                                            marginTop:30,
                                        }}
                                    >
                                        <LinearGradient
                                            colors={["#ea3d85","#ff864e"]}
                                            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                            style={{
                                                paddingHorizontal:20,
                                                paddingVertical:8,
                                                borderRadius:SIZES.radius_sm,
                                            }}
                                        >
                                            <Text style={{
                                                fontSize:16,
                                                fontFamily:"Poppins-Medium",
                                                color:COLORS.white,
                                                top:1,
                                            }}>View demo</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                    {/* <TouchableOpacity
                                        onPress={() => Linking.openURL('https://datingkit.dexignzone.com/reactnative/w3tinder.apk')}
                                        style={{
                                            marginTop:30,
                                            flexDirection:'row',
                                            alignItems:'center',
                                            backgroundColor:colors.cardBg,
                                            borderWidth:1,
                                            borderColor:colors.borderColor,
                                            paddingHorizontal:15,
                                            paddingVertical:10,
                                            borderRadius:SIZES.radius,
                                        }}
                                    >
                                        <Image
                                            source={IMAGES.apk}
                                            style={{
                                                height:20,
                                                width : 20,
                                                top:-1,
                                                marginRight:10,
                                            }}
                                        />
                                        <Text style={{...FONTS.font,...FONTS.fontSemiBold,color:colors.title,marginBottom:2}}>Download Apk</Text>
                                    </TouchableOpacity> */}
                                </View>
                            </View>
                            <View style={GlobalStyleSheet.col50}>
                                
                                    <View
                                        style={{
                                            borderRadius:SIZES.radius,
                                            backgroundColor:colors.cardBg,
                                            paddingHorizontal:5,
                                            paddingBottom:15,
                                            alignItems:'center',
                                            paddingTop:5,
                                            marginBottom:35,
                                            ...GlobalStyleSheet.shadow,
                                        }}
                                    >    
                                        <View style={{marginBottom:12,borderWidth:1,borderRadius:SIZES.radius,borderColor:colors.borderColor}}>
                                            <Image
                                                style={{
                                                    width:'100%',
                                                    height:undefined,
                                                    aspectRatio: 1 / 2,
                                                    borderRadius:SIZES.radius,
                                                }}
                                                source={IMAGES.demo2Home}
                                            />
                                        </View>
                                        <Text style={{...FONTS.fontSm,...FONTS.fontBold,color:colors.title,textAlign:'center'}}>W3Tinder App</Text>
                                    </View>
                            </View>
                        </View>

                        <View
                            style={{
                                marginHorizontal:-15,
                                marginBottom:15,
                            }}
                        >
                            <FlatList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{
                                    paddingLeft:15,
                                    paddingRight:10,
                                    paddingBottom:20,
                                    paddingTop:10,
                                }}
                                data={Demo2Data}
                                renderItem={({item}) => {
                                    return(
                                        
                                            <View
                                                style={{
                                                    backgroundColor:colors.cardBg,
                                                    borderRadius:6,
                                                    marginRight:10,
                                                    ...GlobalStyleSheet.shadow,
                                                }}
                                            >
                                                <Image
                                                    style={{
                                                        width:140,
                                                        height:275,
                                                        borderRadius:6,
                                                    }}
                                                    source={item.image}
                                                />
                                            </View>
                                    )
                                }}
                            />
                        </View>

                    </View>
                    
                    <Divider/>

                    <View style={GlobalStyleSheet.container}>
                        <View style={GlobalStyleSheet.row}>
                            <View style={GlobalStyleSheet.col50}>
                                
                                    <View
                                        style={{
                                            borderRadius:SIZES.radius,
                                            backgroundColor:colors.cardBg,
                                            paddingHorizontal:5,
                                            paddingBottom:15,
                                            alignItems:'center',
                                            paddingTop:5,
                                            marginBottom:35,
                                            ...GlobalStyleSheet.shadow,
                                        }}
                                    >    
                                        <View style={{marginBottom:12,borderWidth:1,borderRadius:SIZES.radius,borderColor:colors.borderColor}}>
                                            <Image
                                                style={{
                                                    width:'100%',
                                                    height:undefined,
                                                    aspectRatio: 1 / 2,
                                                    borderRadius:SIZES.radius,
                                                }}
                                                source={IMAGES.demo3Home}
                                            />
                                        </View>
                                        <Text style={{...FONTS.fontSm,...FONTS.fontBold,color:colors.title,textAlign:'center'}}>W3Badoo App</Text>
                                    </View>
                            </View>
                            <View style={GlobalStyleSheet.col50}>
                                <Text style={{...FONTS.h5,color:colors.title,marginTop:25,marginBottom:10}}>W3 Badoo App</Text>
                                <View
                                    style={{
                                        alignItems:'flex-start',
                                    }}
                                >
                                    {demo1Features.map((data,index) => {
                                        return(
                                            <View
                                                key={index}
                                                style={{
                                                    flexDirection:'row',
                                                    alignItems:'center',
                                                    marginBottom:5,
                                                    borderRadius:30,
                                                    paddingHorizontal:5,
                                                    paddingVertical:5,
                                                    paddingRight:15,
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        height:20,
                                                        width:20,
                                                        backgroundColor:COLORS.primary3,
                                                        borderRadius:24,
                                                        alignItems:'center',
                                                        justifyContent:'center',
                                                        marginRight:6,
                                                    }}
                                                >
                                                    <FontAwesome size={12} color={COLORS.white} name='star'/>
                                                </View>
                                                <Text style={{...FONTS.font,fontSize:15,...FONTS.fontSemiBold,color:colors.title}}>{data.title}</Text>
                                            </View>
                                        )
                                    })}

                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('BadooPages')}
                                        style={{
                                            marginTop:30,
                                        }}
                                    >
                                        <LinearGradient
                                            colors={[COLORS.primary3,COLORS.primary3]}
                                            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                            style={{
                                                paddingHorizontal:20,
                                                paddingVertical:8,
                                                borderRadius:SIZES.radius_sm,
                                            }}
                                        >
                                            <Text style={{
                                                fontSize:16,
                                                fontFamily:"Poppins-Medium",
                                                color:COLORS.white,
                                                top:1,
                                            }}>View demo</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View
                            style={{
                                marginHorizontal:-15,
                            }}
                        >
                            <FlatList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{
                                    paddingLeft:15,
                                    paddingRight:10,
                                    paddingBottom:20,
                                    paddingTop:10,
                                }}
                                data={Demo3Data}
                                renderItem={({item}) => {
                                    return(
                                        
                                            <View
                                                style={{
                                                    backgroundColor:colors.cardBg,
                                                    borderRadius:6,
                                                    marginRight:10,
                                                    ...GlobalStyleSheet.shadow,
                                                }}
                                            >
                                                <Image
                                                    style={{
                                                        width:140,
                                                        height:274,
                                                        borderRadius:6,
                                                    }}
                                                    source={item.image}
                                                />
                                            </View>
                                    )
                                }}
                            />
                        </View>
                    </View>

                    <View>
                        <View
                            style={{
                                position:'absolute',
                                height:"100%",
                                width:"45%",
                                backgroundColor:"#181842",
                                borderRadius:25,
                                borderBottomLeftRadius:0,
                            }}
                        />
                        <View style={[GlobalStyleSheet.container,{paddingBottom:0}]}>
                            <View
                                style={{
                                    flexDirection:'row',
                                    alignItems:'center',
                                }}
                            >
                                <Image
                                    style={{
                                        height:20,
                                        width:20,
                                        marginBottom:3,
                                        marginRight:6,
                                        tintColor:COLORS.primary2,
                                    }}
                                    source={IMAGES.star}
                                />
                                <Text style={{...FONTS.h5,color:COLORS.white,flex:1}}>Features</Text>
                                <Text style={{...FONTS.h3,color:COLORS.primary2,marginRight:-20}}>50+ <Text style={{color:"#A4AEDF"}}>Elements</Text></Text>
                            </View>
                        </View>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{
                                paddingLeft:15,
                                paddingTop:10,
                                paddingBottom:25,
                            }}
                        >
                            {appComponents.map((data,index) => {
                                return(
                                   
                                        <View
                                            key={index}
                                            style={{
                                                backgroundColor: colors.cardBg,
                                                borderRadius:8,
                                                height:45,
                                                alignItems:'center',
                                                justifyContent:'center',
                                                paddingHorizontal:15,
                                                marginRight:10,
                                                ...GlobalStyleSheet.shadow,
                                            }}
                                        >
                                            <Text style={{...FONTS.font,...FONTS.fontBold,color:colors.title,bottom:1,}}>{data}</Text>
                                        </View>
                                )
                            })}
                        </ScrollView>
                    </View>

                    <View style={[GlobalStyleSheet.container,{marginTop:10}]}>
                        <Text style={{...FONTS.h4,color:colors.title,textAlign:'center'}}>Ready in <Text style={{color:COLORS.themeSecondary}}>3</Text> Steps</Text>
                    </View>
                    <View
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            marginBottom:40,
                        }}
                    >
                        
                            <View
                                style={{
                                    backgroundColor: colors.cardBg,
                                    borderRadius:12,
                                    borderTopLeftRadius:0,
                                    borderBottomLeftRadius:0,
                                    alignItems:'center',
                                    paddingHorizontal:15,
                                    paddingTop:20,
                                    paddingBottom:15,
                                    flex:1,
                                    marginRight:15,
                                    ...GlobalStyleSheet.shadow,
                                }}
                            >
                                <Image
                                    style={{
                                        height:30,
                                        width:30,
                                        tintColor:COLORS.primary2,
                                        marginBottom:10,
                                    }}
                                    source={IMAGES.search}
                                />
                                <Text style={{...FONTS.h6,color:colors.title,textAlign:'center'}}>Find Your Style</Text>
                            </View>
                        
                            <View
                                style={{
                                    backgroundColor:"#181842",
                                    borderRadius:12,
                                    alignItems:'center',
                                    paddingHorizontal:15,
                                    paddingTop:30,
                                    paddingBottom:25,
                                    flex:1,
                                    ...GlobalStyleSheet.shadow,
                                }}
                            >
                                <Image
                                    style={{
                                        height:35,
                                        width:35,
                                        marginBottom:10,
                                    }}
                                    source={IMAGES.plus}
                                />
                                <Text style={{...FONTS.h6,color:COLORS.white,textAlign:'center'}}>Add Your Elements</Text>
                            </View>
                        
                            <View
                                style={{
                                    backgroundColor:colors.cardBg,
                                    borderRadius:12,
                                    borderTopRightRadius:0,
                                    borderBottomRightRadius:0,
                                    alignItems:'center',
                                    paddingHorizontal:15,
                                    paddingTop:20,
                                    paddingBottom:15,
                                    flex:1,
                                    marginLeft:15,
                                    ...GlobalStyleSheet.shadow,
                                }}
                            >
                                <Image
                                    style={{
                                        height:30,
                                        width:30,
                                        marginBottom:10,
                                        tintColor:COLORS.primary2,
                                    }}
                                    source={IMAGES.grid}
                                />
                                <Text style={{...FONTS.h6,color:colors.title,textAlign:'center'}}>Publish Your App</Text>
                            </View>
                    </View>
                    

                    <ImageBackground
                        source={IMAGES.clients}
                        style={{
                            borderTopLeftRadius:20,
                            borderTopRightRadius:20,
                            overflow:'hidden',
                        }}
                    >
                        <View
                            style={{
                                position:'absolute',
                                height:'100%',
                                width:'100%',
                                backgroundColor:"#181842",
                                opacity:.9,
                            }}
                        />
                        <View style={{
                            paddingTop:25,
                            paddingBottom:60,
                        }}>
                            <View style={{paddingHorizontal:15,marginBottom:20}}>
                                <View
                                    style={{
                                        flexDirection:'row',
                                        marginBottom:3,
                                    }}
                                >
                                    <Image
                                        style={{
                                            height:24,
                                            width:24,
                                            marginRight:8,
                                            tintColor:COLORS.primary2,
                                            top:1,
                                        }}
                                        source={IMAGES.user3}
                                    />
                                    <Text style={{...FONTS.h5,color:COLORS.white}}>Happy Customers</Text>
                                </View>
                                <Text style={{...FONTS.font,...FONTS.fontSemiBold,color:'rgba(255,255,255,.7)'}}>Over 10.000 people use our products, and we're always happy to see the positiv impact our products have had! Thank you!</Text>
                            </View>
                            
                            <FlatList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{paddingLeft:15}}
                                data={ReviewData}
                                keyExtractor={(item) => item.id}
                                renderItem={renderReviewCard}
                            />

                        </View>
                    </ImageBackground>

                    <View
                        style={{
                            backgroundColor:colors.themeBg,
                            borderTopLeftRadius:18,
                            borderTopRightRadius:18,
                            marginTop:-25,
                            paddingHorizontal:15,
                            paddingTop:25,
                        }}
                    >
                        <View
                            style={{
                                paddingHorizontal:15,
                                paddingVertical:20,
                                backgroundColor:"#181842",
                                borderRadius:18,
                                alignItems:'center',
                                marginBottom:-55,
                                position:'relative',
                                zIndex:1,
                            }}
                        >
                            <Text style={{...FONTS.h4,color:COLORS.white,textAlign:'center'}}>Purchase Today</Text>
                            <Text style={{...FONTS.font,...FONTS.fontBold,color:COLORS.primary2,textAlign:'center',marginBottom:8}}>Quality and Premium Features for You</Text>
                            <Text style={{...FONTS.font,color:"#CCD4FF",textAlign:'center'}}>Fast, easy to use and filled with features. Give your site the Mobile Feeling it deserves.</Text>
                            <TouchableOpacity
                                onPress={() => Linking.openURL('https://1.envato.market/MmX7zM')}
                                style={{
                                    backgroundColor:COLORS.white,
                                    height:45,
                                    justifyContent:'center',
                                    paddingHorizontal:25,
                                    borderRadius:8,
                                    marginTop:15,
                                }}
                            >
                                <Text style={{...FONTS.font,...FONTS.fontBold,color:COLORS.title,top:-1}}>Buy now - <Text style={{color:COLORS.primary2}}>$37</Text></Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View
                            style={{
                                backgroundColor:"#090920",
                                paddingHorizontal:30,
                                marginHorizontal:-15,
                                paddingBottom:50,
                                paddingTop:90,
                                borderTopLeftRadius:18,
                                borderTopRightRadius:18,
                                alignItems:'center',
                            }}
                        >
                            <Image
                                style={{
                                    height:32,
                                    width:170,
                                    resizeMode:'contain',
                                    marginBottom:12,
                                }}
                                source={IMAGES.logoFullWhite}
                            />
                            <Text style={{...FONTS.font,color:"#A1B0FF",textAlign:'center'}}>Built to match the design trends and give your page the awesome facelift it deserves.</Text>
                            <View
                                style={{
                                    flexDirection:'row',
                                    marginTop:22,
                                    paddingBottom:50,
                                }}
                            >
                                <TouchableOpacity 
                                    onPress={() => Linking.openURL('https://www.facebook.com/w3itexperts/')}
                                    style={styles.socialIcon}>
                                    <FontAwesome size={18} color={COLORS.white} name="facebook"/>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => Linking.openURL('https://twitter.com/w3itexpert')}
                                    style={styles.socialIcon}>
                                    <FontAwesome size={18} color={COLORS.white} name="twitter"/>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => Linking.openURL('https://www.youtube.com/channel/UCs7cFherrz5jhcvUJ7s9MQg')}
                                    style={styles.socialIcon}>
                                    <FontAwesome size={18} color={COLORS.white} name="youtube-play"/>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => Linking.openURL('https://in.linkedin.com/company/w3itexperts')}
                                    style={styles.socialIcon}>
                                    <FontAwesome size={18} color={COLORS.white} name="linkedin-square"/>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => Linking.openURL('https://www.instagram.com/dexignzone/')}
                                    style={styles.socialIcon}>
                                    <FontAwesome size={18} color={COLORS.white} name="instagram"/>
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
    socialIcon : {
        height:45,
        width:45,
        backgroundColor:'rgba(255,255,255,.1)',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:8,
        marginHorizontal:4,
    }
})


export default Home;