import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';
import moment from 'moment';

let lastId = 1;

const slice = createSlice({
    name: 'tasks',
    initialState: {
        list: [],
        loading: false,
        lastFetch: null
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
            tasks.lastFetch = Date.now()
        },
        taskAdded: (tasks, action) => {
            tasks.list.push({
                id: lastId++,
                description: action.payload.description,
                done: false
            });
        }, taskDone: (tasks, action) => {
            const index = tasks.list.findIndex(task => task.id === action.payload.id);
            tasks.list[index].done = true;
        }, taskAssignedToUser: (tasks, action) => {
            const { taskId, userId } = action.payload;
            const index = tasks.list.findIndex(task => task.id === taskId);
            tasks.list[index].userId = userId;
        }
    }
});

export const { taskAdded, taskDone, taskAssignedToUser, tasksReceived, tasksRequested, tasksRequestFailed } = slice.actions;
export default slice.reducer;

//Action creators
const url = "/tasks";
export const loadTasks = () => (dispatch, getState) => {
    const {lastFetch} = getState().entities.tasks;
    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
    if (diffInMinutes < 2) return;
    dispatch(apiCallBegan({
        url,
        onStart: tasksRequested.type,
        onSuccess: tasksReceived.type,
        onError: tasksRequestFailed.type
    }));
};

export const getDoneTasks = createSelector(
    state => state.entities.tasks,
    state => state.entities.projects,
    (tasks, pojects) => tasks.filter(task => task.done)
);

export const getTasksByUser = userId => createSelector(
    state => state.entities.tasks,
    tasks => tasks.filter(task => task.userId === userId)
);