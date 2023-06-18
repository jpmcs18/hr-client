import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import LeaveRequest from '../../models/entities/LeaveRequest';
import Searchable from '../../models/client-model/Searchable';
import LeaveRequestType from '../../models/entities/LeaveRequestType';
import LeaveRequestStatus from '../../models/entities/LeaveRequestStatus';

interface State extends Searchable {
  leaveRequests: LeaveRequest[];
  selectedLeaveRequest: LeaveRequest | undefined;
  leaveRequestTypes: LeaveRequestType[];
  selectedLeaveRequestType: LeaveRequestType | undefined;
  leaveRequestStatuses: LeaveRequestStatus[];
  selectedLeaveRequestStatus: LeaveRequestStatus | undefined;
  startDate: Date | undefined;
  endDate: Date | undefined;
}

const initializeState: State = {
  leaveRequests: [],
  selectedLeaveRequest: undefined,
  leaveRequestTypes: [],
  selectedLeaveRequestType: undefined,
  leaveRequestStatuses: [],
  selectedLeaveRequestStatus: undefined,
  key: '',
  currentPage: 1,
  pageCount: 0,
  initiateSearch: true,
  startDate: undefined,
  endDate: undefined,
};

const leaveRequestSlice = createSlice({
  name: 'leave-request',
  initialState: initializeState,
  reducers: {
    fill(state, action: PayloadAction<LeaveRequest[]>) {
      state.leaveRequests = action.payload;
    },
    setSelectedLeaveRequest(
      state,
      action: PayloadAction<LeaveRequest | undefined>
    ) {
      state.selectedLeaveRequest = action.payload;
    },
    setLeaveRequestTypes(state, action: PayloadAction<LeaveRequestType[]>) {
      state.leaveRequestTypes = action.payload;
    },
    setSelectedLeaveRequestType(
      state,
      action: PayloadAction<LeaveRequestType | undefined>
    ) {
      state.selectedLeaveRequestType = action.payload;
    },
    setLeaveRequestStatuses(
      state,
      action: PayloadAction<LeaveRequestStatus[]>
    ) {
      state.leaveRequestStatuses = action.payload;
    },
    setSelectedLeaveRequestStatus(
      state,
      action: PayloadAction<LeaveRequestStatus | undefined>
    ) {
      state.selectedLeaveRequestStatus = action.payload;
    },
    setkey(state, action: PayloadAction<string>) {
      state.key = action.payload;
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

export default leaveRequestSlice.reducer;
export const leaveRequestActions = leaveRequestSlice.actions;
