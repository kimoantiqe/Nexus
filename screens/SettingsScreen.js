import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Image,
   KeyboardAvoidingView, Alert, TextInput,
} from 'react-native';

import { connect } from 'react-redux';
import { NavigationActions, StackActions } from 'react-navigation';
import { sendbirdLogout, initMenu } from '../actions';

import MainTabNavigator from '../navigation/MainTabNavigator';
import AppNavigator from '../navigation/AppNavigator';

class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style = {styles1.contaier}>
        <View style = {styles1.container}>
            <Button
                title = "Signout"
                color = "#841584"
                onPress = {this.signOut}
            />
        </View>
      </View>
      );
    }
  
    signOut = async () => {
    await AsyncStorage.clear();
    
    //logout of sendbird.
    this.props.sendbirdLogout();

    this.props.navigation.navigate('Auth');

  };
}

const styles = StyleSheet.create({
    containter: {
        padding: 30,
    },
    input: {
        height: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginBottom: 17,
        color: '#FFF',
        paddingHorizontal: 10,
        fontSize: 20
    }
});

const loginAlert = () => {
    Alert.alert(
        'Logged In',
        'Thanks',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: true }
    );};

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

function mapStateToProps({ settings }) {
    const { isDisconnected } = settings;
    return { isDisconnected };
};

export default connect(mapStateToProps, { sendbirdLogout, initMenu })(SettingsScreen);