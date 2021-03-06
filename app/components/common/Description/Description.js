import React, { PureComponent } from 'react'
import { Input, Text } from 'native-base'
import styles from './Description.styles'
import { iOSColors, iOSUIKit } from 'react-native-typography'
import { TouchableOpacity } from 'react-native'
import { translate } from 'react-i18next'
import type { T } from '../../../types/Types'

type DescriptionProps = {|
    value: string,
    editable: boolean,
    onChangeText: string => void,
    onGoToEditDescriptionScreen: () => void,
    t: T
|}

class Description extends PureComponent<DescriptionProps> {

    render() {
        const { value, editable, onChangeText, onGoToEditDescriptionScreen, t } = this.props

        if (editable) {
            return (
                <Input onChangeText={value => onChangeText(value)} value={value} style={styles.editableDescription}
                    placeholder={t('placeholders.description')} multiline={true} textAlignVertical="top"/>
            )
        } else {
            const hasText = Boolean(value)
            return (
                <TouchableOpacity style={styles.notes} onPress={onGoToEditDescriptionScreen}>
                    {hasText && <Text style={iOSUIKit.footnoteEmphasized}>{value}</Text>}
                    {!hasText && <Text style={[iOSUIKit.footnoteEmphasized, { color: iOSColors.gray }]}>{t('placeholders.description')}</Text>}
                </TouchableOpacity>
            )
        }
    }
}

export default translate('translations')(Description)
