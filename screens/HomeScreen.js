import React from "react";
import {
  AsyncStorage,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
  RefreshControl
} from "react-native";
import { WaveIndicator } from "react-native-indicators";
import { WebBrowser } from "expo";

import { MonoText } from "../components/StyledText";

import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Body,
  List,
  Title,
  ListItem
} from "native-base";

import { sbCreateChannel } from "../sendbirdActions/groupChannel";

const APIcall      = require("../API_calls/APIs");

var apiURL = APIcall.apiURL;

var matchesArray = [];

export const user2Token = async () => {
  let token = await AsyncStorage.getItem("userToken");
  return token;
};
var textToPrint;
var firstName = [];
var lastName = [];
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
var thisUser;
var USERID;

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastRefresh: Date(Date.now()).toString(),
      loading: 1 ,
      refreshing: false,
    };

    this.refreshScreen = this.refreshScreen.bind(this);
    this.getUserMatches();
  }


  //function that grabs a new user and refreshes the screen to update the
  //parameters.
  refreshScreen() {
    this.setState({ lastRefresh: Date(Date.now()).toString(),
                    loading:0
                    });
  }

  static navigationOptions = {
    header: null
  };


  //Function to get the matches array and store it for use afterwards.
  getUserMatches = async () => {
    let userToken = await AsyncStorage.getItem("userToken");

    //console.log("This is get userMatches");

    if (userToken != null) {
      matchesArray = [];
      var matches = {
        method: "GET",
        headers: {
          Authorization: userToken
        }
      };

      await fetch(apiURL + "/user", matches)
        .then(response => response.json())
        .then(async response => {

          if (response.success) {
            thisUser = response.user;
            for (var i = 0; i < response.user.matches.length; i++) {
              console.log(thisUser);
              if(response.user.matches[i])
              await this.getUser(response.user.matches[i]);
            }

            this.refreshScreen();
          }
        });
    }
  };


  getUser = async userid => {
    let userToken = await AsyncStorage.getItem("userToken");

    if (userToken != null) {

      var user = {
        method: "GET",
        headers: {
          Authorization: userToken
        }
      };
      await fetch(apiURL + "/user/getuser/?id=" + userid, user)
        .then(response => response.json())
        .then(response => {
          console.log(response.user._id);
          matchesArray.push(response.user);
        });
    }
  };




  _onRefresh = async () => {
    await this.setState({refreshing: true});
    await this.setState({refreshing: false});
    this.setState({loading: 1});
    await this.getUserMatches();

    this.setState({loading: 0});
  }

  render() {
    if(this.state.loading){
      return(
        <Container>
        <Content >
          <Header
            iosBarStyle="light-content"
            androidStatusBarColor="#ffffff"
            style={styles.header}
          >
            <Left />
            <Body>
              <Title style={styles.headerTitle}>DASHBOARD</Title>
            </Body>
            <Right>
            <Button transparent>
              <Icon name="calendar" style={{color:'#f5ba57'}} onPress={()=>this.props.navigation.navigate('Calendar') } />
            </Button>
            </Right>
          </Header>
          <WaveIndicator
            size={80}
            color="#2c2638"
            style={{ flex: 0, marginTop: height*0.3 }}
          />

        </Content>
      </Container>
      )
    }

    else return (
      <Container>
      <Header
        iosBarStyle="light-content"
        androidStatusBarColor="#ffffff"
        style={styles.header}
      >
        <Left />
        <Body>
          <Title style={styles.headerTitle}>DASHBOARD</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name="calendar" style={{color:'#f5ba57'}} onPress={()=>this.props.navigation.navigate('Calendar') } />
          </Button>
        </Right>
      </Header>

        <Content refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }>

          <FlatList
            style={{paddingHorizontal: 5}}
            horizontal
            data={matchesArray}
            keyExtractor={item => item._id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Card style={[styles.avatarCard, {alignItems: 'center'}]}>
                <CardItem button onPress={ () => this.props.navigation.navigate("UProfile", {
      user: item
    }
    )
                  }>
                  <Thumbnail
                    source={{url: apiURL + "/image/" + item.image}}
                    style={styles.avatarImg}
                  />
                </CardItem>
                <CardItem style={{ marginTop: 0, paddingTop: 0 }}>
                  <Body style={styles.centerText}>
                    <Text style={styles.avatarText}>{item.firstName}</Text>
                  </Body>
                </CardItem>
              </Card>
            )}
          />

          <View style={styles.centerCards}>
            <Card style={styles.card}>
              <CardItem>
                <Left>
                  <Image
                    source={require("../images/handshake.png")}
                    style={styles.cardImg}
                  />
                  <Body style={styles.centerText}>
                    <View style={styles.rowContainer}>
                      <Text style={styles.numberText}>
                        {matchesArray.length}
                      </Text>
                      <Text style={styles.titleText}>{(matchesArray.length != 1) ? "Matches" : "Match"}</Text>
                    </View>
                    <Text style={styles.subTitleText}>since joining!</Text>
                  </Body>
                </Left>
              </CardItem>
            </Card>

            <Card style={styles.card}>
              <CardItem>
                <Left>
                  <Image
                    source={require("../images/meeting.png")}
                    style={styles.cardImg}
                  />
                  <Body style={styles.centerText}>
                    <View style={styles.rowContainer}>
                      <Text style={styles.numberText}>{thisUser.tasks ? (thisUser.tasks.length ? thisUser.tasks.length : 0) : 0}</Text> }
                      <Text style={styles.titleText}>{(thisUser.tasks && thisUser.tasks.length !=1)  ? "Meetings/Tasks" : "Meeting/Task"}</Text>
                    </View>
                    <Text style={styles.subTitleText}>coming up!</Text>
                  </Body>
                </Left>
              </CardItem>
            </Card>

            <Card style={styles.card}>
              <CardItem>
                <Left>
                  <Image
                    source={require("../images/qr.png")}
                    style={styles.cardImg}
                  />
                  <Body style={styles.centerText}>
                    <View style={styles.rowContainer}>
                      <Text style={styles.numberText}>{thisUser.InstantMatches ? thisUser.InstantMatches.length : 0}</Text>
                      <Text style={styles.titleText}>{ (thisUser.InstantMatches && thisUser.InstantMatches.length != 1) ? "Instant Matches" : "Instant Match" }</Text>
                    </View>
                    <Text style={styles.subTitleText}>so far!</Text>
                  </Body>
                </Left>
              </CardItem>
            </Card>
          </View>
        </Content>
      </Container>
    );
  }
}

const items = [
  { key: "a" },
  { key: "b" },
  { key: "c" },
  { key: "d" },
  { key: "e" },
  { key: "f" },
  { key: "g" }
];
const styles = StyleSheet.create({
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
    height: 75,
    borderRadius: 37.5
  },
  avatarCard: {
    marginTop: 20,
    marginBottom: 24,
    flex: 1,
    width: 107
  },
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
  }
});
