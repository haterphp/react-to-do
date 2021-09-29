export default {
    tasks: JSON.parse(
        localStorage.getItem('tasks')
    ) || []
}
