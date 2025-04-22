import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS, IMAGES } from '../constants/theme';
import {Shadow} from 'react-native-shadow-2';
import Animated from 'react-native-reanimated';

const CustomNavigation = ({state,navigation,descriptors}) => {

    const {colors} = useTheme();
    const theme = useTheme();

    return (
        <>
        <Shadow
            style={{
                position:'absolute',
                left:0,
                right:0,
                bottom:0,
                shadowColor: "#1630C2",
                shadowOffset: {
                    width: 0,
                    height: -10,
                },
                shadowOpacity: .08,
                shadowRadius: 5,
            }}
            >
            <View
                style={{
                    flexDirection:'row',
                    backgroundColor:colors.card,
                    height:55,
                }}
            >
                {state.routes.map((route, index) => {

                    const { options } = descriptors[route.key];
                    const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate({ name: route.name, merge: true });
                        }
                    }

                    return(
                        <View style={styles.tabItem} key={index}>
                            <TouchableOpacity
                                style={styles.tabLink}
                                onPress={onPress}
                            >
                                <Image
                                    style={{
                                        height:20,
                                        width:20,
                                        resizeMode:'contain',
                                        marginBottom:5,
                                        marginTop:1,
                                        opacity : isFocused ? 1 : .4 ,
                                        tintColor : isFocused ? COLORS.white : colors.title ,
                                    }}
                                    source={
                                        label === "Components" ? IMAGES.heart2 :
                                        label === "Media" ? IMAGES.image :
                                        label === "Home" ? IMAGES.home3 :
                                        label === "Apps" ? IMAGES.option :
                                        label === "Settings" && IMAGES.settings
                                    }
                                />
                                <Text style={{...FONTS.fontXs,color:isFocused ? COLORS.white : colors.title}}>{label === "Components" ? "Features" : label}</Text>
                            </TouchableOpacity>
                            <Animated.View
                                style={{
                                    height:64,
                                    width:68,
                                    position:'absolute',
                                    backgroundColor:COLORS.primary2,
                                    zIndex:-1,
                                    bottom:0,
                                    borderTopLeftRadius:15,
                                    borderTopRightRadius:15,
                                    opacity: isFocused ? 1 : 0,
                                }}
                            ></Animated.View>
                        </View>
                    )
                })}
            </View>
        </Shadow>
        </>
    );
};

const styles = StyleSheet.create({
    tabLink:{
        alignItems:'center',
        padding:15,
    },
    tabItem:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    navText:{
        ...FONTS.fontSm,
    }
})


export default CustomNavigation;