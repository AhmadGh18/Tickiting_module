import { createSlice } from '@reduxjs/toolkit';

interface RefreshState {
    refresh: boolean;
}

const initialState: RefreshState = {
    refresh: false, // Initial state
};

const refreshSlice = createSlice({
    name: 'refresh',
    initialState,
    reducers: {
        setRefresh: (state, action) => {
            state.refresh = action.payload; // Update refresh state
        },
    },
});

export const { setRefresh } = refreshSlice.actions; // Export actions
export default refreshSlice.reducer; // Export reducer
