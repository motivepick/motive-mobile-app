import { StyleSheet } from 'react-native'
import * as colors from '../../../screens/COLORS'

export const styles = StyleSheet.create({
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginLeft: 5,
        borderWidth: 2,
        marginRight: 20
    },
    completeCircle: {
        borderColor: '#bbb'
    },
    incompleteCircle: {
        borderColor: colors.accent1Clr
        // borderColor: '#3d3d3d'
    }
})

export default styles
