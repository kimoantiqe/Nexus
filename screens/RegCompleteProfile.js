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
export default class RegCompleteProfile extends React.Component {
  static navigationOptions = {
    title: 'RCP',
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

}