import React from "react";
import { AsyncStorage, StyleSheet, Dimensions, FlatList,Image,View } from "react-native";

import { connect } from "react-redux";
import { NavigationActions, StackActions } from "react-navigation";
import { sendbirdLogout, initMenu } from "../actions";
import Lightbox from 'react-native-lightbox';
import MainTabNavigator from "../navigation/MainTabNavigator";
import AppNavigator from "../navigation/AppNavigator";
import {
  Container,
  Content,
  Button,
  Text,
  Form,
  ListItem,
  Body,
  Right,
  Header,
  Left,
  Title
} from "native-base";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {

    super(props);
  this.state = {
    image: 'https://www.peakgrantmaking.org/wp-content/uploads/2017/05/gender_neutral_icons_lf-02.png',
    imageWidth: width/4,
    displayWidth: width/2,
    imageAvailable: false,
    firstName:"Sherif",
    lastName:"Anas",
    email:"email@email.com"
  };
}

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
          <Title style={styles.headerTitle}>Settings</Title>
        </Body>
        <Right />
      </Header>
        <Content style={styles.container}>


        <Lightbox
            onOpen={() => {this.setState({imageWidth: 0, displayWidth: width})}}
            willClose={() => {this.setState({imageWidth: width/4, displayWidth: width/2})}}
            underlayColor = 'transparent'
            >
            <Image
            style={{ alignSelf:'center', height: this.state.displayWidth, width: this.state.displayWidth, borderRadius: this.state.imageWidth,
                    borderWidth: 3, borderColor: '#2c2638'}}
            source={{ uri: this.state.image }}
            />
        </Lightbox>

          <Text style={styles.name}>{this.state.firstName}{" "}{this.state.lastName}</Text>
          <Text style={styles.emailSub}>{this.state.email}</Text>

          <View style={styles.buttonContainer}>
          <Button rounded style={styles.Button} onPress={this.editProfile}>
              <Text style={{color: '#2c2638', fontSize: 20, fontWeight: '300'}}>Edit</Text>
          </Button>

          <Button rounded style={styles.Button}  onPress={this.signOut} >
              <Text style={{color: '#2c2638', fontSize: 20, fontWeight: '300'}}>Signout</Text>
          </Button>
          </View>
        </Content>
      </Container>
    );
  }

  signOut = async () => {
    await AsyncStorage.clear();
    await Expo.SecureStore.deleteItemAsync("userToken");
    await Expo.SecureStore.deleteItemAsync("userid");

    //logout of sendbird.
    this.props.sendbirdLogout();

    this.props.navigation.navigate("Auth");
  };

  editProfile = async () => {
    this.props.navigation.navigate("EditProfileScreen");
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
  Button: {
    backgroundColor: 'transparent',
    borderWidth: width*0.003,
    borderColor: '#2c2638',
    width: width*0.35,
    flexDirection: 'row',
    justifyContent: 'center',
    margin:4
  },form:{
  },  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },name:{
    fontFamily: "Arial",
    fontSize: 30,
    marginTop:30,
    fontWeight: "700",
    color: "#2c2638",
    textAlign:'center'
  },emailSub:{
    fontFamily: "Arial",
    fontSize: 20,
    marginTop:2,
    fontWeight: "400",
    color: "#d6d6d6",
    textAlign:'center'
  }, buttonContainer:{
   flex: 1,
   flexDirection: 'row',
   marginTop:20,
   justifyContent: 'center',
   marginBottom:height*0.15

  }
});

function mapStateToProps({ settings }) {
  const { isDisconnected } = settings;
  return { isDisconnected };
}

export default connect(
  mapStateToProps,
  { sendbirdLogout, initMenu }
)(SettingsScreen);
