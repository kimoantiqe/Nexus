import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import Matches from '../screens/DeckSwiper';
import SettingsScreen from '../screens/SettingsScreen';
import ChatDashboard from '../screens/ChatDashboard';
import ChatScreen from '../screens/ChatScreen'
import AddButton from "../screens/TabBarIcon";
import Calendar from '../screens/Calendar';
import QR from "../screens/newQRcode"
import InstantMatches from '../screens/instantMatch';
import QrCamera from '../screens/qrCamera';



const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Calendar: Calendar
});


HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}

      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};

const ChatStack = createStackNavigator({
  ChatDashboard: ChatDashboard,
  ChatScreen: ChatScreen
});

ChatStack.navigationOptions = {
  tabBarLabel: 'Chat',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-chatbubbles${focused ? '' : '-outline'}` : 'md-chatboxes'}
    />
  ),
};

const MatchesStack = createStackNavigator({
  Matches: Matches,
});

MatchesStack.navigationOptions = {
  tabBarLabel: 'Matches',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-people${focused ? '' : '-outline'}` : 'md-people'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-person${focused ? '' : '-outline'}` : 'md-person'}
    />
  ),
};

const QRStack = createStackNavigator({
  QR: QR,
  QrCamera: QrCamera,
});

QRStack.navigationOptions = () => ({
  tabBarLabel: 'InstantMatches',
  tabBarIcon: <AddButton />
});


export default createBottomTabNavigator({
  HomeStack,
  MatchesStack,
  QRStack,
  ChatStack,
  SettingsStack,
}, {
  tabBarOptions: {
      showLabel: false,
      activeTintColor: '#F8F8F8',
      inactiveTintColor: '#586589',
      style: {
          backgroundColor: '#2c2638'
      },
      tabStyle: {}
  }
});
