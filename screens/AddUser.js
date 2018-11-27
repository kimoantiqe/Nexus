import React from 'react';
import { List, ListItem, Avatar } from 'react-native-elements'
import { AsyncStorage, Dimensions, View, Text } from 'react-native'
import moment from 'moment'

import {
    Container,
    Header,
    Left,
    Right,
    Body,
    Title,
    Icon,
    Button,
  } from "native-base";
import { sbConnect, sbCreateChannel } from '../sendbirdActions';
import { WaveIndicator } from "react-native-indicators";


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
                match.avatar_url = apiURL + "/image/" + response.user.image;
                match.userid = userid;
                console.log(match.avatar_url)               
                const newList = this.state.matchesArray;
                newList.push(match);
                this.setState({ matchesArray: newList });
            });
        }
    };

    _addUser = async (userid) => {
        const currUserid = this.props.navigation.getParam('userID', null);
        const userids = [currUserid, userid];
        let flag = true;
        await sbCreateChannel(userids, 'MyChannel').then((groupChannel) => {
            let list = this.props.navigation.getParam('list', null);
            for(i = 0; i < list.length; i++){
                if(list[i].url === groupChannel.url){
                    flag = false;
                    break;
                }
            }
            if(flag)
                this.props.navigation.state.params.addChannel(groupChannel);
            this.props.navigation.goBack();
        });
    }

    //key = {l.avatar_url}
    render() {
        if (!this.state.matchesArray.length) {
            return (
            <Container>
                <Header  iosBarStyle='light-content' androidStatusBarColor='#ffffff' style={styles.header}>
                    <Left/>
                        <Body>
                            <Title style={styles.headerTitle}>ADD USER</Title>
                        </Body>
                    <Right/>
                </Header>
                <View style={{
                    flex: 1}}>
                    <WaveIndicator
                        size={80}
                        color="#2c2638"
                        style={{ flex: 0, marginTop: height*0.3 }}
                    />
                        <Text style={{textAlign: 'center', paddingHorizontal: 20}}>It looks like you haven't matched with anyone yet! Please come back later.</Text>
              </View>
            </Container>
            
            );
          }
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
                        key = {l.userid}
                        avatar={(
                            <Avatar 
                                medium
                                rounded
                                source={{uri: l.avatar_url}} 
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


