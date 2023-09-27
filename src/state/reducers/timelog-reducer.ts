import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Searchable from '../../models/client-model/Searchable';
import Employee from '../../models/entities/Employee';
import TimeLog from '../../models/entities/TimeLog';

interface State extends Searchable {
  employees: Employee[];
  timelogs: TimeLog[];
  selectedEmployee: Employee | undefined;
  selectedTimelog: TimeLog | undefined;
  refreshTimelog: boolean;
  startDate: Date;
  endDate: Date;
}
const initialState: State = {
  employees: [],
  timelogs: [],
  selectedEmployee: undefined,
  selectedTimelog: undefined,
  startDate: new Date(),
  endDate: new Date(),
  key: '',
  currentPage: 1,
  pageCount: 0,
  initiateSearch: false,
  refreshTimelog: false,
};

const timelogSlice = createSlice({
  name: 'timelog',
  initialState: initialState,
  reducers: {
    setEmployees(state, action: PayloadAction<Employee[]>) {
      state.employees = action.payload;
      state.selectedEmployee = undefined;
    },
    setStartDate(state, action: PayloadAction<Date>) {
      state.startDate = action.payload;
    },
    setEndDate(state, action: PayloadAction<Date>) {
      state.endDate = action.payload;
    },
    setSelectedEmployee(state, action: PayloadAction<Employee | undefined>) {
      state.selectedEmployee = action.payload;
      state.refreshTimelog = true;
    },
    setTimeLogs(state, action: PayloadAction<TimeLog[]>) {
      state.timelogs = action.payload;
      state.selectedTimelog = undefined;
    },
    setSelectedTimeLog(state, action: PayloadAction<TimeLog | undefined>) {
      state.selectedTimelog = action.payload;
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
    setRefreshTimelog(state, action: PayloadAction<boolean>) {
      state.refreshTimelog = action.payload;
    },
  },
});

export default timelogSlice.reducer;
export const timelogActions = timelogSlice.actions;
