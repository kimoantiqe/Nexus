import React from 'react';
import { Image,Dimensions,StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { Button, Container, Content, Header, Left, Right, Body, Title } from "native-base";
import { WaveIndicator } from "react-native-indicators";
const { width } = Dimensions.get('window')
const qrSize = width * 0.7
const APIcall = require("../API_calls/APIs");
var apiURL = APIcall.apiURL;
const height = Dimensions.get("window").height;
var matcheduser;

export default class qrCamera extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    hasCameraPermission: null,
    loading:0,
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    }


  async getUser(userid){
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
          matcheduser = response.user;
        });
    }
    console.log("done");
  };


  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    if(this.state.loading == 1){
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
              <Title style={styles.headerTitle}>Nexus Match</Title>
            </Body>
            <Right>
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
      <View style={{ flex: 1 }}>
        <BarCodeScanner
        onBarCodeRead={this.handleBarCodeScanned}
        style={[StyleSheet.absoluteFill, styles.container]}>
        <Text style={styles.description}>Scan your Nexus code</Text>
        <Image
          style={styles.qr}
          source={require('../images/qrCamera.png')}
        />
        <Text
          onPress={() => this.props.navigation.goBack()}
          style={styles.cancel}>
          Cancel
        </Text>
      </BarCodeScanner>
      </View>
    );
  }

  handleBarCodeScanned = async({ type, data }) => {
    console.log(type+ " " + data);
    this.setState({loading: 1});
    await APIcall.instantMatch(data);
    await this.getUser(data);
    this.props.navigation.navigate("Profile", {
      user: matcheduser
    }
    )
    console.log(matcheduser);
  }
}

const styles = StyleSheet.create({
	container: {
    flex: 1,
    alignItems: 'center',
  },
  qr: {
    marginTop: '20%',
    marginBottom: '20%',
    width: qrSize,
    height: qrSize,
  },
  description: {
    fontSize: width * 0.09,
    marginTop: '10%',
    textAlign: 'center',
    width: '70%',
    color: 'white',
  },
  cancel: {
    fontSize: width * 0.05,
    textAlign: 'center',
    width: '70%',
    color: 'white',
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
});
