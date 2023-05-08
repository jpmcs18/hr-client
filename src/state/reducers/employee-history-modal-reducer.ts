import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CustomReturn from '../../models/client-model/CustomReturn';
import Employee from '../../models/entities/Employee';
import EmployeeHistory from '../../models/entities/EmployeeHistory';
import PersonalHistory from '../../models/entities/PersonalHistory';

interface SearchState {
  currentPage: number;
  pageCount: number;
  initiateSearch: boolean;
}

interface State {
  employee: Employee | undefined;
  employeeHistories: EmployeeHistory[];
  personalHistories: PersonalHistory[];
  selectedPersonalHistory: PersonalHistory | undefined;
  selectedEmployeeHistory: EmployeeHistory | undefined;
  isModalShow: boolean;
  employeeHistorySearch: SearchState;
  personalHistorySearch: SearchState;
  selectedTab: number;
}

const initialSearchState: SearchState = {
  currentPage: 1,
  pageCount: 0,
  initiateSearch: true,
};

const initialState: State = {
  employee: undefined,
  employeeHistories: [],
  personalHistories: [],
  selectedPersonalHistory: undefined,
  selectedEmployeeHistory: undefined,
  isModalShow: false,
  employeeHistorySearch: initialSearchState,
  personalHistorySearch: initialSearchState,
  selectedTab: 1,
};

const employeeHistoryModalSlice = createSlice({
  name: 'employee-history-modal',
  initialState: initialState,
  reducers: {
    setEmployee(state, action: PayloadAction<Employee | undefined>) {
      state.employee = action.payload;
      state.employeeHistorySearch = initialSearchState;
      state.personalHistorySearch = initialSearchState;
    },
    setSelectedTab(state, action: PayloadAction<number>) {
      state.selectedTab = action.payload;
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;

      if (action.payload) {
        state.employeeHistorySearch = initialSearchState;
        state.personalHistorySearch = initialSearchState;
      }
    },
    fillEmployeeHistory(state, action: PayloadAction<EmployeeHistory[]>) {
      state.employeeHistories = action.payload;
      state.selectedEmployeeHistory = undefined;
    },
    fillPersonalHistory(state, action: PayloadAction<PersonalHistory[]>) {
      state.personalHistories = action.payload;
      state.selectedPersonalHistory = undefined;
    },
    setEmployeeHistorySearch(state, action: PayloadAction<CustomReturn>) {
      state.employeeHistorySearch = {
        ...state.employeeHistorySearch,
        [action.payload.elementName]: action.payload.value,
      };
    },
    setPersonalHistorySearch(state, action: PayloadAction<CustomReturn>) {
      state.personalHistorySearch = {
        ...state.personalHistorySearch,
        [action.payload.elementName]: action.payload.value,
      };
    },
    setSelectedEmployeeHistory(
      state,
      action: PayloadAction<EmployeeHistory | undefined>
    ) {
      state.selectedEmployeeHistory = action.payload;
    },
    setSelectedPersonalHistory(
      state,
      action: PayloadAction<PersonalHistory | undefined>
    ) {
      state.selectedPersonalHistory = action.payload;
    },
  },
});

export default employeeHistoryModalSlice.reducer;
export const employeeHistoryModalActions = employeeHistoryModalSlice.actions;
