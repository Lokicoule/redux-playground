import { createSlice } from '@reduxjs/toolkit';

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
        }
    }
});

export const {taskAdded, taskDone} = slice.actions;
export default slice.reducer;
