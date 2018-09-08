import React, { Component } from 'react'
import { Input, Text } from 'native-base'
import styles from './Description.styles'

class Description extends Component {

    render() {
        const { value, onChangeText, onSubmitEditing, isEditable } = this.props

        if (!isEditable) {
            return <Text numberOfLines={5} style={styles.nonEditableDescription}>{value}</Text>
        }

        return <Input onChangeText={onChangeText} onSubmitEditing={onSubmitEditing} value={value} returnKeyType={'done'} style={styles.editableDescription}
            multiline={true}/>
    }
}


export default Description
