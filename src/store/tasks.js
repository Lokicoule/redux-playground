import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';
import moment from 'moment';

const tasksAdapter = createEntityAdapter();

const slice = createSlice({
    name: 'tasks',
    initialState: tasksAdapter.getInitialState({
        loading: false,
        lastFecth: null
    }),
    reducers: {
        tasksRequested: (tasks, action) => {
            tasks.loading = true;
        },
        tasksRequestFailed: (tasks, action) => {
            tasks.loading = false;
        },
        tasksReceived: (tasks, action) => {            
            tasksAdapter.setAll(tasks, action.payload);
            tasks.loading = false;
        },
        taskAdded: tasksAdapter.addOne,
        taskDone: tasksAdapter.updateOne,
        taskAssignedToUser: tasksAdapter.updateOne
    }
});

const { taskAdded, taskDone, taskAssignedToUser, tasksReceived, tasksRequested, tasksRequestFailed } = slice.actions;
export default slice.reducer;

//Action creators
const url = "/tasks";
export const loadTasks = () => (dispatch, getState) => {
    console.log(getState());
    
    dispatch(apiCallBegan({
        url,
        onStart: tasksRequested.type,
        onSuccess: tasksReceived.type,
        onError: tasksRequestFailed.type
    }));
};

export const addTask = task => apiCallBegan({
    url,
    method: "post",
    data: task,
    onSuccess: taskAdded.type
});

export const assignTaskToUser = (taskId, userId) => apiCallBegan({
    url: url + '/' + taskId,
    method: "patch",
    data: { userId },
    onSuccess: taskAssignedToUser.type
});

export const doTask = taskId => apiCallBegan({
    url: url + '/' + taskId,
    method: "patch",
    data: { resolved: true },
    onSuccess: taskDone.type
});

export const getDoneTasks = createSelector(
    state => state.entities.tasks,
    state => state.entities.projects,
    (tasks, pojects) => tasks.filter(task => task.done)
);

export const getTasksByUser = userId => createSelector(
    state => state.entities.tasks,
    tasks => tasks.filter(task => task.userId === userId)
);