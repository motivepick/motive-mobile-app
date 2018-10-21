import React, { Component } from 'react'
import { Body, Button, Header, Left, Right, Text, Title } from 'native-base'
import { iOSColors } from 'react-native-typography'

// If AnimatedHeader is used add onScroll event to ScrollView (a.k.a <Content> from NativeBase)
class AnimatedHeaderComponent extends Component {

    render() {
        const { title, rightButtonLabel, leftButtonLabel, onLeftButtonPress, onRightButtonPress } = this.props
        return (
            <Header transparent>
                <Left>
                    {
                        leftButtonLabel && onLeftButtonPress &&
                            <Button transparent onPress={onLeftButtonPress}>
                                <Text style={{ color: iOSColors.pink }}>{leftButtonLabel}</Text>
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
                                <Text style={{ color: iOSColors.pink }}>{rightButtonLabel}</Text>
                            </Button>
                    }
                </Right>
            </Header>
        )
    }
}

export default AnimatedHeaderComponent
