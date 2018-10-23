import React from 'react';
import {
  AsyncStorage,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import { Button } from 'react-native-elements'
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

var apiURL = 'http://172.20.10.4:3000/api';

var matchesArray = [];
var textToPrint;

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      lastRefresh: Date(Date.now()).toString(),
    }
    
    this.refreshScreen = this.refreshScreen.bind(this)

    this.getUserMatches();
  }
  
  //function that grabs a new user and refreshes the screen to update the
  //parameters.
  refreshScreen() {
    this.setState({ lastRefresh: Date(Date.now()).toString() })
  }

  static navigationOptions = {
    header: null,
  };

  //Function to get the matches array and store it for use afterwards.
  getUserMatches = async () => { 
    userToken = await AsyncStorage.getItem('userToken');

    console.log("This is get userMatches");

    if (userToken != null) {
      matchesArray = [];
      var matches = {
        method: 'GET',
        headers: {
          'Authorization': userToken
        },
      }
      //need to update the get request.
      fetch(apiURL + '/user', matches)
      .then(response => response.json())
      .then(
        response => {
          console.log(response)
          if(response.success){
            console.log(response.user.potentialMatches)
            for(var i = 0; i < response.user.potentialMatches.length; i++)
              matchesArray.push(response.user.potentialMatches[i]);
          }
        }
      )
      .then(async () => this.refreshScreen())
    }
  }

  //function to display the matches (fix to display first and last name)
  displayMatchOnScreen () {
    textToPrint = ""
    for(var i = 1; i < matchesArray.length + 1; i++){
      this.displayMatch(matchesArray[i - 1]);
      textToPrint += i + ": " + matchesArray[i - 1] + "\n"
    }
  }

  //need to make sure
  displayMatch = async (userid) => {
    userToken = await AsyncStorage.getItem('userToken');

    console.log("This is display Match");

    if(userToken != null){
      var user = {
        method: 'GET',
        headers: {
          'Authorization': userToken,
          'id': userid,
        },
      }
      fetch(apiURL + '/user/getuser/', user)
      .then(response => response.json())
      .then(
        response => {
          console.log(response)
        }
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.getStartedContainer}>

            <Text style={styles.getStartedText}>{this.displayMatchOnScreen()}{textToPrint}
            </Text>

            <Button
              title='Refresh'
              onPress = {this.getUserMatches}
            />

          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    marginTop:100,
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },

  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },

});
