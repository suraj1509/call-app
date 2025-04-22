import React from "react";
import { useTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomNavigation from "./CustomNavigation";
import Home from "../Screens/Home";
import Components from "../Screens/Components/Components";
import Reels from "../Screens/Components/Reels";
import Settings from "../Screens/Settings";
import Apps from "../Screens/Apps";
import { SafeAreaView } from "react-native";

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  const { colors } = useTheme();

  const theme = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.cardBg,
      }}
    >
      <Tab.Navigator
        tabBar={(props) => <CustomNavigation {...props} />}
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Home"
      >
        <Tab.Screen name="Components" component={Components} />
        <Tab.Screen name="Media" component={Reels} />
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Apps" component={Apps} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default BottomNavigation;
