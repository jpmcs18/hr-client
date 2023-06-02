import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CustomReturn from '../../models/client-model/CustomReturn';
import Employee from '../../models/entities/Employee';
import EmployeeLeaveCredits from '../../models/entities/EmployeeLeaveCredits';
import LeaveType from '../../models/entities/LeaveType';

interface State {
  employee: Employee | undefined;
  leaveTypes: LeaveType[];
  employeeLeaveCredits: EmployeeLeaveCredits;
  isModalShow: boolean;
}
const employeeLeaveCreditsInitialState: EmployeeLeaveCredits = {
  id: 0,
  employeeId: 0,
  leaveTypeId: undefined,
  credits: 0,
};
const initialState: State = {
  employee: undefined,
  leaveTypes: [],
  employeeLeaveCredits: employeeLeaveCreditsInitialState,
  isModalShow: false,
};

const employeeLeaveCreditsModalSlice = createSlice({
  name: 'employee-leave-credits-modal',
  initialState: initialState,
  reducers: {
    setEmployee(state, action: PayloadAction<Employee | undefined>) {
      state.employee = action.payload;
      state.employeeLeaveCredits = {
        ...state.employeeLeaveCredits,
        employeeId: action.payload?.id,
      };
    },
    setLeaveTypes(state, action: PayloadAction<LeaveType[]>) {
      state.leaveTypes = action.payload;
    },
    setEmployeeLeaveCredits(
      state,
      action: PayloadAction<EmployeeLeaveCredits | undefined>
    ) {
      state.employeeLeaveCredits =
        action.payload ?? employeeLeaveCreditsInitialState;
      state.employeeLeaveCredits = {
        ...state.employeeLeaveCredits,
        employeeId: state.employee?.id,
      };
    },
    updateEmployeeLeaveCredits(state, action: PayloadAction<CustomReturn>) {
      state.employeeLeaveCredits = {
        ...state.employeeLeaveCredits,
        [action.payload.elementName]: action.payload.value,
      };
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
      if (!action.payload) {
        state.employee = undefined;
        state.employeeLeaveCredits = employeeLeaveCreditsInitialState;
      }
    },
  },
});

export default employeeLeaveCreditsModalSlice.reducer;
export const employeeLeaveCreditsModalActions =
  employeeLeaveCreditsModalSlice.actions;
