import i18n from 'i18next'
import { locale } from './utils/locale'

const languageDetector = {
    type: 'languageDetector',
    detect: () => locale().replace('_', '-'),
    init: Function.prototype,
    cacheUserLanguage: Function.prototype
}

i18n.use(languageDetector).init({
    resources: {
        en: {
            translations: {
                placeholders: {
                    newTaskName: 'What needs to be done?',
                    newFirstTaskName: 'How about a fresh hot task?'
                }
            }
        },
        ru: {
            translations: {
                placeholders: {
                    newTaskName: 'О чём нужно не забыть?',
                    newFirstTaskName: 'Как насчёт первой мега-задачи?'
                }
            }
        },
        zh: {
            translations: {
                placeholders: {
                    newTaskName: 'What needs to be done?',
                    newFirstTaskName: 'How about a fresh hot task?'
                }
            }
        }
    },
    fallbackLng: 'en',
    debug: true,

    ns: ['translations'],
    defaultNS: 'translations',

    interpolation: {
        escapeValue: false
    },

    react: {
        wait: true
    }
})

export default i18n
