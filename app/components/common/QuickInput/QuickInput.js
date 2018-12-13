import React, { PureComponent } from 'react'
import { Button, Form, Icon, Item } from 'native-base'
import { View } from 'react-native'
import { UniversalInput } from '../UniversalInput'

// animate clear button
class QuickInput extends PureComponent {

    state = { value: '' }

    render() {
        const { placeholder } = this.props
        const { value } = this.state

        return (
            <View style={{ flexDirection: 'row', marginHorizontal: 16, marginTop: 8 }}>
                <Form style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Item rounded>
                        <UniversalInput value={value} returnKeyType='done' onChangeText={value => this.setState({ value })}
                            onSubmitEditing={this.onSubmitEditing} placeholder={placeholder}/>
                        {Boolean(value) && <Button transparent rounded danger onPress={this.clearValue} style={{ alignSelf: 'center' }}>
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
