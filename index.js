// @flow
import { AppRegistry, YellowBox } from 'react-native'
import App from './app/App'
import * as moment from 'moment'
import 'moment/locale/ru'
import 'moment/locale/zh-tw'
import { locale } from './app/utils/locale'

const setUpLocale = () => {
    moment.updateLocale('en', {
        calendar: {
            sameDay: '[Today]',
            nextDay: '[Tomorrow]',
            nextWeek: 'dddd',
            lastDay: '[Yesterday]',
            lastWeek: 'DD.MM.YYYY',
            sameElse: 'DD.MM.YYYY'
        }
    })

    moment.updateLocale('ru', {
        calendar: {
            sameDay: '[сегодня]',
            nextDay: '[завтра]',
            nextWeek: 'dddd',
            lastDay: '[вчера]',
            lastWeek: 'DD.MM.YYYY',
            sameElse: 'DD.MM.YYYY'
        }
    })

    moment.updateLocale('zh-tw', {
        calendar: {
            sameDay: '[今天]',
            nextDay: '[明天]',
            nextWeek: 'dddd',
            lastDay: '[昨天]',
            lastWeek: 'DD.MM.YYYY',
            sameElse: 'DD.MM.YYYY'
        }
    })

    moment.locale(locale())
}

setUpLocale()
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'])
AppRegistry.registerComponent('MotiveMobileApp', () => App)
