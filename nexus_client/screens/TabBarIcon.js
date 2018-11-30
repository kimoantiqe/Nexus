import React, {Component} from 'react';
import {Animated, Easing, TouchableHighlight, TouchableOpacity, View, Image} from "react-native";
import GradientButton from 'react-native-gradient-buttons';

const SIZE = 130;

class AddButton extends Component {

    render() {
       
        return (
            <View style={{
                position: 'absolute',
                alignItems: 'center'
            }}>
              

                <Animated.View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: SIZE/2,
                    height: SIZE/2,
                    borderRadius: SIZE / 4,
                    backgroundColor: 'transparent',
                }}>    
                 <GradientButton
                    onPress={() => onPress && onPress()}
                    gradientBegin="#874f00"
                    gradientEnd="#f5ba57"
                    gradientDirection="diagonal"
                    height={ SIZE / 2}
                    width={ SIZE /  2}
                    radius={SIZE /  4}
                    //violetPink
                    impact
                    impactStyle='Light'
                    style={{
                        position: 'absolute',
                        alignItems: 'center',
                        justifyContent: 'center',
                        
                    }}
                >
                   <Image

source={require("../images/qr.png")}
style = {{resizeMode:'contain',
flex:1,
width:50,
}}
/>
                </GradientButton>


                         <Image

                    source={require("../images/qr.png")}
                    style = {{resizeMode:'contain',
                    flex:1,
                    width:40,
                    }}
                    />
                   
                </Animated.View>
            </View>
        );
    }
}


export default AddButton;