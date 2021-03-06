import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { FlatList, View, TouchableOpacity } from "react-native";
import { BaseStyle, useTheme, authAxios } from "@config";
import { Header, SafeAreaView, Icon, Text } from "@components";
import styles from "./styles";
import { useTranslation } from "react-i18next";
export default function Categories({ navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const language = useSelector((state) => state.application.language);
  const [refreshing, setRefreshing] = useState(false);
  const [category, setcategory] = useState("");
  const [count, setCount] = useState("");
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    authAxios
<<<<<<< HEAD
      .get(`tenant/6156d6cac0c87c001e3f0a0b/information-category`)
=======
      .get(`tenant/60c23344ec1ee231dd3178c0/information-category`)
>>>>>>> e83d3c477adf1550fbd417d798a15ba60f66c03b
      .then((json) => {
        setcategory(json.data.rows);
        setCount(json.data.count);
        setRefreshing(false);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  useEffect(() => {
    onRefresh();
  }, []);
  const ItemView = ({ item }) => {
    if (language === "fr") {
      return (
        <TouchableOpacity
          style={[styles.item, { borderBottomColor: colors.border }]}
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            navigation.navigate("Hotel", {
              infoId: item._id,
              Nom: item.titleFR,
            });
          }}>
          <View style={{ flexDirection: "row" }}>
            <Icon
              color={colors.primary}
              size={18}
              solid
              style={{ marginHorizontal: 10 }}
            />
            <Text body1>{item.titleFR}</Text>
          </View>

          <Icon
            name='angle-right'
            size={18}
            color={colors.primary}
            enableRTL={true}
          />
        </TouchableOpacity>
      );
    } else if (language === "en") {
      return (
        <TouchableOpacity
          style={[styles.item, { borderBottomColor: colors.border }]}
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            navigation.navigate("Hotel", {
              infoId: item._id,
              Nom: item.titleEN,
            });
          }}>
          <View style={{ flexDirection: "row" }}>
            <Icon
              color={colors.primary}
              size={18}
              solid
              style={{ marginHorizontal: 10 }}
            />
            <Text body1>{item.titleEN}</Text>
          </View>

          <Icon
            name='angle-right'
            size={18}
            color={colors.primary}
            enableRTL={true}
          />
        </TouchableOpacity>
      );
    } else if (language === "ar") {
      return (
        <TouchableOpacity
          style={[styles.item, { borderBottomColor: colors.border }]}
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            navigation.navigate("Hotel", {
              infoId: item._id,
              Nom: item.titleAR,
            });
          }}>
          <View style={{ flexDirection: "row" }}>
            <Icon
              color={colors.primary}
              size={18}
              solid
              style={{ marginHorizontal: 10 }}
            />
            <Text body1>{item.titleAR}</Text>
          </View>

          <Icon
            name='angle-right'
            size={18}
            color={colors.primary}
            enableRTL={true}
          />
        </TouchableOpacity>
      );
    }
  };
  return (
    <View style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      <Header
        title={t("All Categories")}
        subTitle={`${t("results")} ${count}`}
        renderLeft={() => {
          return (
            <Icon
              name='arrow-left'
              size={20}
              color={colors.primary}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />

      <FlatList
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 10,
        }}
        onRefresh={onRefresh}
        refreshing={refreshing}
        data={category}
        keyExtractor={(item, index) => index.toString()}
        renderItem={ItemView}
      />
    </View>
  );
}
