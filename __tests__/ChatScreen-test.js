import React from 'react';
import ChatScreen from '../screens/ChatScreen'

import {sbConnect, sbDisconnect} from '../sendbirdActions'

import { shallow } from 'enzyme';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Icon } from 'react-native-elements'

import {
    TextInput,
  } from 'react-native'
 
Enzyme.configure({ adapter: new Adapter() });

jest.useFakeTimers();

test('Check if TextInput is present', () => {

    let userid = "5bf7a3ceb55135ea0644ccab";
    let nickname = "James";

    sbConnect(userid, nickname);

    const navigation = { navigate: jest.fn(), getParam: jest.fn() };
    navigation.getParam
    .mockReturnValueOnce("sendbird_group_channel_89787208_65cd1cc8adc564edddc0e60a2c0b68351043929c")
    .mockReturnValueOnce(userid);
    
    const wrapper = shallow(<ChatScreen navigation={navigation} />);

    expect(wrapper.find(TextInput)).toHaveLength(9);

    sbDisconnect();
});

test('Check Icon onPress', () => {

    let userid = "5bf7a3ceb55135ea0644ccab";
    let nickname = "James";

    sbConnect(userid, nickname);

    const navigation = { navigate: jest.fn(), getParam: jest.fn() };
    
    //mock press event
    const sendMessageMock = jest.fn();
    sendMessageMock.mockReturnValue('Send Button Pressed');

    navigation.getParam
    .mockReturnValueOnce("sendbird_group_channel_89787208_65cd1cc8adc564edddc0e60a2c0b68351043929c")
    .mockReturnValueOnce(userid);
    
    const wrapper = shallow(<ChatScreen navigation={navigation}/>);

    wrapper.instance().sendMessage = sendMessageMock;
    wrapper.update();

    wrapper.find(Icon).first().props().onPress();

    expect(sendMessageMock).toHaveBeenCalled();

    sbDisconnect();

});

test('Check Text Input', () => {

    let userid = "5bf7a3ceb55135ea0644ccab";
    let nickname = "James";

    sbConnect(userid, nickname);

    const navigation = { navigate: jest.fn(), getParam: jest.fn() };
    
    //mock press event
    const sendMessageMock = jest.fn();
    sendMessageMock.mockReturnValue('Send Button Pressed');

    navigation.getParam
    .mockReturnValueOnce("sendbird_group_channel_89787208_65cd1cc8adc564edddc0e60a2c0b68351043929c")
    .mockReturnValueOnce(userid);
    
    const wrapper = shallow(<ChatScreen navigation={navigation}/>);

    wrapper.find(TextInput).first().props().onChangeText("Hello");

    expect(wrapper.find(TextInput).first().props().value).toEqual("Hello");

    sbDisconnect();

});

test('Check message array not updated with empty input', () => {

    let userid = "5bf7a3ceb55135ea0644ccab";
    let nickname = "James";

    sbConnect(userid, nickname);

    const navigation = { navigate: jest.fn(), getParam: jest.fn() };
    
    //mock press event
    const sendMessageMock = jest.fn();
    sendMessageMock.mockReturnValue('Send Button Pressed');

    navigation.getParam
    .mockReturnValueOnce("sendbird_group_channel_89787208_65cd1cc8adc564edddc0e60a2c0b68351043929c")
    .mockReturnValueOnce(userid);
    
    const wrapper = shallow(<ChatScreen navigation={navigation}/>);

    const messagesArray = wrapper.instance().state.messages;

    wrapper.find(Icon).first().props().onPress();

    expect(wrapper.instance().state.messages).toEqual(messagesArray);

    sbDisconnect();

});

test('Check send message box', () => {

    let userid = "5bf7a3ceb55135ea0644ccab";
    let nickname = "James";

    sbConnect(userid, nickname);

    const navigation = { navigate: jest.fn(), getParam: jest.fn() };
    
    //mock press event
    const sendMessageMock = jest.fn();
    sendMessageMock.mockReturnValue('Send Button Pressed');

    navigation.getParam
    .mockReturnValueOnce("sendbird_group_channel_89787208_65cd1cc8adc564edddc0e60a2c0b68351043929c")
    .mockReturnValueOnce(userid);
    
    const wrapper = shallow(<ChatScreen navigation={navigation}/>);

    const sender = {userId: userid};

    const msg = {_sender: sender};

    const out = wrapper.instance().renderMessage(msg);
    
    expect(out).toBeDefined();

    sbDisconnect();

});

test('Check received message box', () => {

    let userid = "5bf7a3ceb55135ea0644ccab";
    let nickname = "James";

    sbConnect(userid, nickname);

    const navigation = { navigate: jest.fn(), getParam: jest.fn() };
    
    //mock press event
    const sendMessageMock = jest.fn();
    sendMessageMock.mockReturnValue('Send Button Pressed');

    navigation.getParam
    .mockReturnValueOnce("sendbird_group_channel_89787208_65cd1cc8adc564edddc0e60a2c0b68351043929c")
    .mockReturnValueOnce(userid);
    
    const wrapper = shallow(<ChatScreen navigation={navigation}/>);

    const sender = {userId: "5bcf97fd4a5aa600150cc399"};

    const msg = {_sender: sender};

    const out = wrapper.instance().renderMessage(msg);

    expect(out).toBeDefined();

    sbDisconnect();

});

test('Check List containes messages', () => {

    let userid = "5bf7a3ceb55135ea0644ccab";
    let nickname = "James";

    sbConnect(userid, nickname);

    const navigation = { navigate: jest.fn(), getParam: jest.fn() };
    
    //mock press event
    const sendMessageMock = jest.fn();
    sendMessageMock.mockReturnValue('Send Button Pressed');

    navigation.getParam
    .mockReturnValueOnce("sendbird_group_channel_89787208_65cd1cc8adc564edddc0e60a2c0b68351043929c")
    .mockReturnValueOnce(userid);
    
    const wrapper = shallow(<ChatScreen navigation={navigation}/>);

    const msg = ["Hello", "One"];

    wrapper.instance().state.messages = msg;
    wrapper.update();

    expect(wrapper.instance().state.messages).toEqual(msg);

    sbDisconnect();

});
