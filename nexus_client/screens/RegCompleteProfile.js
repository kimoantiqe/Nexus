import React, { Component } from "react";
import { Dimensions, Image, StyleSheet, Keyboard, Slider, AsyncStorage } from "react-native";
import {
  Container,
  Content,
  Text,
  Item,
  Header,
  View,
  Button,
  Input,
  Form,
  Textarea,
  Footer,
  Left,
  Right,
  Body,
  Title,
  Icon,
  Badge
} from "native-base";
import { Pages } from "react-native-pages";
import { WaveIndicator } from "react-native-indicators";
import SliderBadge from "../components/SliderBadge";
import { LinearGradient } from "expo";
import Lightbox from 'react-native-lightbox';
import ModalSelector from 'react-native-modal-selector'
import {getImageFromLibrary, getImageFromCamera} from './ImageInterface';
import SendBird from 'sendbird';

const API = require("../API_calls/APIs");
var apiURL = API.apiURL;
const imageUrl = apiURL + '/image/';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default class RegCompleteProfile extends React.Component {
  static navigationOptions = {
    header: null,
    title: "RCP",
    gesturesEnabled: false,
  };

  constructor(props) {
  super(props);
  this.state = {
    Ival: 1,
    INval: 1,
    LFval: 1,
    interests: {},
    LF: {},
    industry: {},
    bio: "",
    firstName: "",
    lastName: "",
    loading: 0,
    page: 0,
    image: 'https://www.peakgrantmaking.org/wp-content/uploads/2017/05/gender_neutral_icons_lf-02.png',
    isModalVisible: false,
    imageWidth: width/4,
    displayWidth: width/2,
    imageAvailable: false,
  };
  }
  doneScroll(p) {
   this.setState({ page: p });
   Keyboard.dismiss();
  }

  handleBio = text => {
    this.setState({ bio: text });
  };

  handleFirstname = text => {
    this.setState({ firstName: text });
  };

  handleLastname = text => {
    this.setState({ lastName: text });
  };

  sliding = (val, which) => {
    if (which == 0) {
      this.setState({Ival: val})
    } else if (which == 2) {
      this.setState({INval: val})
    } else if (which == 1) {
      this.setState({LFval: val})
    }
  };

  onPressInterests(interest) {
    if (this.state.interests[interest]) {
      let interesttemp = this.state.interests;
      interesttemp[interest] = false;
      this.setState({ interests: interesttemp });
    } else {
      let interesttemp = this.state.interests;
      interesttemp[interest] = true;
      this.setState({ interests: interesttemp });
    }
  }

  onPressLF(lf) {
    if (this.state.LF[lf]) {
      let LFtemp = this.state.LF;
      LFtemp[lf] = false;
      this.setState({ LF: LFtemp });
    } else {
      let LFtemp = this.state.LF;
      LFtemp[lf] = true;
      this.setState({ LF: LFtemp });
    }
  }

  onPressIndustry(ind) {
    if (this.state.industry[ind]) {
      let industrytemp = this.state.industry;
      industrytemp[ind] = false;
      this.setState({ industry: industrytemp });
    } else {
      let industrytemp = this.state.industry;
      industrytemp[ind] = true;
      this.setState({ industry: industrytemp });
    }
  }

  //need to make sure
  _getUser = async () => {
    return new Promise(async (resolve, reject) => {
        let userToken = await AsyncStorage.getItem("userToken");
        console.log(userToken);
        if (userToken != null) {
            var user = {
                method: "GET",
                headers: {
                    Authorization: userToken
                }
            };
            await fetch(apiURL + "/user", user)
            .then(response => response.json())
            .then(response => {
                resolve(response.user)
            });
        }
    }
  )}

  _getImage = () => {
    this._getUser().then((user) => {
        const imageIn = imageUrl + user.image;
        this.setState({image: imageIn});
    })
  }

  _sendPicture = async () => {
    if(this.state.imageAvailable === false){
      await API.sendImage(this.state.image)
      const sb = SendBird.getInstance();
      sb.updateCurrentUserInfo(this.state.firstName + " " + this.state.lastName, this.state.image, function(response, error) {
        if(error) {
          console.log("ERror" + error)
          return;
        } 
        console.log(response);   
      });
    }else{
      const sb = SendBird.getInstance();
      await this._getUser().then(async (user) => {
        console.log(user);
        const imageOut = imageUrl + user.image;
        sb.updateCurrentUserInfo(user.firstName + " " + user.lastName, imageOut, function(response, error) {
          if(error) {
            console.log("ERror" + error)
            return;
          } 
          console.log(response);   
       });
      })
    }
  }

    _updatePic = async(key) => {
      if(key === 0)
        await getImageFromCamera().then(async(image) => {
            this.state.imageAvailable = true;
            const output = 'data:image/jpeg;base64,' + image;
            this.setState({image: output})
        })
        .catch((error) => {
            console.log(error);
        })
      else
        await getImageFromLibrary().then(async(image) => {
            this.state.imageAvailable = true;
            const output = 'data:image/jpeg;base64,' + image;
            this.setState({image: output})
        })
        .catch((error) => {
            console.log(error);
        })
      }

  render() {
    const { industry, interests, LF, page, Ival, INval, LFval } = this.state;
    const data = [
      { key: 0, label: 'Take a Picture..' },
      { key: 1, label: 'Choose From Library..' }
    ];

    if (this.state.loading == 1) {
      console.log("HERE");
      return (
        <Container>
          <Header
            iosBarStyle="light-content"
            androidStatusBarColor="#ffffff"
            style={styles.header}
          >
            <Left />
            <Body>
            </Body>
            <Right />
          </Header>
          <Content>
            <WaveIndicator
              size={80}
              color="#2c2638"
              style={{ flex: 0, marginTop: height * 0.3 }}
            />
          </Content>

          <Footer
            style={{ backgroundColor: "#2c2638", height: height * 0.05 }}
          />
        </Container>
      );
    } else
      return (
        <Container>
          <View>
                <LinearGradient 
                  colors={["#2c2638", "#2c2638"]}
                  locations={[0.0, height * 0.0095]}
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: -height*0.5,
                    height: height*2
                  }}
                />
              </View>
              
          <Header
            iosBarStyle="light-content"
            androidStatusBarColor="#ffffff"
            style={styles.header}
          >
            <Left>
              {page > 0 ? (
                <Button
                  transparent
                  onPress={() => {
                    this.pager.scrollToPage(this.state.page - 1);
                  }}
                >
                  <Icon 
                    type='EvilIcons'
                    name='arrow-left'
                    style={{
                      fontSize: 40,
                      color: '#f5ba57',
                    }}
                  />
                </Button>
              ) : null}
            </Left>
            <Body>
              <Title style={styles.headerTitle}>{(page != 0) ? "PROFILE" : ""}</Title>
            </Body>
            <Right>
            {page >= 5 ? (
              
                <Button
                  hasText
                  transparent
                  onPress={async () => {
                    this.setState({ loading: 1 });
                    await API.CompleteProfile(
                      this.state.firstName,
                      this.state.lastName,
                      this.state.interests,
                      this.state.industry,
                      this.state.LF,
                      this.state.bio,
                      this.state.Ival,
                      this.state.INval,
                      this.state.LFval,
                      this.props
                    );
                    await this._sendPicture();
                    this.setState({page: 0});
                    this.setState({ loading: 0 });
                  }}
                >
                  <Text style={styles.headerNavText}>Done</Text>
                </Button>
            ) : (page!=0) ? (
                <Button
                  transparent
                  onPress={() => {
                    this.pager.scrollToPage(this.state.page + 1);
                  }}
                >
                  <Icon 
                    type='EvilIcons'
                    name='arrow-right'
                    style={{
                      fontSize: 40,
                      color: '#f5ba57',
                    }}
                  />
                </Button>
            ) : null}
            </Right>
          </Header>

          

          <Pages
            ref={ref => {
              this.pager = ref;
            }}
            onScrollEnd={(p) => this.doneScroll(p)}
          >
          <Content 
            scrollEnabled={false}
          >
            <View
              style={{
                paddingTop: height*0.03,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Image 
                source={require("../images/logoGold.png")}
                style={{
                  width: width * 0.82,
                  height: height * 0.3,
                  resizeMode: "contain"
                }}
              />
            </View>
            <Text
              style={styles.Qtext}
            >You're almost ready to connect with the Nexus community, just a few steps left!</Text>
            <Text
                  style={{
                    color: "white",
                    fontSize: 19,
                    fontWeight: "300",
                    paddingHorizontal: width * 0.035,
                    paddingTop: height*0.07,
                    textAlign: "center",
                    flexWrap: "wrap",
                    paddingBottom: height*0.03,
                  }}
                >Keep swiping to answer the next few questions. Doing so will help us connect you to those that are notable to you in this community.</Text>
                <Button
                  style={{
                    backgroundColor: 'transparent',
                    height: height*0.09,
                    alignSelf: 'center',
                  }}
                  onPress={() => {
                    this.pager.scrollToPage(this.state.page + 1);
                  }}
                >
                  <Icon 
                    type='EvilIcons'
                    name='arrow-right'
                    style={{
                      fontSize: 57,
                      color: '#f5ba57',
                    }}
                  />
                </Button>
          </Content>
            <Content
              contentContainerStyle={{ paddingHorizontal: width * 0.07 }}
            >
            <Icon 
              type='Octicons'
              name='person'
              style={{
                fontSize: 55,
                color: '#f5ba57',
                alignSelf: 'center',
                paddingTop: height*0.01,
                paddingLeft: width*0.045
              }}
            />
            <Text 
            style={{
              paddingTop: height * 0.01,
              fontFamily: "BebasNeue",
              fontSize: 35,
              color: "#ffffff",
              alignSelf: 'center'
              }}
            >ABOUT YOU</Text>
            <Text
                  style={styles.Qtext}
                >Please fill out your First and Last Name, and write a brief Bio about yourself.</Text>
              <Form>
                <Text
                  style={{
                    color: "white",
                    fontSize: 19,
                    fontWeight: "300",
                    padding: width * 0.02
                  }}
                >
                  First Name
                </Text>
                <Item
                  rounded
                  style={{
                    paddingHorizontal: width * 0.02,
                    borderColor: "white",
                    borderWidth: 17,
                    height: height*0.065,
                    }}
                >
                  <Input
                    placeholder="e.g., Alex"
                    style={{
                      color: "white",
                      fontSize: 22,
                      fontWeight: "400"
                    }}
                    onChangeText={this.handleFirstname}
                  />
                </Item>
                <Text
                  style={{
                    color: "white",
                    fontSize: 19,
                    fontWeight: "300",
                    padding: width * 0.02
                  }}
                >
                  Last Name
                </Text>
                <Item
                  rounded
                  style={{
                    paddingHorizontal: width * 0.02,
                    borderColor: "white",
                    borderWidth: 17,
                    height: height*0.065,
                  }}
                >
                  <Input
                    placeholder="e.g., Elliot"
                    style={{
                      color: "white",
                      fontSize: 22,
                      fontWeight: "400"
                    }}
                    onChangeText={this.handleLastname}
                  />
                </Item>
                <Text
                  style={{
                    color: "white",
                    fontSize: 19,
                    fontWeight: "300",
                    padding: width * 0.02
                  }}
                >
                  Bio
                </Text>
                <Item
                  rounded
                  style={{
                    paddingHorizontal: width * 0.02,
                    borderColor: "white",
                    borderWidth: 17
                  }}
                >
                  <Textarea
                    rowSpan={4}
                    rounded
                    placeholder="Please enter a brief bio"
                    style={{
                      color: "white",
                      fontSize: 22,
                      fontWeight: "400"
                    }}
                    onChangeText={this.handleBio}
                  />
                </Item>
              </Form>
            </Content>

            <Content>
                <View
                  style={{
                    flexGrow: 1,
                    flexDirection:'column',
                    alignItems: 'flex-start'
                  }}
                >
              <Icon 
                type='MaterialCommunityIcons'
                name='lightbulb-on'
                style={{
                  fontSize: 55,
                  color: '#f5ba57',
                  alignSelf: 'center',
                  paddingTop: height*0.01
                }}
            />
              <Text 
              style={{
                paddingTop: height * 0.01,
                fontFamily: "BebasNeue",
                fontSize: 35,
                color: "#ffffff",
                alignSelf: 'center'
                  }}
              >INTERESTS</Text>
                <Text style={styles.Qtext}>Out of the following, choose all that you are interested in.</Text>
                </View>
              <View
                style={{
                  paddingVertical: width * 0.05,
                  paddingHorizontal: width * 0.01,
                  flex: 1,
                  flexDirection: "column",
                }}
              >
                  <SliderBadge
                    displayName={"Technology"}
                    flag={interests["IA"]}
                    toCall={() => this.onPressInterests("IA")}
                  />
                  <SliderBadge
                    displayName={"Politics"}
                    flag={interests["IC"]}
                    toCall={() => this.onPressInterests("IC")}
                  />

                  <SliderBadge
                    displayName={"Media"}
                    flag={interests["IB"]}
                    toCall={() => this.onPressInterests("IB")}
                  />
                  <SliderBadge
                    displayName={"Sports"}
                    flag={interests["ID"]}
                    toCall={() => this.onPressInterests("ID")}
                  />
              </View>
              <Text style={styles.Etext}>On a scale of 1 to 5, set how important similar interests are in deciding who to match you with.</Text>
              <Item style={{borderBottomColor: 'transparent', paddingBottom: height*0.015, alignSelf: 'center'}}>
              <Badge style={{
                    backgroundColor: 'transparent',
                    borderColor: 'transparent' ,
                    minHeight: height*0.055,
                    borderWidth: width*0.0015, 
                    borderRadius: 30,
                    minWidth: width*0.9,
                    
                    }}>
              <Slider 
                onValueChange={(value) => this.sliding(value, 0)}
                maximumValue={5}
                step={1}
                value={Ival}
                minimumTrackTintColor={'#f5ba57'}
              />
              </Badge>
                </Item>
                <Text 
              style={{
                color: '#f5ba57',
                fontFamily: "BebasNeue",
                fontSize: 35,
                alignSelf: 'center'
                  }}
              >{Ival}</Text>
            </Content>
            <Content>
            <View
                style={{
                  flexDirection:'column',
                  alignItems: 'flex-start',
                  flexGrow: 1,
                }}
            >
                <Icon
                  type='MaterialCommunityIcons'
                  name='account-search'
                  style={{
                    fontSize: 55,
                    color: '#f5ba57',
                    alignSelf: 'center',
                    paddingTop: height*0.01
                  }}
                />
                <Text 
                style={{
                  paddingTop: height * 0.01,
                  fontFamily: "BebasNeue",
                  fontSize: 35,
                  color: "#ffffff",
                  alignSelf: 'center'
                    }}
                >GOALS</Text>
              <Text style={styles.Qtext}>
                Out of the following, choose what you are looking for out of this app
              </Text>
              </View>
              <View
                style={{
                  paddingVertical: width * 0.05,
                  paddingHorizontal: width * 0.01
                }}
              >
                <Form>
                  <SliderBadge
                    displayName={"Find a Job"}
                    flag={LF["LA"]}
                    toCall={() => this.onPressLF("LA")}
                  />
                  <SliderBadge
                    displayName={"Make Connections"}
                    flag={LF["LC"]}
                    toCall={() => this.onPressLF("LC")}
                  />
                </Form>

                <Form>
                  <SliderBadge
                    displayName={"Startup"}
                    flag={LF["LB"]}
                    toCall={() => this.onPressLF("LB")}
                  />
                  <SliderBadge
                    displayName={"Find Investors"}
                    flag={LF["LD"]}
                    toCall={() => this.onPressLF("LD")}
                  />
                </Form>
              </View>
              <Text style={styles.Etext}>On a scale of 1 to 5, set how important similar goals are in deciding who to match you with.</Text>
              <Item style={{borderBottomColor: 'transparent', paddingBottom: height*0.015, alignSelf: 'center'}}>
              <Badge style={{
                    backgroundColor: 'transparent',
                    borderColor: 'transparent' ,
                    minHeight: height*0.055,
                    borderWidth: width*0.0015, 
                    borderRadius: 30,
                    minWidth: width*0.9,
                    
                    }}>
              <Slider 
                onValueChange={(value) => this.sliding(value, 1)}
                maximumValue={5}
                step={1}
                value={LFval}
                minimumTrackTintColor={'#f5ba57'}
              />
              </Badge>
                </Item>
                <Text 
              style={{
                color: '#f5ba57',
                fontFamily: "BebasNeue",
                fontSize: 35,
                alignSelf: 'center'
                  }}
              >{LFval}</Text>
            </Content>
            <Content>
            <View
                style={{
                  flexDirection:'column',
                  alignItems: 'flex-start',
                  flexGrow: 1,
                }}
            >
                <Icon
                  type='FontAwesome'
                  name='briefcase'
                  style={{
                    fontSize: 55,
                    color: '#f5ba57',
                    alignSelf: 'center',
                    paddingTop: height*0.01
                  }}
                />
                <Text 
                  style={{
                    paddingTop: height * 0.01,
                    fontFamily: "BebasNeue",
                    fontSize: 35,
                    color: "#ffffff",
                    alignSelf: 'center'
                    }}
                  >INDUSTRY</Text>
              <Text style={styles.Qtext}>
                Out of the following, choose what industries you are involved
                with.
              </Text>
                </View>
              <View
                style={{
                  paddingVertical: width * 0.05,
                  paddingHorizontal: width * 0.01
                }}
              >
                <Form>
                  <SliderBadge
                    displayName={"Software"}
                    flag={industry["INA"]}
                    toCall={() => this.onPressIndustry("INA")}
                  />
                  <SliderBadge
                    displayName={"Academia"}
                    flag={industry["INC"]}
                    toCall={() => this.onPressIndustry("INC")}
                  />
                </Form>

                <Form>
                  <SliderBadge
                    displayName={"Finance"}
                    flag={industry["INB"]}
                    toCall={() => this.onPressIndustry("INB")}
                  />
                  <SliderBadge
                    displayName={"Science"}
                    flag={industry["IND"]}
                    toCall={() => this.onPressIndustry("IND")}
                  />
                </Form>
              </View>
              <Text style={styles.Etext}>On a scale of 1 to 5, set how important a similar industry is in deciding who to match you with.</Text>
              <Item style={{borderBottomColor: 'transparent', paddingBottom: height*0.015, alignSelf: 'center'}}>
              <Badge style={{
                    backgroundColor: 'transparent',
                    borderColor: 'transparent' ,
                    minHeight: height*0.055,
                    borderWidth: width*0.0015, 
                    borderRadius: 30,
                    minWidth: width*0.9,
                    
                    }}>
              <Slider 
                onValueChange={(value) => this.sliding(value, 2)}
                maximumValue={5}
                step={1}
                value={INval}
                minimumTrackTintColor={'#f5ba57'}
              />
              </Badge>
                </Item>
                <Text 
              style={{
                color: '#f5ba57',
                fontFamily: "BebasNeue",
                fontSize: 35,
                alignSelf: 'center'
                  }}
              >{INval}</Text>
            </Content>
            <Content contentContainerStyle={{
                  flex:1,
                  flexDirection: 'column',
                }}>
              <View
                style={{
                  flex:1,
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
              <View
                style={{
                  paddingBottom: height*0.02,
                  paddingTop: height*0.1
                }}>
                <Lightbox
                    onOpen={() => {this.setState({imageWidth: 0, displayWidth: width})}}
                    willClose={() => {this.setState({imageWidth: width/4, displayWidth: width/2})}}
                    >
                    <Image
                    style={{ height: this.state.displayWidth, width: this.state.displayWidth, borderRadius: this.state.imageWidth,
                            borderWidth: 3, borderColor: 'white'}}
                    source={{ uri: this.state.image }}
                    />
                </Lightbox>
                </View>
                <ModalSelector
                    style={{backgroundColor: 'white', borderRadius: 6}}
                    backdropPressToClose={true}
                    data={data}
                    initValue="Update Picture"
                    onChange={(option)=>{this._updatePic(option.key)}} />

                    <Text style={styles.Qtext}>Take a picture, or choose one from your library, to set as your Profile Picture!</Text>
                    </View>
            </Content>
          </Pages>
        </Container>
      );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#2c2638",
    height: height * 0.1,
    borderBottomColor: '#2c2638'
  },
  headerTitle: {
    paddingTop: height * 0.03,
    paddingBottom: 50,
    fontFamily: "BebasNeue",
    fontSize: 25,
    color: "#ffffff"
  },
  Qtext: {
    color: "white",
    fontSize: 25,
    paddingHorizontal: width * 0.03,
    paddingTop: height*0.02,
    fontFamily: "Folks-Normal",
    textAlign: "center",
    flexWrap: "wrap",
    alignSelf: 'center'
  },
  Etext: {
    color: "white",
    fontSize: 19,
    paddingHorizontal: width * 0.02,
    fontFamily: "Folks-Normal",
    textAlign: "center",
    flexWrap: "wrap",
    alignSelf: 'center'
  },
  headerNavText:{
    color: '#f5ba57',
    fontSize: 20,
    fontWeight: '600'
  }
});
