import React, { Component } from 'react';
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
import { Pages } from 'react-native-pages';
import { WaveIndicator } from "react-native-indicators";
import SliderBadge from '../components/SliderBadge'
import { LinearGradient } from "expo";
import Lightbox from 'react-native-lightbox';
import ModalSelector from 'react-native-modal-selector'
import {getImageFromLibrary, getImageFromCamera} from './ImageInterface';
import SendBird from 'sendbird';

const API = require("../API_calls/APIs");
var apiURL = API.apiURL;
const imageUrl = apiURL + '/image/';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

var apiURL = API.apiURL;

export default class EditProfile extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'EditProfile',
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

componentWillMount = async () => {
  const userToken = await AsyncStorage.getItem("userToken");

  var settings = {
    method: 'GET',
    headers: {
      'Authorization': userToken
    }
    };
  
    try {
            let response = await fetch(apiURL + '/user', settings)
            response = await response.json();

            this.state.firstName = response.user.firstName;
            this.state.lastName = response.user.lastName;
            this.state.bio = response.user.bio;
            this.state.Ival = response.user.ie;
            this.state.INval = response.user.ine;
            this.state.LFval = response.user.lfe;


            // console.log(JSON.stringify(response) + '       A7AAAAAAAAAAAAAA');

            for (let index = 0; index < response.user.interests.length; index++) 
              this.state.interests[response.user.interests[index]] = true;

            for (let index = 0; index < response.user.industry.length; index++) 
              this.state.industry[response.user.industry[index]] = true;

            for (let index = 0; index < response.user.lookingFor.length; index++) 
              this.state.LF[response.user.lookingFor[index]] = true;
          
            this.setState({loading: 0});

    } catch (error) {
      console.error(error);
    }
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
      let userToken = Expo.SecureStore.getItemAsync("userToken");
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
  }
}

  _updatePic = async(key) => {
    if(key === 0)
      await getImageFromCamera().then(async(image) => {
          this.state.imageAvailable = true;
          const output = 'data:image/jpeg;base64,' + image;
          this.setState({image: output})
          const sb = SendBird.getInstance();
          await this._getUser().then(async (user) => {
              const imageOut = imageUrl + user.image;
              sb.updateCurrentUserInfo(user.firstName + " " + user.lastName, imageOut, function(response, error) {
                  if(error) {
                      console.log("ERror" + error)
                      return;
                  } 
                  console.log(response);   
              });
          })
      })
      .catch((error) => {
          console.log(error);
      })
    else
      await getImageFromLibrary().then(async(image) => {
          const output = 'data:image/jpeg;base64,' + image;
          this.setState({image: output})
          const sb = SendBird.getInstance();
          await this._getUser().then(async (user) => {
              const imageOut = imageUrl + user.image;
              sb.updateCurrentUserInfo(user.firstName + " " + user.lastName, imageOut, function(response, error) {
                  if(error) {
                      console.log("ERror" + error)
                      return;
                  } 
                  console.log(response);   
              });
          })
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
                      color: '#FFC719',
                    }}
                  />
                </Button>
            </Left>
            <Body>
              <Title style={styles.headerTitle}>{"EDIT PROFILE"}</Title>
            </Body>
            <Right>
            {page >= 4 ? (
              
                <Button
                  hasText
                  transparent
                  onPress={async () => {
                    this.setState({ loading: 1 });
                    await API.UpdateProfile(
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
                  <Text style={styles.headerNavText}>Apply</Text>
                </Button>
            ) : (
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
                      color: '#FFC719',
                    }}
                  />
            </Button>)}
            </Right>
          </Header>

          

          <Pages
            ref={ref => {
              this.pager = ref;
            }}
            onScrollEnd={(p) => this.doneScroll(p)}
          >
            <Content
              contentContainerStyle={{ paddingHorizontal: width * 0.07 }}
            >
            <Icon 
              type='Octicons'
              name='person'
              style={{
                fontSize: 55,
                color: '#FFC719',
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
                    value={this.state.firstName}
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
                    value={this.state.lastName}
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
                    value={this.state.bio}
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
                  color: '#FFC719',
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
                <Text style={styles.Qtext}>Out of the following, choose what you are interested in.</Text>
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
                    displayName={"Interest A"}
                    flag={interests["IA"]}
                    toCall={() => this.onPressInterests("IA")}
                  />
                  <SliderBadge
                    displayName={"Interest C"}
                    flag={interests["IC"]}
                    toCall={() => this.onPressInterests("IC")}
                  />

                  <SliderBadge
                    displayName={"Interest B"}
                    flag={interests["IB"]}
                    toCall={() => this.onPressInterests("IB")}
                  />
                  <SliderBadge
                    displayName={"Interest D"}
                    flag={interests["ID"]}
                    toCall={() => this.onPressInterests("ID")}
                  />
              </View>
              <Text style={styles.Etext}>On a scale of 1 to 5, set how important the above is in deciding who to match you with.</Text>
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
                minimumTrackTintColor={'#FFC719'}
              />
              </Badge>
                </Item>
                <Text 
              style={{
                color: '#FFC719',
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
                    color: '#FFC719',
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
                Out of the following, choose what you are looking for.
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
                    displayName={"Looking for A"}
                    flag={LF["LA"]}
                    toCall={() => this.onPressLF("LA")}
                  />
                  <SliderBadge
                    displayName={"Looking for C"}
                    flag={LF["LC"]}
                    toCall={() => this.onPressLF("LC")}
                  />
                </Form>

                <Form>
                  <SliderBadge
                    displayName={"Looking for B"}
                    flag={LF["LB"]}
                    toCall={() => this.onPressLF("LB")}
                  />
                  <SliderBadge
                    displayName={"Looking for D"}
                    flag={LF["LD"]}
                    toCall={() => this.onPressLF("LD")}
                  />
                </Form>
              </View>
              <Text style={styles.Etext}>On a scale of 1 to 5, set how important the above is in deciding who to match you with.</Text>
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
                minimumTrackTintColor={'#FFC719'}
              />
              </Badge>
                </Item>
                <Text 
              style={{
                color: '#FFC719',
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
                    color: '#FFC719',
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
                    displayName={"Industry A"}
                    flag={industry["INA"]}
                    toCall={() => this.onPressIndustry("INA")}
                  />
                  <SliderBadge
                    displayName={"Industry C"}
                    flag={industry["INC"]}
                    toCall={() => this.onPressIndustry("INC")}
                  />
                </Form>

                <Form>
                  <SliderBadge
                    displayName={"Industry B"}
                    flag={industry["INB"]}
                    toCall={() => this.onPressIndustry("INB")}
                  />
                  <SliderBadge
                    displayName={"Industry D"}
                    flag={industry["IND"]}
                    toCall={() => this.onPressIndustry("IND")}
                  />
                </Form>
              </View>
              <Text style={styles.Etext}>On a scale of 1 to 5, set how important the above is in deciding who to match you with.</Text>
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
                minimumTrackTintColor={'#FFC719'}
              />
              </Badge>
                </Item>
                <Text 
              style={{
                color: '#FFC719',
                fontFamily: "BebasNeue",
                fontSize: 35,
                alignSelf: 'center'
                  }}
              >{INval}</Text>
            </Content>
            <Content>
            <View style={{padding: 20, justifyContent: 'center', alignItems: 'center'}} >
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

                <View style={{padding: 20, justifyContent: 'center', alignItems: 'center'}}>
                <ModalSelector
                    style={{backgroundColor: 'white', borderRadius: 6}}
                    backdropPressToClose={true}
                    data={data}
                    initValue="Update Picture"
                    onChange={(option)=>{this._updatePic(option.key)}} />
                </View>
                
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
    paddingHorizontal: width * 0.02,
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
    color: '#FFC719',
    fontSize: 20,
    fontWeight: '600'
  }
});
