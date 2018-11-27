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
import { WaveIndicator } from "react-native-indicators";
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
  constructor() {
    super();

    this.position = new Animated.ValueXY();

    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ["-10deg", "0deg", "10deg"],
      extrapolate: "clamp"
    });

    this.rotateAndTranslate = {
      transform: [
        {
          rotate: this.rotate
        },
        ...this.position.getTranslateTransform()
      ]
    };
    this.likeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [0, 0, 1],
      extrapolate: "clamp"
    });
    this.dislikeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 0],
      extrapolate: "clamp"
    });

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: "clamp"
    });
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: "clamp"
    });
    this.refreshScreen = this.refreshScreen.bind(this);
    this.state = {
      bounceValue: new Animated.Value(0), 
      buttonText: "Show Subview",
      blurRadius: 0,
      profileopacity: new Animated.Value(0.85),
      profilecolour: new Animated.Value(0x2c2638),
      loading: 1,
    };
    console.log(height);
  }

  refreshScreen() {
    this.setState({ lastRefresh: Date(Date.now()).toString() });
  }

  static navigationOptions = {
    header: null
  };

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

  //Function that grabs a user from the database.
  getUser = async () => {
    console.log("im here");
    userToken = await Expo.SecureStore.getItemAsync("userToken");
    

    if (userToken != null) {
      console.log("im here 161");
      var grabUser = {
        method: "GET",
        headers: {
          Authorization: userToken
        }
      };
      
      
      await fetch(apiURL + "/user/getpotconn", grabUser)
        .then(response => response.json())
        .then(response => {
          console.log("im here 163");
          if (response.success) {
            console.log(175);
            console.log(response);
            if (response.array) {
              console.log("176");
              var array = JSON.parse(response.array);
              
              for (let i = 0; i < array.length; i++) {
                Users[i] = array[i];
              }
            }
           
          }
          else{
            Users=[];
          }
        })
        .then(() => {
          
          this.setState({ currentIndex: 0, loading:0 }, () => {
          this.position.setValue({ x: 0, y: 0 });
          
          })
        }
        );
    }
   
  };

  componentWillMount(){
    this.setState({ currentIndex: -1 }, () => {
      this.position.setValue({ x: 0, y: 0 });
    });
  
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 500, y: gestureState.dy },
            speed: 1000
          }).start(async () => {
            await APIcall.likedUser(Users[this.state.currentIndex]._id);
            if (this.state.currentIndex == NumUsers - 3) {
              await this.setState({loading: 1});
             await this.getUser();
            } else {
              await this.setState(
                { currentIndex: this.state.currentIndex + 1 },
                () => {
                  this.position.setValue({ x: 0, y: 0 });
                }
              );
            }
            if(!Users[this.state.currentIndex]){
              Users=[];
              await this.setState(
                { currentIndex: 0, loading:0},
                () => {
                  this.position.setValue({ x: 0, y: 0 });
                }
              );
            }
          });
        } else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
            speed: 1000
          }).start(async () => {
            await APIcall.dislikedUser(Users[this.state.currentIndex]._id);
            if (this.state.currentIndex == NumUsers - 1) {
              await this.getUser();
            } else {
              await this.setState(
                { currentIndex: this.state.currentIndex + 1 },
                () => {
                  this.position.setValue({ x: 0, y: 0 });
                }
              );
            }
            if(!Users[this.state.currentIndex]){
              Users=[];
              await this.setState(
                { currentIndex: 0, loading:0},
                () => {
                  this.position.setValue({ x: 0, y: 0 });
                }
              );
            }
          });
        }
        else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4
          }).start();
        }
      }
    });
    this.getUser();
  }

  renderUsers = () => {
    if(this.state.loading ==1){
     
      return (
        <WaveIndicator
        size={80}
        color="#2c2638"
        style={{ flex: 0, marginTop: height*0.3 }}
      />
      );
    }
    if (!Users.length) {
      return (
      <View>
       <WaveIndicator
        size={80}
        color="#2c2638"
        style={{ flex: 0, marginTop: height*0.3 }}
          />
        <Text style={{
          textAlign: "center"
        }}>Way to go! it looks like you've swiped on all your potential matches, Come back later to see some more!</Text>
      </View>
      
      );
    }

    return Users.map((item, i) => {
      if (this.state.currentIndex == -1) {
        return (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#2c2638" />
          </View>
        );
      }

      if (i < this.state.currentIndex) {
      } else if (i == this.state.currentIndex) {
        return (
          <Animated.View
            {...this.PanResponder.panHandlers}
            key={item._id}
            style={[
              this.rotateAndTranslate,
              {
                height: SCREEN_HEIGHT,
                width: SCREEN_WIDTH,
                padding: 10,
                flexDirection: "column"
              }
            ]}
          >
            <Animated.View
              style={{
                opacity: this.likeOpacity,
                transform: [{ rotate: "-30deg" }],
                position: "absolute",
                top: 50,
                left: 40,
                zIndex: 300
              }}
            >
              <Text
                style={{
                  borderWidth: 1,
                  borderColor: "#915781",
                  color: "#915781",
                  fontSize: 32,
                  fontWeight: "800",
                  padding: 10
                }}
              >
                LIKE
              </Text>
            </Animated.View>

            <Animated.View
              style={{
                opacity: this.dislikeOpacity,
                transform: [{ rotate: "30deg" }],
                position: "absolute",
                top: 50,
                right: 40,
                zIndex: 300
              }}
            >
              <Text
                style={{
                  borderWidth: 1,
                  borderColor: "#db72be",
                  color: "#db72be",
                  fontSize: 32,
                  fontWeight: "800",
                  padding: 10
                }}
              >
                DROP
              </Text>

            </Animated.View>

           
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
                                ? "INTEREST A"
                                : interest == "IB"
                                ? "INTEREST B"
                                : interest == "IC"
                                ? "INTEREST C"
                                : "INTEREST D"}
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
                        alignSelf: "center"
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
                                ? "INDUSTRY A"
                                : industry == "INB"
                                ? "INDUSTRY B"
                                : industry == "INC"
                                ? "INDUSTRY C"
                                : "INDUSTRY D"}
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
                        alignSelf: "center"
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
                            width={width/3.9}
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
                                fontSize: 12,
                                fontWeight: "400"
                              }}
                            >
                              {lf}
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
        );
      } else {
        return (
          <Animated.View
            key={item._id}
            style={[
              {
                opacity: this.nextCardOpacity,
                transform: [{ scale: this.nextCardScale }],
                height: SCREEN_HEIGHT,
                width: SCREEN_WIDTH,
                padding: 10,
                position: "absolute"
              }
            ]}
          >
           
            <Animated.View
              style={{
                opacity: 0,
                transform: [{ rotate: "-30deg" }],
                position: "absolute",
                top: 50,
                left: 40,
                zIndex: 300
              }}
            >
              <Text
                style={{
                  borderWidth: 1,
                  borderColor: "#915781",
                  color: "#915781",
                  fontSize: 32,
                  fontWeight: "800",
                  padding: 10
                }}
              >
                LIKE
              </Text>
            </Animated.View>

            <Animated.View
              style={{
                opacity: 0,
                transform: [{ rotate: "30deg" }],
                position: "absolute",
                top: 50,
                right: 40,
                zIndex: 300
              }}
            >
              <Text
                style={{
                  borderWidth: 1,
                  borderColor: "#db72be",
                  color: "#db72be",
                  fontSize: 32,
                  fontWeight: "800",
                  padding: 10
                }}
              >
                DROP
              </Text>
            </Animated.View>

           
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
           <TouchableHighlight style={styles.Name}>  
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
                                ? "INTEREST A"
                                : interest == "IB"
                                ? "INTEREST B"
                                : interest == "IC"
                                ? "INTEREST C"
                                : "INTEREST D"}
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
                                ? "INDUSTRY A"
                                : industry == "INB"
                                ? "INDUSTRY B"
                                : industry == "INC"
                                ? "INDUSTRY C"
                                : "INDUSTRY D"}
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
                        alignSelf: "center"
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
                            width={width/3.9}
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
                                fontSize: 12,
                                fontWeight: "400"
                              }}
                            >
                              {lf}
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
                             marginTop: height* 0.02, 
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
        );
      }
    }).reverse();
  };

  render() {
    return (
      <Container>
        <Header
          iosBarStyle="light-content"
          androidStatusBarColor="#ffffff"
          style={styles.header}
        >
          <Left />
          <Body>
            <Title style={styles.headerTitle}>Matching</Title>
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
    fontWeight: "400",
    textAlign: "center",
    color: "white",
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
    fontFamily: "Helvetica",
    fontSize: 17,
    fontStyle: "italic",
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
