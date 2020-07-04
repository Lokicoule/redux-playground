import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

let lastId = 1;

const slice = createSlice({
    name: 'tasks',
    initialState: [],
    reducers: {
        taskAdded: (tasks, action) => {
            tasks.push({
                id: lastId++,
                description: action.payload.description,
                done: false
            });
        }, taskDone: (tasks, action) => {
            const index = tasks.findIndex(task => task.id === action.payload.id);
            tasks[index].done = true;
        }, taskAssignedToUser: (tasks, action) => {
            const {taskId, userId} = action.payload;
            const index = tasks.findIndex(task => task.id === taskId);
            tasks[index].userId = userId;
        }
    }
});

export const { taskAdded, taskDone, taskAssignedToUser } = slice.actions;
export default slice.reducer;

export const getDoneTasks = createSelector(
    state => state.entities.tasks,
    state => state.entities.projects,
    (tasks, pojects) => tasks.filter(task => task.done)
);

export const getTasksByUser = userId => createSelector(
    state => state.entities.tasks,
    tasks => tasks.filter(task => task.userId === userId)
);