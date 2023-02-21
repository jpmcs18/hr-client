import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stat } from 'fs';
import Employee from '../../entities/Employee';

interface State {
  employees: Employee[];
  selectedEmployee: Employee | undefined;
  pageCount: number;
  currentPage: number;
  searchKey: string;
  isModalShow: boolean;
}
const initialState: State = {
  employees: [],
  selectedEmployee: undefined,
  pageCount: 0,
  currentPage: 1,
  searchKey: '',
  isModalShow: false,
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState: initialState,
  reducers: {
    fill(state, action: PayloadAction<Employee[]>) {
      state.employees = action.payload;
      state.selectedEmployee = undefined;
    },
    setSearchKey(state, action: PayloadAction<string>) {
      state.searchKey = action.payload;
    },
    setPageCount(state, action: PayloadAction<number>) {
      state.pageCount = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSelected(state, action: PayloadAction<Employee | undefined>) {
      state.selectedEmployee = action.payload;
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
    },
  },
});

export default employeeSlice.reducer;
export const employeeActions = employeeSlice.actions;
