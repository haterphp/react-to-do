import initState from './state.js';
import {ADD_TASK, CHANGE_PRIORITY_TASK, EDIT_TASK, REMOVE_TASK} from "../types.js";

const saveTask = (tasks) => localStorage.setItem('tasks', JSON.stringify(tasks));

function tasks(state = initState, {type, payload = {}}) {
    let tasks = []
    switch (type) {
        case ADD_TASK:
            tasks = [...state.tasks, payload];
            saveTask(tasks);
            return {...state, tasks}
        case REMOVE_TASK:
            tasks = state.tasks.filter(item => item.slug !== payload);
            saveTask(tasks)
            return {...state, tasks}
        case EDIT_TASK:
            tasks = [
                ...state.tasks.filter(item => item.slug !== payload.slug),
                payload.body
            ];
            saveTask(tasks)
            return {
                ...state,
                tasks
            }
        case CHANGE_PRIORITY_TASK:
            const task = state.tasks.find(item => item.slug === payload)
            tasks = [
                ...state.tasks.filter(item => item.slug !== payload),
                { ...task, priority: !task.priority  }
            ];
            saveTask(tasks)
            return {
                ...state,
                tasks
            }
        default:
            return state;
    }
}

export default tasks;
