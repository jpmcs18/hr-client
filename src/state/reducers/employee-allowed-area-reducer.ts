import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import EmployeeAllowedArea from '../../models/entities/EmployeeAllowedArea';

interface State {
  employeeAllowedArea: EmployeeAllowedArea;
  employeeId: number;
  isModalShow: boolean;
}

const initialEmployeeAllowdAreaState: EmployeeAllowedArea = {
  id: 0,
  employeeId: 0,
  areaId: 0,
  validStartDate: undefined,
  validEndDate: undefined,
  sun: false,
  mon: false,
  tue: false,
  wed: false,
  thu: false,
  fri: false,
  sat: false,
};

const initialState: State = {
  employeeAllowedArea: initialEmployeeAllowdAreaState,
  employeeId: 0,
  isModalShow: false,
};

const employeeAllowedAreaSlice = createSlice({
  name: 'employee-allowed-area',
  initialState: initialState,
  reducers: {
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
    },
  },
});

export default employeeAllowedAreaSlice.reducer;
export const employeeAllowedAreaActions = employeeAllowedAreaSlice.actions;
