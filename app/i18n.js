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
                    rateUsBigText: 'Мы будем рады услышать, как Motive помог Вам!',
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
                    slogan: '打擊懶惰蟲',
                    tasks: '待辦事項',
                    editTask: '編輯事項',
                    editNotes: '編輯內容',
                    schedule: '行程表',
                    account: 'Motive'
                },
                labels: {
                    loginVK: '以VK登入',
                    loginFB: '以Facebook登入',
                    logout: '登出',
                    seeAll: '顯示全部',
                    all: '所有事項',
                    today: '今日',
                    thisWeek: '本週',
                    task: '待辦事項',
                    description: '詳細內容',
                    set: '設定',
                    cancel: '取消',
                    clear: '清除',
                    back: '返回',
                    save: '保存',
                    newTask: '新事項',
                    newTaskForToday: '本日新事項',
                    editTask: '標題',
                    showClosedTasks: '顯示已完成事項',
                    hideClosedTasks: '隱藏已完成事項',
                    dueDate: '到期日',
                    color: '顏色',
                    itemStatusInProgress: '顯示已完成事項',
                    itemStatusCompleted: '顯示進行中事項',
                    totalTasks: '{{totalTasks}} 待辦事項',
                    sortByRecent: '最近',
                    sortByOverdue: '已過期',
                    sortByTasks: '標題',
                    sortByColor: '顏色',
                    tasksCompleted: '事項\n已完成',
                    tasksInProgress: '事項\n進行中',
                    dueDateNotSet: '未設定',
                    greeting: '嗨, {{name}}',
                    future: '下一個',
                    overdue: '過期',
                    rateUs: '在 {{store}} 給我們個評價吧',
                    rateUsBigText: '讓我們聽聽你對Motive的想法!',
                    showMoreTasks: '顯示更多事項'
                },
                placeholders: {
                    taskName: '有什麼事要完成的?',
                    firstTaskName: '來個熱騰騰的新任務如何?',
                    whenIsItDue: '何時要完成?',
                    description: '詳細內容',
                    sortBy: '篩選',
                },
                emptyStates: {
                    noCompletedTasks: '尚無已完成事項',
                    allTasksCompleted: '你已完成所有待辦事項! \n當然, 你永遠可以寫上新的... :)',
                    noTasks: '無待辦事項!',
                }
            }
        }
    },
    fallbackLng: 'en',
    debug: false,

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
