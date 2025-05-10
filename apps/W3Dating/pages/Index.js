import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigation from "../Navigations/DrawerNavigation";
import OnBoarding from "./Splash/OnBoarding";
import PhoneNumber from "./PhoneNumber";
import EnterCode from "./EnterCode";
// import FirstName from "./FirstName";
// import EnterBirthDate from "./EnterBirthDate";
// import YourGender from "./YourGender";
// import Orientation from "./Orientation";
// import Languages from "./Languages";
// import ReferalCode from "./ReferalCode";
// import RecentPics from "./RecentPics";
import SingleChat from "./Chats/SingleChat";
// import Filter from "./Filter";
import EditProfile from "./Profile/EditProfile";
// import Settings from "./Settings";
import AuthOptions from "../../Tinder/pages/OnBoarding";
// import CurrentAddress from "./CurrentAddress";
import ProfileDetails from "./Likes/ProfileDetails";
import Status from "./Home/Status";
// import Notifications from "./Notifications";
// import Languages from "./Languages";
import CurrentUserProfileDetails from "./Profile/CurrentUserProfileDetails";
// import Location from "./Location";
import { check, PERMISSIONS, RESULTS } from "react-native-permissions";
import Geolocation from "react-native-geolocation-service";
import * as services from "../../../services/user";
import Stories from "./Stories/Stories";
import SocialConnect from "../Utilities/SocialConnect";
import VideoCall from "../../W3Bumble/pages/Chats/VideoCall";
import database, { onValue, set } from "@react-native-firebase/database";
import SocialConnectResponse from "../Utilities/SocialConnectResponse";
import { useNavigation } from "@react-navigation/native";
import Form from "./Form";
import Earnings from "./Likes/Earnings";
import EarningDetails from "./Likes/EarningDetails";
import Review from "./Likes/Review";
import Support from "./Likes/Support";
import Notifications from "./Likes/Notifications";
import Rating from "./Likes/Rating";
import BlockUser from "./Likes/BlockUser";
import BlockedUsers from "./Likes/BlockedUsers";
import ReportUser from "./Likes/ReportUser";
import Transactions from "./Likes/Transactions";

const StackComponent = createNativeStackNavigator();

export const getOnboardingScreen = async (stage = 1) => {
    switch (stage) {
      case 1:
        return "Form";
      default:
        return "DrawerNavigation";
    }
};

const W3DatingPage = ({ initialLoading = false, skipInitialLaunch = false, isLoggedIn = false, user = null }) => {
  const [initialRoute, setInitialRoute] = useState(null);
  const navigation = useNavigation();
  const userConnectRef = database().ref(`connect/${user?.id}`);

  useEffect(() => {
    if (!user?.id) return; 
    const onValueChange = userConnectRef.on('value', snapshot => {
      if (snapshot.exists()) {
        navigation.navigate('SocialConnectResponse',{data: {...snapshot.val(), id: user?.id, userId: snapshot?.val()?.id}});
      }
    });
    return () => {
      userConnectRef.off('value', onValueChange);
    };
  }, [user?.id, userConnectRef]);

  
  useEffect(() => {
    const determineInitialRoute = async () => {
      if (initialLoading) return;

      if (!skipInitialLaunch) {
        setInitialRoute("OnBoarding");
      } else if (isLoggedIn) {
        if (!user?.isOnboardingCompleted) {
          setInitialRoute("Form");
        } else {
          setInitialRoute("DrawerNavigation");
        }
      } else {
        setInitialRoute("AuthOptions");
      }
    };

    determineInitialRoute();
  }, [initialLoading, skipInitialLaunch, isLoggedIn, user]);

  if (!initialRoute) return null;

  return (
    <>
      <StackComponent.Navigator
        initialRouteName={initialRoute}
        detachInactiveScreens={true}
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "transparent" },
        }}
      >
        <StackComponent.Screen name={"AuthOptions"} component={AuthOptions} />
        <StackComponent.Screen name={"DrawerNavigation"} component={DrawerNavigation} />
        <StackComponent.Screen name={"OnBoarding"} component={OnBoarding} />
        <StackComponent.Screen name={"PhoneNumber"} component={PhoneNumber} />
        <StackComponent.Screen name={"EnterCode"} component={EnterCode} />
        {/* <StackComponent.Screen name={"FirstName"} component={FirstName} /> */}
        {/* <StackComponent.Screen name={"EnterBirthDate"} component={EnterBirthDate} />
        <StackComponent.Screen name={"YourGender"} component={YourGender} /> */}
        {/* <StackComponent.Screen name={"Orientation"} component={Orientation} /> */}
        {/* <StackComponent.Screen name={"ReferalCode"} component={ReferalCode} /> */}
        {/* <StackComponent.Screen name={"CurrentAddress"} component={CurrentAddress} /> */}
        {/* <StackComponent.Screen name={"RecentPics"} component={RecentPics} />
        <StackComponent.Screen name={"Location"} component={Location} /> */}
        <StackComponent.Screen name={"SingleChat"} component={SingleChat} />
         {/* <StackComponent.Screen name={"Filter"} component={Filter} /> */}
        {/*<StackComponent.Screen name={"Notifications"} component={Notifications} /> */}
        {/* <StackComponent.Screen name={"Languages"} component={Languages} /> */}
        <StackComponent.Screen name={"EditProfile"} component={EditProfile} />
        <StackComponent.Screen name={"Transactions"} component={Transactions} />
        <StackComponent.Screen name={"BlockUser"} component={BlockUser} />
        <StackComponent.Screen name={"BlockedUsers"} component={BlockedUsers} />
        <StackComponent.Screen name={"ReportUser"} component={ReportUser} />
        <StackComponent.Screen name={"Notifications"} component={Notifications} />
        <StackComponent.Screen name={"Support"} component={Support} />
        <StackComponent.Screen name={"Review"} component={Review} />
        <StackComponent.Screen name={"Rating"} component={Rating} />
        <StackComponent.Screen name={"Earnings"} component={Earnings} />
        <StackComponent.Screen name={"EarningDetails"} component={EarningDetails} />
        {/* <StackComponent.Screen name={"Settings"} component={Settings} /> */}
        <StackComponent.Screen name={"ProfileDetails"} component={ProfileDetails} />
        <StackComponent.Screen name={"CurrentUserProfileDetails"} component={CurrentUserProfileDetails} />
        <StackComponent.Screen name={"Status"} component={Status} />
        <StackComponent.Screen name={"SocialConnect"} component={SocialConnect}/>
        <StackComponent.Screen name={"SocialConnectResponse"} component={SocialConnectResponse}/>
        <StackComponent.Screen name={"Stories"} component={Stories} />
        <StackComponent.Screen name={"Form"} component={Form} />
      </StackComponent.Navigator>
    </>
  );
};

export default W3DatingPage;
