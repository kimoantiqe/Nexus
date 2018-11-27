import React from 'react';
import Login from '../screens/Login';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { WaveIndicator } from "react-native-indicators";

const APIcall      = require("../API_calls/APIs");

import {Button, Icon, Input } from 'native-base';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('WebView', () => 'WebView');

test('Login button onPress works', () => {
    const wrapper = shallow(<Login/>);
    let clickMock = jest.fn();
    APIcall.login = clickMock;

    wrapper.find(Button).first().props().onPress();

     expect(clickMock).toHaveBeenCalled();
});

test('Login handleUsername works', () => {
    const wrapper = shallow(<Login/>);

    wrapper.instance().handleUsername("Mohamed");

  expect(wrapper.instance().state.username).toEqual("Mohamed");
});

test('Login handlePassword works', () => {
    const wrapper = shallow(<Login/>);

    wrapper.instance().handlePassword("Mohamed");

  expect(wrapper.instance().state.password).toEqual("Mohamed");
});

test('Login field email works', () => {
    const wrapper = shallow(<Login/>);
    
    wrapper.find(Input).at(0).prop('onChangeText')('abc');

  expect(wrapper.instance().state.username).toEqual('abc');
});

test('Login field password works', () => {
    const wrapper = shallow(<Login/>);
    
    wrapper.find(Input).at(1).prop('onChangeText')('abc');

  expect(wrapper.instance().state.password).toEqual('abc');
});

test('Login With Facebook logo', () => {
  const wrapper = shallow(<Login/>);

  expect(wrapper.find(Icon).first().props().name).toEqual('logo-facebook');
});

test('Login With Facebook button', () => {

  const wrapper = shallow(<Login/>);
  let clickMock = jest.fn();
  APIcall.loginfb = clickMock;
  wrapper.find(Button).at(1).props().onPress();
  expect(clickMock).toHaveBeenCalled();
});

test('Login loading mechanism works', () => {
  const wrapper = shallow(<Login/>);

  wrapper.setState({loading: 1});

  expect(wrapper.find(WaveIndicator).length).toEqual(1);
})