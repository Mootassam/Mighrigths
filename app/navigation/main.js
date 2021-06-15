import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useSelector, useDispatch } from 'react-redux';

import { BaseColor, useTheme, useFont } from '@config';
import { useTranslation } from 'react-i18next';
import { Icon } from '@components';
/* Stack Screen */
import More from '@screens/More';
import Hotel from '@screens/Hotel';
import Messages from '@screens/Messages';
import Walkthrough from '@screens/Walkthrough';
import SignUp from '@screens/SignUp';
import SignIn from '@screens/SignIn';
import ResetPassword from '@screens/ResetPassword';
import ChangePassword from '@screens/ChangePassword';
import ProfileEdit from '@screens/ProfileEdit';
import ChangeLanguage from '@screens/ChangeLanguage';
import Categories from '@screens/Categories';
import CheckOut from '@screens/CheckOut';
import Coupons from '@screens/Coupons';
import HotelDetail from '@screens/HotelDetail';
import ContactUs from '@screens/ContactUs';
import BookingDetail from '@screens/BookingDetail';
import AboutUs from '@screens/AboutUs';
import OurService from '@screens/OurService';
import BusSearch from '@screens/BusSearch';
import BusList from '@screens/BusList';
import BusSelectSeat from '@screens/BusSelectSeat';
import AddPayment from '@screens/AddPayment';
import Setting from '@screens/Setting';
import ThemeSetting from '@screens/ThemeSetting';
import NotFound from '@screens/NotFound';
/* Bottom Screen */
import Home from '@screens/Home';
import Booking from '@screens/Booking';
import Messenger from '@screens/Messenger';
import BusFilter from '@screens/BusFilter';
import News from '@screens/News'
import Profile from '@screens/Profile';
const MainStack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
import NoData from "@screens/NoData";
export default function Main() {

  return (
    <MainStack.Navigator
      headerMode="none"
      initialRouteName="BottomTabNavigator">
      <MainStack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
      />
      <MainStack.Screen name="Profile" component={Profile} />
      
      <MainStack.Screen name="More" component={More} />
      <MainStack.Screen name="Categories" component={Categories} />
      <MainStack.Screen name="News" component={News} />
      <MainStack.Screen name="Hotel" component={Hotel} />
      <MainStack.Screen name="Messages" component={Messages} />
      <MainStack.Screen name="Walkthrough" component={Walkthrough} />
      <MainStack.Screen name="SignUp" component={SignUp} />
      <MainStack.Screen name="Messenger" component={Messenger} />
      <MainStack.Screen name="BusFilter" component={BusFilter} />
      <MainStack.Screen name="SignIn" component={SignIn} />
      <MainStack.Screen name="ResetPassword" component={ResetPassword} />
      <MainStack.Screen name="ChangePassword" component={ChangePassword} />
      <MainStack.Screen name="ProfileEdit" component={ProfileEdit} />
      <MainStack.Screen name="ChangeLanguage" component={ChangeLanguage} />
      <MainStack.Screen name="CheckOut" component={CheckOut} />
      <MainStack.Screen name="Coupons" component={Coupons} />
      <MainStack.Screen name="HotelDetail" component={HotelDetail} />
      <MainStack.Screen name="ContactUs" component={ContactUs} />
      <MainStack.Screen name="BookingDetail" component={BookingDetail} />
      <MainStack.Screen name="Booking" component={Booking} />
      <MainStack.Screen name="AboutUs" component={AboutUs} />
      <MainStack.Screen name="OurService" component={OurService} />
      <MainStack.Screen name="BusSearch" component={BusSearch} />
      <MainStack.Screen name="BusList" component={BusList} />
      <MainStack.Screen name="BusSelectSeat" component={BusSelectSeat} />
      <MainStack.Screen name="AddPayment" component={AddPayment} />
      <MainStack.Screen name="Setting" component={Setting} />
      <MainStack.Screen name="NotFound" component={NotFound} />
      <MainStack.Screen name="NoData" component={NoData} />
      <MainStack.Screen name="ThemeSetting" component={ThemeSetting} />
    </MainStack.Navigator>
  );
}

function BottomTabNavigator() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const font = useFont();
  const auth = useSelector(state => state.auth);
  const login = auth.login.success;
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      headerMode="none"
      tabBarOptions={{
        showIcon: true,
        showLabel: true,
        activeTintColor: colors.primary,
        inactiveTintColor: BaseColor.grayColor,
        style: { borderTopWidth: 1 },
        labelStyle: {
          fontSize: 12,
          fontFamily: font,
        },
      }}>
      <BottomTab.Screen
        name="Actualité"
        component={News}
        options={{
          title: t('Actualité'),
          tabBarIcon: ({ color }) => {
            return <Icon color={color} name="newspaper" size={20} solid />;
          },
        }}
      />

      <BottomTab.Screen
        name="Information"
        component={Home}
        options={{
          title: t('Informations'),
          tabBarIcon: ({ color }) => {
            return <Icon color={color} name="info-circle" size={20} solid />;
          },
        }}
      />

      <BottomTab.Screen
        name="Temoignage"
        component={AddPayment}
        options={{
          title: t('assistance'),
          tabBarIcon: ({ color }) => {
            return <Icon solid color={color} name="headset" size={20} solid />;
          },
        }}
      />


      <BottomTab.Screen
        name="Post"
        component={Profile}
        options={{
          title: t('Compte'),
          tabBarIcon: ({ color }) => {
            return <Icon color={color} name="user-circle" size={20} solid />;
          },
        }}
      />
    </BottomTab.Navigator>
  );
}
