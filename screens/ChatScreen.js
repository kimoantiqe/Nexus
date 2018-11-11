import React from 'react';
import {
  Button,
  StyleSheet,
  View,
} from 'react-native';

export default class ChatScreen extends React.Component {
  static navigationOptions = {
    title: 'chatScreen',
    header: null
  };

  render() {
    return (
      <View style = {styles1.contaier}>
        <View style = {styles1.container}>
            <Button
                title = "Return"
                color = "#841584"
                onPress = {this.returnBack}
            />
        </View>
      </View>
      );
    }
  
    returnBack = () => {

    this.props.navigation.navigate("Main");

  };
}

const styles1 = StyleSheet.create({
  contaier: {
      flex: 1,
      backgroundColor: 'white'
  },
    container: {
        marginTop:100,
        flex: 1,
        backgroundColor: 'white'
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
    },
    logoImage: {
        width: 100,
        height: 100
    },
    header: {
        marginTop: 20,
        color: '#FFF',
        textAlign: 'center',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 25,
        opacity: 0.6
    },
    formContainter: {

    }
});