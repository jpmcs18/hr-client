import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Searchable from '../../models/client-model/Searchable';
import Employee from '../../models/entities/Employee';

interface State extends Searchable {
  employees: Employee[];
  selectedEmployee: Employee | undefined;
  isModalShow: boolean;
  onCloseFunction: ((employee: Employee) => void) | undefined;
  isRegular: boolean | undefined;
}
const initialState: State = {
  employees: [],
  selectedEmployee: undefined,
  key: '',
  currentPage: 1,
  pageCount: 0,
  initiateSearch: false,
  isModalShow: false,
  onCloseFunction: undefined,
  isRegular: undefined,
};

const employeeSearchableSlice = createSlice({
  name: 'employee-searchable',
  initialState: initialState,
  reducers: {
    fill(state, action: PayloadAction<Employee[]>) {
      state.employees = action.payload;
      state.selectedEmployee = undefined;
    },
    setIsRegular(state, action: PayloadAction<boolean | undefined>) {
      state.isRegular = action.payload;
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
      state.initiateSearch = action.payload;
    },
    setOnCloseFunction(
      state,
      action: PayloadAction<(employee: Employee) => void>
    ) {
      state.onCloseFunction = action.payload;
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
      state.employees = [];
      state.selectedEmployee = undefined;
      state.isRegular = undefined;
    },
  },
});

export default employeeSearchableSlice.reducer;
export const employeeSearchableActions = employeeSearchableSlice.actions;
