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
  Dimensions
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

var USERID;

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastRefresh: Date(Date.now()).toString(),
      loading: 1 
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
        
            for (var i = 0; i < response.user.matches.length; i++) {
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

  //Function that is used to populate when the user logs in.
  populate = async () => {
    let userToken = await AsyncStorage.getItem("userToken");

    if (userToken != null) {
      var populate = {
        method: "GET",

        headers: {
          Authorization: userToken,
          "Content-Type": "application/json"
        }
      };
      fetch(apiURL + "/user/popconn", populate);
    }
  };

  render() {
    if(this.state.loading){
      return(
        <Container>
        <Content>
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
                <Icon name="calendar" style={{color:'white'}} onPress={()=>this.props.navigation.navigate('Calendar') } />
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
        <Content>
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
          <FlatList
            horizontal
            data={matchesArray}
            keyExtractor={item => item._id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Card style={styles.avatarCard}>
                <CardItem button onPress={ () => this.props.navigation.navigate("Profile", {
      user: item
    }
    )
                  }>
                  <Thumbnail
                    source={require("../images/sherif.png")}
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
                      <Text style={styles.titleText}>Matches</Text>
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
                      <Text style={styles.numberText}>3</Text>
                      <Text style={styles.titleText}>Meetings</Text>
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
                      <Text style={styles.numberText}>2</Text>
                      <Text style={styles.titleText}>Taps</Text>
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
    height: 75
  },
  avatarCard: {
    marginTop: 20,
    marginBottom: 24,
    flex: 1,
    width: 100
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
