import React, { useState, useEffect, useRef } from "react";
import { TabView, TabBar } from "react-native-tab-view";
import { useTranslation } from "react-i18next";
import styles from "./styles";
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  ListThumbCircle,
  Image,
  Tag,
} from "@components";
import {
  ScrollView,
  View,
  FlatList,
  InteractionManager,
  Platform,
  PermissionsAndroid,
} from "react-native";
import { BaseStyle, BaseColor, useTheme, BaseSetting, Images } from "@config";
import { useSelector, useDispatch } from "react-redux";
import Snackbar from "react-native-snackbar";
import RNFetchBlob from "rn-fetch-blob";
import AnimatedLoader from "react-native-animated-loader";
import VideoPlayer from "react-native-video-player";

export default function BusSearch({ navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "preview", title: t("detail") },
    { key: "media", title: t("attachment") },
  ]);

  // When tab is activated, set what's index value
  const handleIndexChange = (index) => {
    setIndex(index);
  };

  // Customize UI tab bar
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={[styles.indicator, { backgroundColor: colors.primary }]}
      style={[styles.tabbar, { backgroundColor: colors.background }]}
      tabStyle={styles.tab}
      inactiveColor={BaseColor.grayColor}
      activeColor={colors.text}
      renderLabel={({ route, focused, color }) => (
        <View style={{ flex: 1, alignItems: "center", width: 150 }}>
          <Text headline semibold={focused} style={{ color }}>
            {route.title}
          </Text>
        </View>
      )}
    />
  );

  // Render correct screen container when tab is activated
  const renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case "preview":
        return <PreviewTab jumpTo={jumpTo} navigation={navigation} />;
      case "media":
        return <MediaTab jumpTo={jumpTo} navigation={navigation} />;
    }
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      <Header
        title={t("detail")}
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
      <TabView
        lazy
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={handleIndexChange}
      />
    </SafeAreaView>
  );
}

/**
 * @description Show when tab Preview activated
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @class PreviewTab
 * @extends {Component}
 */
function PreviewTab() {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const [language, setLanguage] = useState(i18n.language);
  const testimony = useSelector((state) => state.media.testimony_id);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView
          forceInset={{ top: "always" }}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1 }}>
            <Text body1 semibold style={[styles.textView, { marginTop: 10 }]}>
              {t("category")}
            </Text>
            {language === "fr" ? (
              <Text style={[styles.textArea]} textAlignVertical='top'>
                {testimony.category.titleFR}
              </Text>
            ) : null}
            {language === "en" ? (
              <Text style={[styles.textArea]} textAlignVertical='top'>
                {testimony.category.titleEN}
              </Text>
            ) : null}
            {language === "ar" ? (
              <Text style={[styles.textArea]} textAlignVertical='top'>
                {testimony.category.titleAR}
              </Text>
            ) : null}
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 6 }}>
                <Text body1 semibold style={styles.textView}>
                  {t("region")}
                </Text>
                <Text style={[styles.textArea]} textAlignVertical='top'>
                  {testimony.region}
                </Text>
              </View>
            </View>
            <View>
              <Text body1 semibold style={styles.textView}>
                {t("description")}
              </Text>
              <Text
                style={[styles.textArea, { height: 100 }]}
                textAlignVertical='top'>
                {testimony.description}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

/**
 * @description Show when tab Confirm activated
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @class PreviewTab
 * @extends {Component}
 */
function MediaTab() {
  const tenantId = useSelector((state) => state.media.tenant_id);
  const SERVER_URL_TESTIMONY =
    BaseSetting.apiUrl + "/api/tenant/" + tenantId + "/testimony";
  const testimony = useSelector((state) => state.media.testimony_id);
  const images = useSelector((state) => state.media.images);
  const video = useSelector((state) => state.media.video);
  const files = useSelector((state) => state.media.files);
  const audio = useSelector((state) => state.media.audio);

  const currentUser = useSelector((state) => state.media.user_id);
  const token = useSelector((state) => state.media.token);

  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { t } = useTranslation();

  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const checkPermission = async (filename) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Storage Permission Required",
          message: "Application needs access to your storage to download File",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Start downloading
        downloadFile(filename);
      } else {
        // If permission denied then show alert
      }
    } catch (err) {
      setLoading2(false);
    }
  };

  const downloadFile = (filename) => {
    setLoading2(true);
    // Get today's date to add the time suffix in filename
    let date = new Date();
    // File URL which we want to download
    let FILE_URL = filename;
    // Function to get extention of the file url
    let file_ext = getFileExtention(FILE_URL);

    file_ext = "." + file_ext[0];

    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const { config, fs } = RNFetchBlob;
    let RootDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path:
          RootDir +
          "/file_" +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          file_ext,
        description: "downloading file...",
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,
      },
    };
    config(options)
      .fetch("GET", FILE_URL)
      .then((res) => {
        // Alert after successful downloading
        Snackbar.show({
          text: `${t("Filesuccessful")}`,
          duration: Snackbar.LENGTH_LONG,
        }),
          setLoading2(false);
      });
  };

  const getFileExtention = (fileUrl) => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView
          forceInset={{ top: "always" }}
          contentContainerStyle={{ flexGrow: 1 }}>
          {loading2 ? (
            <AnimatedLoader
              visible={true}
              overlayColor='rgba(255,255,255,0.75)'
              source={require("../../assets/images/8447-loader-animation.json")}
              animationStyle={styles.lottie}
              speed={1}>
              <Text>{t("loading")}</Text>
            </AnimatedLoader>
          ) : null}
          {testimony.images.length !== 0 ? (
            <View style={styles.titleView}>
              <Text title3 semibold>
                {t("image")}
              </Text>
              <FlatList
                columnWrapperStyle={{ alignSelf: "center" }}
                numColumns={2}
                data={testimony.images}
                extraData={refresh}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item, index }) => (
                  // <View style={styles.contentView}>
                  <Image
                    source={{
                      uri:
                        BaseSetting.apiUrl +
                        "/api/file/download?privateUrl=" +
                        item.privateUrl,
                    }}
                    style={styles.roundedImage}
                  />
                  // </View>
                )}
              />
            </View>
          ) : null}

          {testimony.videos.length !== 0 ? (
            <View style={styles.titleView}>
              <Text title3 semibold>
                {t("video")}
              </Text>
              <VideoPlayer
                video={{
                  uri:
                    BaseSetting.apiUrl +
                    "/api/file/download?privateUrl=" +
                    testimony.videos[0].privateUrl,
                }}
                thumbnail={{
                  uri:
                    BaseSetting.apiUrl +
                    "/api/file/download?privateUrl=" +
                    testimony.videos[0].privateUrl,
                }}
                endThumbnail={{
                  uri:
                    BaseSetting.apiUrl +
                    "/api/file/download?privateUrl=" +
                    testimony.videos[0].privateUrl,
                }}
              />
            </View>
          ) : null}
          {testimony.audio.length !== 0 ? (
            <View style={styles.titleView}>
              <Text title3 semibold>
                {t("audio")}
              </Text>

              <View
                style={{
                  paddingHorizontal: 20,
                  paddingTop: 20,
                  paddingBottom: 10,
                }}>
                <VideoPlayer
                  video={{
                    uri:
                      BaseSetting.apiUrl +
                      "/api/file/download?privateUrl=" +
                      testimony.audio[0].privateUrl,
                  }}
                  thumbnail={{
                    uri:
                      BaseSetting.apiUrl +
                      "/api/file/download?privateUrl=" +
                      testimony.audio[0].privateUrl,
                  }}
                  endThumbnail={{
                    uri:
                      BaseSetting.apiUrl +
                      "/api/file/download?privateUrl=" +
                      testimony.audio[0].privateUrl,
                  }}
                />
              </View>
            </View>
          ) : null}

          {testimony.documents.length !== 0 ? (
            <View style={styles.titleView}>
              <Text title3 semibold>
                {t("file")}
              </Text>
              {testimony.documents.map((item, key) => (
                <View key={key}>
                  <ListThumbCircle
                    txtContent={item.name}
                    onPress={() => {
                      checkPermission(
                        BaseSetting.apiUrl +
                          "/api/file/download?privateUrl=" +
                          item.privateUrl
                      );
                    }}
                  />
                </View>
              ))}
            </View>
          ) : null}
        </ScrollView>
      </View>
    </View>
  );
}
