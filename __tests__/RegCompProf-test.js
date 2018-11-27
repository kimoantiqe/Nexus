import React from 'react';
import RegCompleteProfile from '../screens/RegCompleteProfile';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { WaveIndicator } from "react-native-indicators";
import { Pages } from "react-native-pages";

const APIcall      = require("../API_calls/APIs");

import {Button, Input} from 'native-base';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('WebView', () => 'WebView');

test('Register loading mechanism works', () => {
    const wrapper = shallow(<RegCompleteProfile/>);
  
    wrapper.setState({loading: 1});
  
    expect(wrapper.find(WaveIndicator).length).toEqual(1);
  });

test('first page swipe button is right arrow icon', () => {
    const wrapper = shallow(<RegCompleteProfile />);

    expect(wrapper.find(Button).childAt(0).prop('name')).toEqual('arrow-right');
});

test('first page swipe right button works', () => {
    const wrapper = shallow(<RegCompleteProfile />);
    const scrollToPage = jest.fn();
    const obj = {scrollToPage};
    wrapper.instance().pager = obj;

    wrapper.find(Button).at(0).props().onPress();

    expect(scrollToPage).toHaveBeenCalled();
});

test('onScrollEnd of pages component works', () => {
    const wrapper = shallow(<RegCompleteProfile />);
    const Mock = jest.fn();

    wrapper.instance().doneScroll = Mock;

    wrapper.find(Pages).props().onScrollEnd();

    expect(Mock).toHaveBeenCalled();
});

test('handleBio works', () => {
    const wrapper = shallow(<RegCompleteProfile />);

    wrapper.instance().handleBio("test");

    expect(wrapper.instance().state.bio).toEqual("test");
});

test('handleFirstname works', () => {
    const wrapper = shallow(<RegCompleteProfile />);

    wrapper.instance().handleLastname("test");

    expect(wrapper.instance().state.lastName).toEqual("test");
});

test('handleLastname works', () => {
    const wrapper = shallow(<RegCompleteProfile />);

    wrapper.instance().handleFirstname("test");

    expect(wrapper.instance().state.firstName).toEqual("test");
});

test('sliding works', () => {
    const wrapper = shallow(<RegCompleteProfile />);

    wrapper.instance().sliding(3, 0);

    expect(wrapper.instance().state.Ival).toEqual(3);
});

test('sliding works', () => {
    const wrapper = shallow(<RegCompleteProfile />);

    wrapper.instance().sliding(3, 1);

    expect(wrapper.instance().state.LFval).toEqual(3);
});

test('sliding works', () => {
    const wrapper = shallow(<RegCompleteProfile />);

    wrapper.instance().sliding(3, 2);

    expect(wrapper.instance().state.INval).toEqual(3);
});

test('onPressInterests works', () => {
    const wrapper = shallow(<RegCompleteProfile />);

    wrapper.instance().onPressInterests("test");

    expect(wrapper.instance().state.interests["test"]).toEqual(true);

    wrapper.instance().onPressInterests("test");

    expect(wrapper.instance().state.interests["test"]).toEqual(false);
});

test('onPressLF works', () => {
    const wrapper = shallow(<RegCompleteProfile />);

    wrapper.instance().onPressLF("test");

    expect(wrapper.instance().state.LF["test"]).toEqual(true);

    wrapper.instance().onPressLF("test");

    expect(wrapper.instance().state.LF["test"]).toEqual(false);
});

test('onPressInterests works', () => {
    const wrapper = shallow(<RegCompleteProfile />);

    wrapper.instance().onPressIndustry("test");

    expect(wrapper.instance().state.industry["test"]).toEqual(true);

    wrapper.instance().onPressIndustry("test");

    expect(wrapper.instance().state.industry["test"]).toEqual(false);
});