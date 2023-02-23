import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CustomReturn from '../../client-model/CustomReturn';
import Designation from '../../entities/Designation';
import Employee from '../../entities/Employee';
import Office from '../../entities/Office';
import { officeActions } from './office-reducer';

interface State {
  employee: Employee;
  offices: Office[];
  designations: Designation[];
  isModalShow: boolean;
}

export const employeeInitialState: Employee = {
  id: 0,
  firstName: '',
  lastName: '',
  middleName: '',
  extension: '',
  fullName: '',
  officeId: undefined,
  designationId: undefined,
};

const initialState: State = {
  employee: employeeInitialState,
  offices: [],
  designations: [],
  isModalShow: false,
};

const employeeModalSlice = createSlice({
  name: 'employee-modal',
  initialState: initialState,
  reducers: {
    setEmployee(state, action: PayloadAction<Employee | undefined>) {
      state.employee = action.payload ?? employeeInitialState;
    },
    updateEmployee(state, action: PayloadAction<CustomReturn>) {
      state.employee = {
        ...state.employee,
        [action.payload.elementName]: action.payload.value,
      };
    },
    updateOffice(state, action: PayloadAction<string>) {
      let office = state.offices
        .slice()
        .filter((x) => x.id === +action.payload)[0];
      state.employee = {
        ...state.employee,
        officeId: office.id,
        office: office,
        designation: undefined,
        designationId: undefined,
      };
      state.designations =
        office.designations?.map((x) => x.designation!) ?? [];
    },
    updateDesignation(state, action: PayloadAction<string>) {
      let designation = state.designations
        .slice()
        .filter((x) => x.id === +action.payload)[0];
      state.employee = {
        ...state.employee,
        designation: designation,
        designationId: designation.id,
      };
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
    },
    setOffices(state, action: PayloadAction<Office[]>) {
      state.offices = action.payload;
    },
  },
});

export default employeeModalSlice.reducer;
export const employeeModalActions = employeeModalSlice.actions;