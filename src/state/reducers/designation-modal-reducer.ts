import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Designation from '../../entities/Designation';

interface State {
  designation: Designation;
  isModalShow: boolean;
}

const initialState: State = {
  designation: { id: 0, description: '' },
  isModalShow: false,
};

const designationModalSlice = createSlice({
  name: 'designation-modal',
  initialState: initialState,
  reducers: {
    setDesignation(state, action: PayloadAction<Designation>) {
      state.designation = action.payload;
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
    },
  },
});

export default designationModalSlice.reducer;
export const designationModalActions = designationModalSlice.actions;
