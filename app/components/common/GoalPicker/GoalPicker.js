import React, { Component } from 'react'
import { Button, Icon, Picker, Text } from 'native-base'
import { iOSColors } from 'react-native-typography'
import { Dimensions, PixelRatio, Platform, StyleSheet, View } from 'react-native'
import { translate } from 'react-i18next'

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
        const { selectedValue, onValueChange, onClearValue, placeholder, goals, t } = this.props
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={styles.container}>
                    <Picker
                        supportedOrientations={['portrait', 'landscape', 'landscape-left', 'landscape-right']}
                        mode="dropdown"
                        iosIcon={<Icon name="ios-arrow-down-outline" style={StyleSheet.flatten(styles.iosIconStyle)}/>}
                        placeholder={placeholder}
                        placeholderStyle={styles.placeholderStyle}
                        style={[styles.picker, { width: selectedValue ? deviceWidth - 16 * 2 - 71.5 : deviceWidth - 16 * 2 }]}
                        selectedValue={selectedValue}
                        onValueChange={onValueChange}
                        headerStyle={styles.headerStyle}
                        headerBackButtonTextStyle={styles.headerBackButtonTextStyle}
                        textStyle={[styles.textStyle, { width: selectedValue ? deviceWidth - 16 * 2 - 30 - 30 / 4 - 10 - 10 - 71.5 : deviceWidth - 16 * 2 - 30 - 30 / 4 - 10 - 10 }]}
                        iosHeader={t('headings.pickGoal')}
                        headerBackButtonText={t('labels.back')}
                    >
                        {goals.map(item => <Picker.Item key={item.id} label={item.name} value={item.id} />)}
                    </Picker>
                </View>
                {selectedValue && <Button small transparent onPress={onClearValue}>
                    <Text>{'Clear'.toLocaleUpperCase()}</Text>
                </Button>}
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
        paddingHorizontal: 5,
        height: variables.inputHeightBase,
        paddingTop: 2
    },
    textStyle: {
        paddingLeft: 5,
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

export default translate('translations')(GoalPicker)
