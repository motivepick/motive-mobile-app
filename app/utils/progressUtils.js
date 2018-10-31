export const calculateGoalProgressStats = (tasks, isClosed) => {
    const total = tasks.length
    const incompleteTasksCount = tasks.filter(task => !task.closed).length
    const completeTasksCount = total - incompleteTasksCount
    const progress = isClosed ? 100 :  total && completeTasksCount && Math.round(completeTasksCount * 100 / total)
    const taskCountLabel = isClosed ? `${total} tasks completed` :  `${incompleteTasksCount || 'no'} tasks`
    return {
        counts: {
            total,
            incompleteTasksCount,
            completeTasksCount
        },
        percents: {
            progress
        },
        labels: {
            taskCountLabel
        }
    }
}