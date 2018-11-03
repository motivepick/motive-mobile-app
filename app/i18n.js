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
                    editGoal: 'Edit Goal',
                    editTask: 'Edit Task',
                    editNotes: 'Edit Notes'
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
                    clear: 'Clear',
                    back: 'Back',
                    save: 'Save',
                    newTask: 'New Task',
                    editTask: 'Task',
                    showClosedTasks: 'Show Completed Tasks',
                    hideClosedTasks: 'Hide Closed Tasks',
                    editDescription: 'Description',
                    dueDate: 'Due date',
                    color: 'Color',
                    itemStatusInProgress: 'Status: In Progress',
                    itemStatusCompleted: 'Status: Completed',
                    totalTasks: '{{totalTasks}} tasks',
                    sortByRecent: 'Recent',
                    sortByOverdue: 'Overdue',
                    sortByTasks: 'By tasks',
                    sortByColor: 'By color'
                },
                placeholders: {
                    taskName: 'What needs to be done?',
                    firstTaskName: 'How about a fresh hot task?',
                    goalName: 'What is your goal?',
                    whenIsItDue: 'When is it due?',
                    description: 'A place for your notes',
                    sortBy: 'Sort by'
                },
                emptyStates: {
                    noCompletedTasks: 'No completed tasks yet',
                    allTasksCompleted: 'You have completed all your tasks! \nOf course, you can always add more... :)',
                    noTasks: 'There are no tasks! \nBut you can add one :)'
                }
            }
        },
        ru: {
            translations: {
                headings: {
                    tasks: 'Задачи',
                    goals: 'Цели',
                    editGoal: 'Изменить цель',
                    editTask: 'Изменить задачу',
                    editNotes: 'Заметки'
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
                    clear: 'Сбросить',
                    back: 'Назад',
                    save: 'Сохранить',
                    newTask: 'Новая задача',
                    editTask: 'Задача',
                    showClosedTasks: 'Показать завершённые задачи',
                    hideClosedTasks: 'Скрыть завершённые задачи',
                    editDescription: 'Описание',
                    dueDate: 'Due date',
                    color: 'Color',
                    itemStatusInProgress: 'Состояние: В процессе',
                    itemStatusCompleted: 'Состояние: Завершено',
                    totalTasks: 'Задач: {{totalTasks}}',
                    sortByRecent: 'Недавние',
                    sortByOverdue: 'Просроченные',
                    sortByTasks: 'По задачам',
                    sortByColor: 'По цвету'
                },
                placeholders: {
                    taskName: 'О чём нужно не забыть?',
                    firstTaskName: 'Как насчёт первой мега-задачи?',
                    goalName: 'На что вы нацелились?',
                    whenIsItDue: 'Когда?',
                    description: 'Место для заметок',
                    sortBy: 'Сортировать'
                },
                emptyStates: {
                    noCompletedTasks: 'Пока нет завершённых задач',
                    allTasksCompleted: 'Вы завершили все свои задачи! \nКонечно, всегда можно добавить ещё задач... :)',
                    noTasks: 'Задач нет! \nНо можно добавить :)'
                }
            }
        },
        zh: {
            translations: {
                headings: {
                    tasks: 'Tasks',
                    goals: 'Goals',
                    editGoal: 'Edit Goal',
                    editTask: 'Edit Task',
                    editNotes: 'Edit Notes'
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
                    clear: 'Clear',
                    back: 'Back',
                    save: 'Save',
                    newTask: 'New Task',
                    editTask: 'Task',
                    showClosedTasks: 'Show Completed Tasks',
                    hideClosedTasks: 'Hide Closed Tasks',
                    editDescription: 'Description',
                    dueDate: 'Due date',
                    color: 'Color',
                    itemStatusInProgress: 'Status: In Progress',
                    itemStatusCompleted: 'Status: Completed',
                    totalTasks: '{{totalTasks}} tasks',
                    sortByRecent: 'Recent',
                    sortByOverdue: 'Overdue',
                    sortByTasks: 'By tasks',
                    sortByColor: 'By color'
                },
                placeholders: {
                    taskName: 'What needs to be done?',
                    firstTaskName: 'How about a fresh hot task?',
                    goalName: 'What is your goal?',
                    whenIsItDue: 'When is it due?',
                    description: 'A place for your notes',
                    sortBy: 'Sort by'
                },
                emptyStates: {
                    noCompletedTasks: 'No completed tasks yet',
                    allTasksCompleted: 'You have completed all your tasks! \nOf course, you can always add more... :)',
                    noTasks: 'There are no tasks! \nBut you can add one :)'
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
