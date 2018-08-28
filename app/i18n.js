import i18n from 'i18next'
import { locale } from './utils/locale'
import React from 'react'

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
                    description: 'Description',
                    set: 'Set',
                    cancel: 'Cancel',
                    back: 'Back',
                    save: 'Save',
                    newTask: 'New Task',
                    editTask: 'Task',
                    showClosedTasks: 'Show Closed Tasks',
                    hideClosedTasks: 'Hide Closed Tasks'
                },
                placeholders: {
                    taskName: 'What needs to be done?',
                    firstTaskName: 'How about a fresh hot task?',
                    goalName: 'What is your goal?',
                    whenIsItDue: 'When is it due?'
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
                    description: 'Описание',
                    set: 'Сохранить',
                    cancel: 'Отменить',
                    back: 'Назад',
                    save: 'Сохранить',
                    newTask: 'Новая задача',
                    editTask: 'Задача',
                    showClosedTasks: 'Показать завершённые задачи',
                    hideClosedTasks: 'Скрыть завершённые задачи'
                },
                placeholders: {
                    taskName: 'О чём нужно не забыть?',
                    firstTaskName: 'Как насчёт первой мега-задачи?',
                    goalName: 'На что вы нацелились?',
                    whenIsItDue: 'Когда?'
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
                    description: 'Description',
                    set: 'Set',
                    cancel: 'Cancel',
                    back: 'Back',
                    save: 'Save',
                    newTask: 'New Task',
                    editTask: 'Task',
                    showClosedTasks: 'Show Closed Tasks',
                    hideClosedTasks: 'Hide Closed Tasks'
                },
                placeholders: {
                    taskName: 'What needs to be done?',
                    firstTaskName: 'How about a fresh hot task?',
                    goalName: 'What is your goal?',
                    whenIsItDue: 'When is it due?'
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
