import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Searchable from '../../models/client-model/Searchable';
import Designation from '../../models/entities/Designation';

interface State extends Searchable {
  designations: Designation[];
  selectedDesignation: Designation | undefined;
}
const initialState: State = {
  designations: [],
  selectedDesignation: undefined,
  key: '',
  currentPage: 1,
  pageCount: 0,
  initiateSearch: true,
};

const designationSlice = createSlice({
  name: 'designation',
  initialState: initialState,
  reducers: {
    fill(state, action: PayloadAction<Designation[]>) {
      state.designations = action.payload;
      state.selectedDesignation = undefined;
    },
    setSelected(state, action: PayloadAction<Designation | undefined>) {
      state.selectedDesignation = action.payload;
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

export default designationSlice.reducer;
export const designationActions = designationSlice.actions;
