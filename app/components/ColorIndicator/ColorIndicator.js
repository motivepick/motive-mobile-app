import React from 'react'
import { View } from 'react-native'
import styles from './ColorIndicator.styles'

export const ColorIndicator = (props) => {
    const { color, styler } = props
    return <View style={[styles.colorTagCircle, color ? { backgroundColor: color } : {}, styler]}/>
}

export default ColorIndicator
