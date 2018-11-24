import React from 'react';
import { List, ListItem, Avatar } from 'react-native-elements'
import { AsyncStorage, Dimensions, View } from 'react-native'
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
import { sbConnect, sbCreateChannel } from '../sendbirdActions';

const APIcall      = require("../API_calls/APIs");

var apiURL = APIcall.apiURL;

var userToken;
var channel;
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default class AddUser extends React.Component {
    
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            matchesArray: []
        }
    }

    componentDidMount() {
        this._getUserMatches();
    }

    //Function to get the matches array and store it for use afterwards.
    _getUserMatches = async () => {
        
        userToken = await Expo.SecureStore.getItemAsync("userToken");
        
        if (userToken != null) {
            var matches = {
                method: "GET",
                headers: {
                    Authorization: userToken
                }
            };
      
            await fetch(apiURL + "/user", matches)
            .then(response => response.json())
            .then(async response => {
                if (response.success) {
                    for (var i = 0; i < response.user.matches.length; i++) {
                        if(response.user.matches[i])
                            await this._getUser(response.user.matches[i]);
                    }   
                }
            });
        }
    };

  
    _getUser = async (userid) => {

        if (userToken != null) {
            var user = {
                method: "GET",
                headers: {
                    Authorization: userToken
                }
            };
            await fetch(apiURL + "/user/getuser/?id=" + userid, user)
            .then(response => response.json())
            .then(response => {
                console.log(response.user._id);
                
                let match = {name: '', avatar_url: '', userid: ''};
                match.name = response.user.firstName + ' ' + response.user.lastName;
                match.avatar_url = require("../images/sherif.png");
                match.userid = userid;
                
                const newList = this.state.matchesArray;
                newList.push(match);
                this.setState({ matchesArray: newList });
            });
        }
    };

    _addUser = (userid) => {
        const currUserid = this.props.navigation.getParam('userID', null);
        const userids = [currUserid, userid];
        sbCreateChannel(userids, 'MyChannel').then((groupChannel) => {
            const todayDate = Number(new Date(moment(Date.now()).format('YYYY-MM-DDTHH:mm:s')));
            const createdAtDate = Number(new Date(moment(groupChannel.createdAt).format('YYYY-MM-DDTHH:mm:s')));
            if(todayDate === createdAtDate)
                this.props.navigation.state.params.addChannel(groupChannel);
            
            this.props.navigation.goBack();
        });
    }

    render() {
        console.log(this.state.matchesArray)
        return (
            <View>
            <Header  iosBarStyle='light-content' androidStatusBarColor='#ffffff' style={styles.header}>
                <Left/>
                    <Body>
                        <Title style={styles.headerTitle}>ADD USER</Title>
                    </Body>
                <Right />
            </Header>
            <List>
            {
                this.state.matchesArray.map((l) => (
                    <ListItem
                        key = {l.avatar_url}
                        avatar={(
                            <Avatar 
                                medium
                                rounded
                                source={l.avatar_url} 
                            />
                        )}
                        title={l.name}
                        rightIcon = {(
                            <Icon name="person-add" style={{color:'#f5ba57'}} onPress={() => this._addUser(l.userid)} />
                        )}
                    />
                ))
            }
            </List>
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
};


