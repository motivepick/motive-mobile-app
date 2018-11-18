import React, { Component } from 'react'
import { Input, Text } from 'native-base'
import styles from './Description.styles'
import { iOSColors, iOSUIKit } from 'react-native-typography'
import { TouchableOpacity } from 'react-native'
import { translate } from 'react-i18next'

class Description extends Component {

    constructor(props) {
        super(props)
        const { value } = props
        this.state = { value }
    }

    render() {
        const { editable, onGoToEditDescriptionScreen, t } = this.props
        const { value } = this.state

        if (editable) {
            return (
                <Input onChangeText={value => this.setState({ value })} onSubmitEditing={this.onSubmitEditing} value={value} returnKeyType={'done'}
                    style={styles.editableDescription} placeholder={t('placeholders.description')} autoFocus multiline={true}/>
            )
        } else {
            return (
                <TouchableOpacity style={styles.goalNotes} onPress={onGoToEditDescriptionScreen}>
                    {value && <Text style={iOSUIKit.footnoteEmphasized}>{value}</Text>}
                    {!value && <Text style={[iOSUIKit.footnoteEmphasized, { color: iOSColors.gray }]}>{t('placeholders.description')}</Text>}
                </TouchableOpacity>
            )
        }
    }

    onSubmitEditing = () => {
        const { onSubmitEditing } = this.props
        const { value } = this.state
        onSubmitEditing(value)
    }
}

export default translate('translations')(Description)
