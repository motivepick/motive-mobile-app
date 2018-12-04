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
                    slogan: 'Defeat your laziness',
                    tasks: 'Tasks',
                    editTask: 'Edit Task',
                    editNotes: 'Edit Notes',
                    schedule: 'Schedule',
                    account: 'Motive'
                },
                labels: {
                    loginVK: 'Login With VK',
                    loginFB: 'Login With Facebook',
                    logout: 'Logout',
                    seeAll: 'See All',
                    all: 'All Tasks',
                    today: 'Today',
                    thisWeek: 'This Week',
                    task: 'Task',
                    description: 'Notes',
                    set: 'Set',
                    cancel: 'Cancel',
                    clear: 'Clear',
                    delete: 'Delete',
                    back: 'Back',
                    save: 'Save',
                    newTask: 'New Task',
                    newTaskForToday: 'New Task For Today',
                    editTask: 'Task',
                    showClosedTasks: 'Show Completed Tasks',
                    hideClosedTasks: 'Hide Closed Tasks',
                    dueDate: 'Due date',
                    color: 'Color',
                    itemStatusInProgress: 'Show Closed Tasks',
                    itemStatusCompleted: 'Show Open Tasks',
                    totalTasks: '{{totalTasks}} tasks',
                    sortByRecent: 'Recent',
                    sortByOverdue: 'Overdue',
                    sortByTasks: 'By tasks',
                    sortByColor: 'By color',
                    tasksCompleted: 'tasks\ncompleted',
                    tasksInProgress: 'tasks\nin progress',
                    dueDateNotSet: 'not set',
                    greeting: 'Hi, {{name}}',
                    future: 'Next',
                    overdue: 'Overdue',
                    rateUs: 'Rate us in {{store}}',
                    rateUsBigText: 'It would be lovely to hear what Your experience with Motive is!',
                    showMoreTasks: 'Show More Tasks'
                },
                placeholders: {
                    taskName: 'What needs to be done?',
                    firstTaskName: 'How about a fresh hot task?',
                    whenIsItDue: 'When is it due?',
                    description: 'A place for your notes',
                    sortBy: 'Sort by',
                },
                emptyStates: {
                    noCompletedTasks: 'No completed tasks yet',
                    allTasksCompleted: 'You have completed all your tasks! \nOf course, you can always add more... :)',
                    noTasks: 'There are no tasks!',
                }
            }
        },
        ru: {
            translations: {
                headings: {
                    slogan: 'Победи лень',
                    tasks: 'Задачи',
                    editTask: 'Изменить задачу',
                    editNotes: 'Заметки',
                    schedule: 'График',
                    account: 'Motive'
                },
                labels: {
                    loginVK: 'Войти с VK',
                    loginFB: 'Войти с Facebook',
                    logout: 'Выйти',
                    seeAll: 'Смотреть все',
                    all: 'Все задачи',
                    today: 'Сегодня',
                    thisWeek: 'На неделе',
                    task: 'Задача',
                    description: 'Заметки',
                    set: 'Сохранить',
                    cancel: 'Отменить',
                    clear: 'Сброс',
                    delete: 'Удалить',
                    back: 'Назад',
                    save: 'Сохранить',
                    newTask: 'Новая задача',
                    newTaskForToday: 'Новая задача на сегодня',
                    editTask: 'Задача',
                    showClosedTasks: 'Показать закрытые задачи',
                    hideClosedTasks: 'Скрыть закрытые задачи',
                    dueDate: 'Дата выполнения',
                    color: 'Цвет',
                    itemStatusInProgress: 'Показать закрытые',
                    itemStatusCompleted: 'Показать открытые',
                    totalTasks: 'Задач: {{totalTasks}}',
                    sortByRecent: 'Недавние',
                    sortByOverdue: 'Просроченные',
                    sortByTasks: 'По задачам',
                    sortByColor: 'По цвету',
                    tasksCompleted: 'задач\nвыполнено',
                    tasksInProgress: 'задач\nв процессе',
                    dueDateNotSet: 'не задано',
                    greeting: 'Привет, {{name}}',
                    future: 'Дальше',
                    overdue: 'Просроченные',
                    rateUs: 'Оцените нас в {{store}}',
                    rateUsBigText: 'Мы будем рады услышать как Motive помог Вам!',
                    showMoreTasks: 'Показать ещё'
                },
                placeholders: {
                    taskName: 'О чём нужно не забыть?',
                    firstTaskName: 'Как насчёт первой мега-задачи?',
                    whenIsItDue: 'Когда?',
                    description: 'Место для заметок',
                    sortBy: 'Сортировать',
                },
                emptyStates: {
                    noCompletedTasks: 'Ещё нет закрытых задач',
                    allTasksCompleted: 'Вы закрыли все свои задачи! \nКонечно, всегда можно добавить ещё задач... :)',
                    noTasks: 'Задач нет!',
                }
            }
        },
        zh: {
            translations: {
                headings: {
                    slogan: 'Defeat your laziness',
                    tasks: 'Tasks',
                    editTask: 'Edit Task',
                    editNotes: 'Edit Notes',
                    schedule: 'Schedule',
                    account: 'Motive'
                },
                labels: {
                    loginVK: 'Login With VK',
                    loginFB: 'Login With Facebook',
                    logout: 'Logout',
                    seeAll: 'See All',
                    all: 'All Tasks',
                    today: 'Today',
                    thisWeek: 'This Week',
                    task: 'Task',
                    description: 'Notes',
                    set: 'Set',
                    cancel: 'Cancel',
                    clear: 'Clear',
                    delete: 'Delete',
                    back: 'Back',
                    save: 'Save',
                    newTask: 'New Task',
                    newTaskForToday: 'New Task For Today',
                    editTask: 'Task',
                    showClosedTasks: 'Show Completed Tasks',
                    hideClosedTasks: 'Hide Closed Tasks',
                    dueDate: 'Due date',
                    color: 'Color',
                    itemStatusInProgress: 'Show Closed Tasks',
                    itemStatusCompleted: 'Show Open Tasks',
                    totalTasks: '{{totalTasks}} tasks',
                    sortByRecent: 'Recent',
                    sortByOverdue: 'Overdue',
                    sortByTasks: 'By tasks',
                    sortByColor: 'By color',
                    tasksCompleted: 'tasks\ncompleted',
                    tasksInProgress: 'tasks\nin progress',
                    dueDateNotSet: 'not set',
                    greeting: 'Hi, {{name}}',
                    future: 'Next',
                    overdue: 'Overdue',
                    rateUs: 'Rate us in {{store}}',
                    rateUsBigText: 'It would be lovely to hear what Your experience with Motive is!',
                    showMoreTasks: 'Show More Tasks'
                },
                placeholders: {
                    taskName: 'What needs to be done?',
                    firstTaskName: 'How about a fresh hot task?',
                    whenIsItDue: 'When is it due?',
                    description: 'A place for your notes',
                    sortBy: 'Sort by',
                },
                emptyStates: {
                    noCompletedTasks: 'No completed tasks yet',
                    allTasksCompleted: 'You have completed all your tasks! \nOf course, you can always add more... :)',
                    noTasks: 'There are no tasks!',
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
