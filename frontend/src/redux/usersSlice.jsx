import {createSlice} from '@reduxjs/toolkit';

export const usersSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
    },
    reducers: {
        setUser: (state, action ) => {
            state.user = action.payload;
        },
        logoutUser: (state, action) => {
            state.user = null;
        }
    },
});

export const { setUser, logoutUser } = usersSlice.actions;

export default usersSlice.reducer