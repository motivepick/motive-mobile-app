import React, { Component } from 'react'
import { Button, Form, Icon, Input, Item, Text } from 'native-base'
import { iOSColors } from 'react-native-typography'
import { View } from 'react-native'
import { translate } from 'react-i18next'

// animate clear button
class QuickInput extends Component {

    render() {
        const { placeholder, value, onChangeText, onSubmitEditing, onClearValue, t } = this.props

        return (
            <View style={{ flexDirection: 'row', marginHorizontal: 16, marginTop: 8 }}>
                <Form style={{ flex: 1 }}>
                    <Item rounded style={{ backgroundColor: iOSColors.customGray }}>
                        <Icon active name='add'/>
                        <Input
                            onChangeText={onChangeText}
                            value={value}
                            onSubmitEditing={onSubmitEditing}
                            returnKeyType={'done'}
                            placeholder={placeholder}/>
                    </Item>
                </Form>
                {Boolean(value) && <Button small transparent onPress={onClearValue}>
                    <Text>{t('labels.clear').toLocaleUpperCase()}</Text>
                </Button>}
            </View>
        )
    }
}

export default translate('translations')(QuickInput)
