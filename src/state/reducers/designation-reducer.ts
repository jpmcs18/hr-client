import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Designation from '../../models/entities/Designation';

interface State {
  designations: Designation[];
  selectedDesignation: Designation | undefined;
}
const initialState: State = {
  designations: [],
  selectedDesignation: undefined,
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
  },
});

export default designationSlice.reducer;
export const designationActions = designationSlice.actions;
