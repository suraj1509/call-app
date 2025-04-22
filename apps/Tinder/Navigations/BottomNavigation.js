import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../pages/Home/Home';
import CustomNavigation from './CustomNavigation';
import Profile from '../pages/Profile/Profile';
import Chat from '../pages/Chat/Chat';
import Spot from '../pages/Spot/Spot';
import Explore from '../pages/Explore/Explore';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
    return (
        <>
            <Tab.Navigator
                tabBar={props => <CustomNavigation {...props} />}
                screenOptions={{
                    headerShown:false,
                }}
                initialRouteName="Home"
            >
                <Tab.Screen 
                    name="Home"
                    component={Home}
                />
                <Tab.Screen 
                    name="Explore"
                    component={Explore}
                />
                <Tab.Screen 
                    name="Spot"
                    component={Spot}
                />
                <Tab.Screen 
                    name="Chat"
                    component={Chat}
                />
                <Tab.Screen 
                    name="Profile"
                    component={Profile}
                />
            </Tab.Navigator>
        </>
    );
};

export default BottomNavigation;