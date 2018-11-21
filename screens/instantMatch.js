import React, { Component } from "react";
import { TouchableOpacity, StyleSheet, View, Dimensions } from "react-native";
import { Button, Text } from "native-base";
import QRCode from "react-native-qrcode";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default class InstantMatch extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <View style={styles.container}>
        <QRCode
          value={"this.state.text"}
          size={200}
          bgColor="#3f3651"
          fgColor="white"
        />

        <TouchableOpacity style={styles.buttonContainerTop}>
          <Button
            onPress={() => {
              this.props.navigation.navigate("QrCamera");
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Scan</Text>
          </Button>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainerTop: {
    flexDirection: "row",
    width: "100%",
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 200,
    backgroundColor: "transparent",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 100,
    justifyContent: "center"
  },
  buttonText:{
    color: "black",
    fontWeight: "bold"
  }
});
