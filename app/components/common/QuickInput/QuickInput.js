import React, { PureComponent } from 'react'
import { Button, Form, Icon, Input, Item, Text } from 'native-base'
import { iOSColors } from 'react-native-typography'
import { View } from 'react-native'
import { translate } from 'react-i18next'

// animate clear button
class QuickInput extends PureComponent {

    state = { value: '' }

    render() {
        const { placeholder, t } = this.props
        const { value } = this.state

        return (
            <View style={{ flexDirection: 'row', marginHorizontal: 16, marginTop: 8 }}>
                <Form style={{ flex: 1 }}>
                    <Item rounded style={{ backgroundColor: iOSColors.customGray }}>
                        <Icon active name='add'/>
                        <Input
                            onChangeText={value => this.setState({ value })}
                            value={value}
                            onSubmitEditing={this.onSubmitEditing}
                            returnKeyType={'done'}
                            placeholder={placeholder}/>
                    </Item>
                </Form>
                {Boolean(value) && <Button small transparent onPress={this.clearValue}>
                    <Text>{t('labels.clear').toLocaleUpperCase()}</Text>
                </Button>}
            </View>
        )
    }

    clearValue = () => {
        this.setState({ value: '' })
    }

    onSubmitEditing = () => {
        const { onSubmitEditing } = this.props
        const { value } = this.state
        if (value !== '') {
            onSubmitEditing(value.trim())
            this.clearValue()
        }
    }
}

export default translate('translations')(QuickInput)
