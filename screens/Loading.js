import React, { Component } from "react";
import { Container, Spinner, Content } from 'native-base';

import Background from '../components/Background';

export default class Loading extends React.Component {
    static navigationOptions = {
        header: null
    };

    render() {
        return(

            <Container>
                <Content>
                    <Background logo={true} />
                    <Spinner color = '#c75e9a' />
                </Content>
            </Container>

        );
    }
}