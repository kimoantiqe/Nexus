import React, { Component } from "react";
import {StyleSheet, Dimensions} from "react-native";
import {Text, Button, Container, Content, Form} from "native-base";

import Background from '../components/Background';

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
      <Container>
        <Content style={styles.container}>
        <Background logo={true} />
        <Content scrollEnabled={false} contentContainerStyle={styles.ButtonGroup}>
        <Form>
        <Form style={styles.buttonContainer}>
            <Button rounded style={styles.Button} onPress={() => this.Login()}>
                <Text style={{ fontWeight: 'bold'}}>LOGIN</Text>
            </Button>
            </Form>
            <Form style={styles.buttonContainer}>
            <Button rounded style={styles.Button} onPress={() => this.Register()}>
                <Text style={{ fontWeight: 'bold'}}>SIGN UP</Text>
            </Button>
            </Form>
            </Form>
          </Content>
          </Content>
          </Container>
    );
  }

  Register = async () => {
    this.props.navigation.navigate("Register");
  };

  Login = async () => {
    this.props.navigation.navigate("Login");
  };
};

const styles = StyleSheet.create({
  ButtonGroup:   { 
                      flex: 1, 
                      flexDirection: 'column',
                      alignItems: 'center',
                      paddingTop: height*0.1
                  },
  buttonContainer:{
                      padding: width*0.02
                  },
  Button:         {
                      backgroundColor: 'transparent', 
                      borderWidth: width*0.002, 
                      borderColor: 'grey', 
                      width: width*0.45, 
                      flexDirection: 'row', 
                      justifyContent: 'center'
                  },
  container:      {
                    flex: 1,
                    backgroundColor: "transparent",
                    flexDirection: "column"
                  },
                              });