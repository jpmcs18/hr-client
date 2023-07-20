import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import LeaveRequest from '../../models/entities/LeaveRequest';
import Searchable from '../../models/client-model/Searchable';
import LeaveRequestType from '../../models/entities/LeaveRequestType';
import LeaveRequestStatus from '../../models/entities/LeaveRequestStatus';

interface State extends Searchable {
  leaveRequests: LeaveRequest[];
  selectedLeaveRequest: LeaveRequest | undefined;
  leaveRequestTypes: LeaveRequestType[];
  selectedLeaveRequestType: number | undefined;
  leaveRequestStatuses: LeaveRequestStatus[];
  selectedLeaveRequestStatus: number | undefined;
  startDate: Date | undefined;
  endDate: Date | undefined;
  isModalShow: boolean;
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
  isModalShow: false,
};

const leaveTransactionSlice = createSlice({
  name: 'leave-transaction',
  initialState: initializeState,
  reducers: {
    fill(state, action: PayloadAction<LeaveRequest[]>) {
      state.leaveRequests = action.payload;
    },
    setLeaveRequestTypes(state, action: PayloadAction<LeaveRequestType[]>) {
      state.leaveRequestTypes = action.payload;
    },
    setSelectedLeaveRequestType(
      state,
      action: PayloadAction<number | undefined>
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
      action: PayloadAction<number | undefined>
    ) {
      state.selectedLeaveRequestStatus = action.payload;
    },
    setStartDate(state, action: PayloadAction<Date | undefined>) {
      state.startDate = action.payload;
    },
    setEndDate(state, action: PayloadAction<Date | undefined>) {
      state.endDate = action.payload;
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
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
    },
  },
});

export default leaveTransactionSlice.reducer;
export const leaveTransactionActions = leaveTransactionSlice.actions;
