import * as actions from './actionTypes';

export const taskAdded = description => ({
    type: actions.TASK_ADDED,
    payload: {
        description
    }
});

export const taskRemoved = id => ({
    type: actions.TASK_REMOVED,
    payload: {
        id
    }
});

export const taskDone = id => ({
    type: actions.TASK_DONE,
    payload: {
        id
    }
});