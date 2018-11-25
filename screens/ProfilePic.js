import React from 'react';
import { List, ListItem, Avatar } from 'react-native-elements'
import { AsyncStorage, Dimensions, View, Image } from 'react-native'
import moment from 'moment'
import SendBird from 'sendbird';

import {
    Container, 
    Content,
    Header,
    Left,
    Right,
    Body,
    Title,
    Icon,
    Button,
  } from "native-base";
import Lightbox from 'react-native-lightbox';
import ModalSelector from 'react-native-modal-selector'
import {getImageFromLibrary, getImageFromCamera} from './ImageInterface';

const APIcall      = require("../API_calls/APIs");
var apiURL = APIcall.apiURL;
const imageUrl = apiURL + '/image/';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default class ProfilePic extends React.Component {
    
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            image: '',
            isModalVisible: false,
            imageWidth: width/4,
            displayWidth: width/2,
            refresh: false,
        }
    }

    componentDidMount() {
        this._getImage();
    }

    //need to make sure
    _getUser = async () => {
        return new Promise(async (resolve, reject) => {
            let userToken = await AsyncStorage.getItem("userToken");
            if (userToken != null) {
                var user = {
                    method: "GET",
                    headers: {
                        Authorization: userToken
                    }
                };
                await fetch(apiURL + "/user", user)
                .then(response => response.json())
                .then(response => {
                    resolve(response.user)
                });
            }
        }
    )}

    _getImage = () => {
        this._getUser().then((user) => {
            const imageIn = imageUrl + user.image;
            this.setState({image: imageIn});
        })
    }

    _updatePic = async(key) => {
        if(key === 0)
            await getImageFromCamera().then(async(image) => {
                const output = 'data:image/jpeg;base64,' + image;
                this.setState({image: output})
                const sb = SendBird.getInstance();
                await this._getUser().then(async (user) => {
                    const imageOut = imageUrl + user.image;
                    sb.updateCurrentUserInfo(user.firstName + " " + user.lastName, imageOut, function(response, error) {
                        if(error) {
                            console.log("ERror" + error)
                            return;
                        } 
                        console.log(response);   
                    });
                })
            })
            .catch((error) => {
                console.log(error);
            })
        else
            await getImageFromLibrary().then(async(image) => {
                const output = 'data:image/jpeg;base64,' + image;
                this.setState({image: output})
                const sb = SendBird.getInstance();
                await this._getUser().then(async (user) => {
                    const imageOut = imageUrl + user.image;
                    sb.updateCurrentUserInfo(user.firstName + " " + user.lastName, imageOut, function(response, error) {
                        if(error) {
                            console.log("ERror" + error)
                            return;
                        } 
                        console.log(response);   
                    });
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        const data = [
            { key: 0, label: 'Take a Picture..' },
            { key: 1, label: 'Choose From Library..' }
        ];
        return (
            <Container>
                <Content>
                <Header  iosBarStyle='light-content' androidStatusBarColor='#ffffff' style={styles.header}>
                <Left/>
                    <Body>
                        <Title style={styles.headerTitle}>Profile Pic</Title>
                    </Body>
                <Right />
                </Header>
                
                <View style={{padding: 20, justifyContent: 'center', alignItems: 'center'}} >
                <Lightbox
                    onOpen={() => {this.setState({imageWidth: 0, displayWidth: width})}}
                    willClose={() => {this.setState({imageWidth: width/4, displayWidth: width/2})}}
                    >
                    <Image
                    style={{ height: this.state.displayWidth, width: this.state.displayWidth, borderRadius: this.state.imageWidth,
                            borderWidth: 3, borderColor: '#2c2638'}}
                    source={{ uri: this.state.image }}
                    />
                </Lightbox>

                <View style={{padding: 20, justifyContent: 'center', alignItems: 'center'}}>
                <ModalSelector
                    backdropPressToClose={true}
                    data={data}
                    initValue="Update Picture"
                    onChange={(option)=>{this._updatePic(option.key)}} />
                </View>
                
                </View>
                </Content>
            </Container>
        )
    }
}

const styles = {
    header:{
        backgroundColor: '#2c2638',
        height: height*0.08
      },
      headerTitle: {
        paddingTop: height * 0.03,
        paddingBottom: 50,
        fontFamily: "BebasNeue",
        fontSize: 25,
        color: "#ffffff"
      },
      modalContent: {
        backgroundColor: "white",
        paddingHorizontal: 30,
        borderRadius: 20,
        borderColor: "rgba(0, 0, 0, 0.1)",
      },
};


