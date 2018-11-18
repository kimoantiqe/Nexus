import React, { Component } from 'react';
import { LinearGradient } from 'expo';
import {
  ActivityIndicator,
  AsyncStorage,
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
import Background from '../components/Background';
import { Container, Content, Form, Input, Button, Item } from 'native-base';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const API = require("../API_calls/APIs");
export default class Register extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'register',
  };

    state = {
      inputs: {}
        };

   handleInput = (i, obj) => {
    this.state.inputs[i] = obj;
   };

  render() {

    return (

<Container >
    <Content>
        <Background logo= {true}/>
        <Form style={{paddingHorizontal: width*0.05, justifyContent: 'space-evenly'}}>
            <Text style={{color: '#f2f2f2', fontSize: 20, fontWeight: '300', padding: width*0.02}}>Email Address</Text>
            <Item rounded style={{ paddingHorizontal: width*0.02}}>
                <Input  style={{color: '#f2f2f2', fontSize: 22, fontWeight: '400'}} onChangeText = {(text)=>this.handleInput("Username", text)}/>
            </Item>
            <Text style={{color: '#f2f2f2', fontSize: 20, fontWeight: '300', padding: width*0.02}}>Password</Text>
            <Item rounded style={{ paddingHorizontal: width*0.02}}>
                <Input style={{color: '#f2f2f2', fontSize: 22, fontWeight: '400'}} secureTextEntry onChangeText = {(text)=>this.handleInput("Password", text)}/>
            </Item>
            <Text style={{color: '#f2f2f2', fontSize: 20, fontWeight: '300', padding: width*0.02}}>Confirm Password</Text>
            <Item rounded style={{ paddingHorizontal: width*0.02}}>
                <Input style={{color: '#f2f2f2', fontSize: 22, fontWeight: '400'}} secureTextEntry onChangeText = {(text)=>this.handleInput("Repassword", text)}/>
            </Item>
            <Content scrollEnabled={false} contentContainerStyle={{flexDirection: 'row', justifyContent: 'center', padding: width*0.05}}>
            <Button rounded style={{backgroundColor: '#16131d', borderWidth: width*0.003, borderColor: 'white', paddingHorizontal: width*0.05}} onPress = {()=>API.Register(this.state.inputs, this.props)}>
                <Text style={{color: '#f2f2f2', fontSize: 20, fontWeight: '300'}}>Register</Text>
            </Button>
            </Content>
        </Form>
    </Content>
</Container>

    );
  }

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