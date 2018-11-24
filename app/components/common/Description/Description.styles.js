import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
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
    },
    goalNotes: {
        marginTop: 4,
        padding: 12,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#f3ece6',
        borderRadius: 6,
        alignSelf: 'stretch'
    }
})

export default styles
