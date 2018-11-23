import React, { Component } from 'react';
import { Dimensions, Slider, StyleSheet, AsyncStorage } from 'react-native';
import { Container, Content, Text, Item, Header, View, Button, Input, Form, Textarea, Footer, Left, Right, Body, Title} from 'native-base'
import { Pages } from 'react-native-pages';
import { WaveIndicator } from "react-native-indicators";
import SliderBadge from '../components/SliderBadge'

const API = require("../API_calls/APIs");
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

var apiURL = API.apiURL;

export default class RegCompleteProfile extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'RCP',
  };

  constructor(props) {

    super(props);
  this.state = {
  interests: {},
  LF: {},
  industry: {},
  bio: "",
  firstName: "",
  lastName: "",
  loading: 1,
  page: 0
  }

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

    const {industry, interests, LF, page} = this.state;
   
    if(this.state.loading ==1){
      console.log("HERE");
      return(
        
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
            </Right>
          </Header>
          <Content>

       <WaveIndicator
            size={80}
            color="#2c2638"
            style={{ flex: 0, marginTop: height*0.3 }}
          />
          </Content>

         
        <Footer style={{ backgroundColor: "#2c2638", height: height * 0.05 }}></Footer>
      </Container>

      )
    }

  else 
      return (


        <Container >
          <Header
            iosBarStyle="light-content"
            androidStatusBarColor="#ffffff"
            style={styles.header}
          >
            <Left>
            { (page > 0)? <Button hasText transparent 
          onPress={() => {
            this.pager.scrollToPage(this.state.page - 1);
        }}>
            <Text>Previous</Text>
          </Button> : null}
            </Left>
            <Body>
              <Title style={styles.headerTitle}>PROFILE</Title>
            </Body>
            { (page >= 3)? <Right>
            <Button hasText transparent 
            onPress = { 
              async()=>{
                this.setState({ loading: 1 });
                await API.UpdateProfile(this.state.firstName, this.state.lastName, this.state.interests, this.state.industry, this.state.LF, this.state.bio, this.props);
                this.setState({ loading: 0});
              }
              }>
              <Text>Apply</Text>
            </Button>
            </Right> : 
          <Right>
          <Button hasText transparent 
          onPress={() => {
            this.pager.scrollToPage(this.state.page + 1);
        }}>
            <Text>Next</Text>
          </Button>
          </Right>
          }
          </Header>
          
            <Pages ref={ref => { this.pager = ref; }} onScrollEnd={(p) => this.setState({page: p})} indicatorColor='#2c2638'>
            <Content contentContainerStyle={{paddingHorizontal: width*0.05, }}>
            <Form>
              <Text style={{color: '#2c2638', fontSize: 25, fontWeight: '500', padding: width*0.02}}>First Name</Text>
            <Item rounded style={{ paddingHorizontal: width*0.02, borderColor: '#2c2638', borderWidth: 17}}>
            <Input value={this.state.firstName} style={{color: '#2c2638', fontSize: 20, fontWeight: '400'}} onChangeText = {this.handleFirstname}/>
            </Item>
            <Text style={{color: '#2c2638', fontSize: 25, fontWeight: '500', padding: width*0.02}}>Last Name</Text>
            <Item rounded style={{ paddingHorizontal: width*0.02, borderColor: '#2c2638', borderWidth: 17}}>
            <Input value={this.state.lastName} style={{color: '#2c2638', fontSize: 20, fontWeight: '400'}} onChangeText = {this.handleLastname}/>
            </Item>
            <Text style={{color: '#2c2638', fontSize: 25, fontWeight: '500', padding: width*0.02}}>Bio</Text>
            <Item rounded style={{ paddingHorizontal: width*0.02, borderColor: '#2c2638', borderWidth: 17}}>
            <Textarea rowSpan={6} rounded value={this.state.bio}  style={{color: '#2c2638', fontSize: 20, fontWeight: '400'}} onChangeText = {this.handleBio}/>
            </Item>
            </Form>
            </Content>
            
            
        <Content>
        
        <Text style={styles.Qtext}>Out of the following, choose what you are interested in and the emphasis of interest.</Text>
            <View style={{paddingVertical: width*0.05, paddingHorizontal: width*0.01, flex: 1, flexDirection: 'column'}}>
          
            <Form style={{flex: 1, flexDirection: 'row'}}>
              <SliderBadge displayName={"Interest A"} flag={interests["IA"]} toCall = {() => this.onPressInterests("IA")} toSetVal = {(value) => this.sliding(value, 0, "IAval")}/>
              <SliderBadge displayName={"Interest C"} flag={interests["IC"]} toCall = {() => this.onPressInterests("IC")} toSetVal = {(value) => this.sliding(value, 0, "ICval")}/>
            </Form>

            <Form style={{flex: 1, flexDirection: 'row'}}>
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