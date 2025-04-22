import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigation from '../Navigations/DrawerNavigation';
import OnBoarding from './Splash/OnBoarding';
import PhoneNumber from './PhoneNumber';
import EnterCode from './EnterCode';
import FirstName from './FirstName';
import EnterBirthDate from './EnterBirthDate';
import YourGender from './YourGender';
import Orientation from './Orientation';
import Intrested from './Intrested';
import LookingFor from './LookingFor';
import RecentPics from './RecentPics';
import SingleChat from './Chats/SingleChat';
import EditProfile from './Profile/EditProfile';
import Settings from './Settings';
import ProfileDetails from './Likes/ProfileDetails';
import VideoCall from './Chats/VideoCall';
import Story from './Home/Story';
import Status from './Home/Status';

const StackComponent = createNativeStackNavigator();

const W3BumblePage = () => {
    return (
        <>
            <StackComponent.Navigator
                initialRouteName={"DrawerNavigation"}
                detachInactiveScreens={true}
                screenOptions={{
                    headerShown: false,
                    cardStyle: { backgroundColor: "transparent" },
                }}
            >
                <StackComponent.Screen name={"DrawerNavigation"} component={DrawerNavigation} />
                <StackComponent.Screen name={"OnBoarding"} component={OnBoarding} />
                <StackComponent.Screen name={"PhoneNumber"} component={PhoneNumber} />
                <StackComponent.Screen name={"EnterCode"} component={EnterCode} />
                <StackComponent.Screen name={"FirstName"} component={FirstName} />
                <StackComponent.Screen name={"EnterBirthDate"} component={EnterBirthDate} />
                <StackComponent.Screen name={"YourGender"} component={YourGender} />
                <StackComponent.Screen name={"Orientation"} component={Orientation} />
                <StackComponent.Screen name={"Intrested"} component={Intrested} />
                <StackComponent.Screen name={"LookingFor"} component={LookingFor} />
                <StackComponent.Screen name={"RecentPics"} component={RecentPics} />
                <StackComponent.Screen name={"SingleChat"} component={SingleChat} />
                <StackComponent.Screen name={"VideoCall"} component={VideoCall} />
                <StackComponent.Screen name={"EditProfile"} component={EditProfile} />
                <StackComponent.Screen name={"Settings"} component={Settings} />
                <StackComponent.Screen name={"ProfileDetails"} component={ProfileDetails} />
                <StackComponent.Screen name={"Story"} component={Story} />
                <StackComponent.Screen name={"Status"} component={Status} />
            </StackComponent.Navigator>
        </>
    );
};

export default W3BumblePage;