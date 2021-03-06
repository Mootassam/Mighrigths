import React, { useState, useEffect, useCallback } from "react";
import { RefreshControl, View, Animated, Alert } from "react-native";
import { BaseStyle, useTheme, authAxios } from "@config";
import { Header, SafeAreaView, Icon, HotelItem } from "@components";

import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function News({ navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const [information, setInformation] = useState([]);
  const language = useSelector((state) => state.application.language);
  const [offset, setOffset] = useState(6);

  const onScroll = useCallback(() => {
    setRefreshing(true);
    authAxios
<<<<<<< HEAD
      .get(`tenant/6156d6cac0c87c001e3f0a0b/informations`)
=======
      .get(`tenant/60c23344ec1ee231dd3178c0/informations`)
>>>>>>> e83d3c477adf1550fbd417d798a15ba60f66c03b
      .then((json) => {
        setInformation(json.data.rows);
        setRefreshing(false);
      })
      .catch((error) => {
        console.error(error);
        Alert.alert(
          "Sorry Something went wrong. Please try again",
          error.message,
          [
            // {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
            { text: "Try again", onPress: this.getData },
          ],
          { cancelable: false }
        );
      });
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    authAxios
<<<<<<< HEAD
      .get(`tenant/6156d6cac0c87c001e3f0a0b/informations?limit=${offset}`)
=======
      .get(`tenant/60c23344ec1ee231dd3178c0/informations?limit=${offset}`)
>>>>>>> e83d3c477adf1550fbd417d798a15ba60f66c03b
      .then((json) => {
        setOffset(offset + 6);
        setInformation(json.data.rows);
        setRefreshing(false);
      })
      .catch((error) => {
        console.error(error);
        Alert.alert(
          "Sorry Something went wrong. Please try again",
          error.message,
          [
            // {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
            { text: "Try again", onPress: this.getData },
          ],
          { cancelable: false }
        );
      });
  });

  useEffect(() => onRefresh(), []);

  const scrollAnim = new Animated.Value(0);

  /**
   * @description Open modal when filterring mode is applied
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   */

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
          onEndReached={onScroll}
          onEndReachedThreshold={0.5}
          renderItem={ItemView}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      <Header
        title={t("MIGRIGHTS")}
        subTitle=''
        renderRight={() => {
          return <Icon name='search' size={22} color={colors.primary} />;
        }}
        renderLeft={() => {
          return <Icon name='th' size={22} color={colors.primary} />;
        }}
        onPressRight={() => {
          navigation.navigate("SearchHistory");
        }}
        onPressLeft={() => {
          navigation.navigate("Categories");
        }}
      />
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
