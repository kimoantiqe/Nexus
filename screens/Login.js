import React, { Component } from "react";
import {Permissions, Notifications} from 'expo'
import { LinearGradient } from "expo";
import {
  StyleSheet,
  View,
  Dimensions,
  Alert,
  TextInput,
  TouchableOpacity
} from "react-native";
import { Text, Button, Icon, Content, Container, Form, Item, Input } from "native-base";
import { WaveIndicator } from "react-native-indicators";
import Background from '../components/Background';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const APIcall      = require("../API_calls/APIs");

export default class Login extends React.Component {
  static navigationOptions = {
    header: null,
    title: "Login"
  };

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      userid: "",
      nickname: "",
      loading: 0,
    };

    this.registerForPushNotificationsAsync();
  }

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
    
    console.log(finalStatus);

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }
  
    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

    console.log(token);

    //await APIcall._pushNotification(token);

  }

  handleUsername = text => {
    this.setState({ username: text });
  };

  handlePassword = text => {
    this.setState({ password: text });
  };



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
    else return (
      
      <Container>
        
      <Content>
      <Background logo= {true}/>
      <Form style={{paddingHorizontal: width*0.05, justifyContent: 'space-evenly'}}>
            <Text style={styles.Text}>Email Address</Text>
            <Item rounded style={{ paddingHorizontal: width*0.02}}>
                <Input  style={styles.InputText} onChangeText = {(text)=>this.handleUsername(text)}/>
            </Item>
            <Text style={styles.Text}>Password</Text>
            <Item rounded style={{ paddingHorizontal: width*0.02}}>
                <Input style={styles.InputText} secureTextEntry onChangeText = {(text)=>this.handlePassword(text)}/>
            </Item>

                <TouchableOpacity style={styles.buttonContainer}>
                  <Button onPress={ async() => {
                     this.setState({ loading: 1 })
                    await APIcall.login(this.state.username, this.state.password, this.props)
                    this.setState({ loading: 0 })
                  } 
                }
                  style={styles.button}>
                    <Text style={{ fontWeight: "bold" }}>LOGIN</Text>
                  </Button>
                </TouchableOpacity>
              </Form>

                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      backgroundColor: "grey",
                      height: 1,
                      flex: 1,
                      alignSelf: "center"
                    }}
                  />
                  <Text
                    style={{
                      alignSelf: "center",
                      paddingHorizontal: 5,
                      color: "grey",
                      fontSize: 18
                    }}
                  >
                    OR
                  </Text>
                  <View
                    style={{
                      backgroundColor: "grey",
                      height: 1,
                      flex: 1,
                      alignSelf: "center"
                    }}
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    marginTop: height / 70,
                    justifyContent: "center"
                  }}
                >
                  <Button
                    iconLeft
                    bordered
                    onPress = {() => APIcall.loginfb(this.props)}
                    activeOpacity={0.5}
                    style={{
                      width: (width * 38) / 100,
                      height: height / 14,
                      borderColor: "white"
                    }}
                  >
                    <Icon
                      style={{ fontSize: 30, color: "white" }}
                      name="logo-facebook"
                    />
                    <Text
                      uppercase={false}
                      style={{
                        fontSize: 18,
                        fontWeight: "500",
                        color: "white",
                        paddingLeft: width / 30
                      }}
                    >
                      Facebook
                    </Text>
                  </Button>
                </View>
              </Content>
              </Container>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    marginBottom: height * 0.05,
    paddingLeft: width * 0.05,
    paddingRight: width * 0.05
  },
  input: {
    height: height * 0.05,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginBottom: height * 0.03,
    color: "#FFF",
    alignItems: "center",
    paddingHorizontal: 10,
    fontSize: 20
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    height: "25%",
    justifyContent: "center",
    alignItems: "center"
  },
  Text:           {
    color: 'white', 
    fontSize: 20, 
    fontWeight: '300', 
    padding: width*0
},
InputText:      {
  color: 'white', 
  fontSize: 22, 
  fontWeight: '400'
},
  button: {
    width: 200,
    backgroundColor: "transparent",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 100,
    marginTop: 20,
    justifyContent: "center"
  }
});
