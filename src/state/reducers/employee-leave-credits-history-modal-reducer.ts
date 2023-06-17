import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Searchable from '../../models/client-model/Searchable';
import EmployeeLeaveCreditsHistory from '../../models/entities/EmployeeLeaveCreditsHistory';
import EmployeeLeaveCredits from '../../models/entities/EmployeeLeaveCredits';

interface State extends Searchable {
  employeeLeaveCreditsHistory: EmployeeLeaveCreditsHistory[];
  employeeLeaveCredits: EmployeeLeaveCredits | undefined;
  isModalShow: boolean;
}
const initialState: State = {
  employeeLeaveCreditsHistory: [],
  employeeLeaveCredits: undefined,
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
    setEmployeeLeaveCredits(
      state,
      action: PayloadAction<EmployeeLeaveCredits | undefined>
    ) {
      state.employeeLeaveCredits = action.payload;
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
        state.employeeLeaveCredits = undefined;
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
