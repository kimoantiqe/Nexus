import React, { Component } from 'react';

import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Image,
  Text,
   KeyboardAvoidingView, Alert, TextInput,
} from 'react-native';
import MainTabNavigator from '../navigation/MainTabNavigator';
import AppNavigator from '../navigation/AppNavigator';

export default class Login extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };

  render() {

    return (
      <View style = {styles1.contaier}>
        <View style = {styles1.logoContainer}>
            <Image
            style = {styles1.logoImage}
            source ={require('../images/Nexus.png')} />
        </View>
        <View style = {styles1.formContainer}>
        <KeyboardAvoidingView behavior = "padding" style = {styles.containter}>
           <View style = {styles.containter}>
               <TextInput
                   placeholder = "username or email"
                   placeholderTextColor = 'rgba(255, 255, 255, 0.2)'
                   style = {styles.input}
               />
               <TextInput
                   placeholder = "password"
                   placeholderTextColor = 'rgba(255, 255, 255, 0.2)'
                   secureTextEntry
                   style = {styles.input}
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
    );
  }
  signIn = async () => {

     await AsyncStorage.setItem('userToken', 'abc');
     this.props.navigation.navigate('Main');
     

   };
   Register = async () => {

      await AsyncStorage.setItem('userToken', 'xyz123');
      this.props.navigation.navigate('Register');

    };
}

const styles = StyleSheet.create({
    containter: {
        padding: 30,
        marginBottom:50,
    },
    input: {
        height: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginBottom: 17,
        color: '#FFF',
        paddingHorizontal: 10,
        fontSize: 20
    },
    input1: {
        marginTop:100,
        marginBottom:30,
        height: 20,
        backgroundColor: 'transparent',
        color: '#FFF',
        paddingHorizontal: 10,
        fontSize: 20,
        marginLeft:40,
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
        backgroundColor: '#001b43'
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
    },
    logoImage: {
        width: 330,
        height: 100,
        flex: 0.3,
        flexDirection: "row",
    },
    header: {
        marginTop: 20,
        color: '#FFF',
        textAlign: 'center',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 25,
        opacity: 0.6
    },
    formContainter: {

    }
});
