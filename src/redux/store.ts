import { configureStore } from '@reduxjs/toolkit';
import refreshReducer from './slices/refreshSlice'; 
import posReducer from './slices/posSlice';
import statusReducer from './slices/statusSlice';

const store = configureStore({
    reducer: {
        refresh: refreshReducer, // Add reducers here
        pos: posReducer,
        status: statusReducer,  // Add the status reducer to the store

    },
});

export type RootState = ReturnType<typeof store.getState>; // Type for root state
export type AppDispatch = typeof store.dispatch; // Type for dispatch

export default store;
