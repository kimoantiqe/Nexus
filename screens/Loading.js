import React, { Component } from "react";
import { WaveIndicator } from "react-native-indicators";
import { Container } from "native-base";
import { StyleSheet, View, Image, Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default class Loading extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <Container style={styles.container}>
        <View>
          <Image
            style={styles.logoImage}
            source={require("../images/logoGold.png")}
          />
          <WaveIndicator
            size={80}
            color="white"
            style={{ flex: 0, marginTop: 30 }}
          />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center", //THIS LINE HAS CHANGED
    backgroundColor: "#16131d"
  },
  logoImage: {
    width: width * 0.9,
    height: height * 0.33,
    resizeMode: "contain"
  }
});
