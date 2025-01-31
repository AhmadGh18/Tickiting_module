import { configureStore } from '@reduxjs/toolkit';
import refreshReducer from './slices/refreshSlice'; 
import posReducer from './slices/posSlice';
import statusReducer from './slices/statusSlice';

const store = configureStore({
    reducer: {
        refresh: refreshReducer,
        pos: posReducer,
        status: statusReducer,  
    },
});

export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch; 

export default store;
