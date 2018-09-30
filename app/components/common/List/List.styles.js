import { Dimensions, StyleSheet } from 'react-native'
import * as colors from '../../../screens/COLORS'

const window = Dimensions.get('window')

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    list: {
        flex: 1,
        backgroundColor: colors.backgroundClr
    },
    contentContainer: {
        width: window.width
    }
})

export default styles