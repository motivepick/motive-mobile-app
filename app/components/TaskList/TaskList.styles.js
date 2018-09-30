import { Platform, StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // marginTop: 15,
        alignItems: 'stretch',
        ...Platform.select({
            ios: {
                // paddingTop: 10
            }
        })
    },
    title: {
        fontSize: 20,
        paddingBottom: 20,
        color: '#999999',
        textAlign: 'center'
    },
    input: {
        borderBottomColor: '#3d3d3d',
        borderBottomWidth: 1,
        height: 50,
        fontSize: 14,
        padding: 16
    },
    hiddenRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        alignContent: 'stretch'
        // marginTop: 9
    }
})

export default styles
