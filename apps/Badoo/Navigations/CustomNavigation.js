import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
                                        height:20,
                                        width:20,
                                        resizeMode:'contain',
                                        opacity:isFocused ? 1 : .6,
                                        marginBottom:6,
                                        tintColor:isFocused ? COLORS.primary3 : colors.text,
                                    }]}
                                    source={
                                        label === "Nearby" ? IMAGES.pin :
                                        label === "Encounters" ? IMAGES.cards :
                                        label === "Likes" ? IMAGES.heart2 :
                                        label === "Chat" ? IMAGES.chat2 :
                                        label === "Profile" && IMAGES.avatar
                                    }
                                />
                                <Text style={{...FONTS.fontXs,color:isFocused ? colors.title : colors.textLight,marginBottom:-2}}>{label}</Text>
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
        padding:5,
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