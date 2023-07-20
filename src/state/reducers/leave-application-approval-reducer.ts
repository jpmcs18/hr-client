import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  applicationCount: number;
  initiateSearch: boolean;
}

const initialState: State = {
  applicationCount: 0,
  initiateSearch: false,
};

const leaveApplicationApprovalSlice = createSlice({
  name: 'leave-application-recommendation',
  initialState: initialState,
  reducers: {
    setApplicationCount(state, action: PayloadAction<number>) {
      state.applicationCount = action.payload;
    },
    setInitiateSearch(state, action: PayloadAction<boolean>) {
      state.initiateSearch = action.payload;
    },
  },
});

export default leaveApplicationApprovalSlice.reducer;
export const leaveApplicationApprovalActions =
  leaveApplicationApprovalSlice.actions;
