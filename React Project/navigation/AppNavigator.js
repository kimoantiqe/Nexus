import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthStack from  './AuthStack';
import CheckAuth from '../screens/CheckAuth'

export default createSwitchNavigator({

  AuthLoading: CheckAuth,
  Main: MainTabNavigator,
  Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }

);
