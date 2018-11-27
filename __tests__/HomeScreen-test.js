import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { WaveIndicator } from "react-native-indicators";
import { Pages } from "react-native-pages";

const APIcall      = require("../API_calls/APIs");

import {Button, Input, Textarea} from 'native-base';
import SliderBadge from '../components/SliderBadge';
import { Slider } from 'react-native';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('WebView', () => 'WebView');

jest.useFakeTimers();

test('Dashboard loading mechanism works', () => {
    const wrapper = shallow(<HomeScreen/>);
  
    wrapper.setState({loading: 1});
  
    expect(wrapper.find(WaveIndicator).length).toEqual(1);
});