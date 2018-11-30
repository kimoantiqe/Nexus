import React, { Component } from "react";
import { TouchableOpacity, StyleSheet, View, Dimensions, AsyncStorage} from "react-native";
import { Button, Text, Container, Content, Header, Left, Right, Body, Title } from "native-base";

import { QRCode } from 'react-native-custom-qr-codes';

import Expo from "expo";
import { WaveIndicator } from "react-native-indicators";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;


var userID;

export default class InstantMatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastRefresh: Date(Date.now()).toString(),
      loading: 1 
    };
    this.getUserID();
  }
  static navigationOptions = {
    header: null
  };

  getUserID = async () => { 
    userID = await Expo.SecureStore.getItemAsync("userid");
    console.log(userID);
    this.setState({loading: 0});
    
  }
  

  render() {
    if(this.state.loading == 1 || !userID){
      return(
      <Container>
        <Content>
          <Header
            iosBarStyle="light-content"
            androidStatusBarColor="#ffffff"
            style={styles.header}
          >
            <Left />
            <Body>
              <Title style={styles.headerTitle}>Nexus Match</Title>
            </Body>
            <Right>
            </Right>
          </Header>
          <WaveIndicator
            size={80}
            color="#2c2638"
            style={{ flex: 0, marginTop: height*0.3 }}
          />
        </Content>
      </Container>
    )

    }
    else {
      console.log("IM HERE");
      return (
      <Container>
      <Content>
        <Header
          iosBarStyle="light-content"
          androidStatusBarColor="#ffffff"
          style={styles.header}
        >
          <Left />
          <Body>
            <Title style={styles.headerTitle}>Nexus Match</Title>
          </Body>
          <Right>
          </Right>
        </Header>

      <View style={styles.container}>
      <QRCode codeStyle='dot' 
        content={userID} 
        outerEyeStyle='square'
        logo= {require("../images/logoQR.png")}
        logoSize = {80}
        ecl = 'H'
        size = {300}
       linearGradient={['#c31432','#240b36']} 
        />
       

        <TouchableOpacity style={styles.buttonContainerTop}>
          <Button
            onPress={() => {
              this.props.navigation.navigate("QrCamera");
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Scan</Text>
          </Button>
        </TouchableOpacity>

      </View>
      </Content>
      </Container>
    );
  }
}
}

const styles = StyleSheet.create({

  container: {
    marginTop: height*0.14,
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
   
  },
  buttonContainerTop: {
    flexDirection: "row",
    width: "100%",
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    
  },
  button: {
    width: 200,
    backgroundColor: "#2c2638",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 100,
    justifyContent: "center",
    
  },
  header: {
    backgroundColor: "#2c2638",
    height: height * 0.1
  },
  headerTitle: {
    paddingTop: height * 0.03,
    paddingBottom: 50,
    fontFamily: "BebasNeue",
    fontSize: 25,
    color: "#ffffff"
  },
  buttonText:{
    color:  'white',
    fontWeight: "bold"
  }
});
