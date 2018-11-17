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
export default class Register extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'register',
  };

  state = {
      username: '',
      password: '',
      repassword: '',
      firstname: '',
      lastname: '',
   };

   handleUsername = (text) => {
      this.setState({ username: text });
   };

   handlePassword = (text) => {
      this.setState({ password: text });
   };

   handleRepassword = (text) => {
      this.setState({ repassword: text });
   };

   handleFirstname = (text) => {
        this.setState({ firstname: text });
    };

    handleLastname = (text) => {
    this.setState({ lastname: text });
    };

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
                   placeholder = "FIrst name"
                   placeholderTextColor = 'rgba(255, 255, 255, 0.2)'
                   style = {styles.input}
                   onChangeText = {this.handleFirstname}
               />
               <TextInput
                   placeholder = "Last name"
                   placeholderTextColor = 'rgba(255, 255, 255, 0.2)'
                   style = {styles.input}
                   onChangeText = {this.handleLastname}
               />
               <TextInput
                   placeholder = "Password"
                   placeholderTextColor = 'rgba(255, 255, 255, 0.2)'
                   secureTextEntry
                   style = {styles.input}
                   onChangeText = {this.handlePassword}
               />
               <TextInput
                   placeholder = "Confirm Password"
                   placeholderTextColor = 'rgba(255, 255, 255, 0.2)'
                   secureTextEntry
                   style = {styles.input}
                   onChangeText = {this.handleRepassword}
               />
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
  Register = async () => {
      //////////////////////REGISTRATION API CALL////////////////////////////


    if (this.state.firstname == "")
    {
        alert("Please enter your name to register");
    } else
    {
        if (this.state.lastname == "")
        {
            alert("Please enter your last name to register");
        } else
        {
    if (this.state.username == "")
    {
        alert("Please enter an email to register");
    } else
    {
        if (this.state.password == "")
        {
            alert("Please enter an password to register");
        } else
        {

            if (this.state.password == this.state.repassword)
            {

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

                var apiURL = 'http://localhost:1337/api';

                fetch(apiURL + '/user', settings)
                .then((response) => response.json())
                .then((response)  =>
                    {
                        if (response.success)
                        {
                            AsyncStorage.setItem('userToken', response.token);
                            AsyncStorage.setItem('firstname', this.state.firstname);
                            AsyncStorage.setItem('lastname', this.state.lastname);
                            Expo.SecureStore.setItemAsync("userToken", response.token);
                            this.props.navigation.navigate('RCP');
                        } else
                        {
                            switch (response.error) {
                                case "A valid email was not entered.":
                                    alert("A valid email was not entered.");
                                break;
                                case "User already exists with that email":
                                    alert("User already exists with that email");
                                break;
                            }

                        }

                    }

                )
                .catch((error) => console.error('Error:', error));

            } else
            {
                alert("Passwords do not match!\nPlease try again.");
            }
        }
    }
}
  }
};

};

const styles = StyleSheet.create({
    containter: {
        padding: 30,
    },
    input: {
        height: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginBottom: 17,
        color: '#FFF',
        paddingHorizontal: 10,
        fontSize: 20
    }
});

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
