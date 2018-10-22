import React, { Component } from 'react'
import { Icon, Picker } from 'native-base'
import { iOSColors } from 'react-native-typography'
import { Dimensions, PixelRatio, Platform, StyleSheet, View } from 'react-native'

const mainTextColor = '#000'
const platform = Platform.OS
const deviceWidth = Dimensions.get('window').width
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
    inputHeightBase: 30,
    get inputColor() {
        return this.textColor
    },
    get inputColorPlaceholder() {
        return '#575757'
    },
    borderWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1)
}

class GoalPicker extends Component {

    render() {
        const { selectedValue, onValueChange, placeholder, data } = this.props

        return (
            <View style={styles.container}>
                <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="ios-arrow-down-outline" style={StyleSheet.flatten(styles.iosIconStyle)}/>}
                    placeholder={placeholder}
                    placeholderStyle={styles.placeholderStyle}
                    style={styles.picker}
                    selectedValue={selectedValue}
                    onValueChange={onValueChange}
                    headerStyle={styles.headerStyle}
                    headerBackButtonTextStyle={styles.headerBackButtonTextStyle}
                    textStyle={styles.textStyle}
                >
                    {data.map(item => <Picker.Item key={item.id} label={item.name} value={item.id} />)}
                </Picker>
            </View>
        )
    }
}

export const styles = StyleSheet.create({
    container: {
        backgroundColor: iOSColors.customGray,
        borderWidth: variables.borderWidth * 2,
        borderTopWidth: variables.borderWidth * 4,
        borderRadius: 10,
        borderColor: variables.inputBorderColor
    },
    picker: {
        width: deviceWidth - 16 * 2,
        paddingHorizontal: 5,
        height: variables.inputHeightBase,
        alignItems: 'center',
        alignSelf: 'center',
        paddingTop: 2
    },
    textStyle: {
        paddingLeft: 5,
        width: deviceWidth - 16 * 2 - 30 - 30 / 4 - 10 - 10,
        fontSize: variables.inputFontSize
    },
    headerStyle: { backgroundColor: 'transparent' },
    headerBackButtonTextStyle: { color: iOSColors.pink },
    placeholderStyle: { color: variables.inputColorPlaceholder },
    iosIconStyle: {
        height: 30,
        width: 30,
        paddingLeft: 30 / 4,
        fontSize: 20,
        marginRight: 0
    }
})

export default GoalPicker
