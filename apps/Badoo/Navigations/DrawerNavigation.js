import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomNavigation from './BottomNavigation';
import DrawerMenu from '../../../app/layout/DrawerMenu';
import { SafeAreaView } from 'react-native';
import { useTheme } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {

    const { colors } = useTheme();

    return (
        <SafeAreaView
            style={{
                flex:1,
                backgroundColor:colors.cardBg,
            }}
        >
            <Drawer.Navigator
                drawerContent={() => <DrawerMenu/>}
                screenOptions={{
                    headerShown : false
                }}
            >
                <Drawer.Screen name="BottomNavigation" component={BottomNavigation} />
            </Drawer.Navigator>
        </SafeAreaView>
    );
};


export default DrawerNavigation;