import React, { Component } from 'react'
import { View } from 'react-native'
import styles from './ColorIndicator.styles'

export class ColorIndicator extends Component {

    render() {
        const { color } = this.props

        return (
            <View style={[styles.colorTagCircle, color ? { backgroundColor: color } : {}]}/>
        )
    }
}

export default ColorIndicator
