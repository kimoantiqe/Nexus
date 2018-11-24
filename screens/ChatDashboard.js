import React from 'react';
import { AsyncStorage, StyleSheet, View, Alert, ListView, TouchableHighlight, Dimensions} from 'react-native';
import { Avatar, ListItem, Badge, Text} from 'react-native-elements'
import { connect } from 'react-redux'
import { sbCreateGroupChannelListQuery, sbConnect } from '../sendbirdActions';
import { getGroupChannelList } from '../actions';
import moment from 'moment'

import {
    Header,
    Left,
    Right,
    Body,
    Title,
    Icon,
    Button,
  } from "native-base";
import Modal from "react-native-modal";

var userID;
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

class ChatDashboard extends React.Component {
    
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            refresh: false,
            childRefresh: false,
            groupChannelListQuery: null,
            list: [],
            groupChannelList: ds.cloneWithRows([]),
        }
    }


    getUserID = async() => {
        //userID ='5bcf97fd4a5aa600150cc338';
        userID = await AsyncStorage.getItem("userid");
    }

    componentDidMount() {
        //this._connectSb();
        this.getUserID();
        this._initGroupChannelList();
    }

    componentWillReceiveProps(props) {
        
        const { list } = props;
    
        if (list !== this.props.list) {
            if (list.length === 0) {
                this.setState({ list: [], groupChannelList: ds.cloneWithRows([]) });    
            } else {
                const newList = [...this.state.list, ...list];
                this.setState({ list: newList, groupChannelList: ds.cloneWithRows(newList) });
            }
        }
    }

    _returnData() {
        this.setState({childRefresh: !this.state.childRefresh});
    }

    _addChannel(channel) {
        console.log('Went back')
        let newList = this.state.list;
        newList.push(channel);
        this.setState({ list: newList, groupChannelList: ds.cloneWithRows(newList) });
    }

    _connectSb = () => {
        sbConnect('5bcf97fd4a5aa600150cc338', 'Ahmed');
    }

    _initGroupChannelList = () => {
        this._getGroupChannelList(true);
    }

    _getGroupChannelList = (init) => {
        if (init) {
            console.log("init");
            const groupChannelListQuery = sbCreateGroupChannelListQuery();
            console.log(groupChannelListQuery);
            this.setState({ groupChannelListQuery }, () => {
                this.props.getGroupChannelList(this.state.groupChannelListQuery);        
            });
        } else {
            this.props.getGroupChannelList(this.state.groupChannelListQuery); 
        }
    }
    
    _onListItemPress = (channelUrl, unreadMessageCount) => {
        this.props.navigation.navigate(
            'ChatScreen', 
            { channelUrl: channelUrl,
              userID: userID,
              unreadMessageCount: unreadMessageCount,
              returnData: this._returnData.bind(this)
            }
        );
    }

    _handleScroll = (e) => {
        if (e.nativeEvent.contentOffset.y < -100 && !this.state.refresh) {
            this.setState({ list: [], groupChannelList: ds.cloneWithRows([]), refresh: true }, () => {
                this._initGroupChannelList();
            });
        }
    }
    
    _renderBadge = (count, createdAt) => {
        if(count > 0)
            return (
                <View>
                <Text style={{paddingBottom: 5, fontSize: 15}}>{createdAt}</Text>
                <Badge
                    value={count}
                    textStyle={{ color: 'orange' }}
                />
                </View>
            )
        else    
            return createdAt;
    }

    _formatTime = (timeStamp) => {
        return;
    }

    _renderList = (rowData) => {
        let lastMessage;
        let createdAt;
        const profileUrl = rowData.members[0].userId == userID ? rowData.members[1].profileUrl : rowData.members[0].profileUrl
        if(rowData.lastMessage === null)
            lastMessage = 'Let\'s start chatting!';
        else {
            lastMessage = rowData.lastMessage.message;
            const todayDate = Number(new Date(moment(Date.now()).format('YYYY-MM-DD')));
            const lastMessageDate = Number(new Date(moment(rowData.lastMessage.createdAt).format('YYYY-MM-DD')));
    
            if(todayDate === lastMessageDate)
                createdAt = moment(rowData.lastMessage.createdAt).format('h:mm A');
            else    
                createdAt = moment(rowData.lastMessage.createdAt).format('MM-DD-YYYY');

            if(rowData.lastMessage._sender.userId === userID)  
                lastMessage = 'You: ' + lastMessage;
        }
        return (
            <ListItem
                component={TouchableHighlight}
                containerStyle={{backgroundColor: '#fff'}}
                key={rowData.url}
                avatar={(
                    <Avatar 
                        medium
                        rounded
                        source={{uri: profileUrl}} 
                    />
                )}
                title={
                    rowData.members[0].userId == userID ? rowData.members[1].nickname : rowData.members[0].nickname
                }
                subtitle={lastMessage}
                rightTitle={this._renderBadge(rowData.unreadMessageCount, createdAt)}
                titleStyle={{fontWeight: '500', fontSize: 17}}
                onPress={ () => this._onListItemPress(rowData.url, rowData.unreadMessageCount) }
            />
        )
    }

    render() {
        return (
            <View>
                <Header  iosBarStyle='light-content' androidStatusBarColor='#ffffff' style={styles.header}>
                    <Left/>
                        <Body>
                            <Title style={styles.headerTitle}>CHAT</Title>
                        </Body>
                    <Right>
                        <Button transparent>
                            <Icon name="person-add" style={{color:'#f5ba57'}} onPress={() => 
                                this.props.navigation.navigate("AddUser", {
                                    userID: userID,
                                    addChannel: this._addChannel.bind(this)
                                })}
                            />
                        </Button>
                    </Right>
                </Header>
                <ListView
                    enableEmptySections={true}
                    renderRow={this._renderList}
                    dataSource={this.state.groupChannelList}
                    onEndReached={() => this._getGroupChannelList(false)}
                    onEndReachedThreshold={-50}
                    onScroll={this._handleScroll}
                />
            </View>
        )
    }
}

const styles = {
    header:{
        backgroundColor: '#2c2638',
        height: height*0.08
      },
      headerTitle: {
        paddingTop: height * 0.03,
        paddingBottom: 50,
        fontFamily: "BebasNeue",
        fontSize: 25,
        color: "#ffffff"
      },
      modalHeader:{
        paddingVertical: 30,
        fontFamily: 'BebasNeue',
        fontSize : 25,
        textAlign: 'center',
        color: '#000000'
    },
    buttonText:{
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingLeft: 10, 
        paddingRight: 30,
        fontSize: 20,
        fontFamily: 'BebasNeue',
        textAlign: 'center',
        color: '#000000'
    },
    modalContent: {
        backgroundColor: "white",
        paddingHorizontal: 30,
        borderRadius: 20,
        borderColor: "rgba(0, 0, 0, 0.1)",
        alignContent: 'center',
        alignItems: 'center',
      },
};

const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
});

function mapStateToProps({ chatdashboard })  {
    const { list } =  chatdashboard ;
    return { list };
}

export default connect(mapStateToProps, { getGroupChannelList })(ChatDashboard);
