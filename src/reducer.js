import * as actions from './actionTypes';

let lastId = 1;

function reducer(state = [], action) {

    switch (action.type) {
        case actions.TASK_ADDED:
            return [...state, {
                id: lastId++,
                description: action.payload.description,
                done: false
            }];
        case actions.TASK_REMOVED:
            return state.filter(task => task.id !== action.payload.id);
        case actions.TASK_DONE:
            return state.map(task => task.id === action.payload.id ? { ...task, done: true } : task)
        default:
            return state;
    }

}

export default reducer;