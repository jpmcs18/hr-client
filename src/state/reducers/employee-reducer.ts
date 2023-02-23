import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Employee from '../../entities/Employee';

interface State {
  employees: Employee[];
  selectedEmployee: Employee | undefined;
}
const initialState: State = {
  employees: [],
  selectedEmployee: undefined,
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState: initialState,
  reducers: {
    fill(state, action: PayloadAction<Employee[]>) {
      state.employees = action.payload;
      state.selectedEmployee = undefined;
    },
    setSelected(state, action: PayloadAction<Employee | undefined>) {
      state.selectedEmployee = action.payload;
    },
  },
});

export default employeeSlice.reducer;
export const employeeActions = employeeSlice.actions;
