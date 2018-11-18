import React from 'react';
import { Image,Dimensions,StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

const { width } = Dimensions.get('window')
const qrSize = width * 0.7

export default class qrCamera extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    hasCameraPermission: null,
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
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
          onPress={() => this.props.navigation.pop()}
          style={styles.cancel}>
          Cancel
        </Text>
      </BarCodeScanner>
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
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
});
