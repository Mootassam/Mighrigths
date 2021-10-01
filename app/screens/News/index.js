import React, { useState, useEffect, useCallback } from "react";
import { RefreshControl, View, Animated, Button, Platform } from "react-native";
import { BaseStyle, useTheme, authAxios } from "@config";
import { Header, SafeAreaView, HotelItem } from "@components";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import PushNotification, { Importance } from "react-native-push-notification";
import io from "socket.io-client";

export default function News({ navigation }) {
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const scrollAnim = new Animated.Value(0);
  const { t } = useTranslation();
  const [information, setInformation] = useState([]);
  const language = useSelector((state) => state.application.language);

  const onRefresh = useCallback(async () => {
    var socket;
    setRefreshing(true);

    await authAxios
      .get("/informations/news")
      .then((res) => {
        setInformation(res.data.record);

        setRefreshing(false);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  useEffect(() => {
    // this.socket = io(`http://172.16.224.150:8080`);
    PushNotification.configure({
      // (required) Called when a remote or local notification is opened or received

      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);

        if (notification.foreground) {
          PushNotification.localNotification({
            title: notification.title,
            message: notification.message,
          });
        }
      },
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },
      popInitialNotification: true,
      requestPermissions: Platform.OS === "ios",
    });
    onRefresh();
    // this.socket.on("refreshactivity", () => {
    //   onRefresh();
    //   LocalNotification();
    // });
  }, []);

  LocalNotification = () => {
    PushNotification.localNotification({
      autoCancel: true,
      bigText:
        "This is local notification demo in React Native app. Only shown, when expanded.",
      subText: "Local Notification Demo",
      title: "Local Notification Title",
      message: "Expand me to see more",
      vibrate: true,
      vibration: 300,
      playSound: true,
      ignoreInForeground: false,
      timeoutAfter: null,
      soundName: "default",
      actions: '["Yes", "No"]',
      channelId: "123",
    });
  };

  PushNotification.createChannel({
    channelId: "123", // (required)
    channelName: "test", // (required)
    channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
    playSound: false, // (optional) default: true
    soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
    importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
  });

  const ItemView = ({ item }) => {
    switch (language) {
      case "fr":
        return (
          <HotelItem
            block
            image={item.images[0]}
            name={item.titleFR}
            location={item.updatedAt}
            style={{
              paddingBottom: 10,
            }}
            onPress={() => {
              /* 1. Navigate to the Details route with params */
              navigation.navigate("HotelDetail", {
                infoId: item._id,
              });
            }}
          />
        );

        break;

      case "en":
        return (
          <HotelItem
            block
            image={item.images[0]}
            name={item.titreEN}
            location={item.updatedAt}
            style={{
              paddingBottom: 10,
            }}
            onPress={() => {
              /* 1. Navigate to the Details route with params */
              navigation.navigate("HotelDetail", {
                infoId: item._id,
              });
            }}
          />
        );

        break;
      case "ar":
        return (
          <HotelItem
            block
            image={item.images[0]}
            name={item.titreAR}
            location={item.updatedAt}
            style={{
              paddingBottom: 10,
            }}
            onPress={() => {
              /* 1. Navigate to the Details route with params */
              navigation.navigate("HotelDetail", {
                infoId: item._id,
              });
            }}
          />
        );
        break;
    }
  };

  /**
   * @description Open modal when view mode is pressed
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   */

  /**
   * @description Render container view
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @returns
   */
  const renderContent = () => {
    return (
      <View style={{ flex: 1 }}>
        <Animated.FlatList
          contentContainerStyle={{
            paddingTop: 1,
          }}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              initialNumToRender={6}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrollAnim,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          data={information}
          key={"block"}
          keyExtractor={(item, index) => item.id}
          renderItem={ItemView}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      <Header title={t("MIGRIGHTS")} />
      <View
        style={{
          marginTop: 6,
          borderBottomColor: "lightgray",
          borderBottomWidth: 0.4,
        }}
      />

      {renderContent()}
    </SafeAreaView>
  );
}
