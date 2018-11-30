import React from 'react';
import HomeScreen from '../screens/HomeScreen';
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

test('Dashboard loading mechanism works', () => {
    const wrapper = shallow(<HomeScreen/>);
  
    wrapper.setState({loading: 1});
  
    expect(wrapper.find(WaveIndicator).length).toEqual(1);
});

test('calendar button onPress works', () => {
    const wrapper = shallow(<HomeScreen/>);
    const navigate = jest.fn();
    const mock = {navigate};
    wrapper.setProps({ navigation: mock});
    wrapper.find(Icon).at(0).props().onPress();
    expect(navigate).toHaveBeenCalledWith('Calendar');
});

test('refreshScreen function works', () => {
    const wrapper = shallow(<HomeScreen />);
    wrapper.setState({loading: 1});
    wrapper.instance().refreshScreen();
    expect(wrapper.instance().state.loading).toEqual(0);
});

test('_onRefresh function works', () => {
    const wrapper = shallow(<HomeScreen />);
    const mock = jest.fn();
    wrapper.instance().getUserMatches = mock;
    wrapper.instance()._onRefresh();
    expect(mock).toHaveBeenCalled();
});