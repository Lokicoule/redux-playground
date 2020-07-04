import { createSlice } from '@reduxjs/toolkit';
import {createSelector} from 'reselect';
let lastId = 0;
const slice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        userAdded: (users, action) => {
            users.push({
                id: ++lastId,
                name: action.payload.name
            });
        }
    }
});

export const { userAdded } = slice.actions;
export default slice.reducer;

/* export const getUserById = createSelector(
    state => state.entities.users,
    users => users.filter(user => user.id)
); */