import React, { Component } from "react";
import { LinearGradient } from "expo";
import {StyleSheet, Dimensions, Image, View} from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default class Background extends React.Component {
    render() {
        return (
            
        <View style={styles.container}>
          <LinearGradient
            colors={["#16131d", "#734b6d"]}
            locations={[0.0, height * 0.0095]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: -height*0.5,
              height: height*2
            }}
          />

          <View style={styles.CloudContainer}>
            <Image
              style={styles.cloud1}
              source={require("../images/cloud3.png")}
            />
          </View>

          <View style={styles.CloudContainer}>
            <Image
              style={styles.cloud2}
              source={require("../images/cloud3.png")}
            />
          </View>
          <View style={styles.CloudContainer}>
            <Image
              style={styles.cloud3}
              source={require("../images/cloud3.png")}
            />
          </View>

          { this.props.logo? 

          <View style={styles.logoContainer}>
            <Image
              style={styles.logoImage}
              source={require("../images/logoGold.png")}
            />
          </View> : null
          
          }
          </View>
        );
  }
}

const styles = StyleSheet.create({
  container: {
        marginBottom: height * 0.05,
        paddingLeft: width * 0.05,
        paddingRight: width * 0.05,
        backgroundColor: "#1a2a6c",
        opacity: 1
      },
    logoContainer: {
      paddingTop: height*0.1,
      alignItems: "center",
      justifyContent: "center"
    },
    logoImage: {
      width: width * 0.82,
      height: height * 0.25,
      resizeMode: "contain"
    },
    CloudContainer: {
      position: "absolute",
      width: width * 0.2,
      height: height * 0.1
    },
    cloud1: {
      marginTop: height * 0.05,
      opacity: 0.04,
      width: width * 0.4,
      height: height * 1.2,
      resizeMode: "contain"
    },
    cloud2: {
      marginTop: height * 0.17,
      marginRight: width * 0.4,
      opacity: 0.04,
      width: width * 0.7,
      height: height * 0.07,
      resizeMode: "contain"
    },
    cloud3: {
      marginTop: height * 0.46,
      marginLeft: width * 0.3,
      opacity: 0.03,
      width: width * 1.2,
      height: height * 0.13,
      resizeMode: "contain"
    }
  });