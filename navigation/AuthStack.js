import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import Loading from '../screens/Loading';
import Login from '../screens/Login';
import Splash from '../screens/SplashScreen';
import Register from '../screens/Register';
import RegCompleteProfile from '../screens/RegCompleteProfile';
import InstantMatches from '../screens/instantMatch';
import QrCamera from '../screens/qrCamera';


export default createStackNavigator({
  Loading: Loading,
  Login: Login,
  Register: Register,
  Splash : Splash,
  RCP: RegCompleteProfile,
  QrCamera: QrCamera,
  InstantMatches:InstantMatches,
},
{
  initialRouteName: 'Splash',
}
);
