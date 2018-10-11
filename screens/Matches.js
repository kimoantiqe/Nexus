import React from 'react';
import {
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
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
export default class Matches extends React.Component {
  static navigationOptions = {
    header: null,
  };

  //Need to setup to receive data from our database server
  render() {
    <StatusBar hidden />
    return (
      <View style={styles.container}>
          <View style={styles.profilePicContainer}>
            <Image source={require("./../images/d3rs.jpg")}
            style = {styles.profilePic}
            resizeMode = "contain"
            />
          </View>
          <View style={styles.bioTextContainer}>
            <Text style = {styles.bioText}>Bio</Text>
            <Text style = {styles.bioText}>This is an initial text box. This will contain my bio and everything related to me!</Text>
          </View>
          <View style={styles.buttonCloseContainer}>
            <TouchableOpacity style = {styles.buttonClose}>
            <Image source={require("./../images/2.png")}
            style = {styles.image}
            resizeMode = "contain"
            />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonThumbsContainer}>
            <TouchableOpacity style = {styles.buttonThumbs}>
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
    left: 50,
    bottom: 100
  },

  buttonThumbsContainer: {
    width: 130,
    height: 5,
    position: 'absolute',
    right: 50,
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

  //Need to delete 
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
