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
  TouchableOpacity,WebView
} from "react-native";
import { Text, Button, Icon } from "native-base";
import MainTabNavigator from "../navigation/MainTabNavigator";
import AppNavigator from "../navigation/AppNavigator";

//import actions for login and sendbird
import { connect } from "react-redux";
import { sendbirdLogin } from "../actions";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

class Login extends React.Component {
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
      nickname: ""
    };
    //this. = this.modal.bind(this);
  }

  handleUsername = text => {
    this.setState({ username: text });
  };

  handlePassword = text => {
    this.setState({ password: text });
  };

  render() {
    const renderButton = () => {
          return (
            <Button
              onPress={() => this.modal.open()}
              iconLeft
              bordered
              activeOpacity={0.5}
              style={{
                width: (width * 37) / 100,
                height: height / 14,
                borderColor: "grey",
                marginLeft: 10
              }}
            >
              <Icon
                style={{ fontSize: 30, color: "grey" }}
                name="logo-linkedin"
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
                LinkedIn
              </Text>
            </Button>
          );
    };
    return (
      <View style={styles1.contaier}>
        <View style={{ backgroundColor: "#1a2a6c", flex: 0.5, opacity: 1 }}>
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

          <View style={styles1.logoContainer}>
            <Image
              style={styles1.logoImage}
              source={require("../images/logoGold.png")}
            />
          </View>

          <View style={{ flex: 0.7 }}>
            <KeyboardAvoidingView behavior="padding" style={styles.containter}>
              <View style={styles.containter}>
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

                <TouchableOpacity style={styles1.buttonContainer}>
                  <Button onPress={this.signIn} style={styles1.button}>
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
                    onPress = {loginFb}
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

            </KeyboardAvoidingView>
          </View>
        </View>
      </View>
    );
  }


  //Function that is used to populate when the user logs in.
  populate = async () => {
    let userToken = await AsyncStorage.getItem("userToken");

    //console.log(userToken);

    var apiURL = "http://localhost:1337/api";

    if (userToken != null) {
      var populate = {
        method: "GET",
        headers: {
          Authorization: userToken,
          "Content-Type": "application/json"
        }
      };
      fetch(apiURL + "/user/popconn", populate);
    }
  };

  signIn = async () => {
    //console.log("yup");

    var settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON"
      },
      body: JSON.stringify({
        email: this.state.username,
        password: this.state.password
      })
    };

    var apiURL = "http://localhost:1337/api";

    fetch(apiURL + "/user/login", settings)
      .then(response => response.json())
      .then(response => {
        if (response.success) {
          AsyncStorage.setItem("userToken", response.token);
          AsyncStorage.setItem("userid", response.user.id);

          //Store the userid and his name for use by sendbird.
          this.setState({ nickname: response.user.firstName });
          this.setState({ userid: response.user.id });
          this.populate();

          //call to sendbird action to add the user to sendbird
          const { userid, nickname } = this.state;
          this.props.sendbirdLogin({ userId: userid, nickname: nickname });

          this.props.navigation.navigate("Main");
        } else {
          switch (response.error) {
            case "Not registered":
              alert(
                'This Username is not registered\nGo to "Register" to make an account'
              );
              break;
            case "invalid password":
              alert("Incorrect password");
              break;
            case "Please enter a password to login":
              alert("Please enter your password");
              break;
            case "Please enter an email to login":
              alert("Please enter your email");
              break;
            case "A valid email  was not entered":
              alert("Please enter a valid email\n(abc@xyz.com)");
              break;
          }
        }
      })
      .catch(error => console.error("Error:", error));
  };
  Register = async () => {
    this.props.navigation.navigate("Register");
  };
}

//To make our design dynamic and compatible with all screen sizes
//Always do this

//FIRST SET WIDTH AND HEIGHT VARIABLES

const styles = StyleSheet.create({
  //Then use them here for everything
  containter: {
    marginTop: height * 0.05,
    marginBottom: height * 0.05,
    paddingLeft: width * 0.05,
    paddingRight: width * 0.05
    //DO NOT DO THIS

    //OR else this will be very big on an iphone 4 but very small on an iphone X
    //Ive been trying to fix this for >2 hours now
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
  input1: {
    marginBottom: 0.03 * height,
    marginTop: height * 0.2,
    backgroundColor: "transparent",
    color: "#FFF",
    width: width,
    fontSize: 22,
    paddingLeft: width * 0.14,
    alignItems: "center"
  }
});

const loginAlert = () => {
  Alert.alert(
    "Logged In",
    "Thanks",
    [{ text: "OK", onPress: () => console.log("OK Pressed") }],
    { cancelable: true }
  );
};

const styles1 = StyleSheet.create({
  contaier: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "column"
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 0, 0, 1)",
    position: "absolute"
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 90
  },
  button: {
    width: 200,
    backgroundColor: "transparent",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 100,
    marginTop: 20,
    justifyContent: "center"
  },
  logoContainer: {
    paddingTop: 100,
    paddingBottom: 30,
    alignItems: "center",
    flex: 0.3,
    justifyContent: "center"
  },
  logoImage: {
    width: width * 0.82,
    height: height * 0.25,
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

const loginFb = async function logIn() {
  try {
    const {
      type,
      token,
      expires,
      permissions,
      declinedPermissions,
    } = await Expo.Facebook.logInWithReadPermissionsAsync('1220787098061912', {
      permissions: ['public_profile'],
    });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
      Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
    } else {
      // type === 'cancel'
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
}

function mapStateToProps({ login }) {
  const { error, user } = login;
  return { error, user };
}

//Added this line to export the screen and connect to sendbird database at
//the same time.
export default connect(
  mapStateToProps,
  { sendbirdLogin }
)(Login);
