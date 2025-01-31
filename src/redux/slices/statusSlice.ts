// src/redux/slices/statusSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StatusState {
  isManageStatusesOpen: boolean;
}

const initialState: StatusState = {
  isManageStatusesOpen: false,
};

const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    openManageStatuses(state) {
      state.isManageStatusesOpen = true;
    },
    closeManageStatuses(state) {
      state.isManageStatusesOpen = false;
    },
  },
});

export const { openManageStatuses, closeManageStatuses } = statusSlice.actions;
export default statusSlice.reducer;
