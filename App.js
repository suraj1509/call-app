import React from "react";
import Routes from "./app/Navigations/Routes";
import { Provider } from "react-redux";
import store from "./redux/Store";
import CodePush from "react-native-code-push";
// import database from "@react-native-firebase/database";
// import {
//   createAgoraRtcEngine,
//   ChannelProfileType,
//   ClientRoleType,
//   IRtcEngine,
//   RtcSurfaceView,
//   RtcConnection,
//   IRtcEngineEventHandler,
// } from 'react-native-agora';

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START, // Check for updates when the app starts
  installMode: CodePush.InstallMode.ON_NEXT_RESTART, // Install updates when the app restarts
};

// // const db = firebase.app().database(config.firebase.REALTIME_DATABASE_URL)
// const appId = '2b6418eee4074ad685c6b404f547c796';

// const setupVideoSDKEngine = async () => {
//     if (Platform.OS === 'android') { await getPermission(); }
//     agoraEngineRef.current = createAgoraRtcEngine();
//     const agoraEngine = agoraEngineRef.current;
//     await agoraEngine.initialize({ appId: appId });
// };

// In your App.tsx or index.js
const originalWarn = console.warn;
console.warn = (message, ...args) => {
  if (
    typeof message === "string" &&
    message.includes("namespaced API") // Filter this specific warning
  ) {
    return;
  }
  originalWarn(message, ...args);
};


const App = () => {
  // React.useEffect(() => {
  //   try {
  //     database().setPersistenceEnabled(false);
  //   } catch (error) {
  //     console.warn("Offline persistence not supported:", error.message);
  //   }
  // }, []);

  return (
    <>
      <Provider store={store}>
        <Routes />
      </Provider>
    </>
  );
};

export default CodePush(codePushOptions)(App);
