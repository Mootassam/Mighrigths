import React, { useEffect } from "react";
import { store, persistor } from "app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Navigator from "./navigation";
import messaging from "@react-native-firebase/messaging";
console.disableYellowBox = true;

export default function App() {
  useEffect(() => {
    messaging().onMessage(async (remoteMessage) => {
      console.log("A new FCM message arrived!", JSON.stringify(remoteMessage));
    });
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        JSON.stringify(remoteMessage)
      );
      messaging()
        .getInitialNotification()
        .then((remoteMessage) => {
          if (remoteMessage) {
            console.log(
              "Notification caused app to open from quit state:",
              JSON.stringify(remoteMessage)
            );
          }
        });
    });
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigator />
      </PersistGate>
    </Provider>
  );
}
