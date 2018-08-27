import React, { Component } from 'react'
import { Body, Button, Header, Left, Right, Text, Title } from 'native-base'
import { translate } from 'react-i18next'

class CustomHeader extends Component {

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
                    <Button transparent onPress={onRightButtonPress}>
                        <Text>{t('labels.save')}</Text>
                    </Button>
                </Right>
            </Header>
        )
    }
}

export default translate('translations')(CustomHeader)
