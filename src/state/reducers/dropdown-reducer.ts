import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  openDropdown: string;
}

const initialState: State = {
  openDropdown: '',
};

const dropdownSlice = createSlice({
  name: 'dropdown',
  initialState: initialState,
  reducers: {
    setOpenDropdown(state, action: PayloadAction<string>) {
      state.openDropdown = action.payload;
    },
  },
});

export default dropdownSlice.reducer;
export const dropdownActions = dropdownSlice.actions;
