import moment from 'moment'

const DAYS_OF_WEEK = {
    'Monday': 'понедельник',
    'Tuesday': 'вторник',
    'Wednesday': 'среду',
    'Thursday': 'четверг',
    'Friday': 'пятницу',
    'Saturday': 'субботу',
    'Sunday': 'воскресенье'
}

const ALL_DAYS_OF_WEEK = Object.keys(DAYS_OF_WEEK) + Object.values(DAYS_OF_WEEK)

export const handleDueDateOf = (task) => {
    const words = wordsOf(task.name)
    const lastWord = words[words.length - 1]
    const wordBeforeLast = words.length > 1 ? words[words.length - 2] : null
    if (['today', 'сегодня'].includes(lastWord)) {
        return { ...task, name: nameWithoutLastWord(task.name, lastWord), dueDate: moment().endOf('day') }
    } else if (['tomorrow', 'завтра'].includes(lastWord)) {
        return {
            ...task, name: nameWithoutLastWord(task.name, lastWord), dueDate: moment().add(1, 'days').endOf('day')
        }
    } else {
        if (ALL_DAYS_OF_WEEK.includes(lastWord) && ['on', 'в', 'во'].includes(wordBeforeLast)) {
            const dayOfWeek = Object.keys(DAYS_OF_WEEK).includes(lastWord)
                ? lastWord : Object.entries(DAYS_OF_WEEK).filter(entry => entry[1] === lastWord)[0][0]
            const startOfToday = moment().startOf('day')
            const dueDate = moment().day(dayOfWeek).endOf('day')
            const dueDateInFuture = dueDate.isBefore(startOfToday) ? dueDate.add(1, 'weeks') : dueDate
            return {
                ...task,
                name: nameWithoutLastWord(nameWithoutLastWord(task.name, lastWord), wordBeforeLast),
                dueDate: dueDateInFuture
            }
        } else {
            const date = moment(lastWord, ['DD.MM.YYYY', 'DD.MM.YY'], true).endOf('day')
            return date.isValid() ? { ...task, name: nameWithoutLastWord(task.name, lastWord), dueDate: date.endOf('day') } : { ...task }
        }
    }
}

const nameWithoutLastWord = (name, lastWord) => name.substring(0, name.length - lastWord.length).trim()

const wordsOf = (name) => name.split(' ').map(w => w.trim())
