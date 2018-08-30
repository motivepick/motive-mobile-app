import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import styles from './CheckBox.styles'

const CheckBox = (props) => {
    const { isCompleted, onAction } = props

    return (
        <TouchableOpacity onPress={onAction}>
            <View style={[styles.circle, isCompleted ? styles.completeCircle : styles.incompleteCircle]}/>
        </TouchableOpacity>
    )
}

export default CheckBox
