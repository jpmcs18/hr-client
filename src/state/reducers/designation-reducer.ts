import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Designation from '../../entities/Designation';

interface State {
  designations: Designation[];
  selectedDesignation: Designation | undefined;
  pageCount: number;
  currentPage: number;
  searchKey: string;
}
const initialState: State = {
  designations: [],
  selectedDesignation: undefined,
  pageCount: 0,
  currentPage: 1,
  searchKey: '',
};

const designationSlice = createSlice({
  name: 'designation',
  initialState: initialState,
  reducers: {
    fill(state, action: PayloadAction<Designation[]>) {
      state.designations = action.payload;
      state.selectedDesignation = undefined;
    },
    setSearchKey(state, action: PayloadAction<string>) {
      state.searchKey = action.payload;
    },
    setPageCount(state, action: PayloadAction<number>) {
      state.pageCount = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSelected(state, action: PayloadAction<Designation | undefined>) {
      state.selectedDesignation = action.payload;
    },
  },
});

export default designationSlice.reducer;
export const designationActions = designationSlice.actions;
