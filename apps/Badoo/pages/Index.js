import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigation from '../Navigations/DrawerNavigation';
import SingleChat from './Chat/SingleChat';
import Settings from './Settings/Settings';
import BasicInfo from './Settings/BasicInfo';
import About from './About/About';
import PrivacyPolicy from './About/PrivacyPolicy';
import TermsUse from './About/TermsUse';
import Notification from './Settings/Notification';
import ThemeMode from './Settings/themeMode';
import EditProfile from './Profile/EditProfile';
import ProfileDetail from './NearBy/ProfileDetail';

const StackComponent = createNativeStackNavigator();

const BadooPages = () => {
    return (
        <>
            <StackComponent.Navigator
                initialRouteName={"OnBoarding"}
                detachInactiveScreens={true}
                screenOptions={{
                    headerShown: false,
                    cardStyle: { backgroundColor: "transparent" },
                }}
            >
                <StackComponent.Screen name={"DrawerNavigation"} component={DrawerNavigation} />
                <StackComponent.Screen name={"SingleChat"} component={SingleChat} />
                <StackComponent.Screen name={"Settings"} component={Settings} />
                <StackComponent.Screen name={"BasicInfo"} component={BasicInfo} />
                <StackComponent.Screen name={"About"} component={About} />
                <StackComponent.Screen name={"PrivacyPolicy"} component={PrivacyPolicy} />
                <StackComponent.Screen name={"TermsUse"} component={TermsUse} />
                <StackComponent.Screen name={"Notification"} component={Notification} />
                <StackComponent.Screen name={"ThemeMode"} component={ThemeMode} />
                <StackComponent.Screen name={"EditProfile"} component={EditProfile} />
                <StackComponent.Screen name={"ProfileDetail"} component={ProfileDetail} />
            </StackComponent.Navigator>
        </>
    );
};

export default BadooPages;