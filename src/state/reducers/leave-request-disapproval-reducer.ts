import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import LeaveRequest from '../../models/entities/LeaveRequest';

interface State {
  leaveRequest: LeaveRequest | undefined;
  isModalShow: boolean;
  isFinal: boolean;
  onCloseFunction: (() => void) | undefined;
  remarks: string;
}
const initialState: State = {
  leaveRequest: undefined,
  isModalShow: false,
  isFinal: false,
  remarks: '',
  onCloseFunction: undefined,
};

const leaveRequestDisapprovalSlice = createSlice({
  name: 'leave-request-disapproval',
  initialState: initialState,
  reducers: {
    setLeaveRequest(state, action: PayloadAction<LeaveRequest | undefined>) {
      state.leaveRequest = action.payload;
    },
    updateRemarks(state, action: PayloadAction<any>) {
      state.remarks = action.payload ?? '';
    },
    setIsFinal(state, action: PayloadAction<boolean>) {
      state.isFinal = action.payload;
    },
    setOnCloseFunction(state, action: PayloadAction<(() => void) | undefined>) {
      state.onCloseFunction = action.payload;
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
      if (!action.payload) {
        state.leaveRequest = undefined;
        state.isFinal = false;
        state.remarks = '';
        state.onCloseFunction = undefined;
      }
    },
  },
});

export default leaveRequestDisapprovalSlice.reducer;
export const leaveRequestDisapprovalActions =
  leaveRequestDisapprovalSlice.actions;
