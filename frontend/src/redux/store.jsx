import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import alertReducer from './alertsSlice';

const rootReducer = combineReducers({
    alerts: alertReducer.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export default store;
