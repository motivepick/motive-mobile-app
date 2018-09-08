import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    editableDescription: {
        flex: 1,
        alignItems: 'stretch',
        paddingTop: 0
    },
    nonEditableDescription: {
        flex: 1,
        alignSelf: 'stretch',
        paddingTop: 7,
        paddingBottom: 9,
        lineHeight: 20,
        fontSize: 17
    }
})

export default styles
