import React, { Component } from 'react'
import { Icon, Picker } from 'native-base'
import { iOSColors } from 'react-native-typography'
import { translate } from 'react-i18next'

class SortPicker extends Component {

    render() {
        const { selectedValue, onValueChange, t } = this.props

        return (
            <Picker
                mode='dropdown'
                iosIcon={<Icon active name='ios-arrow-down' style={{
                    marginLeft: -10,
                    fontSize: 15,
                    color: iOSColors.pink
                }}/>}
                placeholder={t('placeholders.sortBy')}
                placeholderStyle={{ color: '#bfc6ea' }}
                placeholderIconColor='#007aff'
                style={{ marginLeft: -15, width: undefined }}
                selectedValue={selectedValue}
                onValueChange={onValueChange}
                headerStyle={{ backgroundColor: iOSColors.white }}
                headerBackButtonTextStyle={{ color: iOSColors.pink }}
                textStyle={{ color: iOSColors.pink }}
                iosHeader={t('placeholders.sortBy')}
                headerBackButtonText={t('labels.back')}
            >
                <Picker.Item label={t('labels.sortByRecent')} value='Recent' />
                <Picker.Item label={t('labels.sortByOverdue')} value='Overdue' />
                <Picker.Item label={t('labels.sortByTasks')} value='Tasks' />
                <Picker.Item label={t('labels.sortByColor')} value='Color' />
            </Picker>
        )
    }
}

export default translate('translations')(SortPicker)
