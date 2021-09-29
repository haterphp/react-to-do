import {combineReducers, createStore} from "redux";
import tasks from './store/tasks/reducer.js';

const reducers = combineReducers({
    tasks
});

export default createStore(reducers);
