import React, { Component } from 'react'
import { Image, View } from 'react-native'

class EmptyStateTemplate extends Component {

    render() {
        const { imageUrl, content } = this.props

        return (
            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    style={{ width: '35%', aspectRatio: 1.5, resizeMode: 'contain', marginBottom: 20 }}
                    source={{ uri: imageUrl }}
                />
                {content}
            </View>
        )
    }
}

export default EmptyStateTemplate
