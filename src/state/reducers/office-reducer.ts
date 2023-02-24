import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Office from '../../models/entities/Office';

interface State {
  offices: Office[];
  selectedOffice: Office | undefined;
}
const initialState: State = {
  offices: [],
  selectedOffice: undefined,
};

const officeSlice = createSlice({
  name: 'office',
  initialState: initialState,
  reducers: {
    fill(state, action: PayloadAction<Office[]>) {
      state.offices = action.payload;
      state.selectedOffice = undefined;
    },
    setSelected(state, action: PayloadAction<Office | undefined>) {
      state.selectedOffice = action.payload;
    },
  },
});

export default officeSlice.reducer;
export const officeActions = officeSlice.actions;
