import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Dimensions
} from 'react-native';

import { connect } from 'react-redux';
import { NavigationActions, StackActions } from 'react-navigation';
import { sendbirdLogout, initMenu } from '../actions';

import MainTabNavigator from '../navigation/MainTabNavigator';
import AppNavigator from '../navigation/AppNavigator';
import { Container, Content, Button, Text, Form } from 'native-base';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
        <Container>
        <Content scrollEnabled={false} contentContainerStyle={styles.ButtonGroup}>
        <Form style={styles.Button}>
          <Button bordered rounded onPress = {this.signOut}>
            <Text>Signout</Text>
          </Button>
          </Form>
          </Content>
          </Container>
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
    ButtonGroup:   { 
                        flex: 1, 
                        flexDirection: 'column', 
                        justifyContent: 'flex-end', 
                        alignItems: 'center'
                    },
    Button:        {
                        padding: width*0.03
                    }
                                });

function mapStateToProps({ settings }) {
    const { isDisconnected } = settings;
    return { isDisconnected };
};

export default connect(mapStateToProps, { sendbirdLogout, initMenu })(SettingsScreen);
