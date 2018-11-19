import React, { Component } from 'react';
import { LinearGradient } from 'expo';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
   KeyboardAvoidingView, Alert, TextInput, TouchableOpacity,
} from 'react-native';
import {Badge, Container, Content, Text, Item, Header, View, Tabs, Tab, Button, TabHeading, Input, Form, Textarea} from 'native-base'
import Background from '../components/Background';
import MainTabNavigator from '../navigation/MainTabNavigator';
import AppNavigator from '../navigation/AppNavigator';
const API = require("../API_calls/APIs");
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default class RegCompleteProfile extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'RCP',
  };

  state = {
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
          <Tabs style={{paddingTop: height*0.025}}>
            <Tab heading= {<TabHeading style={{backgroundColor: '#16131d'}}><Text style={{color: '#c75e9a', fontSize: 18}}>PERSONAL DETAILS</Text></TabHeading>} >
            <Background logo= {false}/>
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
            </Tab>
            <Tab heading= {<TabHeading style={{backgroundColor: '#16131d'}}><Text style={{color: '#c75e9a', fontSize: 20}}> PASSION </Text></TabHeading>} >
            <Background logo= {false}/>
        <Content>
        
        <Text style={{color: '#c75e9a', fontSize: 22, paddingLeft: width*0.05}}>INTERESTS</Text>
            <ScrollView showsHorizontalScrollIndicator = {false} horizontal = {true} contentContainerStyle={{paddingVertical: width*0.05, paddingHorizontal: width*0.01}}>
          <Form style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width*0.02}}>
          <Item style={{borderColor: 'transparent'}}>
          <Badge style={{   backgroundColor: interests["IA"]? '#c75e9a' : '#16131d',
                            minHeight: height*0.055,
                            borderWidth: width*0.0015, 
                            borderColor: interests["IA"]? '#c75e9a' : '#f2f2f2' ,
                            borderRadius: 30,
                            }}>
          <Button transparent light onPress = {() => this.onPressInterests("IA")}>
            <Text style={{color: '#f2f2f2', fontSize: 25, fontWeight: '300'}}>Interest A</Text>
            </Button>
          </Badge>
          </Item>
          <Item style={{borderColor: 'transparent'}}> 
          
          </Item>
          </Form>
          <Form style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width*0.02}}>
          <Badge style={{ backgroundColor: interests["IB"]? '#c75e9a' : '#16131d',
                            minHeight: height*0.055,
                            borderWidth: width*0.0015, 
                            borderColor: interests["IB"]? '#c75e9a' : '#f2f2f2' ,
                            borderRadius: 30,
                            }}>
          <Button transparent light onPress = {() => this.onPressInterests("IB")}>
            <Text style={{color: '#fff7f7', fontSize: 25, fontWeight: '300'}}>Interest B</Text>
            </Button>
          </Badge>
          </Form>
          <Form style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width*0.02}}>
          <Badge style={{ backgroundColor: interests["IC"]? '#c75e9a' : '#16131d',
                            minHeight: height*0.055,
                            borderWidth: width*0.0015, 
                            borderColor: interests["IC"]? '#c75e9a' : '#f2f2f2' ,
                            borderRadius: 30,
                            }}>
          <Button transparent light onPress = {() => this.onPressInterests("IC")}>
            <Text style={{color: '#fff7f7', fontSize: 25, fontWeight: '300'}}>Interest C</Text>
            </Button>
          </Badge>
          </Form>
          <Form style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width*0.02}}>
          <Badge style={{ backgroundColor: interests["ID"]? '#c75e9a' : '#16131d',
                            minHeight: height*0.055,
                            borderWidth: width*0.0015, 
                            borderColor: interests["ID"]? '#c75e9a' : '#f2f2f2' ,
                            borderRadius: 30,
                            }}>
          <Button transparent light onPress = {() => this.onPressInterests("ID")}>
            <Text style={{color: '#fff7f7', fontSize: 25, fontWeight: '300'}}>Interest D</Text>
            </Button>
          </Badge>
          </Form>
          
        </ScrollView>
        <Text style={{color: '#c75e9a', paddingTop: height*0.03, paddingLeft: width*0.05, fontSize: 22}}>LOOKING FOR</Text>
            <ScrollView showsHorizontalScrollIndicator = {false} horizontal = {true} contentContainerStyle={{paddingVertical: width*0.05, paddingHorizontal: width*0.01}}>
            <Form style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width*0.02}}>
            <Item style={{borderColor: 'transparent'}}> 
          <Badge style={{ backgroundColor: LF["LA"]? '#c75e9a' : '#16131d',
                            minHeight: height*0.055,
                            borderWidth: width*0.0015, 
                            borderColor: LF["LA"]? '#c75e9a' : '#f2f2f2' ,
                            borderRadius: 30,
                            }}>
          <Button transparent light onPress = {() => this.onPressLF("LA")}>
            <Text style={{color: '#fff7f7', fontSize: 25, fontWeight: '300'}}>Looking for A</Text>
            </Button>
          </Badge>
          </Item>
          </Form>
          <Form style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width*0.02}}>
          <Badge style={{ backgroundColor: LF["LB"]? '#c75e9a' : '#16131d',
                            minHeight: height*0.055,
                            borderWidth: width*0.0015, 
                            borderColor: LF["LB"]? '#c75e9a' : '#f2f2f2' ,
                            borderRadius: 30,
                            }}>
          <Button transparent light onPress = {() => this.onPressLF("LB")}>
            <Text style={{color: '#fff7f7', fontSize: 25, fontWeight: '300'}}>Looking for B</Text>
            </Button>
          </Badge>
          </Form>
          <Form style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width*0.02}}>
          <Badge style={{ backgroundColor: LF["LC"]? '#c75e9a' : '#16131d',
                            minHeight: height*0.055,
                            borderWidth: width*0.0015, 
                            borderColor: LF["LC"]? '#c75e9a' : '#f2f2f2' ,
                            borderRadius: 30,
                            }}>
          <Button transparent light onPress = {() => this.onPressLF("LC")}>
            <Text style={{color: '#fff7f7', fontSize: 25, fontWeight: '300'}}>Looking for C</Text>
            </Button>
          </Badge>
          </Form>
          <Form style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width*0.02}}>
          <Badge style={{ backgroundColor: LF["LD"]? '#c75e9a' : '#16131d',
                            minHeight: height*0.055,
                            borderWidth: width*0.0015, 
                            borderColor: LF["LD"]? '#c75e9a' : '#f2f2f2' ,
                            borderRadius: 30,
                            }}>
          <Button transparent light onPress = {() => this.onPressLF("LD")}>
            <Text style={{color: '#fff7f7', fontSize: 25, fontWeight: '300'}}>Looking for D</Text>
            </Button>
          </Badge>
          </Form>
        
        </ScrollView>
        <Text style={{color: '#c75e9a', paddingTop: height*0.03, paddingLeft: width*0.05, fontSize: 22}}>INDUSTRY</Text>
            <ScrollView showsHorizontalScrollIndicator = {false} horizontal = {true} style={{paddingVertical: width*0.05, paddingHorizontal: width*0.01}}>
            <Form style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width*0.02}}>
            <Item style={{borderColor: 'transparent'}}> 
          <Badge style={{ backgroundColor: industry["INA"]? '#c75e9a' : '#16131d',
                            minHeight: height*0.055,
                            borderWidth: width*0.0015, 
                            borderColor: industry["INA"]? '#c75e9a' : '#f2f2f2' ,
                            borderRadius: 30,
                            }}>
          <Button transparent light onPress = {() => this.onPressIndustry("INA")}>
            <Text style={{color: '#fff7f7', fontSize: 25, fontWeight: '300'}}>Industry A</Text>
            </Button>
          </Badge>
          </Item>
          </Form>
          <Form style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width*0.02}}>
          <Badge style={{ backgroundColor: industry["INB"]? '#c75e9a' : '#16131d',
                            minHeight: height*0.055,
                            borderWidth: width*0.0015, 
                            borderColor: industry["INB"]? '#c75e9a' : '#f2f2f2' ,
                            borderRadius: 30,
                            }}>
          <Button transparent light onPress = {() => this.onPressIndustry("INB")}>
            <Text style={{color: '#fff7f7', fontSize: 25, fontWeight: '300'}}>Industry B</Text>
            </Button>
          </Badge>
          </Form>
          <Form style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width*0.02}}>
          <Badge style={{ backgroundColor: industry["INC"]? '#c75e9a' : '#16131d',
                            minHeight: height*0.055,
                            borderWidth: width*0.0015, 
                            borderColor: industry["INC"]? '#c75e9a' : '#f2f2f2' ,
                            borderRadius: 30,
                            }}>
          <Button transparent light onPress = {() => this.onPressIndustry("INC")}>
            <Text style={{color: '#fff7f7', fontSize: 25, fontWeight: '300'}}>Industry C</Text>
            </Button>
          </Badge>
          </Form>
          <Form style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width*0.02}}>
          <Badge style={{ backgroundColor: industry["IND"]? '#c75e9a' : '#16131d',
                            minHeight: height*0.055,
                            borderWidth: width*0.0015, 
                            borderColor: industry["IND"]? '#c75e9a' : '#f2f2f2' ,
                            borderRadius: 30,
                            }}>
          <Button transparent light onPress = {() => this.onPressIndustry("IND")}>
            <Text style={{color: '#fff7f7', fontSize: 25, fontWeight: '300'}}>Industry D</Text>
            </Button>
          </Badge>
          </Form>
        </ScrollView>
        <Content scrollEnabled={false} contentContainerStyle={{flexDirection: 'row', justifyContent: 'center', padding: width*0.05}}>
        <Button rounded style={{backgroundColor: '#16131d', borderWidth: width*0.003, borderColor: 'white', paddingHorizontal: width*0.05}} 
                onPress = {()=>API.CompleteProfile(this.state.firstName, this.state.lastName, this.state.interests, this.state.industry, this.state.LF, this.state.bio, this.props)}>
            <Text style={{color: '#f2f2f2', fontSize: 20, fontWeight: '300'}}>Finalize Profile</Text>
          </Button>
          </Content>
        </Content>
        </Tab>
        </Tabs>
      </Container>

);
  }

}