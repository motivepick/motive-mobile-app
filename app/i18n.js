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
                labels: {
                    statistics: 'You can do it! {{percent}}% done',
                    all: 'All',
                    today: 'Today',
                    thisWeek: 'This Week',
                    newGoal: 'New Goal',
                    goal: 'Goal',
                    task: 'Task',
                    description: 'Description'
                },
                placeholders: {
                    taskName: 'What needs to be done?',
                    firstTaskName: 'How about a fresh hot task?',
                    goalName: 'What is your goal?'
                }
            }
        },
        ru: {
            translations: {
                labels: {
                    statistics: 'Соберись! {{percent}}% готово',
                    all: 'Все',
                    today: 'Сегодня',
                    thisWeek: 'На неделе',
                    newGoal: 'Новая цель',
                    goal: 'Цель',
                    task: 'Задача',
                    description: 'Описание'
                },
                placeholders: {
                    taskName: 'О чём нужно не забыть?',
                    firstTaskName: 'Как насчёт первой мега-задачи?',
                    goalName: 'На что вы нацелились?'
                }
            }
        },
        zh: {
            translations: {
                labels: {
                    statistics: 'You can do it! {{percent}}% done',
                    all: 'All',
                    today: 'Today',
                    thisWeek: 'This Week',
                    newGoal: 'New Goal',
                    goal: 'Goal',
                    task: 'Task',
                    description: 'Description'
                },
                placeholders: {
                    taskName: 'What needs to be done?',
                    firstTaskName: 'How about a fresh hot task?',
                    goalName: 'What is your goal?'
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
