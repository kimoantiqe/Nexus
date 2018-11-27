import React from 'react';
import Register from '../screens/Register';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { WaveIndicator } from "react-native-indicators";

const APIcall      = require("../API_calls/APIs");

import {Button, Input} from 'native-base';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('WebView', () => 'WebView');

jest.useFakeTimers();

test('Register button onPress works', () => {
    const wrapper = shallow(<Register/>);
    let clickMock = jest.fn();
    APIcall.Register = clickMock;

    wrapper.find(Button).first().props().onPress();

     expect(clickMock).toHaveBeenCalled();
});

test('Register handleinputs works when given inputs', () => {
    const wrapper = shallow(<Register/>);

    wrapper.instance().handleInput("username", "test");

  expect(wrapper.instance().state.inputs["username"]).toEqual("test");
});

test('Register handleinputs works when not given inputs', () => {
    const wrapper = shallow(<Register/>);

  expect(wrapper.instance().state.inputs["username"]).toEqual(undefined);
});

test('Register field email address works', () => {
    const wrapper = shallow(<Register/>);
    
    wrapper.find(Input).first().prop('onChangeText')('abc');

  expect(wrapper.instance().state.inputs["Username"]).toEqual('abc');
});

test('Register field password works', () => {
    const wrapper = shallow(<Register/>);
    
    wrapper.find(Input).at(1).prop('onChangeText')('abc');

  expect(wrapper.instance().state.inputs["Password"]).toEqual('abc');
});

test('Register field repassword works', () => {
    const wrapper = shallow(<Register/>);
    
    wrapper.find(Input).at(2).prop('onChangeText')('abc');

  expect(wrapper.instance().state.inputs["Repassword"]).toEqual('abc');
});

test('Register loading mechanism works', () => {
  const wrapper = shallow(<Register/>);

  wrapper.setState({loading: 1});

  expect(wrapper.find(WaveIndicator).length).toEqual(1);
})