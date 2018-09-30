import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import styles from './CheckBox.styles'

const CheckBox = (props) => {
    const { checked, onAction, style } = props

    return (
        <TouchableOpacity onPress={onAction}>
            <View
                style={[styles.circle, style, checked ? styles.completeCircle : styles.incompleteCircle ]}/>
        </TouchableOpacity>
    )
}

export default CheckBox
