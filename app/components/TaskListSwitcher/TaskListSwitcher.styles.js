import { Dimensions, Platform, StyleSheet } from 'react-native'

const window = Dimensions.get('window')

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',

        ...Platform.select({
            ios: {
                paddingTop: 20
            }
        })
    },
    title: {
        fontSize: 20,
        paddingVertical: 20,
        color: '#999999'
    },
    list: {
        height: 210,
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