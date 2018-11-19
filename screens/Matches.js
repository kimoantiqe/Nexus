import React, { Component }  from 'react';
import { Image,   ActivityIndicator,
  AsyncStorage,
  StatusBar} from 'react-native';
  import {userToken} from './Login'
import { Container, Button, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Right,  Body, Icon } from 'native-base';
import { WebBrowser } from 'expo';
import {user2Token} from './HomeScreen'
import { MonoText } from '../components/StyledText';

const APIcall      = require("../API_calls/APIs");

var apiURL = APIcall.apiURL;

var currUserID;
var firstName;
var lastName;
var bio;
var interests;
var industry;
var index;

var cards = [];
var cards2 =[];

export default class Matches extends React.Component {
  constructor(props) {
    super(props);
    this.refreshScreen = this.refreshScreen.bind(this);
    
    this.state = {
      lastRefresh: Date(Date.now()).toString(),
    };
    this.getUser();
  }

  componentDidMount(){
    this.refreshScreen();
  }
  refreshScreen() {
    if(cards.length ==0 ){
      this.getUser();
    }
    this.setState({ lastRefresh: Date(Date.now()).toString() });
  }

  


  //Function that grabs a user from the database.
  getUser = async () => {
    console.log("this is getUser");
    //userToken = await AsyncStorage.getItem('userToken');

    //let userToken = user2token;
    if (userToken != null) {

      var grabUser = {
        method: 'GET',
        headers: {
          'Authorization': userToken
        },
      };

      fetch(apiURL + '/user/getpotconn', grabUser)
      .then((response) => response.json())
      .then(
        (response) => {
          if(response.success){
            //console.log(response.array);
            var array = JSON.parse(response.array);
            //console.log(array.length);
            for(let i=0; i< array.length; i++){
              cards[i] = (array[i]);
            }
            //console.log(cards);
          }
        }

      ).catch((error) => console.error(error)
      );
    }
    return cards;
  };

  //Function that is used to report a like to the server
  likedUser = async (currUserID) => {
    //userToken = await AsyncStorage.getItem('userToken');

    console.log("This is liked user " + userToken);

    if (userToken != null) {
      var updateUser = {
        method: 'PUT',
        headers: {
          'Authorization': userToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'liked' : [currUserID]
          })
      }
      await fetch(apiURL + '/user', updateUser)
    }
  }

  //Function that is used to report a dislike to the server
   dislikedUser = async (currUserID) => {

    //userToken = await AsyncStorage.getItem('userToken');

    console.log("This is disliked user" + currUserID);

    if (userToken != null) {
      console.log("This is disliked user" + currUserID);
      var updateUser = {
        method: 'PUT',
        headers: {
          'Authorization': userToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'disliked' : [currUserID]
          })
      }
      fetch(apiURL + '/user', updateUser)
    }
  }

  static navigationOptions = {
    header: null,
  };


  //Need to setup to receive data from our database server
  render() {
  return (
    <Container>
      <Header />
      <View>
        <DeckSwiper
          ref={(c) => this._deckSwiper = c}
          dataSource={cards}
          looping={false}
          onSwipeLeft ={async(item) =>  {
            await this.likedUser(item._id);
            cards.shift();
            if(cards.length ==1 ){
              this.getUser();
            }
            //console.log(cards);
          }
          }
          
          onSwipeRight = {item => {
            //this.dislikedUser(item._id);
            cards.shift();
            //console.log(cards);
            
          }}
          renderEmpty={() =>{
            return
            {
              <View style={{ alignSelf: "center" }}>
                <Text>Over</Text>
              </View>
            }
          }
          }
          renderItem={item =>
            <Card style={{ elevation: 10 }}>
              <CardItem>
                <Left>
                  <Thumbnail source={require("./../images/d3rs.jpg")} />
                  <Body>
                    <Text>{item.firstName + " " + item.lastName}</Text>
                    <Text note>NativeBase</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image style={{ height: 300, flex: 1 }} source={require("./../images/d3rs.jpg")} />
              </CardItem>
              <CardItem>
                <Icon name="heart" style={{ color: '#ED4A6A' }} />
              <Text>{item.firstName + " " + item.lastName}</Text>
              </CardItem>
            </Card>
          }
        />
      </View>
      <View style={{ flexDirection: "row", flex: 1, position: "absolute", bottom: 50, left: 0, right: 0, justifyContent: 'space-between', padding: 15 }}>
        <Button iconLeft onPress={async(item) => {await this.likedUser(item._id);
            cards.shift();
            if(cards.length ==1 ){
              this.getUser();
            }
          }
        }
            >
          <Icon name="arrow-back" />
          <Text>Swipe Left</Text>
        </Button>
        <Button iconRight onPress={() => this._deckSwiper._root.swipeRight()}>
          <Icon name="arrow-forward" />
          <Text>Swipe Right</Text>
        </Button>
      </View>
    </Container>
);
}
}
