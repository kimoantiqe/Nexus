import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';


import Login from '../screens/Login';
import Splash from '../screens/SplashScreen';
import Register from '../screens/Register';
import RegCompleteProfile from '../screens/RegCompleteProfile';
import ChatScreen from '../screens/ChatScreen'


export default createStackNavigator({
  Login: Login,
  Register: Register,
  Splash : Splash,
  RCP: RegCompleteProfile,
  ChatScreen: ChatScreen
},
{
  initialRouteName: 'Splash',
}
);
