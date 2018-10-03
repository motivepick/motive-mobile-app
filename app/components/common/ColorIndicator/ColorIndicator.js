import React from 'react'
import { View } from 'react-native'
import styles from './ColorIndicator.styles'

export const palette = {
    red: '#C25B56',
    orange: '#FFAE5D',
    blue: '#96C0CE',
    deepBlue: '#336699',
    purple: '#6F3662',
    // grey: 'grey'
}

export const ColorIndicator = (props) => {
    const { color, styler } = props
    return color && palette[color] ? <View style={[styles.colorTagCircle, color && palette[color] ? { backgroundColor: palette[color] || 'grey' } : { backgroundColor: 'grey' }, styler]}/> : null
}

export default ColorIndicator
