import React, { Component } from 'react';
import { Dimensions, Slider, StyleSheet } from 'react-native';
import {Badge, Container, Content, Text, Item, Header, View, Button, Input, Form, Textarea, Footer, Left, Right, Body, Title} from 'native-base'
import { Pages } from 'react-native-pages';

const API = require("../API_calls/APIs");
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class RegCompleteProfile extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'RCP',
  };

  state = {
    value: 0.5,
  interests: {},
  LF: {},
  industry: {},
  bio: "",
  firstName: "",
  lastName: ""
  }

  handleBio = (text) => {
    this.setState({ bio: text });
 }

 handleFirstname = (text) => {
  this.setState({ firstName: text });
}

handleLastname = (text) => {
  this.setState({ lastName: text });
}

sliding = (val, which, what) => {
  if (which == 0) {
    () => this.handleInterestValue(val, what);
  } else if(which == 1) {
    () => this.handleLFValue(val, what);
  } else if(which == 2) {
    () => this.handleIndustryValue(val, what);
  }
}

handleInterestValue = (val, interest) => {
  let interesttemp = this.state.interests;
  interesttemp[interest] = val;
  this.setState({interests:interesttemp});
}

handleIndustryValue = (val, ind) => {
  let industrytemp = this.state.industry;
  industrytemp[ind] = val;
  this.setState({industry:industrytemp});
}

handleLFValue = (val, lf) => {
  let LFtemp = this.state.LF;
  LFtemp[lf] = val;
  this.setState({LF:LFtemp});
}

  onPressInterests(interest)
  {
    if(this.state.interests[interest])
    {
        let interesttemp = this.state.interests;
        interesttemp[interest] = false;
        this.setState({interests:interesttemp});
    } else 
    {
        let interesttemp = this.state.interests;
        interesttemp[interest] = true;
        this.setState({interests:interesttemp});
    }
  }

  onPressLF(lf)
  {
    if(this.state.LF[lf])
    {
        let LFtemp = this.state.LF;
        LFtemp[lf] = false;
        this.setState({LF:LFtemp});
    } else 
    {
        let LFtemp = this.state.LF;
        LFtemp[lf] = true;
        this.setState({LF:LFtemp});
    }
  }

  onPressIndustry(ind)
  {
    if(this.state.industry[ind])
    {
        let industrytemp = this.state.industry;
        industrytemp[ind] = false;
        this.setState({industry:industrytemp});
    } else 
    {
        let industrytemp = this.state.industry;
        industrytemp[ind] = true;
        this.setState({industry:industrytemp});
    }
  }

  render() {

    const {industry, interests, LF} = this.state;

    return (

        <Container >
          <Header
            iosBarStyle="light-content"
            androidStatusBarColor="#ffffff"
            style={styles.header}
          >
            <Left />
            <Body>
              <Title style={styles.headerTitle}>PROFILE</Title>
            </Body>
            <Right>
            <Button hasText transparent 
            onPress = {()=>API.CompleteProfile(this.state.firstName, this.state.lastName, this.state.interests, this.state.industry, this.state.LF, this.state.bio, this.props)}>
              <Text>Done</Text>
            </Button>
            </Right>
          </Header>
          
            <Pages indicatorColor='#2c2638'>
            <Content contentContainerStyle={{paddingHorizontal: width*0.05, }}>
            <Form>
              <Text style={{color: '#2c2638', fontSize: 25, fontWeight: '500', padding: width*0.02}}>First Name</Text>
            <Item rounded style={{ paddingHorizontal: width*0.02, borderColor: '#2c2638', borderWidth: 17}}>
            <Input placeholder="e.g., Alex" style={{color: '#2c2638', fontSize: 20, fontWeight: '400'}} onChangeText = {this.handleFirstname}/>
            </Item>
            <Text style={{color: '#2c2638', fontSize: 25, fontWeight: '500', padding: width*0.02}}>Last Name</Text>
            <Item rounded style={{ paddingHorizontal: width*0.02, borderColor: '#2c2638', borderWidth: 17}}>
            <Input placeholder="e.g., Elliot" style={{color: '#2c2638', fontSize: 20, fontWeight: '400'}} onChangeText = {this.handleLastname}/>
            </Item>
            <Text style={{color: '#2c2638', fontSize: 25, fontWeight: '500', padding: width*0.02}}>Bio</Text>
            <Item rounded style={{ paddingHorizontal: width*0.02, borderColor: '#2c2638', borderWidth: 17}}>
            <Textarea rowSpan={6} rounded placeholder="Please enter a brief bio"  style={{color: '#2c2638', fontSize: 20, fontWeight: '400'}} onChangeText = {this.handleBio}/>
            </Item>
            </Form>
            </Content>
            
            
        <Content>
        
        <Text style={styles.Qtext}>Out of the following, choose what you are interested in and the emphasis of interest.</Text>
            <View style={{paddingVertical: width*0.05, paddingHorizontal: width*0.01, flex: 1, flexDirection: 'row'}}>
          
            <Form>
              <SliderBadge displayName={"Interest A"} flag={interests["IA"]} toCall = {() => this.onPressInterests("IA")} toSetVal = {(value) => this.sliding(value, 0, "IAval")}/>
              <SliderBadge displayName={"Interest C"} flag={interests["IC"]} toCall = {() => this.onPressInterests("IC")} toSetVal = {(value) => this.sliding(value, 0, "ICval")}/>
            </Form>

            <Form>
              <SliderBadge displayName={"Interest B"} flag={interests["IB"]} toCall = {() => this.onPressInterests("IB")} toSetVal = {(value) => this.sliding(value, 0, "IBval")}/>
              <SliderBadge displayName={"Interest D"} flag={interests["ID"]} toCall = {() => this.onPressInterests("ID")} toSetVal = {(value) => this.sliding(value, 0, "IDval")}/>
            </Form>

            </View>
            </Content>
            <Content>

        <Text style={styles.Qtext}>Out of the following, choose what you are looking for.</Text>

            <View style={{paddingVertical: width*0.05, paddingHorizontal: width*0.01}}>
            
            <Form>
            <SliderBadge displayName={"Looking for A"} flag={LF["LA"]} toCall = {() => this.onPressLF("LA")} toSetVal = {(value) => this.sliding(value, 1, "LAval")}/>
            <SliderBadge displayName={"Looking for C"} flag={LF["LC"]} toCall = {() => this.onPressLF("LC")} toSetVal = {(value) => this.sliding(value, 1, "LCval")}/>
            </Form>

            <Form>
            <SliderBadge displayName={"Looking for B"} flag={LF["LB"]} toCall = {() => this.onPressLF("LB")} toSetVal = {(value) => this.sliding(value, 1, "LBval")}/>
            <SliderBadge displayName={"Looking for D"} flag={LF["LD"]} toCall = {() => this.onPressLF("LD")} toSetVal = {(value) => this.sliding(value, 1, "LDval")}/>
            </Form>

            </View>
            </Content>
            <Content>

        <Text style={styles.Qtext}>Out of the following, choose what industries you are involved with.</Text>

            <View style={{paddingVertical: width*0.05, paddingHorizontal: width*0.01}}>

            <Form>
            <SliderBadge displayName={"Industry A"} flag={industry["INA"]} toCall = {() => this.onPressIndustry("INA")} toSetVal = {(value) => this.sliding(value, 2, "INAval")}/>
            <SliderBadge displayName={"Industry C"} flag={industry["INC"]} toCall = {() => this.onPressIndustry("INC")} toSetVal = {(value) => this.sliding(value, 2, "INCval")}/>
            </Form>

            <Form>
            <SliderBadge displayName={"Industry B"} flag={industry["INB"]} toCall = {() => this.onPressIndustry("INB")} toSetVal = {(value) => this.sliding(value, 2, "INBval")}/>
            <SliderBadge displayName={"Industry D"} flag={industry["IND"]} toCall = {() => this.onPressIndustry("IND")} toSetVal = {(value) => this.sliding(value, 2, "INDval")}/>
            </Form>
            
            </View>
        </Content>
        </Pages>
        <Footer style={{ backgroundColor: "#2c2638", height: height * 0.05 }}></Footer>
      </Container>

);
  }

}

class SliderBadge extends React.Component {

  render() {
    const {flag} = this.props;
      return(
        <Form style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
<Item style={{borderBottomColor: 'transparent', paddingBottom: flag? 0 : height*0.015}}>
        <Badge style={{   backgroundColor: flag? '#c75e9a' : '#16131d',
                          minHeight: height*0.055,
                          borderWidth: width*0.0015, 
                          borderColor: flag? '#c75e9a' : '#f2f2f2' ,
                          borderRadius: 30,
                          }}>
        <Button transparent light onPress={this.props.toCall}>
          <Text style={{color: '#f2f2f2', fontSize: 25, fontWeight: '300'}}>{this.props.displayName}</Text>
          </Button>
        </Badge>
        </Item> 
        { 
          flag?
          <Item style={{borderBottomColor: 'transparent', paddingBottom: flag? height*0.015 : 0}}>
            <Badge style={{   backgroundColor: '#16131d',
                  backgroundColor: flag? '#c75e9a' : '#16131d',
                  borderColor: flag? '#c75e9a' : '#f2f2f2' ,
                  minHeight: height*0.055,
                  borderWidth: width*0.0015, 
                  borderRadius: 30,
                  minWidth: width*0.3,
                  }}>
            <Slider onSlidingComplete={this.props.toSetVal}/>
            </Badge>
              </Item> : null
                  }
                  </Form>
      )
                      };
                  }

const styles = StyleSheet.create({
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
                  Qtext: {
                  color: '#2c2638', 
                  fontSize: 28, 
                  fontWeight: '400', 
                  paddingHorizontal: width*0.05
                  }
                });