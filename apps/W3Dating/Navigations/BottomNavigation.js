import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../pages/Home/Home";
import UserListing from "../pages/Likes/Likes";
import Chat from "../pages/Chats/Chat";
import Profile from "../pages/Profile/Profile";
import CustomNavigation from "./CustomNavigation";
import UsersMenu from "../pages/Likes/UsersMenu";
import { TouchableWithoutFeedback } from "react-native";

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomNavigation {...props} />}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="UserListing"
    >
      {/* <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarButton: (props) => <TouchableWithoutFeedback {...props} />,
        }}
      /> */}
      <Tab.Screen
        name="Cards"
        component={UserListing}
        options={{
          tabBarButton: (props) => <TouchableWithoutFeedback {...props} />,
        }}
      />
      <Tab.Screen
        name="Likes"
        component={UsersMenu}
        options={{
          tabBarButton: (props) => <TouchableWithoutFeedback {...props} />,
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarButton: (props) => <TouchableWithoutFeedback {...props} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarButton: (props) => <TouchableWithoutFeedback {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
