import React, { useEffect, useState } from "react";
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import Navigator from "../../apps/W3Dating/pages/Index";
import { SafeAreaProvider } from "react-native-safe-area-context";
import themeContext from "../constants/themeContext";
import { COLORS } from "../constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
import messaging from "@react-native-firebase/messaging";
import { Alert } from "react-native";
import useNotificationHandler from "../../apps/W3Dating/Utilities/NotificationsHandler";

const Routes = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const authContext = React.useMemo(
    () => ({
      setDarkTheme: async () => {
        await setIsDarkTheme(true);
        await AsyncStorage.setItem("isDarkTheme", `1`);
      },
      setLightTheme: async () => {
        await setIsDarkTheme(false);
        await AsyncStorage.setItem("isDarkTheme", `0`);
      },
    }),
    [],
  );

  const [skipInitialLaunch, setSkipInitialLaunch] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  const checkFirstLaunch = async () => {
    try {
      //   await auth().signOut()
      const skipInitialLaunch = await AsyncStorage.getItem("skipInitialLaunch");
      setSkipInitialLaunch(skipInitialLaunch);
    } catch (error) {
      console.error("Error checking app launch status", error);
    }
  };
  const loadTheme = async () => {
    try {
      const storedTheme = await AsyncStorage.getItem("isDarkTheme");
      if (storedTheme !== null) {
        setIsDarkTheme(storedTheme === "1"); // Convert string back to boolean
      }
    } catch (error) {
      console.error("Error loading theme from AsyncStorage", error);
    }
  };
  const checkLoggedInUser = () => {
    return auth().onAuthStateChanged(async (user) => {
      if (user) {
        let idTokenResult;
        try {
          idTokenResult = await user.getIdTokenResult(true);
        } catch (error) {
          console.log("error", error);
        }
        if (idTokenResult) {
          setIsLoggedIn(true);
          setUser({ ...user, ...(idTokenResult?.claims || {}) });
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
      setInitialLoading(false);
    });
  };

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Permission granted:", authStatus);
    } else {
      Alert.alert("Push Notifications", "Please enable push notifications in settings.");
    }
  }
  useEffect(() => {
    checkFirstLaunch();
    loadTheme();
    requestUserPermission();
    const unsubscribeSession = checkLoggedInUser();
    return () => {
      unsubscribeSession();
    };
  }, []);

  // useEffect(() => {
  //   const unsubscribeOnMessage = messaging().onMessage(async (remoteMessage) => {
  //     Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body);
  //   });

  //   const unsubscribeOnNotificationOpened = messaging().onNotificationOpenedApp((remoteMessage) => {
  //     console.log("Notification opened from background:", remoteMessage);
  //   });

  //   // When the app is in a killed state
  //   messaging()
  //     .getInitialNotification()
  //     .then((remoteMessage) => {
  //       if (remoteMessage) {
  //         console.log("Notification caused app to open from quit state:", remoteMessage);
  //       }
  //     });

  //   return () => {
  //     unsubscribeOnMessage();
  //     unsubscribeOnNotificationOpened();
  //   };
  // }, []);

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      text: COLORS.text,
      textLight: "#a19fa8",
      title: COLORS.title,
      background: "#f5f5f5",
      bgLight: "#F0F0F0",
      card: COLORS.white,
      cardBg: COLORS.white,
      borderColor: COLORS.borderColor,
      themeBg: "#F4F6FF",
      bgGradient: ["#FFFBF6", "#FBE7DF"],
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      text: "#eff0f1",
      textLight: "#eff0f1",
      title: "#fff",
      background: "#18171c",
      bgLight: "rgba(255,255,255,.1)",
      card: "#3a4a91",
      cardBg: "#202126",
      borderColor: COLORS.darkBorder,
      themeBg: "#00092D",
      bgGradient: ["#2c3f6d", "#2c3f6d"],
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  useNotificationHandler();
  return (
    <SafeAreaProvider>
      <themeContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          <Navigator
            initialLoading={initialLoading}
            skipInitialLaunch={skipInitialLaunch}
            isLoggedIn={isLoggedIn}
            user={user}
          />
        </NavigationContainer>
      </themeContext.Provider>
    </SafeAreaProvider>
  );
};

export default Routes;
