import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Searchable from '../../models/client-model/Searchable';
import LeaveRequestApprover from '../../models/entities/LeaveRequestApprover';

interface State extends Searchable {
  leaveRequestApprovers: LeaveRequestApprover[];
  selectedLeaveRequestApprover: LeaveRequestApprover | undefined;
}

const initialState: State = {
  leaveRequestApprovers: [],
  selectedLeaveRequestApprover: undefined,
  key: '',
  currentPage: 1,
  pageCount: 0,
  initiateSearch: true,
};

const leaveRequestApproverSlice = createSlice({
  name: 'leave-request-approver',
  initialState: initialState,
  reducers: {
    fill(state, action: PayloadAction<LeaveRequestApprover[]>) {
      state.leaveRequestApprovers = action.payload;
    },
    setSelected(
      state,
      action: PayloadAction<LeaveRequestApprover | undefined>
    ) {
      state.selectedLeaveRequestApprover = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setPageCount(state, action: PayloadAction<number>) {
      state.pageCount = action.payload;
    },
    setInitiateSearch(state, action: PayloadAction<boolean>) {
      state.initiateSearch = action.payload;
    },
  },
});

export default leaveRequestApproverSlice.reducer;
export const leaveRequestApproverActions = leaveRequestApproverSlice.actions;
