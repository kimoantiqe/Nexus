import React from 'react';
import Login from '../screens/Login'

import renderer from 'react-test-renderer';

import SendBird from 'sendbird'

import {sbConnect} from '../sendbirdActions'

import { shallow } from 'enzyme';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Icon } from 'react-native-elements'

import toJson from 'enzyme-to-json';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableHighlight,
    FlatList,
    Dimensions,
    KeyboardAvoidingView
  } from 'react-native'
 
import { Button } from 'native-base'

Enzyme.configure({ adapter: new Adapter() });
jest.mock('WebView', () => 'WebView')

test('renders correctly', () => {
  const wrapper = shallow(<Login />);
  expect(toJson(wrapper)).toMatchSnapshot();
});

test('Check Button', () => {

  const wrapper = shallow(<Login />);

  wrapper.find(Button).first().props().onPress();

  expect(wrapper.find(Button).first().props().onPress()).toHaveLength(1);
});