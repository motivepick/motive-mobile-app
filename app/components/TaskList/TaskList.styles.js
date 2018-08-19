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
        height: 50, borderColor: '#fff', borderWidth: 1, fontSize: 12, fontWeight: 'bold', padding: 16, backgroundColor: '#fff', shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: { height: 2, width: 2 },
        shadowRadius: 2
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
