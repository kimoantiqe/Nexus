import React from 'react';
import { AsyncStorage, StyleSheet, View, Alert, ListView, TouchableHighlight, Button, Dimensions} from 'react-native';
import { Avatar, ListItem} from 'react-native-elements'
import { connect } from 'react-redux'
import { sbCreateGroupChannelListQuery } from '../sendbirdActions/groupChannel';
import { getGroupChannelList } from '../actions';


import {
    Header,
    Left,
    Right,
    Body,
    Title
  } from "native-base";

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
            groupChannelListQuery: null,
            list: [],
            groupChannelList: ds.cloneWithRows([])
        }
        this.getUserID();
    }

    getUserID = async() => {
        userID = await AsyncStorage.getItem("userid");
    }

    componentDidMount() {
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
    
    _onListItemPress = (channelUrl) => {
        this.props.navigation.navigate(
            'ChatScreen', 
            { channelUrl: channelUrl,
              userID: userID
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
    
    _renderList = (rowData) => {
        return (
            <ListItem
                component={TouchableHighlight}
                containerStyle={{backgroundColor: '#fff'}}
                key={rowData.url}
                avatar={(
                    <Avatar 
                        source={{uri: rowData.coverUrl}} 
                    />
                )}
                title={
                    rowData.members[0].userId == userID ? rowData.members[1].nickname : rowData.members[0].nickname
                }
                titleStyle={{fontWeight: '500', fontSize: 16}}
                onPress={ () => this._onListItemPress(rowData.url) }
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
                    <Right />
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
        height: height*0.1
      },
      headerTitle:{
        paddingTop:height*0.03,
        paddingBottom:50,
        fontFamily: 'BebasNeue',
        fontSize : 25,
        color: '#ffffff'
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
