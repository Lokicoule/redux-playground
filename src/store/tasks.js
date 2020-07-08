import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';

//const tasksAdapter = createEntityAdapter();

const slice = createSlice({
    name: 'tasks',
    initialState: {
        list: [],
        loading: false,
        lastFecth: null
    },
    reducers: {
        tasksRequested: (tasks, action) => {
            tasks.loading = true;
        },
        tasksRequestFailed: (tasks, action) => {
            tasks.loading = false;
        },
        tasksReceived: (tasks, action) => {            
            tasks.list = action.payload;
            tasks.loading = false;
            tasks.lastFetch = Date.now();
        },
        taskAdded: (tasks, action) => {
            tasks.list.push(action.payload);
        },
        taskDone: (tasks, action) => {
            const index = tasks.list.findIndex(task => task.id === action.payload.id);
            tasks.list[index].done = true;
        },
        taskAssignedToUser: (tasks, action) => {
            const { id: taskId, userId } = action.payload;
            const index = tasks.list.findIndex(task => task.id === taskId);
            tasks.list[index].userId = userId;
        }
    }
});

const { taskAdded, taskDone, taskAssignedToUser, tasksReceived, tasksRequested, tasksRequestFailed } = slice.actions;
export default slice.reducer;

//Action creators
const url = "/tasks";
export const loadTasks = () => (dispatch, getState) => {    
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
