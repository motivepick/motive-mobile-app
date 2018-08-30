import { Platform, StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',

        ...Platform.select({
            ios: {
                paddingTop: 10
            }
        })
    },
    hiddenRow: {
        flexDirection: 'row',
        marginTop: 9
    }
})

export default styles