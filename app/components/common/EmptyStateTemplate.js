import React, { PureComponent } from 'react'
import { Dimensions, Image, View } from 'react-native'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

class EmptyStateTemplate extends PureComponent {

    render() {
        const { imageUrl, imagePath, content } = this.props

        return (
            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {
                    Boolean(imagePath) &&  <Image
                        style={{ width: windowWidth * 0.2, height: windowHeight * 0.2, resizeMode: 'contain', marginBottom: 20 }}
                        source={imagePath}
                    />
                }
                {
                    !imagePath && <Image
                        style={{ width: '35%', aspectRatio: 1.5, resizeMode: 'contain', marginBottom: 20 }}
                        source={{ uri: imageUrl }}
                    />
                }
                {content}
            </View>
        )
    }
}

export default EmptyStateTemplate
