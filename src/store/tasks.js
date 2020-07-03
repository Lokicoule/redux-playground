/* Ducks pattern */

// Action Types
const TASK_ADDED = "TASK_ADDED";
const TASK_REMOVED = "TASK_REMOVED";
const TASK_DONE = "TASK_DONE";


// Action creators
export const taskAdded = description => ({
    type: TASK_ADDED,
    payload: {
        description
    }
});

export const taskRemoved = id => ({
    type: TASK_REMOVED,
    payload: {
        id
    }
});

export const taskDone = id => ({
    type: TASK_DONE,
    payload: {
        id
    }
});

// Reducer
let lastId = 1;

export default function reducer(state = [], action) {

    switch (action.type) {
        case TASK_ADDED:
            return [...state, {
                id: lastId++,
                description: action.payload.description,
                done: false
            }];
        case TASK_REMOVED:
            return state.filter(task => task.id !== action.payload.id);
        case TASK_DONE:
            return state.map(task => task.id === action.payload.id ? { ...task, done: true } : task)
        default:
            return state;
    }

}
