import { Dimensions, Platform, StyleSheet } from 'react-native'

const window = Dimensions.get('window')

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',

        ...Platform.select({
            ios: {
                paddingTop: 20
            }
        })
    },
    title: {
        fontSize: 20,
        paddingBottom: 20,
        color: '#999999',
        textAlign: 'center'
    },
    list: {
        flex: 1
    },
    input: {
        borderBottomColor: '#3d3d3d',
        borderBottomWidth: 1,
        height: 50,
        fontSize: 14,
        padding: 16
    },
    contentContainer: {
        width: window.width,

        ...Platform.select({
            ios: {
                paddingHorizontal: 10
            },

            android: {
                paddingHorizontal: 0
            }
        })
    }
})

export default styles
