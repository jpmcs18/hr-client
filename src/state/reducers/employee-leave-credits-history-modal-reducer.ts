import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Searchable from '../../models/client-model/Searchable';
import EmployeeLeaveCreditsHistory from '../../models/entities/EmployeeLeaveCreditsHistory';

interface State extends Searchable {
  employeeLeaveCreditsHistory: EmployeeLeaveCreditsHistory[];
  employeeId: number;
  leaveTypeId: number;
  isModalShow: boolean;
}
const initialState: State = {
  employeeLeaveCreditsHistory: [],
  employeeId: 0,
  leaveTypeId: 0,
  key: '',
  currentPage: 1,
  pageCount: 0,
  initiateSearch: true,
  isModalShow: false,
};

const employeeLeaveCreditsHistoryModalSlice = createSlice({
  name: 'employee-leave-credits-history-modal',
  initialState: initialState,
  reducers: {
    fill(state, action: PayloadAction<EmployeeLeaveCreditsHistory[]>) {
      state.employeeLeaveCreditsHistory = action.payload;
    },
    setEmployeeId(state, action: PayloadAction<number>) {
      state.employeeId = action.payload;
    },
    setLeaveTypeId(state, action: PayloadAction<number>) {
      state.leaveTypeId = action.payload;
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
      if (!action.payload) {
        state.employeeLeaveCreditsHistory = [];
        state.employeeId = 0;
        state.leaveTypeId = 0;
        state.key = '';
        state.currentPage = 1;
        state.pageCount = 0;
        state.initiateSearch = true;
      }
    },
  },
});

export default employeeLeaveCreditsHistoryModalSlice.reducer;
export const employeeLeaveCreditsHistoryModalActions =
  employeeLeaveCreditsHistoryModalSlice.actions;
