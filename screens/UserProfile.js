import React from "react";
import {
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  Dimensions,
  Image,
  Animated,
  PanResponder
} from "react-native";
import Expo from "expo";
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
const NumUsers = 7;
var image = require("./../images/d3rs.jpg");
import Icon from "react-native-vector-icons/Ionicons";
import { userToken3 } from "./Login";
import { userToken1 } from "./CheckAuth";
import { userToken2 } from "./RegCompleteProfile";
import {
  Header,
  Title,
  Left,
  Right,
  Body,
  Content,
  Container,
  Button
} from "native-base";

const APIcall = require("../API_calls/APIs");

var userToken;
//var userToken2;
var apiURL = APIcall.apiURL;
const Users = [];
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
//var userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWJlZjUxNTM3YjQ0NTg3YzlmM2ZmMDRmIiwiaWF0IjoxNTQyNDI1NjM0LCJleHAiOjE1NDI0MzI4MzR9.yj8_g1Vd43fR_6-AciWbjFzPZOZSrlLw0JylSteBz8o"
export default class Matches extends React.Component {
  constructor(props){
    super(props);
    this.params = this.props.navigation.state.params;
    this.state= {
      user: this.params.user
    }
     }

     static navigationOptions = {
      header: null
    };
  
  
  componentWillMount(){
    this.params = this.props.navigation.state.params;
    this.setState({
      user: this.params.user
    })
  }

  renderUsers = () => {
    while (!this.state.user) {
      return (
        <View style={[styles.container1, styles.horizontal1]}>
          <ActivityIndicator size="large" color="#2c2638" />
        </View>
      );
    }

    return (
      
        <Animated.View
          style={[
            this.rotateAndTranslate,
            {
              height: SCREEN_HEIGHT * 0.75,
              width: SCREEN_WIDTH,
              padding: 10,
              position: "absolute"
            }
          ]}
        >
         

          <View style={styles.Image}>
            <Image
              style={{
                flex: 1,
                height: null,
                width: width * 0.9,
                resizeMode: "cover",
                backgroundColor: "black"
              }}
              source={image}
            />
          </View>

          <View style={styles.BIO}>
            <Text style={styles.BIOText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              sed mi ex. Proin luctus, purus non faucibus bibendum, ligula
              justo blandit quam, interdum elementum dui eros sed erat.
              Aliquam consectetur massa id augue viverra facilisis.{" "}
            </Text>
          </View>
        </Animated.View>
    )
  };

  render() {
    const { params } = this.props.navigation.state;
    return (
      <Container>
        <Header
          iosBarStyle="light-content"
          androidStatusBarColor="#ffffff"
          style={styles.header}
        >
          <Left />
          <Body>
            <Title style={styles.headerTitle}>{params.user.firstName + " " + params.user.lastName}</Title>
          </Body>
          <Right />
        </Header>
        <View style={{ flex: 1 }}>
          <View style={{ height: 0 }} />
          <View style={{ flex: 1 }}>{this.renderUsers()}</View>
          <View style={{ height: 0 }} />
          <Button
            title="Instant Match"
            color="black"
            onPress={() => {
              this.props.navigation.navigate("InstantMatches");
            }}
          />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 100
  },
  centerCards: {
    flex: 1,
    width: width,
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    flex: 1,
    width: width * 0.8
  },
  cardImg: {
    width: 85,
    height: 85
  },
  centerText: {
    flex: 1,
    width: width,
    justifyContent: "center",
    alignItems: "center"
  },
  avatarImg: {
    width: 75,
    height: 75
  },
  avatarCard: {
    marginTop: 20,
    marginBottom: 24,
    flex: 1,
    width: 100
  },
  header: {
    backgroundColor: "#2c2638",
    height: height * 0.1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  headerTitle: {
    paddingTop: height * 0.03,
    width: width * 0.9,
    paddingBottom: 50,
    fontFamily: "BebasNeue",
    fontSize: 25,
    color: "#ffffff"
  },
  Name: {
    backgroundColor: "#2c2638",
    height: height * 0.07,
    marginTop: height * 0.02,
    width: width * 0.9,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    opacity: 0.9
  },
  Image: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },
  Tags: {
    height: height * 0.05,
    paddingTop: height * 0.02,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row"
  },
  Tag: {
    flex: 0.3,
    backgroundColor: "transparent",
    textAlign: "center",
    height: 0.001 * height
  },
  NameText: {
    fontFamily: "Roboto",
    fontSize: 19,
    textAlign: "center",
    color: "#ffffff",
    justifyContent: "center",
    alignItems: "center"
  },
  BIO: {
    flex: 0.4,
    height: height * 0.4,
    flexDirection: "row",
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 5,
    backgroundColor: "#2c2638",
    width: width * 0.9,
    alignSelf: "center",
    opacity: 0.9
  },
  BIOText: {
    flex: 1,
    flexDirection: "row",
    marginTop: 0,
    fontFamily: "Roboto",
    fontSize: 14,
    color: "#ffffff",
    textAlign: "left",
    flexWrap: "wrap"
  },
  numberText: {
    fontSize: 19,
    color: "#463143",
    marginRight: 5,
    fontFamily: "Poppins-Bold"
  },
  titleText: {
    fontSize: 19,
    color: "#414345",
    fontFamily: "Poppins"
  },
  subTitleText: {
    fontSize: 14,
    color: "grey",
    fontFamily: "Poppins"
  },
  rowContainer: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  avatarText: {
    fontFamily: "Poppins"
  },
  container1: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal1: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});
