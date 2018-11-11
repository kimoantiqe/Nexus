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
  ListItem
} from "native-base";

var apiURL = "http://localhost:1337/api";

var matchesArray = [];
var textToPrint;
var firstName = [];
var lastName = [];
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lastRefresh: Date(Date.now()).toString()
    };

    this.refreshScreen = this.refreshScreen.bind(this);

    this.getUserMatches();
  }

  //function that grabs a new user and refreshes the screen to update the
  //parameters.
  refreshScreen() {
    this.displayMatchOnScreen();
    this.setState({ lastRefresh: Date(Date.now()).toString() });
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
      //need to update the get request.
      fetch(apiURL + "/user", matches)
        .then(response => response.json())
        .then(response => {
          // console.log(response);
          if (response.success) {
            //console.log(response.user.matches);
            for (var i = 0; i < response.user.matches.length; i++) {
              matchesArray.push(response.user.matches[i]);
            }
            this.refreshScreen();
          }
        });
    }
  };

  //function to display the matches (fix to display first and last name)
  displayMatchOnScreen() {
    textToPrint = "";
    for (var i = 1; i < matchesArray.length + 1; i++) {
      this.displayMatch(matchesArray[i - 1]);
      textToPrint += i + ": " + firstName[i - 1] + " " + lastName[i - 1] + "\n";
    }
  }

  //need to make sure
  displayMatch = async userid => {
    let userToken = await AsyncStorage.getItem("userToken");

    //console.log("This is display Match");

    if (userToken != null) {
      var user = {
        method: "GET",
        headers: {
          Authorization: userToken
        }
      };
      fetch(apiURL + "/user/getuser/?id=" + userid, user)
        .then(response => response.json())
        .then(response => {
          //console.log(response.user.firstName + " " + response.user.lastName + "\n");
          firstName.push(response.user.firstName);
          lastName.push(response.user.lastName);
        });
    }
  };

  render() {
    return (
      // <View style={styles.container}>
      //   <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      //     <View style={styles.getStartedContainer}>
      //
      //       <Text style={styles.getStartedText}>{textToPrint}
      //       </Text>
      //
      //       <Button
      //         title='Refresh'
      //         onPress = {this.getUserMatches}
      //       />
      //
      //     </View>
      //   </ScrollView>
      // </View>

      <Container>
        <Content>
        <FlatList
          horizontal
          data={items}
          showsHorizontalScrollIndicator={false}
            renderItem={({item}) =>
            <Card style={styles.avatarCard} >
              <CardItem button onPress={() => alert('Yacta')}>
                  <Thumbnail
                    source={require("../images/sherif.png")}
                    style={styles.avatarImg}
                  />
              </CardItem>
              <CardItem style={{marginTop:0,paddingTop:0}}>
              <Body style={styles.centerText}>
                <Text>Sherif</Text>
              </Body>
              </CardItem>
            </Card>
          }
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
                    <Text>37 Matches</Text>
                    <Text>in the past month</Text>
                  </Body>
                </Left>
              </CardItem>
            </Card>

            <Card style={styles.card}>
              <CardItem>
                <Left>
                  <Image
                    source={require("../images/events.png")}
                    style={styles.cardImg}
                  />
                  <Body style={styles.centerText}>
                    <Text>3 Events</Text>
                    <Text>Coming up</Text>
                  </Body>
                </Left>
              </CardItem>
            </Card>

            <Card style={styles.card}>
              <CardItem>
                <Left>
                  <Image
                    source={require("../images/tasks.png")}
                    style={styles.cardImg}
                  />
                  <Body style={styles.centerText}>
                    <Text>4 Tasks due</Text>
                    <Text>During the next week</Text>
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

const items =
[{key: 'a'}, {key: 'b'},{key: 'c'}, {key: 'd'},{key: 'e'}, {key: 'f'},{key: 'g'}]
;
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
    width: 80,
    height: 80
  },
  avatarCard:{
    marginTop: 40,
    marginBottom : 24,
    flex: 1,
    width: 110
  }
});
