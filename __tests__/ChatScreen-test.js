import React from 'react';
import ChatScreen from '../screens/ChatScreen'

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
    Button,
    TextInput,
    TouchableHighlight,
    FlatList,
    Dimensions,
    KeyboardAvoidingView
  } from 'react-native'
 
Enzyme.configure({ adapter: new Adapter() });

let userid = "5bcf97fd4a5aa600150cc338";
let nickname = "Ahmed";

sbConnect(userid, nickname);

test('renders correctly', () => {

    const navigation = { navigate: jest.fn(), getParam: jest.fn() };
    navigation.getParam
    .mockReturnValueOnce("sendbird_group_channel_86468035_2ef7d80e28554afb34ea3b9ac3f126e860cbcea2")
    .mockReturnValueOnce(userid);
    
    const wrapper = shallow(<ChatScreen navigation={navigation} />);
    expect(toJson(wrapper)).toMatchSnapshot();
});

test('Check if TextInput is present', () => {

    const navigation = { navigate: jest.fn(), getParam: jest.fn() };
    navigation.getParam
    .mockReturnValueOnce("sendbird_group_channel_86468035_2ef7d80e28554afb34ea3b9ac3f126e860cbcea2")
    .mockReturnValueOnce(userid);
    
    const wrapper = shallow(<ChatScreen navigation={navigation} />);

    expect(wrapper.find(TextInput)).toHaveLength(1);
});

test('Check Icon onPress', () => {

    const navigation = { navigate: jest.fn(), getParam: jest.fn() };
    
    //mock press event
    const sendMessageMock = jest.fn();
    sendMessageMock.mockReturnValue('Send Button Pressed');

    navigation.getParam
    .mockReturnValueOnce("sendbird_group_channel_86468035_2ef7d80e28554afb34ea3b9ac3f126e860cbcea2")
    .mockReturnValueOnce(userid);
    
    const wrapper = shallow(<ChatScreen navigation={navigation}/>);

    wrapper.instance().sendMessage = sendMessageMock;
    wrapper.update();

    wrapper.find(Icon).first().props().onPress();

    expect(sendMessageMock).toHaveBeenCalled();

});

test('Check Text Input', () => {

    const navigation = { navigate: jest.fn(), getParam: jest.fn() };
    
    //mock press event
    const sendMessageMock = jest.fn();
    sendMessageMock.mockReturnValue('Send Button Pressed');

    navigation.getParam
    .mockReturnValueOnce("sendbird_group_channel_86468035_2ef7d80e28554afb34ea3b9ac3f126e860cbcea2")
    .mockReturnValueOnce(userid);
    
    const wrapper = shallow(<ChatScreen navigation={navigation}/>);

    wrapper.instance().setState({text: "Hello"});
    wrapper.update();

    expect(wrapper.find(TextInput).first().props().value).toEqual("Hello");

});

