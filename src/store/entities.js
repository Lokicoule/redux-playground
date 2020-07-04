import { combineReducers } from 'redux';
import projectsReducer from './projects';
import tasksReducer from './tasks';
import usersReducer from './users';

export default combineReducers({
    projects: projectsReducer,
    tasks: tasksReducer,
    users: usersReducer
});