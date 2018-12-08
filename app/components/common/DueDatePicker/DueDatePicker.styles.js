import { PixelRatio, Platform, StyleSheet } from 'react-native'
import { iOSColors } from 'react-native-typography'
import { ios } from '../../../utils/platform'

const mainTextColor = '#000'
const platform = Platform.OS

const variables = {
    // Icon
    textColor: mainTextColor,
    iconFamily: 'Ionicons',
    iconFontSize: platform === 'ios' ? 30 : 28,
    iconHeaderSize: platform === 'ios' ? 33 : 24,
    inputFontSize: 17,
    inputBorderColor: iOSColors.customGray,
    inputSuccessBorderColor: '#2b8339',
    inputErrorBorderColor: '#ed2f2f',
    inputHeightBase: ios() ? 30 : 40,
    get inputColor() {
        return this.textColor
    },
    get inputColorPlaceholder() {
        return '#575757'
    },
    borderWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
    borderColor: 'transparent'
}


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 5,
        borderWidth: variables.borderWidth * 2,
        borderRadius: 10,
        borderColor: variables.inputBorderColor,
        backgroundColor: iOSColors.customGray
    },
    dateInput: {
        flex: 1,
        borderWidth: 0,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 5,
        paddingRight: 5
    },
    dateTouchBody: {
        flex: 1,
        flexDirection: 'row-reverse',
        height: variables.inputHeightBase
    },
    datePickerContainer: {
        flex: 1,
        height: variables.inputHeightBase,
        justifyContent: 'center'
    },
    dateText: {
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: variables.inputFontSize,
        color: variables.inputColor
    },
    placeholderText: {
        fontSize: variables.inputFontSize,
        color: variables.inputColorPlaceholder,
        paddingLeft: 5,
        paddingRight: 5
    },
    btnTextConfirm: {
        color: iOSColors.pink
    }
})

export default styles
