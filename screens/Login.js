import React, { Component } from "react";
import Expo from 'expo'
import { LinearGradient } from "expo";
import {
  StyleSheet,
  View,
  Dimensions,
  Alert,
  TextInput,
  TouchableOpacity
} from "react-native";
import { Text, Button, Icon } from "native-base";
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
      <View>
      <Background logo= {true}/>
      <View style={styles.container}>
      <TextInput
                  placeholder="Email Address"
                  placeholderTextColor="rgba(255, 255, 255, 0.2)"
                  style={styles.input}
                  onChangeText={this.handleUsername}
                />
                <TextInput
                  placeholder="password"
                  placeholderTextColor="rgba(255, 255, 255, 0.2)"
                  secureTextEntry
                  style={styles.input}
                  onChangeText={this.handlePassword}
                />

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
                      borderColor: "grey"
                    }}
                  >
                    <Icon
                      style={{ fontSize: 30, color: "grey" }}
                      name="logo-facebook"
                    />
                    <Text
                      uppercase={false}
                      style={{
                        fontSize: 18,
                        fontWeight: "500",
                        color: "grey",
                        paddingLeft: width / 30
                      }}
                    >
                      Facebook
                    </Text>
                  </Button>
                </View>
              </View>
          </View>
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
  button: {
    width: 200,
    backgroundColor: "transparent",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 100,
    marginTop: 20,
    justifyContent: "center"
  }
});
