import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class CheckAuth extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    if (userToken != null) {

    var settings = {
  method: 'GET',
  headers: {
    'Authorization': userToken
  }
  };

  var apiURL = 'https://nexus-restapi.azurewebsites.net/api';

fetch(apiURL + '/user/login', settings)
.then(response => 
  {
    if (response != 'Unauthorized') 
    {
      response.json();
      this.props.navigation.navigate('Main');
    } else
    {
      this.props.navigation.navigate('Auth');
    }
  }
  )
.catch(error => console.error('Error:', error));
} else 
{
  this.props.navigation.navigate('Auth');
}
    
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
