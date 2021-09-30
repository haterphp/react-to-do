import {combineReducers, createStore} from "redux";
import tasks from './store/tasks/reducer.js';
import filter from './store/filter/reducer.js';

const reducers = combineReducers({
    tasks, filter
});

export default createStore(reducers);
