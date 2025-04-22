import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS, IMAGES } from '../../../app/constants/theme';
import { IconButton } from 'react-native-paper';

const CustomNavigation = ({state,navigation,descriptors}) => {
    
    const {colors} = useTheme();

    return (
        <>
            <View style={{
                height:60,
                flexDirection:'row',
                position:'absolute',
                width:'auto',
                left:0,
                right:0,
                bottom:0,
                backgroundColor: colors.card,
                borderTopWidth:1,
                borderTopColor:colors.borderColor,
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

                    }

                    return(
                        <View style={styles.tabItem} key={index}>
                            <TouchableOpacity
                                style={styles.tabLink}
                                onPress={onPress}
                            >
                                <Image
                                    style={[{
                                        height:22,
                                        width:22,
                                        resizeMode:'contain',
                                        opacity:isFocused ? 1 : .6,
                                        tintColor:isFocused ? null : colors.text,
                                    }, label == "Spot" && {
                                        height:24,
                                        width:24,
                                    }]}
                                    source={
                                        label === "Home" ? IMAGES.home3 :
                                        label === "Explore" ? IMAGES.search :
                                        label === "Spot" ? IMAGES.sparkle :
                                        label === "Chat" ? IMAGES.chat2 :
                                        label === "Profile" && IMAGES.avatar
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