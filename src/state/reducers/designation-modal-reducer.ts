import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Designation from '../../models/entities/Designation';

interface State {
  designation: Designation;
  isModalShow: boolean;
}
const designationInitialState = { id: 0, description: '' };
const initialState: State = {
  designation: designationInitialState,
  isModalShow: false,
};

const designationModalSlice = createSlice({
  name: 'designation-modal',
  initialState: initialState,
  reducers: {
    setDesignation(state, action: PayloadAction<Designation | undefined>) {
      state.designation = action.payload ?? designationInitialState;
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
    },
  },
});

export default designationModalSlice.reducer;
export const designationModalActions = designationModalSlice.actions;
