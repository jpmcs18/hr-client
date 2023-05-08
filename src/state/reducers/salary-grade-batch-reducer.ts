import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Searchable from '../../models/client-model/Searchable';
import SalaryGradeBatch from '../../models/entities/SalaryGradeBatch';

interface State extends Searchable {
  salaryGradeBatches: SalaryGradeBatch[];
  selectedSalaryGradeBatch: SalaryGradeBatch | undefined;
}
const initialState: State = {
  salaryGradeBatches: [],
  selectedSalaryGradeBatch: undefined,
  key: '',
  currentPage: 1,
  pageCount: 0,
  initiateSearch: true,
};

const salaryGradeBatchSlice = createSlice({
  name: 'salary-grade-batch',
  initialState: initialState,
  reducers: {
    fill(state, action: PayloadAction<SalaryGradeBatch[]>) {
      state.salaryGradeBatches = action.payload;
      state.selectedSalaryGradeBatch = undefined;
    },
    setSelected(state, action: PayloadAction<SalaryGradeBatch | undefined>) {
      state.selectedSalaryGradeBatch = action.payload;
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

export default salaryGradeBatchSlice.reducer;
export const salaryGradeBatchActions = salaryGradeBatchSlice.actions;
