import React, { Component } from 'react'
import { Input, Text } from 'native-base'
import styles from './Description.styles'
import { iOSColors, iOSUIKit } from 'react-native-typography'
import { TouchableOpacity } from 'react-native'
import { translate } from 'react-i18next'

class Description extends Component {

    render() {
        const { value, onChangeText, onSubmitEditing, isEditable, onGoToEditDescriptionScreen, t } = this.props

        if (!isEditable) {
            return <TouchableOpacity style={styles.goalNotes} onPress={onGoToEditDescriptionScreen}>
                {value && <Text style={iOSUIKit.footnoteEmphasized}>{value}</Text>}
                {!value && <Text style={[iOSUIKit.footnoteEmphasized, { color: iOSColors.gray }]}>{t('placeholders.description')}</Text>}
            </TouchableOpacity>
        }

        return <Input onChangeText={onChangeText} onSubmitEditing={onSubmitEditing} value={value} returnKeyType={'done'} style={styles.editableDescription}
                      placeholder={t('placeholders.description')}
                      autoFocus
                      multiline={true}/>
    }
}

export default translate('translations')(Description)