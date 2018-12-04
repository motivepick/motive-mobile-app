import React, { PureComponent } from 'react'
import { Button, Form, Icon, Input, Item } from 'native-base'
import { iOSColors } from 'react-native-typography'
import { View } from 'react-native'

// animate clear button
class QuickInput extends PureComponent {

    state = { value: '' }

    render() {
        const { placeholder } = this.props
        const { value } = this.state

        return (
            <View style={{ flexDirection: 'row', marginHorizontal: 16, marginTop: 8 }}>
                <Form style={{ flex: 1 }}>
                    <Item rounded style={{ backgroundColor: iOSColors.customGray }}>
                        <Input
                            onChangeText={value => this.setState({ value })}
                            value={value}
                            onSubmitEditing={this.onSubmitEditing}
                            returnKeyType={'done'}
                            placeholder={placeholder}/>
                        {Boolean(value) && <Button transparent squared danger onPress={this.clearValue}>
                            <Icon type='MaterialCommunityIcons' name='close-circle-outline'/>
                        </Button>}
                    </Item>
                </Form>
            </View>
        )
    }

    clearValue = () => {
        this.setState({ value: '' })
    }

    onSubmitEditing = () => {
        const { onSubmitEditing } = this.props
        const { value } = this.state
        const trimmed = value.trim()
        if (trimmed !== '') {
            onSubmitEditing(trimmed)
        }
        this.clearValue()
    }
}

export default QuickInput
