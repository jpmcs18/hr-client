import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CustomReturn from '../../models/client-model/CustomReturn';
import EmployeeHistory from '../../models/entities/EmployeeHistory';
import NatureOfEmployment from '../../models/entities/NatureOfEmployment';
import Office from '../../models/entities/Office';
import Position from '../../models/entities/Position';

interface State {
  employeeHistory: EmployeeHistory;
  offices: Office[];
  allPositions: Position[];
  positions: Position[];
  detailedPositions: Position[];
  natureOfEmployments: NatureOfEmployment[];
  isModalShow: boolean;
}
const employeeHistoryInitialState: EmployeeHistory = {
  id: 0,
  employeeId: 0,
  natureOfEmploymentId: undefined,
  officeId: undefined,
  positionId: undefined,
  detailedOfficeId: undefined,
  detailedPositionId: undefined,
  salary: 0,
  nolawop: undefined,
};

const initialState: State = {
  employeeHistory: employeeHistoryInitialState,
  offices: [],
  allPositions: [],
  positions: [],
  detailedPositions: [],
  isModalShow: false,
  natureOfEmployments: [],
};

const serviceRecordModalSlice = createSlice({
  name: 'service-record-modal',
  initialState: initialState,
  reducers: {
    setEmployeeHistory(
      state,
      action: PayloadAction<EmployeeHistory | undefined>
    ) {
      state.employeeHistory = action.payload ?? employeeHistoryInitialState;
      state.positions =
        state.offices
          .filter((x) => x.id === state.employeeHistory.officeId)?.[0]
          ?.positions?.map((x) => x.position!) ?? state.allPositions;
      state.detailedPositions =
        state.offices
          .filter((x) => x.id === state.employeeHistory.detailedOfficeId)?.[0]
          ?.positions?.map((x) => x.position!) ?? state.allPositions;
      state.positions = !state.positions.slice().length
        ? state.allPositions
        : state.positions;
      state.detailedPositions = !state.detailedPositions.slice().length
        ? state.allPositions
        : state.detailedPositions;
    },
    updateEmployeeHistory(state, action: PayloadAction<CustomReturn>) {
      state.employeeHistory = {
        ...state.employeeHistory,
        [action.payload.elementName]: action.payload.value,
      };

      if (action.payload.elementName === 'officeId') {
        state.positions =
          state.offices
            .filter((x) => x.id === state.employeeHistory.officeId)?.[0]
            ?.positions?.map((x) => x.position!) ?? state.allPositions;
        state.positions = !state.positions.slice().length
          ? state.allPositions
          : state.positions;
      }
      if (action.payload.elementName === 'detailedOfficeId') {
        state.detailedPositions =
          state.offices
            .filter((x) => x.id === state.employeeHistory.detailedOfficeId)?.[0]
            ?.positions?.map((x) => x.position!) ?? state.allPositions;
        state.detailedPositions = !state.detailedPositions.slice().length
          ? state.allPositions
          : state.detailedPositions;
      }
    },
    setOffices(state, action: PayloadAction<Office[]>) {
      state.offices = action.payload;
      state.positions =
        state.offices
          .filter((x) => x.id === state.employeeHistory.officeId)?.[0]
          ?.positions?.map((x) => x.position!) ?? state.allPositions;
      state.detailedPositions =
        state.offices
          .filter((x) => x.id === state.employeeHistory.detailedOfficeId)?.[0]
          ?.positions?.map((x) => x.position!) ?? state.allPositions;

      state.positions = !state.positions.slice().length
        ? state.allPositions
        : state.positions;
      state.detailedPositions = !state.detailedPositions.slice().length
        ? state.allPositions
        : state.detailedPositions;
    },
    setNatureOfEmployments(state, action: PayloadAction<NatureOfEmployment[]>) {
      state.natureOfEmployments = action.payload;
    },
    setPositions(state, action: PayloadAction<Position[]>) {
      state.allPositions = action.payload;
      state.positions =
        state.offices
          .filter((x) => x.id === state.employeeHistory.officeId)?.[0]
          ?.positions?.map((x) => x.position!) ?? state.allPositions;
      state.detailedPositions =
        state.offices
          .filter((x) => x.id === state.employeeHistory.detailedOfficeId)?.[0]
          ?.positions?.map((x) => x.position!) ?? state.allPositions;

      state.positions = !state.positions.slice().length
        ? state.allPositions
        : state.positions;
      state.detailedPositions = !state.detailedPositions.slice().length
        ? state.allPositions
        : state.detailedPositions;
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
    },
  },
});

export default serviceRecordModalSlice.reducer;
export const serviceRecordModalActions = serviceRecordModalSlice.actions;
