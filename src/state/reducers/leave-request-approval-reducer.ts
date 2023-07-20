import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import LeaveRequest from '../../models/entities/LeaveRequest';

interface State {
  leaveRequest: LeaveRequest | undefined;
  isModalShow: boolean;
  totalApproveCredits: number | undefined;
  onCloseFunction: (() => void) | undefined;
}
const initialState: State = {
  leaveRequest: undefined,
  isModalShow: false,
  totalApproveCredits: undefined,
  onCloseFunction: undefined,
};

const leaveRequestApprovalSlice = createSlice({
  name: 'leave-request-approval',
  initialState: initialState,
  reducers: {
    setLeaveRequest(state, action: PayloadAction<LeaveRequest | undefined>) {
      state.leaveRequest = action.payload;
      state.totalApproveCredits = action.payload?.totalLeaveCredits;
    },
    setOnCloseFunction(state, action: PayloadAction<(() => void) | undefined>) {
      state.onCloseFunction = action.payload;
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
      if (!action.payload) {
        state.leaveRequest = undefined;
        state.totalApproveCredits = undefined;
        state.onCloseFunction = undefined;
      }
    },
    setTotalApproveCredits(state, action: PayloadAction<number | undefined>) {
      state.totalApproveCredits = action.payload;
    },
  },
});

export default leaveRequestApprovalSlice.reducer;
export const leaveRequestApprovalActions = leaveRequestApprovalSlice.actions;
