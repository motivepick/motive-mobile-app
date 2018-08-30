import React, { Component } from 'react'
import { Body, Button, Header, Left, Right, Text, Title } from 'native-base'
import { translate } from 'react-i18next'

class HeaderComponent extends Component {

    render() {
        const { title, onLeftButtonPress, onRightButtonPress, t } = this.props
        return (
            <Header>
                <Left>
                    <Button transparent onPress={onLeftButtonPress}>
                        <Text>{t('labels.back')}</Text>
                    </Button>
                </Left>
                <Body>
                    <Title>{title}</Title>
                </Body>
                <Right>
                    {!!onRightButtonPress &&
                    <Button transparent onPress={onRightButtonPress}>
                        <Text>{t('labels.save')}</Text>
                    </Button>}
                </Right>
            </Header>
        )
    }
}

export default translate('translations')(HeaderComponent)
