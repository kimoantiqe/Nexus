import React, { Component } from 'react';
import { Dimensions, Slider } from 'react-native';
import {Badge, Container, Content, Text, Item, Header, View, Button, Input, Form, Textarea} from 'native-base'
import { Pages } from 'react-native-pages';

import Background from '../components/Background';

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

        <Container style={{backgroundColor: '#16131d'}}>
            <Background logo= {false}/>
            <Pages >
            <Content contentContainerStyle={{paddingHorizontal: width*0.05, }}>
            <Form>
              <Text style={{color: '#f2f2f2', fontSize: 25, fontWeight: '300', padding: width*0.02}}>First Name</Text>
            <Item rounded style={{ paddingHorizontal: width*0.02}}>
            <Input placeholder="e.g., Alex" style={{color: '#f2f2f2', fontSize: 22, fontWeight: '400'}} onChangeText = {this.handleFirstname}/>
            </Item>
            <Text style={{color: '#f2f2f2', fontSize: 25, fontWeight: '300', padding: width*0.02}}>Last Name</Text>
            <Item rounded style={{ paddingHorizontal: width*0.02}}>
            <Input placeholder="e.g., Elliot" style={{color: '#f2f2f2', fontSize: 22, fontWeight: '400'}} onChangeText = {this.handleLastname}/>
            </Item>
            <Text style={{color: '#f2f2f2', fontSize: 25, fontWeight: '300', padding: width*0.02}}>Bio</Text>
            <Item rounded style={{ paddingHorizontal: width*0.02}}>
            <Textarea rowSpan={6} rounded placeholder="Please enter a brief bio"  style={{color: '#f2f2f2', fontSize: 22, fontWeight: '400'}} onChangeText = {this.handleBio}/>
            </Item>
            </Form>
            </Content>
            
            
        <Content>
        
        <Text style={{color: '#c75e9a', fontSize: 22, paddingLeft: width*0.05}}>INTERESTS</Text>
            <View style={{paddingVertical: width*0.05, paddingHorizontal: width*0.01}}>
          
              <SliderBadge displayName={"Interest A"} flag={interests["IA"]} toCall = {() => this.onPressInterests("IA")} toSetVal = {(value) => this.sliding(value, 0, "IAval")}/>
              <SliderBadge displayName={"Interest B"} flag={interests["IB"]} toCall = {() => this.onPressInterests("IB")} toSetVal = {(value) => this.sliding(value, 0, "IBval")}/>
              <SliderBadge displayName={"Interest C"} flag={interests["IC"]} toCall = {() => this.onPressInterests("IC")} toSetVal = {(value) => this.sliding(value, 0, "ICval")}/>
              <SliderBadge displayName={"Interest D"} flag={interests["ID"]} toCall = {() => this.onPressInterests("ID")} toSetVal = {(value) => this.sliding(value, 0, "IDval")}/>

            </View>
            </Content>
            <Content>

        <Text style={{color: '#c75e9a', paddingLeft: width*0.05, fontSize: 22}}>LOOKING FOR</Text>

            <View style={{paddingVertical: width*0.05, paddingHorizontal: width*0.01}}>
            
            <SliderBadge displayName={"Looking for A"} flag={LF["LA"]} toCall = {() => this.onPressLF("LA")} toSetVal = {(value) => this.sliding(value, 1, "LAval")}/>
            <SliderBadge displayName={"Looking for B"} flag={LF["LB"]} toCall = {() => this.onPressLF("LB")} toSetVal = {(value) => this.sliding(value, 1, "LBval")}/>
            <SliderBadge displayName={"Looking for C"} flag={LF["LC"]} toCall = {() => this.onPressLF("LC")} toSetVal = {(value) => this.sliding(value, 1, "LCval")}/>
            <SliderBadge displayName={"Looking for D"} flag={LF["LD"]} toCall = {() => this.onPressLF("LD")} toSetVal = {(value) => this.sliding(value, 1, "LDval")}/>
        
            </View>
            </Content>
            <Content>

        <Text style={{color: '#c75e9a', paddingLeft: width*0.05, fontSize: 22}}>INDUSTRY</Text>

            <View style={{paddingVertical: width*0.05, paddingHorizontal: width*0.01}}>

            <SliderBadge displayName={"Industry A"} flag={industry["INA"]} toCall = {() => this.onPressIndustry("INA")} toSetVal = {(value) => this.sliding(value, 2, "INAval")}/>
            <SliderBadge displayName={"Industry B"} flag={industry["INB"]} toCall = {() => this.onPressIndustry("INB")} toSetVal = {(value) => this.sliding(value, 2, "INBval")}/>
            <SliderBadge displayName={"Industry C"} flag={industry["INC"]} toCall = {() => this.onPressIndustry("INC")} toSetVal = {(value) => this.sliding(value, 2, "INCval")}/>
            <SliderBadge displayName={"Industry D"} flag={industry["IND"]} toCall = {() => this.onPressIndustry("IND")} toSetVal = {(value) => this.sliding(value, 2, "INDval")}/>
            
            </View>
        <Content scrollEnabled={false} contentContainerStyle={{flexDirection: 'row', justifyContent: 'center', padding: width*0.05}}>
        <Button rounded style={{backgroundColor: '#16131d', borderWidth: width*0.003, borderColor: 'white', paddingHorizontal: width*0.05}} 
                onPress = {()=>API.CompleteProfile(this.state.firstName, this.state.lastName, this.state.interests, this.state.industry, this.state.LF, this.state.bio, this.props)}>
            <Text style={{color: '#f2f2f2', fontSize: 20, fontWeight: '300'}}>Finalize Profile</Text>
          </Button>
          </Content>
        </Content>
        </Pages>
      </Container>

);
  }

}

class SliderBadge extends React.Component {

  render() {
    const {flag} = this.props;
      return(
        <Form style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
<Item style={{borderBottomColor: 'transparent'}}>
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
          <Item style={{borderBottomColor: 'transparent'}}>
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