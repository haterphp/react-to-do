import {
    SET_FILTER as SET_FILTER_TYPE,
    SET_FILTER_NAME as SET_FILTER_NAME_TYPE
} from '../types.js';

export const SET_FILTER = (filter) => {
    return actions.set(filter);
}

export const SET_FILTER_NAME = (name) => {
    return actions.setName(name)
}

const actions = {
    set: (payload) => ({ type: SET_FILTER_TYPE, payload }),
    setName: (payload) => ({ type: SET_FILTER_NAME_TYPE, payload })
}
