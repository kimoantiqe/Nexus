import React, { Component } from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
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
  Icon
} from "native-base";
import { Pages } from "react-native-pages";
import { WaveIndicator } from "react-native-indicators";
import SliderBadge from "../components/SliderBadge";
import { LinearGradient } from "expo";

const API = require("../API_calls/APIs");
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default class RegCompleteProfile extends React.Component {
  static navigationOptions = {
    header: null,
    title: "RCP"
  };

  state = {
    value: 0.5,
    interests: {},
    LF: {},
    industry: {},
    bio: "",
    firstName: "",
    lastName: "",
    loading: 0,
    page: 0,
    headerTitle: ["PROFILE", "INTERESTS", "GOALS", "INDUSTRY"]
  };

  handleBio = text => {
    this.setState({ bio: text });
  };

  handleFirstname = text => {
    this.setState({ firstName: text });
  };

  handleLastname = text => {
    this.setState({ lastName: text });
  };

  sliding = (val, which, what) => {
    if (which == 0) {
      () => this.handleInterestValue(val, what);
    } else if (which == 1) {
      () => this.handleLFValue(val, what);
    } else if (which == 2) {
      () => this.handleIndustryValue(val, what);
    }
  };

  handleInterestValue = (val, interest) => {
    let interesttemp = this.state.interests;
    interesttemp[interest] = val;
    this.setState({ interests: interesttemp });
  };

  handleIndustryValue = (val, ind) => {
    let industrytemp = this.state.industry;
    industrytemp[ind] = val;
    this.setState({ industry: industrytemp });
  };

  handleLFValue = (val, lf) => {
    let LFtemp = this.state.LF;
    LFtemp[lf] = val;
    this.setState({ LF: LFtemp });
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

  render() {
    const { industry, interests, LF, page } = this.state;

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
                      color: '#ef6e0b',
                    }}
                  />
                </Button>
              ) : null}
            </Left>
            <Body>
              <Title style={styles.headerTitle}>{(page != 0) ? this.state.headerTitle[page-1] : ""}</Title>
            </Body>
            <Right>
            {page >= 4 ? (
              
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
                      this.props
                    );
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
                      color: '#ef6e0b',
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
            onScrollEnd={p => this.setState({ page: p })}
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
                    paddingHorizontal: width * 0.02,
                    paddingTop: height*0.07,
                    textAlign: "center",
                    flexWrap: "wrap",
                  }}
                >keep swiping to answer the next few questions. Doing so will help us connect you to those that are notable to you in this community.</Text>
                <Button
                  style={{
                    backgroundColor: 'transparent',
                    height: height*0.09,
                    alignSelf: 'center'
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
                      color: '#ef6e0b',
                      paddingLeft: width*0.02
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
                color: '#ef6e0b',
                alignSelf: 'center',
                paddingTop: height*0.01
              }}
            />
            <Text
                  style={styles.Qtext}
                >keep swiping to answer the next few questions. Doing so will help us connect you</Text>
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
                  color: '#ef6e0b',
                  alignSelf: 'center',
                  paddingTop: height*0.01
                }}
            />
                <Text style={styles.Qtext}>
                  Out of the following, choose what you are interested in and the
                  emphasis of interest.
                </Text>
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
                    toSetVal={value => this.sliding(value, 0, "IAval")}
                  />
                  <SliderBadge
                    displayName={"Interest C"}
                    flag={interests["IC"]}
                    toCall={() => this.onPressInterests("IC")}
                    toSetVal={value => this.sliding(value, 0, "ICval")}
                  />

                  <SliderBadge
                    displayName={"Interest B"}
                    flag={interests["IB"]}
                    toCall={() => this.onPressInterests("IB")}
                    toSetVal={value => this.sliding(value, 0, "IBval")}
                  />
                  <SliderBadge
                    displayName={"Interest D"}
                    flag={interests["ID"]}
                    toCall={() => this.onPressInterests("ID")}
                    toSetVal={value => this.sliding(value, 0, "IDval")}
                  />
              </View>
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
                    color: '#ef6e0b',
                    alignSelf: 'center',
                    paddingTop: height*0.01
                  }}
                />
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
                    toSetVal={value => this.sliding(value, 1, "LAval")}
                  />
                  <SliderBadge
                    displayName={"Looking for C"}
                    flag={LF["LC"]}
                    toCall={() => this.onPressLF("LC")}
                    toSetVal={value => this.sliding(value, 1, "LCval")}
                  />
                </Form>

                <Form>
                  <SliderBadge
                    displayName={"Looking for B"}
                    flag={LF["LB"]}
                    toCall={() => this.onPressLF("LB")}
                    toSetVal={value => this.sliding(value, 1, "LBval")}
                  />
                  <SliderBadge
                    displayName={"Looking for D"}
                    flag={LF["LD"]}
                    toCall={() => this.onPressLF("LD")}
                    toSetVal={value => this.sliding(value, 1, "LDval")}
                  />
                </Form>
              </View>
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
                    color: '#ef6e0b',
                    alignSelf: 'center',
                    paddingTop: height*0.01
                  }}
                />
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
                    toSetVal={value => this.sliding(value, 2, "INAval")}
                  />
                  <SliderBadge
                    displayName={"Industry C"}
                    flag={industry["INC"]}
                    toCall={() => this.onPressIndustry("INC")}
                    toSetVal={value => this.sliding(value, 2, "INCval")}
                  />
                </Form>

                <Form>
                  <SliderBadge
                    displayName={"Industry B"}
                    flag={industry["INB"]}
                    toCall={() => this.onPressIndustry("INB")}
                    toSetVal={value => this.sliding(value, 2, "INBval")}
                  />
                  <SliderBadge
                    displayName={"Industry D"}
                    flag={industry["IND"]}
                    toCall={() => this.onPressIndustry("IND")}
                    toSetVal={value => this.sliding(value, 2, "INDval")}
                  />
                </Form>
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
    fontSize: 28,
    paddingHorizontal: width * 0.02,
    paddingTop: height*0.02,
    fontFamily: "Folks-Normal",
    textAlign: "center",
    flexWrap: "wrap",
    alignSelf: 'center'
  },
  headerNavText:{
    color: '#ef6e0b',
    fontSize: 20,
    fontWeight: '600'
  }
});
