import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder } from 'react-native';
import Expo from 'expo' 
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
var image = require('./../images/d3rs.jpg')
import Icon from 'react-native-vector-icons/Ionicons'
import {userToken3} from './Login'
import {userToken1} from './CheckAuth'
import {userToken2} from './RegCompleteProfile'

var userToken;
//var userToken2;
var apiURL = 'http://localhost:1337/api';
const Users = [
  {  uri: require('./../images/d3rs.jpg') },
  { uri: require('./../images/d3rs.jpg') },
  { uri: require('./../images/d3rs.jpg') },
  { uri: require('./../images/d3rs.jpg') },
  { uri: require('./../images/d3rs.jpg') },
]
//var userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWJlZjUxNTM3YjQ0NTg3YzlmM2ZmMDRmIiwiaWF0IjoxNTQyNDI1NjM0LCJleHAiOjE1NDI0MzI4MzR9.yj8_g1Vd43fR_6-AciWbjFzPZOZSrlLw0JylSteBz8o"
export default class Matches extends React.Component {

  constructor() {
    super()

    this.position = new Animated.ValueXY()
    this.state = {
      currentIndex: 0
    }

    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp'
    })

    this.rotateAndTranslate = {
      transform: [{
        rotate: this.rotate
      },
      ...this.position.getTranslateTransform()
      ]
    }
    this.likehandler = (itemid) => {
      if(this.position.x < SCREEN_WIDTH / 2){
        console.log("shhshs");
      }
    }
    this.likeOpacity= this.position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [0, 0, 1],
        extrapolate: 'clamp'
    })
    this.dislikeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp'
    })

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp'
    })
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp'
    })
    
  }

   likedUser = async (currUserID) => {
    if (userToken != null) {
      console.log("This is liked user " + currUserID);

      
      var updateUser = {
        method: 'PUT',
        headers: {
          'Authorization': userToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'liked' : [currUserID]
          })
      };
      await fetch(apiURL + '/user', updateUser).then(response => response.json())
      .then(async(response) => {console.log(response);})
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
   //Function that grabs a user from the database.
   getUser = async () => {
    console.log("this is getUser ");
    
    userToken= await Expo.SecureStore.getItemAsync("userToken");

  
    // if(userToken1 != null){
    //   userToken = userToken1;
    //   console.log("userToken1");
    // }
    // else if(userToken2 != null){
    //   userToken = userToken2;
    //   console.log("userToken2");
    // }
    // else if(userToken3 != null){
    //   userToken = userToken3;
    //   console.log("userToken3");
    // }
    
    //let userToken = user2token;
    if (userToken != null) {
      console.log(userToken);
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
            console.log(array.length);
            for(let i=0; i< array.length; i++){
              Users[i] = (array[i]);
            }
            console.log(Users);
          }
        }

      ).catch((error) => console.error(error)
      );
    }
    return cards;
  };


  componentWillMount() {
    this.PanResponder = PanResponder.create({

      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {

        this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
      },
      onPanResponderRelease: (evt, gestureState) => {

        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
          }).start(() => {
            this.likedUser(Users[this.state.currentIndex]._id);
           if(this.state.currentIndex ==2){
             this.getUser();
            this.setState({ currentIndex: 0}, () => {
              this.position.setValue({ x: 0, y: 0 })
           });
          }
          else {
              this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
          }
          })
          
        }
        else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
          }).start(() => {
            this.dislikedUser(Users[this.state.currentIndex]._id);
            console.log("shshshsh");
            if(this.state.currentIndex ==2){
              this.getUser();
             this.setState({ currentIndex: 0}, () => {
               this.position.setValue({ x: 0, y: 0 })
            });
           }
           else {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
          }
          })
        }
        else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4
          }).start()
        }
      }
    })
    this.getUser();
  }

  renderUsers = () => {

    return Users.map((item, i) => {


      if (i < this.state.currentIndex) {
        return null
      }
      else if (i == this.state.currentIndex) {

        return (
          <Animated.View
            {...this.PanResponder.panHandlers}
            key={item.id} style={[this.rotateAndTranslate, { height: SCREEN_HEIGHT - 400, width: SCREEN_WIDTH, padding: 10, position: 'absolute' }]}>
            <Animated.View style={{ opacity: this.likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</Text>

            </Animated.View>

            <Animated.View style={{ opacity: this.dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>
            </Animated.View>

            <Image
              style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
              source={image} />
              <Text>
             {item.firstName}
              </Text>
          </Animated.View>
        )
      }
      else {
        return (
          <Animated.View
            key={item.id} style={[{
              opacity: this.nextCardOpacity,
              transform: [{ scale: this.nextCardScale }],
              height: SCREEN_HEIGHT - 420, width: SCREEN_WIDTH, padding: 10, position: 'absolute'
            }]}>
            <Animated.View style={{ opacity: 0, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</Text>

            </Animated.View>

            <Animated.View style={{ opacity: 0, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>

            </Animated.View>

            <Image
              style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
              source={image} />
            
          </Animated.View>
        )
      }
    }).reverse()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 60 }}>

        </View>
        <View style={{ flex: 1 }}>
          {this.renderUsers()}
        </View>
        <View style={{ height: 60 }}>

        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100
  },
});