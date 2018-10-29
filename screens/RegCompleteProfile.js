import React, { Component } from 'react';
import { LinearGradient } from 'expo';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  Dimensions,
   KeyboardAvoidingView, Alert, TextInput, TouchableOpacity,
} from 'react-native';
import MainTabNavigator from '../navigation/MainTabNavigator';
import AppNavigator from '../navigation/AppNavigator';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default class RegCompleteProfile extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'RCP',
  };

  state = {
      toggles:[
      false, 
     false,
     false,
       false,
      false,
       false,
  false,
      false,
       false,
      false,
      false,
  false],
  bio: "",
  }

  handleBio = (text) => {
    this.setState({ bio: text })
 }

  onPressIA()
  {
      newtoggle = this.state.toggles;
      newtoggle[0] = !this.state.toggles[0];
      this.setState({toggles:newtoggle})
  }

  onPressIB()
  {
    newtoggle = this.state.toggles;
    newtoggle[1] = !this.state.toggles[1];
    this.setState({toggles:newtoggle})
  }

  onPressIC()
  {
    newtoggle = this.state.toggles;
    newtoggle[2] = !this.state.toggles[2];
    this.setState({toggles:newtoggle})
  }

  onPressID()
  {
    newtoggle = this.state.toggles;
    newtoggle[3] = !this.state.toggles[3];
    this.setState({toggles:newtoggle})
  }

  onPressLA()
  {
    newtoggle = this.state.toggles;
    newtoggle[4] = !this.state.toggles[4];
    this.setState({toggles:newtoggle})
  }

  onPressLB()
  {
    newtoggle = this.state.toggles;
    newtoggle[5] = !this.state.toggles[5];
    this.setState({toggles:newtoggle})
  }

  onPressLC()
  {
    newtoggle = this.state.toggles;
    newtoggle[6] = !this.state.toggles[6];
    this.setState({toggles:newtoggle})
  }

  onPressLD()
  {
    newtoggle = this.state.toggles;
    newtoggle[7] = !this.state.toggles[7];
    this.setState({toggles:newtoggle})
  }

  onPressINA()
  {
    newtoggle = this.state.toggles;
    newtoggle[8] = !this.state.toggles[8];
    this.setState({toggles:newtoggle})
  }

  onPressINB()
  {
    newtoggle = this.state.toggles;
    newtoggle[9] = !this.state.toggles[9];
    this.setState({toggles:newtoggle})
  }

  onPressINC()
  {
    newtoggle = this.state.toggles;
    newtoggle[10] = !this.state.toggles[10];
    this.setState({toggles:newtoggle})
  }

  onPressIND()
  {
    newtoggle = this.state.toggles;
    newtoggle[11] = !this.state.toggles[11];
    this.setState({toggles:newtoggle})
  }

  render() {

    const {toggles} = this.state;

    return (

<View style = {styles1.contaier} >
<LinearGradient
                    colors={ [ '#3c1053', '#000000']}
                    locations={[0.0, 3.7]}
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: 0,
                      height: height,
                    }}
            />
            <View style = {styles1.cloudcon}>
                <Image
                style = {styles1.cloud}
                source ={require('../images/cloud3.png')} />
            </View>

            <View style = {styles1.cloudcon}>
                <Image
                style = {styles1.cloud2}
                source ={require('../images/cloud3.png')} />
            </View>
            <View style = {styles1.cloudcon}>
                <Image
                style = {styles1.cloud3}
                source ={require('../images/cloud3.png')} />
            </View>
    
       
            
            

            <View style = {{flex:0.7}}>
                    <View style = {styles.containter}>
                    <KeyboardAvoidingView behavior = "padding">
                    <Text style = {styles.input}>Please Choose your interest:</Text>
                        <ScrollView showsHorizontalScrollIndicator = {false} horizontal = {true}>
                                <View style = {{ flexDirection: 'row',  }}>
                                        <TouchableOpacity 
                                            onPress = {() => this.onPressIA()}
                                            style = {{
                                                backgroundColor: toggles[0]? 'fuchsia' : '#00ffff',
                                                height: height*0.10,
                                                width: width*0.35,
                                                justifyContent: 'space-evenly',
                                                borderRadius: 30,
                                                paddingTop: height*0.01,
                                                paddingBottom: height*0.01,
                                                paddingLeft: width*0.079,
                                                paddingRight: width*0.079,
                                                borderColor: 'fuchsia',
                                                borderWidth: width*0.005,
                                            }}>
                                            <Text style = {{color: 'white', fontWeight: '700'}}>Interest A</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress = {() => this.onPressIB()}
                                            style = {{
                                                backgroundColor: toggles[1]? 'fuchsia' : '#00ffff',
                                                height: height*0.10,
                                                width: width*0.35,
                                                justifyContent: 'space-evenly',
                                                borderRadius: 30,
                                                paddingTop: height*0.01,
                                                paddingBottom: height*0.01,
                                                paddingLeft: width*0.079,
                                                paddingRight: width*0.079,
                                                borderColor: 'fuchsia',
                                                borderWidth: width*0.005,
                                            }}>
                                            <Text style = {{color: 'white', fontWeight: '700'}}>Interest B</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress = {() => this.onPressIC()}
                                            style = {{
                                                backgroundColor: toggles[2]? 'fuchsia' : '#00ffff',
                                                height: height*0.10,
                                                width: width*0.35,
                                                justifyContent: 'space-evenly',
                                                borderRadius: 30,
                                                paddingTop: height*0.01,
                                                paddingBottom: height*0.01,
                                                paddingLeft: width*0.079,
                                                paddingRight: width*0.079,
                                                borderColor: 'fuchsia',
                                                borderWidth: width*0.005,
                                            }}>
                                            <Text style = {{color: 'white', fontWeight: '700'}}>Interest C</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress = {() => this.onPressID()}
                                            style = {{
                                                backgroundColor: toggles[3]? 'fuchsia' : '#00ffff',
                                                height: height*0.10,
                                                width: width*0.35,
                                                justifyContent: 'space-evenly',
                                                borderRadius: 30,
                                                paddingTop: height*0.01,
                                                paddingBottom: height*0.01,
                                                paddingLeft: width*0.079,
                                                paddingRight: width*0.079,
                                                borderColor: 'fuchsia',
                                                borderWidth: width*0.005,
                                            }}>
                                            <Text style = {{color: 'white', fontWeight: '700'}}>Interest D</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                                <Text style = {styles.input}>Please Choose what you're looking for:</Text>
                        <ScrollView showsHorizontalScrollIndicator = {false} horizontal = {true}>
                                <View style = {{ flexDirection: 'row',  }}>
                                        <TouchableOpacity 
                                            onPress = {() => this.onPressLA()}
                                            style = {{
                                                backgroundColor: toggles[4]? 'fuchsia' : '#00ffff',
                                                height: height*0.10,
                                                width: width*0.35,
                                                justifyContent: 'space-evenly',
                                                borderRadius: 30,
                                                paddingTop: height*0.01,
                                                paddingBottom: height*0.01,
                                                paddingLeft: width*0.079,
                                                paddingRight: width*0.079,
                                                borderColor: 'fuchsia',
                                                borderWidth: width*0.005,
                                            }}>
                                            <Text style = {{color: 'white', fontWeight: '700'}}>Looking for A</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress = {() => this.onPressLB()}
                                            style = {{
                                                backgroundColor: toggles[5]? 'fuchsia' : '#00ffff',
                                                height: height*0.10,
                                                width: width*0.35,
                                                justifyContent: 'space-evenly',
                                                borderRadius: 30,
                                                paddingTop: height*0.01,
                                                paddingBottom: height*0.01,
                                                paddingLeft: width*0.079,
                                                paddingRight: width*0.079,
                                                borderColor: 'fuchsia',
                                                borderWidth: width*0.005,
                                            }}>
                                            <Text style = {{color: 'white', fontWeight: '700'}}>Looking for B</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress = {() => this.onPressLC()}
                                            style = {{
                                                backgroundColor: toggles[6]? 'fuchsia' : '#00ffff',
                                                height: height*0.10,
                                                width: width*0.35,
                                                justifyContent: 'space-evenly',
                                                borderRadius: 30,
                                                paddingTop: height*0.01,
                                                paddingBottom: height*0.01,
                                                paddingLeft: width*0.079,
                                                paddingRight: width*0.079,
                                                borderColor: 'fuchsia',
                                                borderWidth: width*0.005,
                                            }}>
                                            <Text style = {{color: 'white', fontWeight: '700'}}>Looking for C</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress = {() => this.onPressLD()}
                                            style = {{
                                                backgroundColor: toggles[7]? 'fuchsia' : '#00ffff',
                                                height: height*0.10,
                                                width: width*0.35,
                                                justifyContent: 'space-evenly',
                                                borderRadius: 30,
                                                paddingTop: height*0.01,
                                                paddingBottom: height*0.01,
                                                paddingLeft: width*0.079,
                                                paddingRight: width*0.079,
                                                borderColor: 'fuchsia',
                                                borderWidth: width*0.005,
                                            }}>
                                            <Text style = {{color: 'white', fontWeight: '700'}}>Looking for D</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                                <Text style = {styles.input}>Please Choose your industry:</Text>
                        <ScrollView showsHorizontalScrollIndicator = {false} horizontal = {true}>
                                <View style = {{ flexDirection: 'row',  }}>
                                        <TouchableOpacity 
                                            onPress = {() => this.onPressINA()}
                                            style = {{
                                                backgroundColor: toggles[8]? 'fuchsia' : '#00ffff',
                                                height: height*0.10,
                                                width: width*0.35,
                                                justifyContent: 'space-evenly',
                                                borderRadius: 30,
                                                paddingTop: height*0.01,
                                                paddingBottom: height*0.01,
                                                paddingLeft: width*0.079,
                                                paddingRight: width*0.079,
                                                borderColor: 'fuchsia',
                                                borderWidth: width*0.005,
                                            }}>
                                            <Text style = {{color: 'white', fontWeight: '700'}}>Industry A</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress = {() => this.onPressINB()}
                                            style = {{
                                                backgroundColor: toggles[9]? 'fuchsia' : '#00ffff',
                                                height: height*0.10,
                                                width: width*0.35,
                                                justifyContent: 'space-evenly',
                                                borderRadius: 30,
                                                paddingTop: height*0.01,
                                                paddingBottom: height*0.01,
                                                paddingLeft: width*0.079,
                                                paddingRight: width*0.079,
                                                borderColor: 'fuchsia',
                                                borderWidth: width*0.005,
                                            }}>
                                            <Text style = {{color: 'white', fontWeight: '700'}}>Industry B</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress = {() => this.onPressINC()}
                                            style = {{
                                                backgroundColor: toggles[10]? 'fuchsia' : '#00ffff',
                                                height: height*0.10,
                                                width: width*0.35,
                                                justifyContent: 'space-evenly',
                                                borderRadius: 30,
                                                paddingTop: height*0.01,
                                                paddingBottom: height*0.01,
                                                paddingLeft: width*0.079,
                                                paddingRight: width*0.079,
                                                borderColor: 'fuchsia',
                                                borderWidth: width*0.005,
                                            }}>
                                            <Text style = {{color: 'white', fontWeight: '700'}}>Industry C</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            onPress = {() => this.onPressIND()}
                                            style = {{
                                                backgroundColor: toggles[11]? 'fuchsia' : '#00ffff',
                                                height: height*0.10,
                                                width: width*0.35,
                                                justifyContent: 'space-evenly',
                                                borderRadius: 30,
                                                paddingTop: height*0.01,
                                                paddingBottom: height*0.01,
                                                paddingLeft: width*0.079,
                                                paddingRight: width*0.079,
                                                borderColor: 'fuchsia',
                                                borderWidth: width*0.005,
                                            }}>
                                            <Text style = {{color: 'white', fontWeight: '700'}}>Industry D</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                                
                                <Text style = {styles.input}>Please enter a brief Bio:</Text>
                                <TextInput
                                    style = {styles.input1}
                                    onChangeText = {this.handleBio}
                                    placeholder = {this.state.bio}
                                />
                                <Button
                                    title = "Complete Profile!"
                                    color = "#659bf2"
                                    onPress = {this.cmp}
                                />
                                </KeyboardAvoidingView>
                            </View>
                        </View>
                    </View>

);
  }

  cmp = async () => {

    const userToken = await AsyncStorage.getItem('userToken');
    const first = await AsyncStorage.getItem('firstname');
    const last = await AsyncStorage.getItem('lastname');
    i = 0;
    const ili = ['IA', 'IB', 'IC', 'ID', 'LA', 'LB', 'LC', 'LD', 'INA', 'INB', 'INC', 'IND'];
    interest = '[';
    ind = '[';
    lf = '[';

    for (let index = 0; index < ili.length; index++) 
    {
        if (index < 4) 
        {
            if (this.state.toggles[index]) 
            {
                interest += (i? ',': '') + "\"" + ili[index] + "\"";
                i = 1;
            }
        } else
        {
        if (index === 4) 
        {
            i = 0;
            interest += "]";
        }
        if (index < 8) 
        {
            if (this.state.toggles[index]) 
            {
                lf += (i? ',': '') + "\"" + ili[index] + "\"";
                i = 1;
            }
        } else
        {
        if (index === 8) 
        {
            i = 0;
            lf += "]";
        }
        if (index < 12) 
        {
            if (this.state.toggles[index]) 
            {
                ind += (i? ',': '') + "\"" + ili[index] + "\"";
                i = 1;
            }
        }
    }
    }
    }

    ind += "]";

    interest = JSON.parse(interest);
    ind = JSON.parse(ind);
    lf = JSON.parse(lf);

    var settings = {
        method: 'PUT',
        headers: {
            'Authorization': userToken,
            'Content-Type': 'application/JSON'
        },
        body: JSON.stringify({
            "firstName" : first,
            "lastName" : last,
            "interests" : interest,
            "lookingFor": lf,
            "industry"  : ind,
            "bio" : this.state.bio
        })
        };

        console.log(settings);

        var apiURL = 'https://nexus-restapi.azurewebsites.net/api';

        fetch(apiURL + '/user', settings)
        .then(response => response.json())
        .then(response => console.log(response))
        .then(async () => this.populate())
        .then(this.props.navigation.navigate('Main'))

  }

  //Function that is used to populate when the user logs in.
  populate = async () => { 
    userToken = await AsyncStorage.getItem('userToken');

    console.log(userToken);

    var apiURL = 'https://nexus-restapi.azurewebsites.net/api';

    if (userToken != null) {
      var populate = {
        method: 'GET',
        headers: {
          'Authorization': userToken,
          'Content-Type': 'application/json'
        },
      }
      fetch(apiURL + '/user/popconn', populate)
    }
  }

}

const styles = StyleSheet.create({
    containter: {
        paddingTop: height*0.03,
    },
    input: {
        marginTop: height*0.03,
        marginBottom:0.02*height,
        backgroundColor: 'transparent',
        color: '#fff',
        width:width,
        fontSize: 22,
        paddingLeft:width*0.01,
    },
    input1: {
        height: height*0.14,
        backgroundColor: '#fff',
        color: '#000',
        marginRight: width*0.03,
        marginLeft: width*0.03,
        paddingLeft: width*0.03,
        paddingRight: width*0.03,
        fontSize: 20,
    }
});

const styles1 = StyleSheet.create({
    contaier: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection:'column',
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(255, 0, 0, 1)',
        position:'absolute',

    },
    logoContainer: {
        paddingTop:50,
        paddingBottom:30,
        alignItems: 'center',
        flex: 0.3,
        justifyContent: 'center',
    },
    logoImage: {
        width: width*0.82,
        height: height*0.25,
        resizeMode: 'contain'

    },
    formContainter: {
      flex:0.5,
      height:50,
        justifyContent: 'center',
        alignItems: 'center',

    },
    cloudcon: {
      position: 'absolute',
      width:width*0.2,
      height:height*0.1,
    },
    cloud: {
      marginTop:height*0.05,
      opacity:0.05,
      width:width*0.4,
      height:height*1.2,
      resizeMode:'contain',

    },
    cloud2: {
      marginTop:height*0.17,
      marginRight:width*0.4,
      opacity:0.07,
      width:width*0.7,
      height:height*0.07,
      resizeMode:'contain',

    },
    cloud3: {
      marginTop:height*0.46,
      marginLeft:width*0.3,
      opacity:0.06,
      width:width*1.2,
      height:height*0.13,
      resizeMode:'contain',

    }
});