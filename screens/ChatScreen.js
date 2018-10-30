import React from 'react';
import { AsyncStorage, Button, StyleSheet, View, Alert,
} from 'react-native';

export default class ChattingScreen extends React.Component {
  static navigationOptions = {
    title: 'Chat',
    header: null,
  };

  render() {
    return (
      <View style = {styles1.contaier}>
        <View style = {styles1.container}>
            <Button
                title = "Chat"
                color = "#841584"
            />
        </View>
      </View>
      );
    }
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
