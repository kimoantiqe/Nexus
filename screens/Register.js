import React, { Component } from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import Background from '../components/Background';
import { Container, Content, Form, Input, Button, Item, Text } from 'native-base';
import { WaveIndicator } from "react-native-indicators";
import {Notifications, Permissions} from 'expo'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const API = require("../API_calls/APIs");


export default class Register extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'register',
  };

    constructor(props){
        super(props);
        this.registerForPushNotificationsAsync();
    }

    state = {
        inputs: {},
        loading: 0
    };

   handleInput = (i, obj) => {
    this.state.inputs[i] = obj;
   };

   registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.askAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
  
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
  
    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }
  
    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    console.log(token);

    await APIcall._pushNotification(token);

  }

  render() {
    if(this.state.loading ==1){
        console.log("HERE");
        return(
          
          <View>
          <Background logo= {true}/>
          <WaveIndicator
              size={80}
              color="white"
              style={{ flex: 0, marginTop: 90 }}
            />
          </View>
        )
      }

    else 
        return (

<Container >
    <Content>
        <Background logo= {true}/>
        <Form style={{paddingHorizontal: width*0.05}}>
            <Text style={styles.Text}>Email Address</Text>
            <Item 
              rounded 
              style={{
                    paddingHorizontal: width * 0.02,
                    borderColor: "white",
                    borderWidth: 17,
                    height: height*0.065,
                    }}>
                <Input  style={styles.InputText} onChangeText = {(text)=>this.handleInput("Username", text)}/>
            </Item>
            <Text style={styles.Text}>Password</Text>
            <Item 
              rounded 
              style={{
                    paddingHorizontal: width * 0.02,
                    borderColor: "white",
                    borderWidth: 17,
                    height: height*0.065,
                    }}>
                <Input style={styles.InputText} secureTextEntry onChangeText = {(text)=>this.handleInput("Password", text)}/>
            </Item>
            <Text style={styles.Text}>Confirm Password</Text>
            <Item 
              rounded 
              style={{
                    paddingHorizontal: width * 0.02,
                    borderColor: "white",
                    borderWidth: 17,
                    height: height*0.065,
                    }}>
                <Input style={styles.InputText} secureTextEntry onChangeText = {(text)=>this.handleInput("Repassword", text)}/>
            </Item>
            <Content scrollEnabled={false} contentContainerStyle={styles.ButtonContainer}>
            <Button rounded onPress={ async() => {
                    this.setState({ loading: 1 })
                    await API.Register(this.state.inputs, this.props)
                    this.setState({ loading: 0 })
                  } 
                }
                style={styles.Button}>
                 
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
    Button:         {
                        backgroundColor: 'transparent', 
                        borderWidth: width*0.003, 
                        borderColor: 'white', 
                        width: width*0.35,
                        flexDirection: 'row', 
                        justifyContent: 'center'
                    },
    ButtonContainer:{
                        flexDirection: 'row', 
                        justifyContent: 'center', 
                        padding: width*0.05
                    },
    Text:           {
                        color: "white",
                        fontSize: 19,
                        fontWeight: "300",
                        padding: width * 0.02
                    },
    InputText:      {
                        color: '#f2f2f2', 
                        fontSize: 22, 
                        fontWeight: '400'
                    }
});