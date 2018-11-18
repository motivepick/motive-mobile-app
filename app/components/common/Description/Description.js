import React, { Component } from 'react'
import { Input, Text } from 'native-base'
import styles from './Description.styles'
import { iOSColors, iOSUIKit } from 'react-native-typography'
import { TouchableOpacity } from 'react-native'
import { translate } from 'react-i18next'

class Description extends Component {

    render() {
        const { value, editable, onChangeText, onGoToEditDescriptionScreen, t } = this.props

        if (editable) {
            return (
                <Input onChangeText={value => onChangeText(value)} value={value} returnKeyType={'done'}
                    style={styles.editableDescription} placeholder={t('placeholders.description')} autoFocus multiline={true}/>
            )
        } else {
            const hasText = Boolean(value)
            return (
                <TouchableOpacity style={styles.goalNotes} onPress={onGoToEditDescriptionScreen}>
                    {hasText && <Text style={iOSUIKit.footnoteEmphasized}>{value}</Text>}
                    {!hasText && <Text style={[iOSUIKit.footnoteEmphasized, { color: iOSColors.gray }]}>{t('placeholders.description')}</Text>}
                </TouchableOpacity>
            )
        }
    }
}

export default translate('translations')(Description)
