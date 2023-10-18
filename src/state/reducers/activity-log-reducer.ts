import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Searchable from '../../models/client-model/Searchable';
import ActivityLog from '../../models/entities/ActivityLog';
import Employee from '../../models/entities/Employee';

interface State extends Searchable {
  activityLogs: ActivityLog[];
  startDate: Date | undefined;
  endDate: Date | undefined;
  employee: Employee | undefined;
}
const initialState: State = {
  activityLogs: [],
  startDate: undefined,
  endDate: undefined,
  employee: undefined,
  key: '',
  currentPage: 1,
  pageCount: 0,
  initiateSearch: false,
};

const activityLogSlice = createSlice({
  name: 'activity-log',
  initialState: initialState,
  reducers: {
    fill(state, action: PayloadAction<ActivityLog[]>) {
      state.activityLogs = action.payload;
    },
    setStartDate(state, action: PayloadAction<Date | undefined>) {
      state.startDate = action.payload;
    },
    setEndDate(state, action: PayloadAction<Date | undefined>) {
      state.endDate = action.payload;
    },
    setEmployee(state, action: PayloadAction<Employee | undefined>) {
      state.employee = action.payload;
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

export default activityLogSlice.reducer;
export const activityLogActions = activityLogSlice.actions;
