import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
// import DropShadow from 'react-native-shadow-2';
import { COLORS, FONTS, IMAGES, SIZES } from '../../../app/constants/theme';

const CustomNavigation = ({state,navigation,descriptors}) => {
    
    const theme = useTheme();
    const {colors} = theme;

    const offset = useSharedValue(0);

    const tabShapeStyle = useAnimatedStyle(() => { 
        return {
            transform: [
                { 
                    translateX:  offset.value
                }
            ],
        };
    });

    return (
        <>
            <View style={{
                height:60,
                flexDirection:'row',
                position:'absolute',
                width:'auto',
                left:10,
                right:10,
                bottom:10,
                borderRadius:35,
                backgroundColor:theme.dark ? colors.card :theme.dark ? colors.title :'#141414',
                shadowColor: "rgba(0,0,0,.6)",
                shadowOffset: {
                    width: 0,
                    height: 4,
                },
                shadowOpacity: 0.30,
                shadowRadius: 4.65,
                paddingHorizontal:20,
                elevation: 8,
            }}>
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

                        if(route.name == "Home"){
                            var a =  0;
                        }else if(route.name == "Likes"){
                            var a =  (SIZES.width) / 4;
                        }else if(route.name == "Chat"){
                            var a =  (SIZES.width) / 4 + (SIZES.width) / 4;
                        }else if(route.name == "Profile"){
                            var a =  (SIZES.width) - (SIZES.width) / 4;
                        }

                        var b = withTiming(a);
                        offset.value = b

                    }

                    return(
                        <View style={styles.tabItem} key={index}>
                            <TouchableOpacity
                                style={styles.tabLink}
                                onPress={onPress}
                            >
                                <Image
                                    style={{
                                        height:22,
                                        width:22,
                                        resizeMode:'contain',
                                        opacity:isFocused ? 1 : .6,
                                        tintColor:isFocused ? COLORS.primary4 : 'rgba(255,255,255,0.30)',
                                    }}
                                    source={
                                        label === "Home" ? IMAGES.home3 :
                                        label === "Likes" ? IMAGES.heart2 :
                                        label === "Chat" ? IMAGES.chat3 :
                                        label === "Profile" && IMAGES.user4
                                    }
                                />
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </View>
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