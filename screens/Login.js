import React, { Component } from 'react';
import { LinearGradient } from 'expo';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
   KeyboardAvoidingView, Alert, TextInput,
} from 'react-native';
import MainTabNavigator from '../navigation/MainTabNavigator';
import AppNavigator from '../navigation/AppNavigator';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default class Login extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };

  state = {
      username: '',
      password: ''
   };

   handleUsername = (text) => {
      this.setState({ username: text })
   }

   handlePassword = (text) => {
      this.setState({ password: text })
   }

  render() {

    return (
          <View style = {styles1.contaier} >



              <View style={{ backgroundColor: '#1a2a6c', flex: 0.5, opacity: 1 }} >

                  <LinearGradient
                    colors={ [ '#3c1053', '#000000']}
                    locations={[0.0, 3.7]}
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: 0,
                      height: height,
                    }}
                    />


                    <View style = {styles1.cloudcon}>
                        <Image
                        style = {styles1.cloud}
                        source ={require('../images/cloud3.png')} />
                    </View>

                    <View style = {styles1.cloudcon}>
                        <Image
                        style = {styles1.cloud2}
                        source ={require('../images/cloud3.png')} />
                    </View>
                    <View style = {styles1.cloudcon}>
                        <Image
                        style = {styles1.cloud3}
                        source ={require('../images/cloud3.png')} />
                    </View>

                <View style = {styles1.logoContainer}>
                    <Image
                    style = {styles1.logoImage}
                    source ={require('../images/Nexus.png')} />
                </View>



                <View style = {{flex:0.7}}>
                    <KeyboardAvoidingView behavior = "padding" style = {styles.containter}>
                       <View style = {styles.containter}>
                           <TextInput
                               placeholder = "Email Address"
                               placeholderTextColor = 'rgba(255, 255, 255, 0.2)'
                               style = {styles.input}
                               onChangeText = {this.handleUsername}
                           />
                           <TextInput
                               placeholder = "password"
                               placeholderTextColor = 'rgba(255, 255, 255, 0.2)'
                               secureTextEntry
                               style = {styles.input}
                               onChangeText = {this.handlePassword}
                           />

                           <Button
                              title = "Login"
                              color = "#659bf2"
                              onPress = {this.signIn}
                           />

                           <Text style={styles.input1}>Dont have an account?
                           </Text>
                           <Button
                              title = "Register"
                              color = "#659bf2"
                              onPress = {this.Register}
                           />
                       </View>
                    </KeyboardAvoidingView>
                </View>
            </View>

      </View>


    );
  }
  signIn = async () => {

    console.log("yup");

    var settings = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/JSON'
  },
  body: JSON.stringify({
    'email' : this.state.username,
    'password' : this.state.password
    })
  };

  var apiURL = 'https://nexus-restapi.azurewebsites.net/api';

fetch(apiURL + '/user/login', settings)
.then(response => response.json())
.then( 

  response =>
{
    console.log(response);

  if (response.success) {
    AsyncStorage.setItem('userToken', response.token);
    this.props.navigation.navigate('Main');
  } else {

    switch (response.error) 
    {
    case 'Not registered': 
      alert("This Username is not registered\nGo to \"Register\" to make an account");
      break;
    case 'invalid password':
      alert("Incorrect password");
      break;
    case 'Please enter a password to login':
      alert("Please enter your password");
      break;
    case 'Please enter an email to login':
      alert("Please enter your email");
      break;
    case 'A valid email  was not entered':
      alert("Please enter a valid email\n(abc@xyz.com)");
      break;
    }
  }
}
  )
.catch(error => console.error('Error:', error));



   };
   Register = async () => {
      this.props.navigation.navigate('Register');
    };
}



//To make our design dynamic and compatible with all screen sizes
//Always do this

//FIRST SET WIDTH AND HEIGHT VARIABLES




const styles = StyleSheet.create({
//Then use them here for everything
    containter: {
        marginTop: height*0.05,
        marginBottom: height*0.05,
        paddingLeft: width*0.05,
        paddingRight: width*0.05,
//DO NOT DO THIS

//OR else this will be very big on an iphone 4 but very small on an iphone X
//Ive been trying to fix this for >2 hours now
    },
    input: {
        height: height*0.05,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginBottom: height*0.03,
        color: '#FFF',
        alignItems: 'center',
        paddingHorizontal: 10,
        fontSize: 20
    },
    input1: {

        marginBottom:0.03*height,
        marginTop:height*0.2,
        backgroundColor: 'transparent',
        color: '#FFF',
        width:width,
        fontSize: 22,
        paddingLeft:width*0.14,
        alignItems: 'center',
    }
});

const loginAlert = () => {
    Alert.alert(
        'Logged In',
        'Thanks',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: true }
    )};

const styles1 = StyleSheet.create({
    contaier: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection:'column',
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(255, 0, 0, 1)',
        position:'absolute',

    },
    logoContainer: {
        paddingTop:50,
        paddingBottom:30,
        alignItems: 'center',
        flex: 0.3,
        justifyContent: 'center',
    },
    logoImage: {
        width: width*0.82,
        height: height*0.25,
        resizeMode: 'contain'

    },
    formContainter: {
      flex:0.5,
      height:50,
        justifyContent: 'center',
        alignItems: 'center',

    },
    cloudcon: {
      position: 'absolute',
      width:width*.2,
      height:height*.1,
    },
    cloud: {
      marginTop:height*.05,
      opacity:0.04,
      width:width*.4,
      height:height*1.2,
      resizeMode:'contain',

    },
    cloud2: {
      marginTop:height*.17,
      marginRight:width*.4,
      opacity:0.04,
      width:width*0.7,
      height:height*.07,
      resizeMode:'contain',

    },
    cloud3: {
      marginTop:height*.46,
      marginLeft:width*.3,
      opacity:0.03,
      width:width*1.2,
      height:height*.13,
      resizeMode:'contain',

    }
});
