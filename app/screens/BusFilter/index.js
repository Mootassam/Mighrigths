import React, { useState, useEffect } from "react";
import { useTheme, BaseSetting, Images } from "@config";
import { useTranslation } from "react-i18next";

import { useSelector, useDispatch } from "react-redux";
import { MediaActions } from "@actions";

import { ScrollView, View, FlatList } from "react-native";
import { Picker } from "@react-native-community/picker";
import {
  Header,
  TextInput,
  Icon,
  Text,
  Button,
  EventCard,
  ListThumbCircle,
} from "@components";
import { styles } from "./styles";

import { FAB, Portal, Provider } from "react-native-paper";
import Axios from "axios";
import AnimatedLoader from "react-native-animated-loader";
import Snackbar from "react-native-snackbar";
import VideoPlayer from "react-native-video-player";

export default function BusFilter({ navigation }) {
  const tenantId = useSelector((state) => state.media.tenant_id);

  const SERVER_URL_TESTIMONY = "/tenant/" + tenantId + "/testimony";
  const SERVER_URL_TESTIMONY_CATEGORY =
    "/tenant/" + tenantId + "/testimony-category";

  const images = useSelector((state) => state.media.images);
  const video = useSelector((state) => state.media.video);
  const files = useSelector((state) => state.media.files);
  const audio = useSelector((state) => state.media.audio);
  const currentUser = useSelector((state) => state.media.user_id);
  const token = useSelector((state) => state.media.token);

  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [sendingTestimony, setSendingTestimony] = useState(false);
  const [region, setRegion] = useState("");
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

<<<<<<< HEAD
=======
  var socket;
  useEffect(() => {
    this.socket = io(`http://172.16.224.150:8080`);
  }, []);

>>>>>>> e83d3c477adf1550fbd417d798a15ba60f66c03b
  useEffect(() => {
    getCategories();
  }, []);

  const authAxios = Axios.create({
    baseURL: BaseSetting.apiUrl + "/api",
    timeout: 1800,
  });

  authAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      return Promise.reject(error.response);
    }
  );

  const getCategories = async () => {
    try {
      await authAxios
        .get(SERVER_URL_TESTIMONY_CATEGORY, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "Accept-Language": language === "fr" ? "es" : language,
          },
        })
        .then((res) => {
          setCategories(res.data.rows);
        });
    } catch (error) {
      Snackbar.show({
        text: error.data,
        duration: Snackbar.LENGTH_LONG,
        action: {
          text: t("tryAgain"),
          textColor: "green",
          onPress: () => {
            navigation.goBack();
          },
        },
      });
    }
  };

  removeFile = async (index) => {
    dispatch(MediaActions.onRemoveFile(index));
    setRefresh(!refresh);
  };

  reset = () => {
    setDescription("");
    setCategory("");
    setRegion("");
    dispatch(MediaActions.onResetMedia());
    setRefresh(!refresh);
  };

  getFilenameFromUrl = (url) => {
    const index = url.lastIndexOf("/");
    return -1 !== index ? url.substring(index + 1) : url;
  };

  const getCredentials = async (file, storageId) => {
    return authAxios.get("/tenant/" + tenantId + "/file/credentials", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Accept-Language": language === "fr" ? "es" : language,
      },
      params: {
        filename: file.name,
        storageId: storageId,
      },
    });
  };

  const uploadToServer = async (file, data) => {
    try {
      const url = data.data.uploadCredentials.url.replace(
        "http://localhost:8080",
        BaseSetting.apiUrl
      );
      const formData = new FormData();
      for (const [key, value] of Object.entries(
        data.data.uploadCredentials.fields || {}
      )) {
        formData.append(key, value);
      }
      formData.append("file", file);
      return authAxios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
          "Accept-Language": language === "fr" ? "es" : language,
        },
      });
      // .then(() =>
      //   setSendingTestimony(false)
      // )
    } catch (error) {
      setSendingTestimony(false);
      console.error(error);
      alert(
        t("error"),
        error.message,
        [{ text: t("tryAgain"), onPress: this.getData }],
        { cancelable: false }
      );
    }
  };

  uploadPicture = () => {
    navigation.navigate("CheckOut");
  };
  uploadFile = () => {
    navigation.navigate("Coupons");
  };
  uploadVideo = () => {
    navigation.navigate("More");
  };

  uploadAudio = () => {
    navigation.navigate("OurService");
  };

  removePhoto = async (index) => {
    dispatch(MediaActions.onRemoveImage(index));
    setRefresh(!refresh);
  };
  removeFile = async (index) => {
    dispatch(MediaActions.onRemoveFile(index));
    setRefresh(!refresh);
  };
  removeVideo = async () => {
    dispatch(MediaActions.onAddVideo(null));
    setRefresh(!refresh);
  };
  removeAudio = async () => {
    dispatch(MediaActions.onAddAudio(null));
    setRefresh(!refresh);
  };

  saveTestimony = async () => {
    setSendingTestimony(true);
    let documents = [];
    if (files !== null) {
      for (let i = 0; i < files.length; i++) {
        const data = await getCredentials(files[i], "testimonyDocuments");
        uploadToServer(files[i], data);
        documents.push({
          name: files[i].name,
          privateUrl: data.data.privateUrl,
          publicUrl: "",
        });
      }
    }

    let imgs = [];
    if (images !== null) {
      for (let i = 0; i < images.length; i++) {
        const data = await getCredentials(images[i], "testimonyImages");
        uploadToServer(images[i], data);
        imgs.push({
          name: this.getFilenameFromUrl(images[i].uri),
          privateUrl: data.data.privateUrl,
          publicUrl: "",
        });
      }
    }
    let vid = [];
    if (video !== null) {
      const data = await getCredentials(video, "testimonyVideos");
      uploadToServer(video, data);
      vid.push({
        name: video.name,
        privateUrl: data.data.privateUrl,
        publicUrl: "",
      });
    }

    let aud = [];
    if (audio !== null) {
      const data = await getCredentials(audio, "testimonyAudio");
      uploadToServer(audio, data);
      aud.push({
        name: audio.name,
        privateUrl: data.data.privateUrl,
        publicUrl: "",
      });
    }

    const data = {
      data: {
        description: description,
        category: category,
        testimonyType: "assistance",
        images: imgs,
        videos: vid,
        audio: aud,
        documents: documents,
        region: region,
        priority: "low",
        status: "waiting",
        anonymous: false,
      },
    };
    try {
      await authAxios
        .post(SERVER_URL_TESTIMONY, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "Accept-Language": language === "fr" ? "es" : language,
          },
        })
        .then(() => {
          setSendingTestimony(false),
            this.reset(),
            Snackbar.show({
              text: t("assistanceSaved"),
              duration: Snackbar.LENGTH_LONG,
            }),
            navigation.navigate("BusList");
        });
    } catch (error) {
      setSendingTestimony(false),
        Snackbar.show({
          text: error.data,
          duration: Snackbar.LENGTH_LONG,
          action: {
            text: t("tryAgain"),
            textColor: "green",
            onPress: () => {
              navigation.goBack();
            },
          },
        });
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView
          forceInset={{ top: "always" }}
          contentContainerStyle={{ flexGrow: 1 }}>
          <Header
            style={styles.title}
            title={t("assistance")}
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
            renderRight={() => {
              return (
                <Icon
                  name='redo-alt'
                  size={20}
                  color={colors.primary}
                  enableRTL={true}
                />
              );
            }}
            onPressLeft={() => {
              navigation.goBack();
            }}
            onPressRight={() => this.reset()}
          />
          {sendingTestimony ? (
            <AnimatedLoader
              visible={true}
              overlayColor='rgba(255,255,255,0.75)'
              source={require("../../assets/images/8447-loader-animation.json")}
              animationStyle={styles.lottie}
              speed={1}>
              <Text>{t("loading")}</Text>
            </AnimatedLoader>
          ) : null}
          <Text headline semibold style={{ margin: 10 }}>
            {t("detail")}
          </Text>
          <View style={{ height: 50 }}>
            <View style={styles.picker2}>
              {language === "fr" ? (
                <Picker
                  style={styles.picker}
                  selectedValue={category}
                  onValueChange={(itemValue, itemIndex) =>
                    setCategory(itemValue)
                  }>
                  <Picker.Item label='Cat??gorie' value='' />
                  {categories.map((cat) => (
                    <Picker.Item label={cat.titleFR} value={cat._id} />
                  ))}
                </Picker>
              ) : null}
              {language === "ar" ? (
                <Picker
                  style={styles.picker}
                  selectedValue={category}
                  onValueChange={(itemValue, itemIndex) =>
                    setCategory(itemValue)
                  }>
                  <Picker.Item label='??????????????' value='' />
                  {categories.map((cat) => (
                    <Picker.Item label={cat.titleAR} value={cat._id} />
                  ))}
                </Picker>
              ) : null}
              {language === "en" ? (
                <Picker
                  style={styles.picker}
                  selectedValue={category}
                  onValueChange={(itemValue, itemIndex) =>
                    setCategory(itemValue)
                  }>
                  <Picker.Item label='Category' value='' />
                  {categories.map((cat) => (
                    <Picker.Item label={cat.titleEN} value={cat._id} />
                  ))}
                </Picker>
              ) : null}
            </View>
          </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            {language === "fr" ? (
              <View style={styles.picker2}>
                <Picker
                  style={styles.picker}
                  selectedValue={region}
                  onValueChange={(itemValue, itemIndex) =>
                    setRegion(itemValue)
                  }>
                  <Picker.Item label={t("choose_region")} value='' />
                  <Picker.Item label='Tunis' value='tunis' />
                  <Picker.Item label='Ariana' value='ariana' />
                  <Picker.Item label='B??ja' value='beja' />
                  <Picker.Item label='Ben Arous' value='ben_arouss' />
                  <Picker.Item label='Bizerte' value='bizerte' />
                  <Picker.Item label='Gab??s' value='gabes' />
                  <Picker.Item label='Gafsa' value='gafsa' />
                  <Picker.Item label='Jendouba' value='jendouba' />
                  <Picker.Item label='Kairouan' value='kairouan' />
                  <Picker.Item label='Kasserine' value='kasserine' />
                  <Picker.Item label='K??bili' value='kebili' />
                  <Picker.Item label='Kef' value='kef' />
                  <Picker.Item label='Mahdia' value='mahdia' />
                  <Picker.Item label='Manouba' value='manouba' />
                  <Picker.Item label='M??denine' value='medenine' />
                  <Picker.Item label='Monastir' value='monastir' />
                  <Picker.Item label='Nabeul' value='nabeul' />
                  <Picker.Item label='Sfax' value='sfax' />
                  <Picker.Item label='Sidi Bouzid' value='sidi_bouzid' />
                  <Picker.Item label='Siliana' value='siliana' />
                  <Picker.Item label='Sousse' value='sousse' />
                  <Picker.Item label='Tataouine' value='tataouine' />
                  <Picker.Item label='Tozeur' value='tozeur' />
                  <Picker.Item label='Zaghouan' value='zaghouan' />
                </Picker>
              </View>
            ) : null}
            {language === "en" ? (
              <View style={styles.picker2}>
                <Picker
                  style={styles.picker}
                  selectedValue={region}
                  onValueChange={(itemValue, itemIndex) =>
                    setRegion(itemValue)
                  }>
                  <Picker.Item label={t("choose_region")} value='' />
                  <Picker.Item label='Tunis' value='tunis' />
                  <Picker.Item label='Ariana' value='ariana' />
                  <Picker.Item label='B??ja' value='beja' />
                  <Picker.Item label='Ben Arous' value='ben_arouss' />
                  <Picker.Item label='Bizerte' value='bizerte' />
                  <Picker.Item label='Gab??s' value='gabes' />
                  <Picker.Item label='Gafsa' value='gafsa' />
                  <Picker.Item label='Jendouba' value='jendouba' />
                  <Picker.Item label='Kairouan' value='kairouan' />
                  <Picker.Item label='Kasserine' value='kasserine' />
                  <Picker.Item label='K??bili' value='kebili' />
                  <Picker.Item label='Kef' value='kef' />
                  <Picker.Item label='Mahdia' value='mahdia' />
                  <Picker.Item label='Manouba' value='manouba' />
                  <Picker.Item label='M??denine' value='medenine' />
                  <Picker.Item label='Monastir' value='monastir' />
                  <Picker.Item label='Nabeul' value='nabeul' />
                  <Picker.Item label='Sfax' value='sfax' />
                  <Picker.Item label='Sidi Bouzid' value='sidi_bouzid' />
                  <Picker.Item label='Siliana' value='siliana' />
                  <Picker.Item label='Sousse' value='sousse' />
                  <Picker.Item label='Tataouine' value='tataouine' />
                  <Picker.Item label='Tozeur' value='tozeur' />
                  <Picker.Item label='Zaghouan' value='zaghouan' />
                </Picker>
              </View>
            ) : null}
            {language === "ar" ? (
              <View style={styles.picker2}>
                <Picker
                  style={styles.picker}
                  selectedValue={region}
                  onValueChange={(itemValue, itemIndex) =>
                    setRegion(itemValue)
                  }>
                  <Picker.Item label={t("choose_region")} value='' />
                  <Picker.Item label='????????' value='tunis' />
                  <Picker.Item label='????????????' value='ariana' />
                  <Picker.Item label='????????' value='beja' />
                  <Picker.Item label='???? ????????' value='ben_arouss' />
                  <Picker.Item label='??????????' value='bizerte' />
                  <Picker.Item label='????????' value='gabes' />
                  <Picker.Item label='????????' value='gafsa' />
                  <Picker.Item label='????????????' value='jendouba' />
                  <Picker.Item label='????????????????' value='kairouan' />
                  <Picker.Item label='??????????????' value='kasserine' />
                  <Picker.Item label='????????' value='kebili' />
                  <Picker.Item label='??????????' value='kef' />
                  <Picker.Item label='??????????????' value='mahdia' />
                  <Picker.Item label='??????????' value='manouba' />
                  <Picker.Item label='??????????' value='medenine' />
                  <Picker.Item label='????????????????' value='monastir' />
                  <Picker.Item label='????????' value='nabeul' />
                  <Picker.Item label='??????????' value='sfax' />
                  <Picker.Item label='???????? ??????????' value='sidi_bouzid' />
                  <Picker.Item label='????????????' value='siliana' />
                  <Picker.Item label='????????' value='sousse' />
                  <Picker.Item label='????????????' value='tataouine' />
                  <Picker.Item label='????????' value='tozeur' />
                  <Picker.Item label='??????????' value='zaghouan' />
                </Picker>
              </View>
            ) : null}
          </View>

          <TextInput
            style={{ margin: 5, height: 100 }}
            onChangeText={(text) => setDescription(text)}
            multiline={true}
            placeholder={t("description")}
            textAlignVertical='top'
            value={description}
          />

          <Text headline semibold style={{ margin: 10 }}>
            {t("attachment")}
          </Text>
          {images.length !== 0 ? (
            <View style={styles.titleView}>
              <Text title3 semibold>
                {t("image")}
              </Text>
              <FlatList
                contentContainerStyle={{
                  paddingRight: 20,
                  paddingLeft: 5,
                  paddingBottom: 20,
                }}
                horizontal={true}
                data={images}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item, index }) => (
                  <View>
                    <EventCard
                      image={item}
                      onPress={() => this.removePhoto(index)}
                      style={{ marginRight: 15 }}
                    />
                  </View>
                )}
              />
            </View>
          ) : null}

          {video ? (
            <View style={styles.titleView}>
              <Text title3 semibold>
                {t("video")}
              </Text>
              <Icon
                name='times-circle'
                size={22}
                color={colors.primary}
                onPress={() => this.removeVideo()}
                style={{ alignSelf: "flex-start" }}
              />
              <VideoPlayer
                video={{ uri: video.uri }}
                thumbnail={{ uri: video.uri }}
                endThumbnail={{ uri: video.uri }}
              />
            </View>
          ) : null}

          {audio ? (
            <View style={styles.titleView}>
              <Text title3 semibold>
                {t("audio")}
              </Text>
              <Icon
                name='times-circle'
                size={22}
                color={colors.primary}
                onPress={() => this.removeAudio()}
                style={{ alignSelf: "flex-start" }}
              />
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingTop: 20,
                  paddingBottom: 10,
                }}>
                <VideoPlayer
                  video={{ uri: audio.uri }}
                  thumbnail={{ uri: Images.audio }}
                  duration={audio.duration}
                />
              </View>
            </View>
          ) : null}
          {files.length !== 0 ? (
            <View style={styles.titleView}>
              <Text title3 semibold>
                {t("file")}
              </Text>
              {files.map((item, key) => (
                <View key={key}>
                  <ListThumbCircle
                    txtRight={
                      <Icon
                        name='times-circle'
                        size={22}
                        color={colors.primary}
                        onPress={() => this.removeFile(key)}
                      />
                    }
                    txtContent={item.name}
                  />
                </View>
              ))}
            </View>
          ) : null}
        </ScrollView>
        <Provider style={styles.fab}>
          <Portal>
            <FAB.Group
              open={open}
              icon={open ? "close" : "plus"}
              actions={[
                {
                  icon: "file",
                  label: t("addFile"),
                  color: colors.primary,
                  onPress: () => this.uploadFile(),
                },
                {
                  icon: "camera",
                  label: t("addImage"),
                  color: colors.primary,
                  onPress: () => this.uploadPicture(),
                },
                {
                  icon: "video",
                  label: t("addVideo"),
                  color: colors.primary,
                  onPress: () => this.uploadVideo(),
                },
                {
                  icon: "microphone",
                  label: t("addAudio"),
                  color: colors.primary,
                  onPress: () => this.uploadAudio(),
                },
              ]}
              onStateChange={onStateChange}
              onPress={() => {
                if (open) {
                  // do something if the speed dial is open
                }
              }}
            />
          </Portal>
        </Provider>
      </View>
      <View
        style={[styles.contentButtonBottom, { borderTopColor: colors.border }]}>
        <View style={{ alignItems: "flex-start" }}>
          <Text title4 primaryColor semibold style={{ marginRight: 5 }}>
            {t("warning")}
          </Text>
          <Text caption1 semibold>
            {t("irreversibleAction")}
          </Text>
        </View>
        <Button
          loading={loading}
          onPress={() => this.saveTestimony()}
          disabled={!Boolean(category && description)}
          style={
            !Boolean(category && description)
              ? styles.inactiveStyle
              : styles.activeStyle
          }>
          {t("send")}
        </Button>
      </View>
    </View>
  );
}
