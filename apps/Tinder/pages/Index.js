import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoarding from './OnBoarding';
import PhoneNumber from './PhoneNumber';
import EnterCode from './EnterCode';
import WelcomePolicy from './WelcomePolicy';
import FirstName from './FirstName';
import EnterBirthDate from './EnterBirthDate';
import YourGender from './YourGender';
import Orientation from './Orientation';
import Intrested from './Intrested';
import LookingFor from './LookingFor';
import YouInto from './YouInto';
import RecentPics from './RecentPics';
import DrawerNavigation from '../Navigations/DrawerNavigation';
import SingleChat from './Chat/SingleChat';
import ProfileDetails from './Spot/ProfileDetails';
import Settings from './Settings/Settings';
import EditProfile from './Profile/EditProfile';
import Subscriptions from './Subscriptions';

const StackComponent = createNativeStackNavigator();

const TinderPage = () => {
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
                <StackComponent.Screen name={"OnBoarding"} component={OnBoarding} />
                <StackComponent.Screen name={"PhoneNumber"} component={PhoneNumber} />
                <StackComponent.Screen name={"EnterCode"} component={EnterCode} />
                <StackComponent.Screen name={"WelcomePolicy"} component={WelcomePolicy} />
                <StackComponent.Screen name={"FirstName"} component={FirstName} />
                <StackComponent.Screen name={"EnterBirthDate"} component={EnterBirthDate} />
                <StackComponent.Screen name={"YourGender"} component={YourGender} />
                <StackComponent.Screen name={"Orientation"} component={Orientation} />
                <StackComponent.Screen name={"Intrested"} component={Intrested} />
                <StackComponent.Screen name={"LookingFor"} component={LookingFor} />
                <StackComponent.Screen name={"YouInto"} component={YouInto} />
                <StackComponent.Screen name={"RecentPics"} component={RecentPics} />
                <StackComponent.Screen name={"SingleChat"} component={SingleChat} />
                <StackComponent.Screen name={"ProfileDetails"} component={ProfileDetails} />
                <StackComponent.Screen name={"Settings"} component={Settings} />
                <StackComponent.Screen name={"EditProfile"} component={EditProfile} />
                <StackComponent.Screen name={"Subscriptions"} component={Subscriptions} />
            </StackComponent.Navigator>
        </>
    );
};

export default TinderPage;