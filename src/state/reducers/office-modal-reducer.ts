import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Office from '../../entities/Office';

interface State {
  office: Office;
  isModalShow: boolean;
}

const initialState: State = {
  office: { id: 0, abbreviation: '', description: '', designations: [] },
  isModalShow: false,
};

const officeModalSlice = createSlice({
  name: 'office-modal',
  initialState: initialState,
  reducers: {
    setOffice(state, action: PayloadAction<Office>) {
      state.office = action.payload;
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
    },
  },
});

export default officeModalSlice.reducer;
export const officeModalActions = officeModalSlice.actions;
