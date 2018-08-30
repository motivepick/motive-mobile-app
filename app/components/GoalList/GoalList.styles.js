import { Dimensions, Platform, StyleSheet } from 'react-native'

const window = Dimensions.get('window')

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        ...Platform.select({
            ios: {
                paddingTop: 20
            }
        })
    },
    list: {
        flex: 1
    },
    contentContainer: {
        width: window.width
    }
})

export default styles