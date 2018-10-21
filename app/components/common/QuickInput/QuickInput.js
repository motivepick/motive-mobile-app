import React, { Component } from 'react'
import { Form, Icon, Input, Item } from 'native-base'
import { iOSColors } from 'react-native-typography'

class QuickInput extends Component {

    render() {
        const { placeholder, value, onChangeText, onSubmitEditing } = this.props

        return (
            <Form style={{ marginHorizontal: 16, marginTop: 8 }}>
                <Item rounded style={{ backgroundColor: iOSColors.customGray }}>
                    <Icon active name='add' />
                    <Input
                        onChangeText={onChangeText}
                        value={value}
                        onSubmitEditing={onSubmitEditing}
                        returnKeyType={'done'}
                        placeholder={placeholder}/>
                </Item>
            </Form>
        )
    }
}


export default QuickInput
