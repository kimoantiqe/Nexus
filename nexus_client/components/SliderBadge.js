import React, { Component } from 'react';
import { Dimensions, Slider } from 'react-native';
import {Badge, Text, Item, Button, Form} from 'native-base'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class SliderBadge extends React.Component {

    render() {
      const {flag} = this.props;
        return(
          <Form style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
  <Item style={{borderBottomColor: 'transparent', paddingBottom: height*0.015}}>
          <Badge style={{   backgroundColor: flag? '#f5ba57' : 'transparent',
                            minHeight: height*0.055,
                            borderWidth: width*0.0015, 
                            borderColor: flag? '#f5ba57' : 'white' ,
                            borderRadius: 30,
                            }}>
          <Button transparent light onPress={this.props.toCall}>
            <Text style={{color: '#f2f2f2', fontSize: 25, fontWeight: '400'}}>{this.props.displayName}</Text>
            </Button>
          </Badge>
          </Item>
          </Form>
        )
                        };
                    }