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
                    goals: 'Goals',
                    editGoal: 'Edit Goal',
                    newGoal: 'New Goal',
                    editTask: 'Edit Task',
                    editNotes: 'Edit Notes',
                    pickGoal: 'Pick A Goal'
                },
                labels: {
                    loginVK: 'Login With VK',
                    loginFB: 'Login With Facebook',
                    seeAll: 'See All',
                    addGoal: 'New goal',
                    statistics: 'You can do it! {{percent}}% done',
                    all: 'All Tasks',
                    today: 'Today',
                    thisWeek: 'This Week',
                    newGoal: 'New Goal',
                    editGoal: 'Edit',
                    goal: 'Goal',
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
                    showClosedGoals: 'See completed goals',
                    hideClosedTasks: 'Hide Closed Tasks',
                    dueDate: 'Due date',
                    color: 'Color',
                    itemStatusInProgress: 'Show Closed Tasks',
                    itemStatusCompleted: 'Show Open Tasks',
                    totalTasks: '{{totalTasks}} tasks',
                    totalGoals: '{{totalGoals}} goals',
                    sortByRecent: 'Recent',
                    sortByOverdue: 'Overdue',
                    sortByTasks: 'By tasks',
                    sortByColor: 'By color',
                    tasksCompleted: 'tasks\ncompleted',
                    tasksInProgress: 'tasks\nin progress',
                    dueDateNotSet: 'not set',
                    greeting: 'Hi, {{name}}'
                },
                placeholders: {
                    taskName: 'What needs to be done?',
                    firstTaskName: 'How about a fresh hot task?',
                    goalName: 'What is your goal?',
                    whenIsItDue: 'When is it due?',
                    description: 'A place for your notes',
                    sortBy: 'Sort by',
                    taskIsPartOfGoal: 'Specify a goal'
                },
                emptyStates: {
                    noCompletedTasks: 'No completed tasks yet',
                    allTasksCompleted: 'You have completed all your tasks! \nOf course, you can always add more... :)',
                    noTasks: 'There are no tasks! \nBut you can add one :)',
                    noCompletedGoals: 'No completed goals yet',
                    allGoalsCompleted: 'Way to go! \nYou have completed all your goals!',
                    noGoals: 'There are no goals! \nBut you can set one :)'
                }
            }
        },
        ru: {
            translations: {
                headings: {
                    slogan: 'Победи лень',
                    tasks: 'Задачи',
                    goals: 'Цели',
                    editGoal: 'Изменить цель',
                    newGoal: 'Новая цель',
                    editTask: 'Изменить задачу',
                    editNotes: 'Заметки',
                    pickGoal: 'Указать цель'
                },
                labels: {
                    loginVK: 'Войти с VK',
                    loginFB: 'Войти с Facebook',
                    seeAll: 'Смотреть все',
                    addGoal: 'Новая цель',
                    statistics: 'Соберись! {{percent}}% готово',
                    all: 'Все задачи',
                    today: 'Сегодня',
                    thisWeek: 'На неделе',
                    newGoal: 'Новая цель',
                    editGoal: 'Изменить',
                    goal: 'Цель',
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
                    showClosedGoals: 'Показать закрытые цели',
                    hideClosedTasks: 'Скрыть закрытые задачи',
                    dueDate: 'Дата выполнения',
                    color: 'Цвет',
                    itemStatusInProgress: 'Показать закрытые',
                    itemStatusCompleted: 'Показать открытые',
                    totalTasks: 'Задач: {{totalTasks}}',
                    totalGoals: 'Целей: {{totalGoals}}',
                    sortByRecent: 'Недавние',
                    sortByOverdue: 'Просроченные',
                    sortByTasks: 'По задачам',
                    sortByColor: 'По цвету',
                    tasksCompleted: 'задач\nвыполнено',
                    tasksInProgress: 'задач\nв процессе',
                    dueDateNotSet: 'не задано',
                    greeting: 'Привет, {{name}}'
                },
                placeholders: {
                    taskName: 'О чём нужно не забыть?',
                    firstTaskName: 'Как насчёт первой мега-задачи?',
                    goalName: 'На что вы нацелились?',
                    whenIsItDue: 'Когда?',
                    description: 'Место для заметок',
                    sortBy: 'Сортировать',
                    taskIsPartOfGoal: 'Указать цель'
                },
                emptyStates: {
                    noCompletedTasks: 'Ещё нет закрытых задач',
                    allTasksCompleted: 'Вы закрыли все свои задачи! \nКонечно, всегда можно добавить ещё задач... :)',
                    noTasks: 'Задач нет! \nНо можно добавить :)',
                    noCompletedGoals: 'Ещё нет закрытых целей',
                    allGoalsCompleted: 'Так держать! \nВсе поставленные цели достигнуты!',
                    noGoals: 'Целей нет! \nНо можно поставить :)'
                }
            }
        },
        zh: {
            translations: {
                headings: {
                    slogan: 'Defeat your laziness',
                    tasks: 'Tasks',
                    goals: 'Goals',
                    editGoal: 'Edit Goal',
                    newGoal: 'New Goal',
                    editTask: 'Edit Task',
                    editNotes: 'Edit Notes',
                    pickGoal: 'Pick A Goal'
                },
                labels: {
                    loginVK: 'Login With VK',
                    loginFB: 'Login With Facebook',
                    seeAll: 'See All',
                    addGoal: 'New goal',
                    statistics: 'You can do it! {{percent}}% done',
                    all: 'All Tasks',
                    today: 'Today',
                    thisWeek: 'This Week',
                    newGoal: 'New Goal',
                    editGoal: 'Edit',
                    goal: 'Goal',
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
                    showClosedGoals: 'See completed goals',
                    hideClosedTasks: 'Hide Closed Tasks',
                    dueDate: 'Due date',
                    color: 'Color',
                    itemStatusInProgress: 'Show Closed Tasks',
                    itemStatusCompleted: 'Show Open Tasks',
                    totalTasks: '{{totalTasks}} tasks',
                    totalGoals: '{{totalGoals}} goals',
                    sortByRecent: 'Recent',
                    sortByOverdue: 'Overdue',
                    sortByTasks: 'By tasks',
                    sortByColor: 'By color',
                    tasksCompleted: 'tasks\ncompleted',
                    tasksInProgress: 'tasks\nin progress',
                    dueDateNotSet: 'not set',
                    greeting: 'Hi, {{name}}'
                },
                placeholders: {
                    taskName: 'What needs to be done?',
                    firstTaskName: 'How about a fresh hot task?',
                    goalName: 'What is your goal?',
                    whenIsItDue: 'When is it due?',
                    description: 'A place for your notes',
                    sortBy: 'Sort by',
                    taskIsPartOfGoal: 'Specify a goal'
                },
                emptyStates: {
                    noCompletedTasks: 'No completed tasks yet',
                    allTasksCompleted: 'You have completed all your tasks! \nOf course, you can always add more... :)',
                    noTasks: 'There are no tasks! \nBut you can add one :)',
                    noCompletedGoals: 'No completed goals yet',
                    allGoalsCompleted: 'Way to go! \nYou have completed all your goals!',
                    noGoals: 'There are no goals! \nBut you can set one :)'
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
