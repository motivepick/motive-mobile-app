import React, { Component } from 'react'
import { Image, View } from 'react-native'

class EmptyStateTemplate extends Component {

    render() {
        const { imageUrl, content } = this.props

        return (
            <View style={{ paddingVertical: 20, marginTop: 50, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <Image
                    style={{ width: 50, height: 50, margin: 20 }}
                    source={{ uri: imageUrl }}
                />
                {content}
            </View>
        )
    }
}

export default EmptyStateTemplate
