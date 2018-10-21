import React, { Component } from 'react'
import { Text } from 'native-base'
import { iOSColors, iOSUIKit } from 'react-native-typography'
import { View } from 'react-native'

class FormLabel extends Component {

    render() {
        const { labelText } = this.props

        return (
            <View style={{ marginBottom: 4 }}>
                <Text style={[iOSUIKit.footnoteEmphasized, { color: iOSColors.gray }]}>{labelText}</Text>
            </View>
        )
    }
}


export default FormLabel
