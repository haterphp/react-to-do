import initState from './state.js';
import {ADD_TASK, REMOVE_TASK} from "../types.js";

function tasks(state = initState, { type, payload = {} }){
    switch (type){
        case ADD_TASK: return { ...state, tasks: [ ...state.tasks, payload ] }
        case REMOVE_TASK: return { ...state, tasks: state.tasks.filter(item => item.slug !== payload) }
        default: return state;
    }
}

export default tasks;
