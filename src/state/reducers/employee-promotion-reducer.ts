import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toDisplayAmount } from '../../helper';
import CustomReturn from '../../models/client-model/CustomReturn';
import Employee from '../../models/entities/Employee';
import EmployeeHistory from '../../models/entities/EmployeeHistory';
import NatureOfEmployment from '../../models/entities/NatureOfEmployment';
import Office from '../../models/entities/Office';
import Position from '../../models/entities/Position';
interface Promotion {
  employeeId: number;
  appointmentDate: Date;
  natureOfEmploymentId: number | undefined;
  officeId: number | undefined;
  positionId: number | undefined;
  detailedOfficeId?: number | undefined;
  detailedPositionId?: number | undefined;
  salaryGrade?: number | undefined;
  step?: number | undefined;
  salary: number;

  tempSalary: string;
}
interface State {
  employee: Employee | undefined;
  employeePromotion: Promotion;
  offices: Office[];
  allPositions: Position[];
  positions: Position[];
  detailedPositions: Position[];
  natureOfEmployments: NatureOfEmployment[];
  isModalShow: boolean;
  isRegular: boolean;
}
const employeePromotionInitialState: Promotion = {
  employeeId: 0,
  appointmentDate: new Date(),
  natureOfEmploymentId: undefined,
  officeId: undefined,
  positionId: undefined,
  salary: 0,
  tempSalary: '0.00',
};

const initialState: State = {
  employee: undefined,
  employeePromotion: employeePromotionInitialState,
  offices: [],
  allPositions: [],
  positions: [],
  detailedPositions: [],
  isModalShow: false,
  natureOfEmployments: [],
  isRegular: false,
};

const employeePromotionSlice = createSlice({
  name: 'employee-promotion',
  initialState: initialState,
  reducers: {
    setEmployee(state, action: PayloadAction<Employee | undefined>) {
      state.employee = action.payload;
      state.employeePromotion = {
        ...employeePromotionInitialState,
        employeeId: action.payload?.id ?? 0,
      };
    },
    updateEmployeePromotion(state, action: PayloadAction<CustomReturn>) {
      state.employeePromotion = {
        ...state.employeePromotion,
        [action.payload.elementName]: action.payload.value,
      };
      if (action.payload.elementName === 'natureOfEmploymentId') {
        state.isRegular =
          state.natureOfEmployments.filter(
            (x) => x.id === +action.payload.value
          )?.[0]?.isRegular ?? false;
      }
      if (action.payload.elementName === 'officeId') {
        state.positions =
          state.offices
            .filter((x) => x.id === state.employeePromotion.officeId)?.[0]
            ?.positions?.map((x) => x.position!) ?? state.allPositions;
        state.positions = !state.positions.slice().length
          ? state.allPositions
          : state.positions;
      }
      if (action.payload.elementName === 'detailedOfficeId') {
        state.detailedPositions =
          state.offices
            .filter(
              (x) => x.id === state.employeePromotion.detailedOfficeId
            )?.[0]
            ?.positions?.map((x) => x.position!) ?? state.allPositions;
        state.detailedPositions = !state.detailedPositions.slice().length
          ? state.allPositions
          : state.detailedPositions;
      }
      if (action.payload.elementName === 'tempSalary') {
        state.employeePromotion = {
          ...state.employeePromotion,
          salary: action.payload.value.replaceAll(',', ''),
        };
      }
    },
    setOffices(state, action: PayloadAction<Office[]>) {
      state.offices = action.payload;
      state.positions =
        state.offices
          .filter((x) => x.id === state.employeePromotion.officeId)?.[0]
          ?.positions?.map((x) => x.position!) ?? state.allPositions;
      state.detailedPositions =
        state.offices
          .filter((x) => x.id === state.employeePromotion.detailedOfficeId)?.[0]
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
          .filter((x) => x.id === state.employeePromotion.officeId)?.[0]
          ?.positions?.map((x) => x.position!) ?? state.allPositions;
      state.detailedPositions =
        state.offices
          .filter((x) => x.id === state.employeePromotion.detailedOfficeId)?.[0]
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

export default employeePromotionSlice.reducer;
export const employeePromotionActions = employeePromotionSlice.actions;
