import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Searchable from '../../models/client-model/Searchable';
import Employee from '../../models/entities/Employee';
import Office from '../../models/entities/Office';

interface State extends Searchable {
  offices: Office[];
  checkedAllOffice: boolean;
  selectedOffice: Office | undefined;
  employees: Employee[];
  checkedAllEmployee: boolean;
  selectedEmployee: Employee | undefined;
  workScheduleId: number | undefined;
  selectedOption: string | undefined;
  isModalShow: boolean;
}
const initialState: State = {
  offices: [],
  checkedAllOffice: false,
  employees: [],
  checkedAllEmployee: false,
  selectedEmployee: undefined,
  selectedOffice: undefined,
  key: '',
  currentPage: 1,
  pageCount: 0,
  initiateSearch: false,
  isModalShow: false,
  selectedOption: undefined,
  workScheduleId: undefined,
};

const employeeScheduleModalSlice = createSlice({
  name: 'employee-schedule-modal',
  initialState: initialState,
  reducers: {
    setSelectedOption(state, action: PayloadAction<string | undefined>) {
      state.selectedOption = action.payload;
    },
    setWorkScheduleId(state, action: PayloadAction<number | undefined>) {
      state.workScheduleId = action.payload;
    },
    setCheckedAllOffice(state) {
      let checked = !state.checkedAllOffice;
      state.checkedAllOffice = checked;
      state.offices = state.offices.slice().map((x) => {
        return { ...x, isChecked: checked };
      });
    },
    setCheckedOffice(state, action: PayloadAction<Office>) {
      var checked = !action.payload.isChecked;
      state.selectedOffice = { ...state.selectedOffice!, isChecked: checked };
      state.offices = state.offices.slice().map((x) => {
        if (x.id === action.payload.id) {
          return { ...x, isChecked: checked };
        }
        return x;
      });

      state.checkedAllOffice =
        state.offices.slice().filter((x) => x.isChecked).length ===
          state.offices.slice().length && !!state.offices.slice().length;

      state.employees = state.employees.slice().map((x) => {
        return { ...x, isChecked: checked };
      });
      state.checkedAllEmployee = checked;
    },
    setCheckedAllEmployee(state) {
      let checked = !state.checkedAllEmployee;
      state.checkedAllEmployee = checked;
      state.employees = state.employees.slice().map((x) => {
        return { ...x, isChecked: checked };
      });
      state.selectedOffice = { ...state.selectedOffice!, isChecked: checked };
      state.offices = state.offices.slice().map((x) => {
        if (x.id === state.selectedOffice?.id) {
          return { ...x, isChecked: checked };
        }
        return x;
      });
    },
    setCheckedEmployee(state, action: PayloadAction<Employee>) {
      state.employees = state.employees.slice().map((x) => {
        if (x.id === action.payload.id) {
          return { ...x, isChecked: !x.isChecked };
        }
        return x;
      });
      let checked =
        state.employees.slice().filter((x) => x.isChecked).length ===
          state.employees.slice().length && !!state.employees.slice().length;
      state.checkedAllEmployee = checked;
      state.selectedOffice = { ...state.selectedOffice!, isChecked: checked };
      state.offices = state.offices.slice().map((x) => {
        if (x.id === state.selectedOffice?.id) {
          return { ...x, isChecked: checked };
        }
        return x;
      });
    },
    setOffices(state, action: PayloadAction<Office[]>) {
      state.offices = action.payload;
      state.selectedOffice = undefined;
      state.checkedAllOffice = false;
    },
    setEmployees(state, action: PayloadAction<Employee[]>) {
      let checked = state.selectedOffice?.isChecked ?? false;
      state.employees = action.payload.slice().map((x) => {
        return { ...x, isChecked: checked };
      });
      state.selectedEmployee = undefined;
      state.checkedAllEmployee = checked;
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
      if (!action.payload) {
        state.offices = [];
        state.checkedAllOffice = false;
        state.employees = [];
        state.checkedAllEmployee = false;
        state.selectedEmployee = undefined;
        state.selectedOffice = undefined;
        state.key = '';
        state.currentPage = 1;
        state.pageCount = 0;
        state.initiateSearch = false;
        state.selectedOption = undefined;
        state.workScheduleId = undefined;
      }
    },
    setSelectedEmployee(state, action: PayloadAction<Employee | undefined>) {
      state.selectedEmployee = action.payload;
    },
    setSelectedOffice(state, action: PayloadAction<Office | undefined>) {
      state.selectedOffice = action.payload;
    },
    setkey(state, action: PayloadAction<string>) {
      state.key = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setPageCount(state, action: PayloadAction<number>) {
      state.pageCount = action.payload;
    },
    setInitiateSearch(state, action: PayloadAction<boolean>) {
      state.initiateSearch = action.payload;
    },
  },
});

export default employeeScheduleModalSlice.reducer;
export const employeeScheduleModalActions = employeeScheduleModalSlice.actions;
