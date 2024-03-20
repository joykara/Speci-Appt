import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isAdmin: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAdmin = action.payload.isAdmin;
    },
    logoutUser: (state, action) => {
      state.user = null;
      state.isAdmin = false;
    },
  },
});

export const { setUser, logoutUser } = usersSlice.actions;

export default usersSlice.reducer;
