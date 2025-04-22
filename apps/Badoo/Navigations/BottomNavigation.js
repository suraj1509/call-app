import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomNavigation from './CustomNavigation';
import Profile from '../pages/Profile/Profile';
import Chat from '../pages/Chat/Chat';
import NearBy from '../pages/NearBy/NearBy';
import Likes from '../pages/Likes/Likes';
import Encounters from '../pages/Encounters/Encounters';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
    return (
        <>
            <Tab.Navigator
                tabBar={props => <CustomNavigation {...props} />}
                screenOptions={{
                    headerShown:false,
                }}
                initialRouteName="Encounters"
            >
                <Tab.Screen 
                    name="Nearby"
                    component={NearBy}
                />
                <Tab.Screen 
                    name="Encounters"
                    component={Encounters}
                />
                <Tab.Screen 
                    name="Likes"
                    component={Likes}
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