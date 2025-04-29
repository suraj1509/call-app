import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Home from "../pages/Home/Home";
import Home from "../pages/Likes/Home";
import History from "../pages/Likes/History";
import Profile from "../pages/Profile/Profile";
import CustomNavigation from "./CustomNavigation";
import Credit from "../pages/Likes/Credit";
import { TouchableWithoutFeedback } from "react-native";

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomNavigation {...props} />}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      {/* <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarButton: (props) => <TouchableWithoutFeedback {...props} />,
        }}
      /> */}
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarButton: (props) => <TouchableWithoutFeedback {...props} />,
        }}
      />
      <Tab.Screen
        name="Credit"
        component={Credit}
        options={{
          tabBarButton: (props) => <TouchableWithoutFeedback {...props} />,
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
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
