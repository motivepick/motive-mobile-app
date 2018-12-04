import React, { PureComponent } from 'react'
import { Body, Button, Header, Icon, Left, Right, Text, Title } from 'native-base'
import { ios } from '../../../utils/platform'

class HeaderComponent extends PureComponent {

    render() {
        const { title, rightButtonLabel, leftButtonLabel, onLeftButtonPress, onRightButtonPress, rightButtonIcon, leftButtonIcon } = this.props
        return (
            <Header transparent={ios()}>
                <Left>
                    {
                        Boolean(onLeftButtonPress) &&
                        <Button transparent onPress={onLeftButtonPress}>
                            {leftButtonLabel && ios() ? <Text>{leftButtonLabel}</Text> : <Icon name='arrow-back'/>}
                            {leftButtonIcon && ios() && leftButtonIcon}
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
                        Boolean((rightButtonLabel || rightButtonIcon) && onRightButtonPress) &&
                        <Button transparent onPress={onRightButtonPress}>
                            {Boolean(rightButtonLabel) && <Text>{rightButtonLabel}</Text>}
                            {Boolean(rightButtonIcon) && rightButtonIcon}
                        </Button>
                    }
                </Right>
            </Header>
        )
    }
}

export default HeaderComponent
