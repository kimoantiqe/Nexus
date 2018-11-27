import React from "react";
import {
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  Dimensions,
  Image,
  Animated,
  PanResponder,
  TouchableHighlight,
  ScrollView
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Expo from "expo";
import { LinearGradient } from "expo";
import SliderBadge from "../components/SliderBadge";
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
const NumUsers = 7;
var image = require("./../images/d3rs.jpg");
import Icon from "react-native-vector-icons/Ionicons";
import { userToken3 } from "./Login";
import { userToken1 } from "./CheckAuth";
import { userToken2 } from "./RegCompleteProfile";
import { BlurView, VibrancyView } from 'react-native-blur';

import {
  Header,
  Title,
  Left,
  Right,
  Body,
  Content,
  Container,
  Button,
  Form,
  Item,
  Badge
} from "native-base";

import Hr from "react-native-hr-plus";
import GradientButton from "react-native-gradient-buttons";

const APIcall = require("../API_calls/APIs");
var isHidden = true;
var userToken;
//var userToken2;
var apiURL = APIcall.apiURL;
var imageURL = apiURL + "/image/";
const Users = [];
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
//var userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWJlZjUxNTM3YjQ0NTg3YzlmM2ZmMDRmIiwiaWF0IjoxNTQyNDI1NjM0LCJleHAiOjE1NDI0MzI4MzR9.yj8_g1Vd43fR_6-AciWbjFzPZOZSrlLw0JylSteBz8o"
export default class Matches extends React.Component {
  constructor(props){
    super(props);
    this.params = this.props.navigation.state.params;
    this.state = {
      bounceValue: new Animated.Value(0), //This is the initial position of the subview
      buttonText: "Show Subview",
      blurRadius: 0,
      profileopacity: new Animated.Value(0.85),
      profilecolour: new Animated.Value(0x2c2638),
      user: this.params.user
    };
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

  _toggleSubview() {
    this.setState({
      buttonText: !isHidden ? "Show Subview" : "Hide Subview"
    });

    var toValue = -(height/5);
    var toValue2 = 30;
    var toValue3 = 1;

    if (isHidden) {
      toValue = 0;
    }
    if(isHidden){
      toValue2 = 0;
      toValue3 = 0.85;
    }

    //This will animate the transalteY of the subview between 0 & 100 depending on its current state
    //100 comes from the style below, which is the height of the subview.
    Animated.spring(this.state.bounceValue, {
      toValue: toValue,
      velocity: 3,
      tension: 2,
      friction: 8
    }).start();

    this.setState({
      blurRadius: toValue2
    })
    Animated.spring(this.state.profileopacity, {
      toValue: toValue3,
      velocity: 2,
      tension: 2,
      friction: 8
    }).start();

    isHidden = !isHidden;
  }

  renderUsers = () => {
    while (!this.state.user) {
      return (
        <View style={[styles.container1, styles.horizontal1]}>
          <ActivityIndicator size="large" color="#2c2638" />
        </View>
      );
    }
    var item = this.state.user;
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
                  backgroundColor: "black",
                  borderRadius: 25,
                }}
                blurRadius= {this.state.blurRadius}
                source={{ uri: imageURL+ item.image }}
              />
             
            <Animated.View style={[styles.BIO,
              {transform: [{translateY: this.state.bounceValue}]} ,
              {opacity : this.state.profileopacity}]}>
           <TouchableHighlight style={styles.Name} onPress={()=> {this._toggleSubview()}}>  
                <Text style={styles.NameText}>
                  {item.firstName + " " + item.lastName}
                </Text>
          </TouchableHighlight>
              {item.interests.length > 0 ||
              item.industry.length > 0 ||
              item.lookingFor.length > 0 ? (
                <View style={styles.tags}>
                  <Form
                    style={{
                      flexWrap: "wrap",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1
                    }}
                  >
                    {item.interests.map((interest, i) => {
                      return (
                        <Item
                          style={{
                            borderBottomColor: "transparent",
                            paddingBottom: height * 0.004,
                            marginRight: 10,
                          }}
                        >
                          <GradientButton
                            onPress={() => onPress && onPress()}
                            gradientBegin="#874f00"
                            gradientEnd="#f5ba57"
                            gradientDirection="diagonal"
                            height={height*0.03}
                            width={width/4.2}
                            radius={80 / 4}
                            violetPink
                            impact
                            impactStyle="Light"
                            style={{
                              alignItems: "center",
                              justifyContent: "center",
                              opacity: 1,
                              marginLeft: 0,
                              marginRight: 0,
                              
                            }}
                          >
                            <Text
                              style={{
                                color: "#f2f2f2",
                                fontSize: 0.015* height,
                                fontWeight: "400"
                              }}
                            >
                                {interest == "IA"
                                ? "Technology"
                                : interest == "IB"
                                ? "Media"
                                : interest == "IC"
                                ? "Politics"
                                : "Sports"}
                            </Text>
                          </GradientButton>
                        </Item>
                      );
                    })}

                    <Hr
                      color="#874f00"
                      width={1}
                      style={{
                        width: width * 0.9,
                        marginTop: height*0.035,
                        marginBottom: 15,
                        marginLeft: 5,
                        marginRight: 5,
                        paddingRight: 10,
                        paddingLeft: 10,
                        alignSelf: "centre"
                      }}
                    >
                      <Text style={styles.textWithDivider}>
                       
                      Related Industries
                      </Text>
                    </Hr>


            
                        

                    {item.industry.map((industry, i) => {
                      return (
                        <Item
                          style={{
                            borderBottomColor: "transparent",
                            paddingBottom: height * 0.004
                          }}
                        >
                          <GradientButton
                            onPress={() => onPress && onPress()}
                            gradientBegin="#f12711"
                            gradientEnd="#f5af19"
                            gradientDirection="diagonal"
                            height={height*0.03}
                            width={width/3.9}
                            radius={80 / 4}
                            impact
                            impactStyle="Light"
                            style={{
                              alignItems: "center",
                              justifyContent: "center",
                              opacity: 1
                            }}
                          >
                            <Text
                              style={{
                                color: "#f2f2f2",
                                fontSize: 0.015* height,
                                fontWeight: "400"
                              }}
                            >
                             {industry == "INA"
                                ? "Software"
                                : industry == "INB"
                                ? "Finance"
                                : industry == "INC"
                                ? "Academia"
                                : "Science"}
                            </Text>
                          </GradientButton>
                        </Item>
                      );
                    })}

                    <Hr
                      color="#874f00"
                      width={1}
                      style={{
                        width: width * 0.9,
                        marginTop: height*0.035,
                        marginBottom: 15,
                        marginLeft: 5,
                        marginRight: 5,
                        paddingRight: 10,
                        paddingLeft: 10,
                        alignSelf: "centre"
                      }}
                    >
                      <Text style={styles.textWithDivider}>Goals</Text>
                    </Hr>

                    {item.lookingFor.map((lf, i) => {
                      return (
                        <Item
                          style={{
                            borderBottomColor: "transparent",
                            paddingBottom: height * 0.004
                          }}
                        >
                          <GradientButton
                            onPress={() => onPress && onPress()}
                            gradientBegin="#874f00"
                            gradientEnd="#f5ba57"
                            gradientDirection="diagonal"
                            height={height*0.03}
                            width={width/3.3}
                            radius={50 / 4}
                            blueViolet
                            impact
                            impactStyle="Light"
                            style={{
                              alignItems: "center",
                              justifyContent: "center",
                              opacity: 1,
                              paddingLeft: 0,
                              paddingRight: 0,
                              marginRight: 0,
                              marginLeft: 0
                            }}
                          >
                            <Text
                              style={{
                                color: "#f2f2f2",
                                fontSize: 0.015* height,
                                fontWeight: "400"
                              }}
                            >
                              {lf == "LA"
                                ? "Find a Job"
                                : lf == "LB"
                                ? "Startup"
                                : lf == "LC"
                                ? "Make Connections"
                                : "Find Investors"}
                            </Text>
                          </GradientButton>
                        </Item>
                      );
                    })}

                    <View style={{
                      flexDirection: "column",
                      justifyContent: "flex-start",
                    }}>

                    <View style= {{
                             width: width * 0.9,
                             marginTop: height* 0.04, 
                             paddingBottom:7,
                             flexDirection: "row",
                             paddingLeft:15,
                             justifyContent: "flex-start"
                          }}>
                    <FontAwesome
                          name="quote-left"
                          size={25}
                          color="#874f00"
                          style={{
                            marginBottom:0,paddingBottom:0,
                          }}
                        />
                    </View>
                     
                    <Text
                      style={{
                        width: width * 0.9,
                        
                        marginTop:0,
                        marginBottom: 0,
                        marginLeft: 5,
                        marginRight: 5,
                        paddingRight: 10,
                        paddingLeft: 10,
                        flexWrap: "wrap",
                      }}
                    >
                        <Text style={styles.BIOText}>
                        {item.bio}
                      </Text> 
                        
                       
                      
                    </Text> 

                    <View style= {{
                             width: width * 0.9,
                             marginTop: 0,
                             marginBottom: 0,
                             marginLeft: 5,
                             marginRight: 5,
                             paddingRight: 15,
                             paddingBottom:10,
                             paddingLeft: 10,
                             flexWrap: "wrap",
                             flexDirection: "row-reverse",
                             justifyContent: "flex-start"
                          }}>
                      <FontAwesome
                          name="quote-right"
                          size={25}
                          color="#874f00"
                          style= {{
                            right:0
                          }}
                        />
                      </View>
                    </View>
                      
                  </Form>{" "}
                  : null }
                </View>
              ) : null}
              
            </Animated.View>
           
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
    paddingBottom: 0
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
    backgroundColor: 0x2c2638FF,
    height: height * 0.1
  },
  headerTitle: {
    paddingTop: height * 0.03,
    paddingBottom: 50,
    fontFamily: "BebasNeue",
    fontSize: 25,
    color: "#ffffff"
  },
  Name: {
    backgroundColor: "#2c2638",
    height: height * 0.07,
    width: width * 0.9,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    
    position: "absolute",
    top:-height * 0.07,
  },
  VIEW: {
    borderRadius: 50
  },
  Image: {
    width: width*0.9,
    height: width*0.9,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    
  },
  absolute: {
    position: "absolute",
    top: 0, left: 0, bottom: 0, right: 0,
  },
  Tags: {
    height: height * 0.02,
    paddingTop: height * 0.02,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
    flex: 1
  },
  Tag: {
    flex: 0.3,
    backgroundColor: "transparent",
    textAlign: "center",
    height: 0.001 * height
  },
  NameText: {
    fontFamily: "Arial",
    fontSize: 19,
    textAlign: "center",
    color: "white",
    fontWeight: "400",
    justifyContent: "center",
    alignItems: "center"
  },
  BIO: {
   
    height: height*0.4 + 150,
    width: width,
    flexDirection: "row",
    paddingTop: 40,
    paddingLeft: 0,
    paddingRight: 5,
    backgroundColor: "#2c2638",
    width: width * 0.9,
    alignSelf: "center",
    position: "absolute",
    bottom: -height*0.5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  tags: {
    position: "absolute",
    top: 5,
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    width: width * 0.9,
    alignItems: "center",
    justifyContent: "center",
    
  },
  BIOText: {
    marginTop: 0,
    fontFamily: "Roboto",
    fontSize: 14,
    color: "white",
    textAlign: "center",
    flexWrap: "wrap",
  },
  textWithDivider: {
    color: "white",
    marginVertical: 0,
    fontSize: 17,
    paddingHorizontal: 10
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
