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

  try {
    let response = await fetch(apiURL + '/user', settings)
    .then( response => 
      {
        this.setState({ response });
        if (response.status === 401)
        {
          this.props.navigation.navigate('Auth');
        } else
        {
          response.json()
          .then(response => console.log(response));
          this.props.navigation.navigate('Main');
        }
      }
      )
  } catch (error) {
    console.error(error);
  }

// fetch(apiURL + '/user', settings)
// .then( response =>
//   {
//     this.setState({ response });
//     if (response === "Unauthorized")
//     {
//       this.props.navigation.navigate('Auth');
//     } else
//     {
//       response.json()
//       .then(response => console.log(response));
//       this.props.navigation.navigate('Main');
//     }
//   }
//   )
// .catch(error => console.error('Error:', error));
}
 else 
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
