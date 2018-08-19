import { Dimensions, Platform, StyleSheet } from 'react-native'

const window = Dimensions.get('window')

export const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    list: {
        height: 110,
        width: window.width
    },
    contentContainer: {
        ...Platform.select({
            ios: {
                paddingVertical: 30
            },
            android: {
                paddingVertical: 0
            }
        })
    }
})

export default styles