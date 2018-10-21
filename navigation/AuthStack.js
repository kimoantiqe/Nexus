import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';


import Login from '../screens/Login';
import Register from '../screens/Register';
import RegCompleteProfile from '../screens/RegCompleteProfile';


export default createStackNavigator({
  Login: Login,
  Register: Register,
  RCP: RegCompleteProfile,
},
{
  initialRouteName: 'Login',
}
);
