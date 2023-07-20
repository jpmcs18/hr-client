import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import LeaveRequest from '../../models/entities/LeaveRequest';

interface State {
  leaveRequests: LeaveRequest[];
  employeeId: number | undefined;
  isModalShow: boolean;
}

const initialState: State = {
  leaveRequests: [],
  employeeId: undefined,
  isModalShow: false,
};

const leaveRequestRecommendationModalSlice = createSlice({
  name: 'leave-request-recommendation-modal',
  initialState: initialState,
  reducers: {
    setLeaveRequests(state, action: PayloadAction<LeaveRequest[]>) {
      state.leaveRequests = action.payload;
    },
    setEmployeeId(state, action: PayloadAction<number>) {
      state.employeeId = action.payload;
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
      if (!action.payload) {
        state.employeeId = undefined;
        state.leaveRequests = [];
      }
    },
  },
});

export default leaveRequestRecommendationModalSlice.reducer;
export const leaveRequestRecommendationModalActions =
  leaveRequestRecommendationModalSlice.actions;
