import React, { Component } from 'react'
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
import moment from 'moment'
import SendBird from 'sendbird'

import {
    Header,
    Left,
    Right,
    Body,
    Title
  } from "native-base";

import {Icon} from 'react-native-elements'
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

console.disableYellowBox = true

var sb;

const themeColor = '#2f1959'
const themeDarkColor = '#287277'

var channelUrl;
var groupChannel;
var friendName;
var userId;

export default class ChatScreen extends Component {
    
    static navigationOptions = {
        title: 'ChatScreen',
        header: null,
    };
    
    constructor(props) {
        super(props)
        this.getGroupChannel = this.getGroupChannel.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
        this.state = { text: '', messages: [] }
        sb = SendBird.getInstance();
    }

    componentDidMount() {
        this.getGroupChannel();
        const ChannelHandler = new sb.ChannelHandler()
        ChannelHandler.onMessageReceived = (receivedChannel, message) => {
            if (receivedChannel.url === groupChannel.url) {
                const messages = []
                messages.push(message)
                const newMessages = messages.concat(this.state.messages)
                this.setState({ messages: newMessages })
                if (groupChannel.channelType == 'group') {
                    groupChannel.markAsRead()
                }
            }
        }
        sb.addChannelHandler('ChatScreen', ChannelHandler)

        const ConnectionHandler = new sb.ConnectionHandler()
        ConnectionHandler.onReconnectSucceeded = () => {
            this.getChannelMessage(true)
            channel.refresh()
        }
        sb.addConnectionHandler('ChatView', ConnectionHandler)
    }

    getGroupChannel() {
        channelUrl = this.props.navigation.getParam('channelUrl', null);
        userId = this.props.navigation.getParam('userID', null);
        //get groupchannel
        sb.GroupChannel.getChannel(channelUrl, function(channel, error){
            //add alert and go back on press
            if(error){
                console.log('Could not get channel');
                console.log(error);
            }
        
            groupChannel = channel;
            //Get friend Name
            if(userId === null)
                friendName = channel.name;
            else 
                friendName = channel.members[0].userId === userId ? channel.members[1].nickname : channel.members[0].nickname;
            
                messageQuery = channel.createPreviousMessageListQuery();
        });
        this.getChannelMessage(true);
    }

    sendMessage() {
        if(this.state.text === "")
            return
        groupChannel.sendUserMessage(this.state.text, '', (message, error) => {
            if (error) {
                console.error(error)
                return
            }
            const messages = [].concat([message]).concat(this.state.messages)
            this.setState({ text: '', messages })
        })
    }

    getChannelMessage(refresh) {
        if (refresh) {
            messageQuery = groupChannel.createPreviousMessageListQuery()
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

    renderMessage(msg) {
        const createdAt = moment(msg.createdAt).format('H:mm')
        if (msg._sender.userId === userId) {
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

    render() {
        return (
        <React.Fragment>
            <Header  iosBarStyle='light-content' androidStatusBarColor='#ffffff' style={styles.header}>
                    <Left/>
                        <Body>
                            <Title style={styles.headerTitle}>{friendName}</Title>
                        </Body>
                    <Right />
            </Header>
            <FlatList
                inverted
                onEndReached={() => this.getChannelMessage(false)}
                data={this.state.messages}
                renderItem={({ item }) => this.renderMessage(item)}
                style={{ flex: 1 }}
                />
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
            >
                <View style={{ flexDirection: 'row' }}>
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
                        size = '20'
                        onPress={this.sendMessage} 
                    />
                </View>
            </KeyboardAvoidingView>
        </React.Fragment>
        )
    }
}

const styles = {
    header:{
        backgroundColor: '#2c2638',
        height: height*0.1
      },
      headerTitle:{
        textTransform: 'capitalize',
        paddingTop:height*0.03,
        paddingBottom:50,
        fontFamily: 'BebasNeue',
        fontSize : 25,
        color: '#ffffff'
    },
  textInput: {
    height: 40,
    borderColor: 'lightgray',
    borderTopWidth: StyleSheet.hairlineWidth,
    flex: 1,
    paddingHorizontal: 8,
    marginTop: 10
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
    borderRadius: 5
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