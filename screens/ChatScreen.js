import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native'
import moment from 'moment'
import SendBird from 'sendbird'

import {
    Header,
    Left,
    Right,
    Body,
    Title
  } from "native-base";

import DateTimePicker from 'react-native-modal-datetime-picker';
import {getImageFromCamera} from './ImageInterface'
import {Icon, Button} from 'react-native-elements'
import ActionButton from 'react-native-action-button';
import Modal from "react-native-modal";

var dateInit;
var timeInit;
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const APIcall      = require("../API_calls/APIs");

console.disableYellowBox = true

var messageSent;

//const themeColor = '#dd9221'
//const themeColor = '#45385e'
const themeColor = '#5c4d7a'
const themeDarkColor = '#287277'

var messageQuery;

export default class ChatScreen extends Component {
    
    static navigationOptions = {
        title: 'ChatScreen',
        header: null,
    };
    
    constructor(props) {
        super(props)
        this.getGroupChannel = this.getGroupChannel.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
        this.state = { text: '', messages: [] , groupChannel: Object, friendName: '', userId: '',
                         channelUrl: '', sb: Object, friendId: '', isTaskModalVisible: false,
                         isMeetingModalVisible: false, taskName: '', taskDescription: '', taskTime: '', taskDate: '',
                         meetingName: '', meetingDescription: '', meetingTime: '', meetingDate: '', isTimeModalVisible: false,
                         isDateModalVisible: false
                     }
        this.state.sb = SendBird.getInstance();
        messageSent = false;
    }

    componentDidMount() {
        this.getGroupChannel();
        const ChannelHandler = new this.state.sb.ChannelHandler()
        ChannelHandler.onMessageReceived = (receivedChannel, message) => {
            if (receivedChannel.url === this.state.groupChannel.url) {
                const messages = []
                messages.push(message)
                const newMessages = messages.concat(this.state.messages)
                this.setState({ messages: newMessages })
            }
        }
        this.state.groupChannel.markAsRead();
        this.state.sb.addChannelHandler('ChatScreen', ChannelHandler)

        const ConnectionHandler = new this.state.sb.ConnectionHandler()
        ConnectionHandler.onReconnectSucceeded = () => {
            this.getChannelMessage(true)
            this.state.groupChannel.refresh()
        }
        this.state.sb.addConnectionHandler('ChatView', ConnectionHandler)
    }

    getGroupChannel() {
        this.state.channelUrl = this.props.navigation.getParam('channelUrl', null);
        this.state.userId = this.props.navigation.getParam('userID', null);
        //get groupchannel
        this.state.sb.GroupChannel.getChannel(this.state.channelUrl, (channel, error) => {
            //add alert and go back on press
            if(error){
                console.log('Could not get channel');
                console.log(error);
            }
            
            messageQuery = channel.createPreviousMessageListQuery();
            
            this.state.groupChannel = channel;
            
            if(this.state.userId === null)
                this.state.friendName = channel.name;            
            else {
                if(channel.memberCount == 2){
                    this.state.friendName = channel.members[0].userId === this.state.userId ? channel.members[1].nickname : channel.members[0].nickname;
                    this.state.friendId = channel.members[0].userId === this.state.userId ? channel.members[1].userId : channel.members[0].userId;
                }else{
                    this.state.friendName = 'Nexus User';
                    this.state.friendId = this.state.userId;
                }
            }
               
            this.getChannelMessage(false);
        })
    }

    sendMessage() {
        if(this.state.text === ""){
            console.log("return");
            return
        }
        messageSent = true;
        this.state.groupChannel.sendUserMessage(this.state.text, '', (message, error) => {
            if (error) {
                console.error(error)
                return
            }
            const messages = [].concat([message]).concat(this.state.messages)
            this.setState({ text: '', messages })
        })
    }

    componentWillUnmount(){
        const unreadMessageCount = this.props.navigation.getParam('unreadMessageCount', null);
        if(messageSent || unreadMessageCount > 0)
            this.props.navigation.state.params.returnData();
    }

    getChannelMessage(refresh) {
        if (refresh) {
            messageQuery = this.state.groupChannel.createPreviousMessageListQuery()
            this.state.messages = []
        }

        if (messageQuery) {
            if (!messageQuery.hasMore) {
                return
            }
            messageQuery.load(20, false, (response, error) => {
            if (error) {
                console.log('Get Message List Fail.', error)
                return
            }

            const messages = []
            for (let i = 0; i < response.length; i++) {
                messages.push(response[i])
            }

            const newMessageList = this.state.messages.concat(messages.reverse())
            this.setState({ messages: newMessageList })
            })
        }
    }

    _toggleTaskModal = () => {
        this.setState({ isTaskModalVisible: !this.state.isTaskModalVisible });
    }

    _toggleMeetingModal = () => {
        this.setState({ isMeetingModalVisible: !this.state.isMeetingModalVisible });
    }

    _toggleDateModal = () => {
        this.setState({ isDateModalVisible: !this.state.isDateModalVisible });
    }

    _toggleTimeModal = () => {
        this.setState({ isTimeModalVisible: !this.state.isTimeModalVisible });
    }

    _handleDatePicked = (date, type) => {
        moment.locale('pst');
        const dateOut = moment(date).format('MM-DD-YYYY').toString();
        dateInit = moment(date).format('YYYY-MM-DD').toString();
        if(type === 'task')
            this.state.taskDate = dateOut;
        else
            this.state.meetingDate = dateOut;
        this._toggleDateModal();
    }

    _handleTimePicked = (time, type) => {
        moment.locale('pst');
        const timeOut = moment(time).format('h:mm A').toString();
        timeInit = moment(time).format('HH:mm:ss.SSS').toString();
        if(type === 'task')
            this.state.taskTime = timeOut;
        else
            this.state.meetingTime = timeOut;
        this._toggleTimeModal();
    }

    _schedule = (type) => {
        const dateOut = new Date(dateInit + "T" + timeInit);
        if(type === 'task'){
            if(this.state.taskName === '' || this.state.taskDescription === '' || this.state.taskDate === '' || this.state.taskTime === '')
                alert("One or more fields is empty!");
            else{
                console.log(dateOut);
                APIcall.sendTaskMeeting(this.state.taskName, this.state.taskDescription, dateOut, 'Task', this.state.friendId);
                this.setState({taskName: '', taskDescription: '', taskDate: '', taskTime: ''});
                this._toggleTaskModal();
            }
        }else{
            if(this.state.meetingName === '' || this.state.meetingDescription === '' || this.state.meetingDate === '' || this.state.meetingTime === '')
                alert("One or more fields is empty!");
            else{
                console.log(dateOut);
                APIcall.sendTaskMeeting(this.state.meetingName, this.state.meetingDescription, dateOut, 'Meeting', this.state.friendId);
                this.setState({meetingName: '',meetingDescription: '', meetingDate: '', meetingTime: ''});
                this._toggleMeetingModal();
            }
        }
    }

    renderMessage(msg) {
        const createdAt = moment(msg.createdAt).format('h:mm A')
        if (msg._sender.userId === this.state.userId) {
            return (
                <View style={[styles.messageContainer, { paddingLeft: 50 }]}>
                <View style={{ justifyContent: 'flex-end' }}>
                <Text style={styles.createdAt}>{createdAt}</Text>
                </View>
                <View style={[styles.messageBody, { backgroundColor: themeColor }]}>
                <Text style={{ color: 'white' }}>{msg.message}</Text>
                </View>
                <Image source={{ uri: msg._sender.profileUrl }} style={[styles.profile, { marginLeft: 10 }]} />
                </View>
            )
        }
        return (
            <View style={[styles.messageContainer, { paddingRight: 50 }]}>
                <Image source={{ uri: msg._sender.profileUrl }} style={[styles.profile, { marginRight: 10 }]} />
                <View style={[styles.messageBody, { backgroundColor: '#efefef' }]}>
                    <Text style={{ color: 'black' }}>{msg.message}</Text>
                </View>
                <View style={{ justifyContent: 'flex-end' }}>
                    <Text style={styles.createdAt}>{createdAt}</Text>
                </View>
            </View>
        )
    }

    _keyExtractor = (item, index) => String(item.messageId);

    render() {
        if(this.state.groupChannel.memberCount === 1){
            return (
                <React.Fragment>
                    <Header  iosBarStyle='light-content' androidStatusBarColor='#ffffff' style={styles.header}>
                        <Left/>
                            <Body>
                                <Title style={styles.headerTitle}>{this.state.friendName}</Title>
                            </Body>
                        <Right />
                    </Header>
                    <FlatList
                        inverted
                        onEndReached={() => this.getChannelMessage(false)}
                        data={this.state.messages}
                        renderItem={({ item }) => this.renderMessage(item)}
                        style={{ flex: 1 }}
                        keyExtractor={this._keyExtractor}
                    />
                    <KeyboardAvoidingView
                        style={styles.container}
                        behavior="padding"
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Text Message"
                                onChangeText={(text) => this.setState({ text })}
                                value={this.state.text}
                            />
                            <Icon
                                raised
                                name='send'
                                type='font-awesome'
                                color= {themeColor}
                                size = {20}
                                onPress={() => this.sendMessage()} 
                            />
                        </View>
                    </KeyboardAvoidingView>
                </React.Fragment>
            )
        }
        return (
        <React.Fragment>
            <Header  iosBarStyle='light-content' androidStatusBarColor='#ffffff' style={styles.header}>
                    <Left/>
                        <Body>
                            <Title style={styles.headerTitle}>{this.state.friendName}</Title>
                        </Body>
                    <Right />
            </Header>
            <FlatList
                inverted
                onEndReached={() => this.getChannelMessage(false)}
                data={this.state.messages}
                renderItem={({ item }) => this.renderMessage(item)}
                style={{ flex: 1 }}
                keyExtractor={this._keyExtractor}
                />
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 55}}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Text Message"
                        onChangeText={(text) => this.setState({ text })}
                        value={this.state.text}
                    />
                   <Icon
                        raised
                        name='send'
                        type='font-awesome'
                        color= {themeColor}
                        size = {20}
                        onPress={() => this.sendMessage()} 
                    />
                    <ActionButton buttonColor={themeColor} size={44} offsetX={10} offsetY={6} spacing={40}>
                    <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => this._toggleTaskModal()} size={20}>
                        <Icon 
                            raised
                            name='create'
                            color= {themeColor}
                            size = {20}
                        />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#9b59b6' title="Set-up Meeting" onPress={() => this._toggleMeetingModal()} size={20} >
                        <Icon 
                            raised
                            name='group'
                            type='font-awesome'
                            color= {themeColor}
                            size = {20}
                        />
                    </ActionButton.Item>
                    </ActionButton>
                </View>
            </KeyboardAvoidingView>

            <Modal isVisible={this.state.isTaskModalVisible} onBackdropPress={this._toggleTaskModal} avoidKeyboard={true}>
                <View style={{ flex: 1}} style={styles.modalContent}>
                <Text style={styles.modalHeader}>SCHEDULE YOUR TASK HERE!</Text>
                <View style={{padding: 10}}>
                <TextInput 
                        style={styles.modalTextInput}
                        placeholder="Task Name"
                        onChangeText={(taskName) => this.setState({ taskName })}
                        value={this.state.taskName}
                    />
                </View>
                <View style={{padding: 10}}>
                <TextInput 
                        style={styles.modalTextInput}
                        placeholder="Task Description"
                        onChangeText={(taskDescription) => this.setState({ taskDescription })}
                        value={this.state.taskDescription}
                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10}}>
                    <TextInput
                        style={[styles.modalTextInput, { width:width*0.60 }]}
                        placeholder="Time"
                        editable = {false}
                        value={this.state.taskTime}
                    />
                   <Icon
                        raised
                        name='access-time'
                        color= {themeColor}
                        size = {20}
                        onPress={() => this._toggleTimeModal()} 
                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10}}>
                    <TextInput
                        style={[styles.modalTextInput, { width:width*0.60 }]}
                        placeholder="Date"
                        editable = {false}
                        value={this.state.taskDate}
                    />
                   <Icon
                        raised
                        name='date-range'
                        color= {themeColor}
                        size = {20}
                        onPress={() => this._toggleDateModal()} 
                    />
                </View>

                <View style={{padding: 30, justifyContent: "center", alignContent: 'center',  alignItems: 'center'}}>
                <Button 
                    buttonStyle={{
                        backgroundColor: themeColor,
                        width: 220,
                        height: 50,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 30,
                        paddingHorizontal: 10,
                      }}
                      icon={{
                        name: 'tasks',
                        type:'font-awesome',
                        size: 15,
                        color: 'white'
                    }}
                    title='Schedule'
                    onPress = {() => this._schedule('task')}
                />
                </View>

                <DateTimePicker
                    isVisible={this.state.isTimeModalVisible}
                    mode = 'time'
                    onConfirm={(time) => this._handleTimePicked(time, 'task')}
                    onCancel={this._toggleTimeModal}
                />

                <DateTimePicker
                    isVisible={this.state.isDateModalVisible}
                    onConfirm={(date) => this._handleDatePicked(date, 'task')}
                    onCancel={this._toggleDateModal}
                />

                </View>
            </Modal>
            
            <Modal isVisible={this.state.isMeetingModalVisible} onBackdropPress={this._toggleMeetingModal} avoidKeyboard={true}>
                <View style={{ flex: 1}} style={styles.modalContent}>
                <Text style={styles.modalHeader}>SCHEDULE YOUR MEETING HERE!</Text>
                <View style={{padding: 10}}>
                <TextInput 
                        style={styles.modalTextInput}
                        placeholder="Meeting Title"
                        onChangeText={(meetingName) => this.setState({ meetingName })}
                        value={this.state.meetingName}
                    />
                </View>
                <View style={{padding: 10}}>
                <TextInput 
                        style={styles.modalTextInput}
                        placeholder="This meeting is about..."
                        onChangeText={(meetingDescription) => this.setState({ meetingDescription })}
                        value={this.state.meetingDescription}
                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10}}>
                    <TextInput
                        style={[styles.modalTextInput, { width:width*0.60 }]}
                        placeholder="Time"
                        editable = {false}
                        value={this.state.meetingTime}
                    />
                   <Icon
                        raised
                        name='access-time'
                        color= {themeColor}
                        size = {20}
                        onPress={() => this._toggleTimeModal()} 
                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10}}>
                    <TextInput
                        style={[styles.modalTextInput, { width:width*0.60 }]}
                        placeholder="Date"
                        editable = {false}
                        value={this.state.meetingDate}
                    />
                   <Icon
                        raised
                        name='date-range'
                        color= {themeColor}
                        size = {20}
                        onPress={() => this._toggleDateModal()} 
                    />
                </View>

                <View style={{padding: 30, justifyContent: "center", alignContent: 'center', alignItems: 'center'}}>
                <Button 
                    buttonStyle={{
                        backgroundColor: themeColor,
                        width: 220,
                        height: 50,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 30,
                        paddingHorizontal: 10,
                      }}
                      icon={{
                        name: 'group',
                        type:'font-awesome',
                        size: 15,
                        color: 'white'
                    }}
                    title='Schedule'
                    onPress = {() => this._schedule('meeting')}
                />
                </View>

                <DateTimePicker
                    isVisible={this.state.isTimeModalVisible}
                    mode = 'time'
                    onConfirm={(time) => this._handleTimePicked(time, 'meeting')}
                    onCancel={this._toggleTimeModal}
                />

                <DateTimePicker
                    isVisible={this.state.isDateModalVisible}
                    onConfirm={(date) => this._handleDatePicked(date, 'meeting')}
                    onCancel={this._toggleDateModal}
                />

                </View>
            </Modal>

        </React.Fragment>
        )
    }
}

const styles = {
    header:{
        backgroundColor: '#2c2638',
        height: height*0.08
      },
      headerTitle:{
        paddingTop:height*0.03,
        paddingBottom:50,
        fontFamily: 'BebasNeue',
        fontSize : 25,
        color: '#ffffff'
    },
    modalHeader:{
        paddingVertical: 30,
        fontFamily: 'BebasNeue',
        fontSize : 25,
        textAlign: 'center',
        color: '#000000'
    },
    modalContent: {
        backgroundColor: "white",
        paddingHorizontal: 30,
        borderRadius: 20,
        borderColor: "rgba(0, 0, 0, 0.1)",
      },
  textInput: {
    height: 40,
    borderColor: 'lightgray',
    borderTopWidth: StyleSheet.hairlineWidth,
    flex: 1,
    paddingHorizontal: 8,
    marginTop: 10
  },
  modalTextInput: {
    height: 40,
    borderColor: 'lightgray',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  sendButton: {
    width: 80,
    backgroundColor: themeColor,
    height: 40,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: 'lightgray',
    marginTop: 10
  },
  sendButtonText: {
    fontSize: 16,
    color: 'white',
    lineHeight: 30,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  messageContainer: {
    flexDirection: 'row',
    padding: 10
  },
  messageBody: {
    flex: 1,
    padding: 8,
    borderRadius: 8,
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  createdAt: {
    color: 'gray',
    fontSize: 12,
    marginHorizontal: 5
  }
}