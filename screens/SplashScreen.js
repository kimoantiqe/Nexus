import React, { Component } from "react";
import { LinearGradient } from "expo";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
  TextInput,
  TouchableOpacity
} from "react-native";
import {Text,Button} from "native-base";
import MainTabNavigator from "../navigation/MainTabNavigator";
import AppNavigator from "../navigation/AppNavigator";

//import actions for login and sendbird
import { connect } from "react-redux";
import { sendbirdLogin } from "../actions";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default class Splash extends React.Component {
  static navigationOptions = {
    header: null,
    title: "Login"
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles1.container}>
        <View style={{ flex: 0.5, opacity: 1 }}>
          <LinearGradient
            colors={["#16131d", "#734b6d"]}
            locations={[0.0, height * 0.0095]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: height
            }}
          />

          <View style={styles1.cloudcon}>
            <Image
              style={styles1.cloud}
              source={require("../images/cloud3.png")}
            />
          </View>

          <View style={styles1.cloudcon}>
            <Image
              style={styles1.cloud2}
              source={require("../images/cloud3.png")}
            />
          </View>
          <View style={styles1.cloudcon}>
            <Image
              style={styles1.cloud3}
              source={require("../images/cloud3.png")}
            />
          </View>

          <View style={styles1.content}>
            <View style={styles1.logoContainer}>
              <Image
                style={styles1.logoImage}
                source={require("../images/logoGold.png")}
              />
            </View>

            <TouchableOpacity style={styles1.buttonContainer}>
              <Button onPress={this.Login}  style={styles1.button}>
                <Text style={ {fontWeight: 'bold'}}>LOGIN</Text>
              </Button>
            </TouchableOpacity>

            <TouchableOpacity style={styles1.buttonContainer}>
              <Button onPress={this.Register}  style={styles1.button}>
                <Text style={ {fontWeight: 'bold'}} >SIGN UP</Text>
              </Button>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  Register = async () => {
    this.props.navigation.navigate("Register");
  };

  Login = async () => {
    this.props.navigation.navigate("Login");
  };
}

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "column"
  },
  content:{
    flex:0.7
  },
  logoContainer: {
    paddingTop: height/3,
    paddingBottom: height/4.5,
    alignItems: "center",
    flex: 0.3,
    justifyContent: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    height: "30%",
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
    justifyContent: 'center'
  },
  logoImage: {
    width: width * 0.9,
    height: height * 0.31,
    resizeMode: "contain"
  },
  formContainter: {
    flex: 0.5,
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  cloudcon: {
    position: "absolute",
    width: width * 0.2,
    height: height * 0.1
  },
  cloud: {
    marginTop: height * 0.05,
    opacity: 0.04,
    width: width * 0.4,
    height: height * 1.2,
    resizeMode: "contain"
  },
  cloud2: {
    marginTop: height * 0.17,
    marginRight: width * 0.4,
    opacity: 0.04,
    width: width * 0.7,
    height: height * 0.07,
    resizeMode: "contain"
  },
  cloud3: {
    marginTop: height * 0.46,
    marginLeft: width * 0.3,
    opacity: 0.03,
    width: width * 1.2,
    height: height * 0.13,
    resizeMode: "contain"
  }
});
