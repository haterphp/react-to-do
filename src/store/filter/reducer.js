import initStates from './state.js';
import {SET_FILTER, SET_FILTER_NAME} from "../types.js";

const saveFilter = filter => localStorage.setItem('filter', JSON.stringify(filter))

function filter(state = initStates, {type, payload = {}}) {
    switch (type) {
        case SET_FILTER:
            const idx = state.filters.indexOf(payload);
            let filters = {};
            if(idx !== -1){
                filters = [
                    ...state.filters.slice(0, idx),
                    ...state.filters.slice(idx + 1)
                ]
            } else filters = [ ...state.filters, payload ];
            saveFilter(filters);
            return {
                ...state,
                filters
            }
        case SET_FILTER_NAME:
            return {
                ...state,
                name: payload
            }
        default:
            return state;
    }
}

export default filter;
