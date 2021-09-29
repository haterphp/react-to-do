import {
    ADD_TASK as ADD_TASK_TYPE,
    REMOVE_TASK as REMOVE_TASK_TYPE,
} from "../types.js";

export const ADD_TASK = (payload) => {
    return actions.add(payload);
}

export const REMOVE_TASK = (slug) => {
    return actions.remove(slug)
}

const actions = ({
    add: (payload) => ({ type: ADD_TASK_TYPE, payload }),
    remove: (payload) => ({ type: REMOVE_TASK_TYPE, payload })
})
