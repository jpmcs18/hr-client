import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Employee from '../../models/entities/Employee';
import EmployeeLeaveCredits from '../../models/entities/EmployeeLeaveCredits';

interface State {
  employee: Employee | undefined;
  employeeLeaveCredits: EmployeeLeaveCredits[];
  selectedEmployeeLeaveCredits: EmployeeLeaveCredits | undefined;
  initiateSearch: boolean;
  isModalShow: boolean;
}

const initialState: State = {
  employee: undefined,
  employeeLeaveCredits: [],
  selectedEmployeeLeaveCredits: undefined,
  initiateSearch: false,
  isModalShow: false,
};

const employeeLeaveCreditsSlice = createSlice({
  name: 'employee-leave-credits',
  initialState: initialState,
  reducers: {
    setEmployee(state, action: PayloadAction<Employee | undefined>) {
      state.employee = action.payload;
    },
    setEmployeeLeaveCredits(
      state,
      action: PayloadAction<EmployeeLeaveCredits[]>
    ) {
      state.employeeLeaveCredits = action.payload;
      state.selectedEmployeeLeaveCredits = undefined;
    },
    setSelectedEmployeeLeaveCredits(
      state,
      action: PayloadAction<EmployeeLeaveCredits | undefined>
    ) {
      state.selectedEmployeeLeaveCredits = action.payload;
    },
    setInitiateSearch(state, action: PayloadAction<boolean>) {
      state.initiateSearch = action.payload;
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
      if (!action.payload) {
        state.employee = undefined;
        state.employeeLeaveCredits = [];
        state.selectedEmployeeLeaveCredits = undefined;
      }
    },
  },
});

export default employeeLeaveCreditsSlice.reducer;
export const employeeLeaveCreditsActions = employeeLeaveCreditsSlice.actions;
