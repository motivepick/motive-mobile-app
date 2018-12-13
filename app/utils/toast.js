import { Toast } from 'native-base'
import i18next from 'i18next'

export const toast = () => {
    Toast.show({
        text: i18next.t('labels.error'),
        type: 'danger',
        duration: 2000
    })
}
