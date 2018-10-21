import React, { Component } from 'react'
import { Body, Button, Header, Left, Right, Text, Title } from 'native-base'

class HeaderComponent extends Component {

    render() {
        const { title, rightButtonLabel, leftButtonLabel, onLeftButtonPress, onRightButtonPress } = this.props
        return (
            <Header transparent>
                <Left>
                    {
                        leftButtonLabel && onLeftButtonPress &&
                        <Button transparent onPress={onLeftButtonPress}>
                            <Text>{leftButtonLabel}</Text>
                        </Button>
                    }
                </Left>

                {
                    title &&
                    <Body>
                        <Title>{title}</Title>
                    </Body>
                }
                <Right>
                    {
                        rightButtonLabel && onRightButtonPress &&
                        <Button transparent onPress={onRightButtonPress}>
                            <Text>{rightButtonLabel}</Text>
                        </Button>
                    }
                </Right>
            </Header>
        )
    }
}

export default HeaderComponent
