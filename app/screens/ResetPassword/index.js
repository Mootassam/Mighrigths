import React, { useState } from "react";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import { BaseStyle, useTheme, BaseSetting } from "@config";
import { Header, SafeAreaView, Icon, TextInput, Button } from "@components";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import Axios from "axios";
import Snackbar from "react-native-snackbar";

import { useSelector, useDispatch } from "react-redux";

export default function ResetPassword({ navigation }) {
  const { colors } = useTheme();
  const { t, i18n } = useTranslation();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const [email, seteEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState({ email: true });
  const [language, setLanguage] = useState(i18n.language);
  const SERVER_URL = "/auth/password-reset-mobile";

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

  /**
   * call when action reset pass
   */
  const onReset = async () => {
    setLoading(true);
    const data = {
      email: email,
    };
    try {
      await authAxios
        .put(SERVER_URL, data, {
          headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${token}`,
            "Accept-Language": language === "fr" ? "es" : language,
          },
        })
        .then(() => {
          setLoading(false);
          navigation.navigate("SignIn");
        });
    } catch (error) {
      setLoading(false);
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
    // if (email == '') {
    //   setSuccess({
    //     ...success,
    //     email: false,
    //   });
    // } else {
    //   setLoading(true);
    //   setTimeout(() => {
    //     setLoading(false);
    //     navigation.navigate('SignIn');
    //   }, 500);
    // }
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: "always" }}>
      <Header
        title={t("reset_password")}
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
        keyboardVerticalOffset={offsetKeyboard}
        style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            padding: 20,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <TextInput
            onChangeText={(text) => seteEmail(text)}
            // onFocus={() => {
            //   setSuccess({
            //     ...success,
            //     email: true,
            //   });
            // }}
            placeholder={t("email_address")}
            // success={success.email}
            value={email}
            selectionColor={colors.primary}
          />
          <Button
            style={{ marginTop: 20 }}
            full
            onPress={() => {
              onReset();
            }}
            loading={loading}>
            {t("reset_password")}
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
