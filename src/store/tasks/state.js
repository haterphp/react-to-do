const tasks = JSON.parse(
    localStorage.getItem('tasks')
) || [];

const _taskSerialize = (tasks) => tasks.map(item => ({ ...item, created_at: new Date(item.created_at) }))

export default {
    tasks: _taskSerialize(tasks)
}
