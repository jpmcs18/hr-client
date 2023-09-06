import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CustomReturn from '../../models/client-model/CustomReturn';
import Searchable from '../../models/client-model/Searchable';
import Employee from '../../models/entities/Employee';
import Office from '../../models/entities/Office';

interface State {
  offices: Office[];
  selectedOffice: Office | undefined;
  employees: Employee[];
  selectedEmployee: Employee | undefined;
  officeSearch: Searchable;
  employeeSearch: Searchable;
  startDate: Date;
  endDate: Date;
  selectedOption: string;
  selectedSegregation: string;
}

const searchInitialState: Searchable = {
  key: '',
  currentPage: 1,
  pageCount: 0,
  initiateSearch: false,
};

const initialState: State = {
  offices: [],
  selectedOffice: undefined,
  employees: [],
  selectedEmployee: undefined,
  officeSearch: searchInitialState,
  employeeSearch: searchInitialState,
  startDate: new Date(),
  endDate: new Date(),
  selectedOption: '1',
  selectedSegregation: '1',
};

const dtrExportSlice = createSlice({
  name: 'dtr-export',
  initialState: initialState,
  reducers: {
    setOffices(state, action: PayloadAction<Office[]>) {
      state.offices = action.payload;
    },
    setSelectedOffice(state, action: PayloadAction<Office | undefined>) {
      state.selectedOffice = action.payload;
    },
    setEmployees(state, action: PayloadAction<Employee[]>) {
      state.employees = action.payload;
    },
    setSelectedEmployee(state, action: PayloadAction<Employee | undefined>) {
      state.selectedEmployee = action.payload;
    },
    setOfficeSearch(state, action: PayloadAction<CustomReturn>) {
      state.officeSearch = {
        ...state.officeSearch,
        [action.payload.elementName]: action.payload.value,
      };
    },
    setEmployeeSearch(state, action: PayloadAction<CustomReturn>) {
      state.employeeSearch = {
        ...state.employeeSearch,
        [action.payload.elementName]: action.payload.value,
      };
    },
    setStartDate(state, action: PayloadAction<Date>) {
      state.startDate = action.payload;
    },
    setEndDate(state, action: PayloadAction<Date>) {
      state.endDate = action.payload;
    },
    setSelectedOption(state, action: PayloadAction<string>) {
      state.selectedOption = action.payload;
    },
    setSelectedSegregation(state, action: PayloadAction<string>) {
      state.selectedSegregation = action.payload;
    },
  },
});

export default dtrExportSlice.reducer;
export const dtrExportActions = dtrExportSlice.actions;
