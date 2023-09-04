import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Searchable from '../../models/client-model/Searchable';
import WorkSchedule from '../../models/entities/WorkSchedule';

interface State extends Searchable {
  workSchedules: WorkSchedule[];
  selectedWorkSchedule: WorkSchedule | undefined;
  startDate: Date | undefined;
  endDate: Date | undefined;
}
const initialState: State = {
  workSchedules: [],
  selectedWorkSchedule: undefined,
  key: '',
  currentPage: 1,
  pageCount: 0,
  initiateSearch: true,
  startDate: undefined,
  endDate: undefined,
};

const workScheduleSlice = createSlice({
  name: 'work-schedule',
  initialState: initialState,
  reducers: {
    fill(state, action: PayloadAction<WorkSchedule[]>) {
      state.workSchedules = action.payload;
      state.selectedWorkSchedule = undefined;
    },
    setSelected(state, action: PayloadAction<WorkSchedule | undefined>) {
      state.selectedWorkSchedule = action.payload;
    },
    setStartDate(state, action: PayloadAction<Date | undefined>) {
      state.startDate = action.payload;
    },
    setEndDate(state, action: PayloadAction<Date | undefined>) {
      state.endDate = action.payload;
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

export default workScheduleSlice.reducer;
export const workScheduleActions = workScheduleSlice.actions;
