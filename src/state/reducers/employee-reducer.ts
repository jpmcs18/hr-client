import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Searchable from '../../models/client-model/Searchable';
import Employee from '../../models/entities/Employee';
import Gender from '../../models/entities/Gender';
import Office from '../../models/entities/Office';
import Position from '../../models/entities/Position';

interface State extends Searchable {
  employees: Employee[];
  selectedEmployee: Employee | undefined;
  positions: Position[];
  offices: Office[];
  genders: Gender[];
  selectedOfficeId: number | undefined;
  selectedPositionId: number | undefined;
  selectedGenderId: number | undefined;
}
const initialState: State = {
  employees: [],
  selectedEmployee: undefined,
  key: '',
  currentPage: 1,
  pageCount: 0,
  initiateSearch: false,
  positions: [],
  offices: [],
  genders: [],
  selectedOfficeId: undefined,
  selectedPositionId: undefined,
  selectedGenderId: undefined,
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState: initialState,
  reducers: {
    fill(state, action: PayloadAction<Employee[]>) {
      state.employees = action.payload;
      state.selectedEmployee = undefined;
    },
    setOffices(state, action: PayloadAction<Office[]>) {
      state.offices = action.payload;
    },
    setPositions(state, action: PayloadAction<Position[]>) {
      state.positions = action.payload;
    },
    setGenders(state, action: PayloadAction<Gender[]>) {
      state.genders = action.payload;
    },
    setSelectedOffice(state, action: PayloadAction<number | undefined>) {
      state.selectedOfficeId = action.payload;
    },
    setSelectedPosition(state, action: PayloadAction<number | undefined>) {
      state.selectedPositionId = action.payload;
    },
    setSelectedGender(state, action: PayloadAction<number | undefined>) {
      state.selectedGenderId = action.payload;
    },
    setSelected(state, action: PayloadAction<Employee | undefined>) {
      state.selectedEmployee = action.payload;
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
      console.log(action.payload);
      state.initiateSearch = action.payload;
    },
  },
});

export default employeeSlice.reducer;
export const employeeActions = employeeSlice.actions;
