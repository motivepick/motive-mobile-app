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
                headings: {
                    tasks: 'Tasks',
                    goals: 'Goals',
                    editGoal: 'Edit Goal'
                },
                labels: {
                    statistics: 'You can do it! {{percent}}% done',
                    all: 'All Tasks',
                    today: 'Today',
                    thisWeek: 'This Week',
                    newGoal: 'New Goal',
                    editGoal: 'Edit',
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
                headings: {
                    tasks: 'Задачи',
                    goals: 'Цели',
                    editGoal: 'Изменить цель'
                },
                labels: {
                    statistics: 'Соберись! {{percent}}% готово',
                    all: 'Все задачи',
                    today: 'Сегодня',
                    thisWeek: 'На неделе',
                    newGoal: 'Новая цель',
                    editGoal: 'Изменить',
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
                headings: {
                    tasks: 'Tasks',
                    goals: 'Goals',
                    editGoal: 'Edit Goal'
                },
                labels: {
                    statistics: 'You can do it! {{percent}}% done',
                    all: 'All Tasks',
                    today: 'Today',
                    thisWeek: 'This Week',
                    newGoal: 'New Goal',
                    editGoal: 'Edit',
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
