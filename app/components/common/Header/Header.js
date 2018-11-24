import React, { Component } from 'react'
import { Body, Button, Header, Icon, Left, Right, Text, Title } from 'native-base'
import { ios } from '../../../utils/platform'

class HeaderComponent extends Component {

    render() {
        const { title, rightButtonLabel, leftButtonLabel, onLeftButtonPress, onRightButtonPress } = this.props
        return (
            <Header transparent={ios()}>
                <Left>
                    {
                        Boolean(onLeftButtonPress) &&
                        <Button transparent onPress={onLeftButtonPress}>
                            {leftButtonLabel && ios() ? <Text>{leftButtonLabel}</Text> : <Icon name='arrow-back'/>}
                        </Button>
                    }
                </Left>
                {
                    Boolean(title) &&
                    <Body>
                        <Title>{title}</Title>
                    </Body>
                }
                <Right>
                    {
                        Boolean(rightButtonLabel && onRightButtonPress) &&
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
