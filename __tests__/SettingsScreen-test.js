import React from 'react';
import SettingsScreen from '../screens/SettingsScreen';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { WaveIndicator } from "react-native-indicators";

const APIcall      = require("../API_calls/APIs");

import {Button, Input, Textarea, Icon, Content} from 'native-base';
import {RefreshControl} from 'react-native';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('WebView', () => 'WebView');

jest.useFakeTimers();

test('Settings loading mechanism works', () => {
    const wrapper = shallow(<SettingsScreen />);
  
    wrapper.setState({loading: 1});
  
    expect(wrapper.find(WaveIndicator).length).toEqual(1);
});