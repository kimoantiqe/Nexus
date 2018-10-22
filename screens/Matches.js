import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Button } from 'react-native-elements'
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

var userToken;
var apiURL = 'https://nexus-restapi.azurewebsites.net/api';
var currapiURL = 'http://localhost:3000/api';


var currUserID;
var firstName;
var bio;
var interests;
var industry;

export default class Matches extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      lastRefresh: Date(Date.now()).toString(),
    }
    
    this.refreshScreen = this.refreshScreen.bind(this)

    this.getUser();
  }

  //Function that grabs a user from the database.
  getUser = async () => { 
    userToken = await AsyncStorage.getItem('userToken');

    console.log("This is get user");

    if (userToken != null) {
      var grabUser = {
        method: 'GET',
        headers: {
          'Authorization': userToken
        },
      }
      fetch(currapiURL + '/user/getpotconn', grabUser)
      .then(response => response.json())
      .then(
        response => {
          if(response.success){
            currUserID = response.user.id;
            console.log(currUserID)
          }
        }
      )
    }
  }

  //Function that is used to report a like to the server
  likedUser = async () => { 
    userToken = await AsyncStorage.getItem('userToken');

    console.log("This is liked user");

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
      fetch(apiURL + '/user/getpotconn', updateUser)
      .then(response => 
        console.log(response)
        )
    }
    this.refreshScreen();
  }

  //Function that is used to report a dislike to the server
  dislikedUser = async () => { 
    userToken = await AsyncStorage.getItem('userToken');

    console.log("This is disliked user");

    if (userToken != null) {
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
      fetch(apiURL + '/user/getpotconn', updateUser)
      .then(response => 
        console.log("Hello" + response)
        )
    }
    this.refreshScreen();
  }
  
  static navigationOptions = {
    header: null,
  };

  //function that grabs a new user and refreshes the screen to update the
  //parameters.
  refreshScreen() {
    this.getUser();
    this.setState({ lastRefresh: Date(Date.now()).toString() })
  }

  //Need to setup to receive data from our database server
  render() {
    <StatusBar hidden />
    return (
      <View style={styles.container}>
          
          //This is the profile image container
          <View style={styles.profilePicContainer}>
            <Image source={require("./../images/d3rs.jpg")}
            style = {styles.profilePic}
            resizeMode = "contain"
            />
          </View>
          
          //This is the bio box container (need to update)
          <View style={styles.bioTextContainer}>
            <Text style = {styles.bioText}>Bio</Text>
            <Text style = {styles.bioText}>this is {currUserID}</Text>
          </View>
          
          //This is the dislike button 
          <View style={styles.buttonCloseContainer}>
            <TouchableOpacity 
            style = {styles.buttonClose}
            onPress = {this.dislikedUser}>
            <Image source={require("./../images/2.png")}
            style = {styles.image}
            resizeMode = "contain"
            />
            </TouchableOpacity>
          </View>
          
          //This is the like button 
          <View style={styles.buttonThumbsContainer}>
            <TouchableOpacity 
            style = {styles.buttonThumbs}
            onPress = {this.likedUser}>
            <Image 
            source={require("./../images/thumbs.png")} 
            style = {styles.image}
            resizeMode = "contain"
            />
            </TouchableOpacity>
          
          </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f2f8',
  },

  image:{
    height: 40,
    width: 40,
  },

  buttonClose: {
    backgroundColor: 'rgba(224, 82, 87, 1)',
    borderRadius: 50,
    padding: 10,
    marginBottom: 60,
    alignItems: 'center',
  },

  buttonThumbs: {
    backgroundColor: 'rgba(111, 122, 213, 1)',
    borderRadius: 100,
    padding: 10,
    marginBottom: 60,
    alignItems: 'center',
  },

  buttonCloseContainer: {
    width: 130,
    height: 5,
    position: 'absolute',
    left: 35,
    bottom: 100
  },

  buttonThumbsContainer: {
    width: 130,
    height: 5,
    position: 'absolute',
    right: 35,
    bottom: 100
  },

  profilePicContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  profilePic: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },

  bioTextContainer: {
    backgroundColor: '#ffffff',
    width: (Dimensions.get('window').width)/2 + 100,
    alignSelf: 'center',
    position: 'absolute',
    padding: 20,
    top: Dimensions.get('window').width - 50,
  },

  bioText: {
    alignSelf: 'center',
    marginBottom: 10,
  },

});
