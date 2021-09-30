import {
    ADD_TASK as ADD_TASK_TYPE,
    REMOVE_TASK as REMOVE_TASK_TYPE,
    EDIT_TASK as EDIT_TASK_TYPE,
    CHANGE_PRIORITY_TASK as CHANGE_PRIORITY_TASK_TYPE,
} from "../types.js";

export const ADD_TASK = (payload) => {
    return actions.add(payload);
}

export const REMOVE_TASK = (slug) => {
    return actions.remove(slug)
}

export const EDIT_TASK = (slug, body) => {
    console.log(slug, body)
    return actions.edit({ slug, body });
}

export const CHANGE_PRIORITY_TASK = (slug) => {
    return actions.priority(slug);
}

const actions = ({
    add: (payload) => ({ type: ADD_TASK_TYPE, payload }),
    remove: (payload) => ({ type: REMOVE_TASK_TYPE, payload }),
    edit: (payload) => ({ type: EDIT_TASK_TYPE, payload }),
    priority: (payload) => ({ type: CHANGE_PRIORITY_TASK_TYPE, payload }),
})
