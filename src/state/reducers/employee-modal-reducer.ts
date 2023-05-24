import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Guid } from 'guid-typescript';
import { toCommaSeparateAmount } from '../../helper';
import CustomReturn from '../../models/client-model/CustomReturn';
import BloodType from '../../models/entities/BloodType';
import CivilStatus from '../../models/entities/CivilStatus';
import EducationalAttainment from '../../models/entities/EducationalAttainment';
import Eligibility from '../../models/entities/Eligibility';
import Employee from '../../models/entities/Employee';
import EmployeeEligibility from '../../models/entities/EmployeeEligibility';
import EmployeeRemuneration from '../../models/entities/EmployeeRemuneration';
import Gender from '../../models/entities/Gender';
import ModeOfResignation from '../../models/entities/ModeOfResignation';
import NatureOfEmployment from '../../models/entities/NatureOfEmployment';
import Office from '../../models/entities/Office';
import Position from '../../models/entities/Position';
import Remuneration from '../../models/entities/Remuneration';
import VaccinationStatus from '../../models/entities/VaccinationStatus';

interface State {
  employee: Employee;
  offices: Office[];
  detailedOffices: Office[];
  modeOfResignations: ModeOfResignation[];
  natureOfEmployments: NatureOfEmployment[];
  bloodTypes: BloodType[];
  allPositions: Position[];
  civilStatuses: CivilStatus[];
  genders: Gender[];
  educationalAttainments: EducationalAttainment[];
  vaccinationStatuses: VaccinationStatus[];
  positions: Position[];
  detailedPositions: Position[];
  eligibilities: Eligibility[];
  employeeEligibilities: EmployeeEligibility[];
  remunerations: Remuneration[];
  employeeRemunerations: EmployeeRemuneration[];
  isModalShow: boolean;
  isSalaryGradeUpdate: boolean;
}

const employeeInitialState: Employee = {
  id: 0,
  idNumber: '',
  modeOfResignationId: undefined,
  resignationDate: undefined,
  firstName: '',
  lastName: '',
  middleName: '',
  maidenMiddleName: '',
  maidenLastName: '',
  extension: '',
  fullName: '',
  officeId: undefined,
  positionId: undefined,
  natureOfEmploymentId: undefined,
  employmentDate: new Date(),
  birthDate: new Date(),
  genderId: undefined,
  bloodTypeId: undefined,
  residenceAddress: '',
  contactNumber: '',
  emailAddress: '',
  gsisNo: '',
  philHealthNo: '',
  pagIbigNo: '',
  sssNo: '',
  tinNo: '',
  isActive: true,
  educationalAttainmentId: undefined,
  skills: '',
  vaccinationStatusId: undefined,
  civilStatusId: undefined,
  height: '',
  weight: '',
  salary: 0.0,
  salaryGrade: 0,
  step: 0,
  detailedOfficeId: undefined,
  detailedPositionId: undefined,
  birthPlace: '',
};

const initialState: State = {
  employee: employeeInitialState,
  offices: [],
  positions: [],
  isModalShow: false,
  natureOfEmployments: [],
  bloodTypes: [],
  civilStatuses: [],
  genders: [],
  educationalAttainments: [],
  vaccinationStatuses: [],
  eligibilities: [],
  employeeEligibilities: [],
  allPositions: [],
  modeOfResignations: [],
  isSalaryGradeUpdate: false,
  detailedOffices: [],
  detailedPositions: [],
  remunerations: [],
  employeeRemunerations: [],
};

const employeeModalSlice = createSlice({
  name: 'employee-modal',
  initialState: initialState,
  reducers: {
    setEmployee(state, action: PayloadAction<Employee | undefined>) {
      state.employee = action.payload ?? employeeInitialState;
      state.employee = {
        ...state.employee,
        isRegular: state.employee.natureOfEmployment?.isRegular,
      };
      state.isSalaryGradeUpdate = false;
      state.employeeEligibilities =
        state.employee.employeeEligibilities
          ?.slice()
          ?.map((x) => {
            return {
              ...x,
              tempId: Guid.create().toString(),
              deleted: false,
              updated: false,
            };
          })
          .sort((a, b) =>
            a.eligibility!.description! < b.eligibility!.description! ? -1 : 1
          ) ?? [];

      state.employeeRemunerations =
        state.employee.employeeRemunerations
          ?.slice()
          ?.map((x) => {
            return {
              ...x,
              tempId: Guid.create().toString(),
              deleted: false,
              updated: false,
              tempAmount: toCommaSeparateAmount(x.amount.toString()),
            };
          })
          .sort((a, b) =>
            a.remuneration!.description! < b.remuneration!.description! ? -1 : 1
          ) ?? [];
    },
    setAllPositions(state, action: PayloadAction<Position[]>) {
      state.allPositions = action.payload;
    },
    updateEmployee(state, action: PayloadAction<CustomReturn>) {
      if (action.payload.elementName === 'salaryGrade') {
        if (state.employee.salaryGrade !== +action.payload.value) {
          state.isSalaryGradeUpdate = true;
        }
      }
      if (action.payload.elementName === 'step') {
        if (state.employee.step !== +action.payload.value) {
          state.isSalaryGradeUpdate = true;
        }
      }
      state.employee = {
        ...state.employee,
        [action.payload.elementName]: action.payload.value,
      };
      if (action.payload.elementName === 'salary') {
        state.isSalaryGradeUpdate = false;
      }
      if (action.payload.elementName === 'natureOfEmploymentId') {
        state.employee = {
          ...state.employee,
          isRegular: state.natureOfEmployments
            .slice()
            .filter((x) => x.id === +action.payload.value)?.[0]?.isRegular,
        };
      }
    },
    updateOffice(state, action: PayloadAction<string>) {
      let office = state.offices
        .slice()
        .filter((x) => x.id === +action.payload)[0];
      state.employee = {
        ...state.employee,
        officeId: office.id,
        office: office,
        position: undefined,
        positionId: undefined,
      };
      state.positions = office.positions?.map((x) => x.position!) ?? [];
    },
    updatePosition(state, action: PayloadAction<string>) {
      let position = state.allPositions
        .slice()
        .filter((x) => x.id === +action.payload)[0];
      state.employee = {
        ...state.employee,
        position: position,
        positionId: position.id,
      };
    },
    updateDetailedOffice(state, action: PayloadAction<string | undefined>) {
      if (!!action.payload) {
        let office = state.detailedOffices
          .slice()
          .filter((x) => x.id === +action.payload!)[0];
        state.employee = {
          ...state.employee,
          detailedOfficeId: office.id,
          detailedOffice: office,
          detailedPosition: undefined,
          detailedPositionId: undefined,
        };
        state.detailedPositions =
          office.positions?.map((x) => x.position!) ?? [];
      } else {
        state.employee = {
          ...state.employee,
          detailedOfficeId: undefined,
          detailedOffice: undefined,
          detailedPosition: undefined,
          detailedPositionId: undefined,
        };
        state.detailedPositions = [];
      }
    },
    updateDetailedPosition(state, action: PayloadAction<string | undefined>) {
      if (!!action.payload) {
        let position = state.allPositions
          .slice()
          .filter((x) => x.id === +action.payload!)[0];
        state.employee = {
          ...state.employee,
          detailedPosition: position,
          detailedPositionId: position.id,
        };
      } else {
        state.employee = {
          ...state.employee,
          detailedPosition: undefined,
          detailedPositionId: undefined,
        };
      }
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
    },
    setOffices(state, action: PayloadAction<Office[]>) {
      state.offices = action.payload;
      state.detailedOffices = action.payload;

      state.positions =
        action.payload
          .filter((x) => x.id === state.employee.officeId)?.[0]
          ?.positions?.map((x) => x.position!) ?? [];
      state.detailedPositions =
        action.payload
          .filter((x) => x.id === state.employee.detailedOfficeId)?.[0]
          ?.positions?.map((x) => x.position!) ?? [];
    },
    addNewEligibility(state, action: PayloadAction<string>) {
      state.employeeEligibilities.push({
        employeeId: state.employee.id,
        eligibility: state.eligibilities.filter(
          (x) => x.id === +action.payload
        )[0],
        eligibilityId: +action.payload,
        id: 0,
        rating: '',
        place: '',
        date: undefined,
        validity: undefined,
        tempId: Guid.create().toString(),
        deleted: false,
        updated: false,
        added: true,
      });
      state.eligibilities = state.eligibilities.filter(
        (x) => x.id !== +action.payload
      );
    },
    deleteEligibility(state, action: PayloadAction<EmployeeEligibility>) {
      if (action.payload.id > 0) {
        state.employeeEligibilities = state.employeeEligibilities.map((x) => {
          if (x.id === action.payload.id) {
            x.deleted = true;
          }
          return x;
        });
      } else {
        state.employeeEligibilities = state.employeeEligibilities.filter(
          (x) => x.tempId !== action.payload.tempId
        );
      }
      state.eligibilities.push(action.payload.eligibility!);
      state.eligibilities = state.eligibilities
        .slice()
        .sort((a, b) => (a.description! < b.description! ? -1 : 1));
    },
    undoDeleteEligibility(state, action: PayloadAction<number>) {
      state.employeeEligibilities = state.employeeEligibilities.map((x) => {
        if (x.id === action.payload) {
          x.deleted = false;
        }
        return x;
      });
    },
    updateEligibility(
      state,
      action: PayloadAction<{ rowId: string; element: CustomReturn }>
    ) {
      state.employeeEligibilities = state.employeeEligibilities.map((el) => {
        if (el.tempId === action.payload.rowId) {
          el = {
            ...el,
            [action.payload.element.elementName]: action.payload.element.value,
          };
          if (el.id > 0) {
            el.updated = true;
          }
        }
        return el;
      });
    },
    addNewRemuneration(state, action: PayloadAction<string>) {
      state.employeeRemunerations.push({
        employeeId: state.employee.id,
        remuneration: state.remunerations.filter(
          (x) => x.id === +action.payload
        )[0],
        remunerationId: +action.payload,
        id: 0,
        tempId: Guid.create().toString(),
        deleted: false,
        updated: false,
        added: true,
        amount: 0,
        tempAmount: '0',
      });
      state.remunerations = state.remunerations.filter(
        (x) => x.id !== +action.payload
      );
    },
    deleteRemuneration(state, action: PayloadAction<EmployeeRemuneration>) {
      if (action.payload.id > 0) {
        state.employeeRemunerations = state.employeeRemunerations.map((x) => {
          if (x.id === action.payload.id) {
            x.deleted = true;
          }
          return x;
        });
      } else {
        state.employeeRemunerations = state.employeeRemunerations.filter(
          (x) => x.tempId !== action.payload.tempId
        );
      }
      state.remunerations.push(action.payload.remuneration!);
      state.remunerations = state.remunerations
        .slice()
        .sort((a, b) => (a.description! < b.description! ? -1 : 1));
    },
    undoDeleteRemuneration(state, action: PayloadAction<number>) {
      state.employeeRemunerations = state.employeeRemunerations.map((x) => {
        if (x.id === action.payload) {
          x.deleted = false;
        }
        return x;
      });
    },
    updateRemuneration(
      state,
      action: PayloadAction<{ rowId: string; value: string }>
    ) {
      state.employeeRemunerations = state.employeeRemunerations.map((x) => {
        if (x.tempId === action.payload.rowId) {
          x = {
            ...x,
            tempAmount: action.payload.value,
            amount: +action.payload.value.replaceAll(',', ''),
          };
          if (x.id > 0) {
            x.updated = true;
          }
        }
        return x;
      });
    },
    setModeOfResignation(state, action: PayloadAction<ModeOfResignation[]>) {
      state.modeOfResignations = action.payload;
    },
    setNatureOfEmployments(state, action: PayloadAction<NatureOfEmployment[]>) {
      state.natureOfEmployments = action.payload;
    },
    setGenders(state, action: PayloadAction<Gender[]>) {
      state.genders = action.payload;
    },
    setBloodTypes(state, action: PayloadAction<BloodType[]>) {
      state.bloodTypes = action.payload;
    },
    setCivilStatuses(state, action: PayloadAction<CivilStatus[]>) {
      state.civilStatuses = action.payload;
    },
    setEligibilities(state, action: PayloadAction<Eligibility[]>) {
      state.eligibilities = action.payload.filter(
        (x) =>
          !state.employeeEligibilities.filter((y) => y.eligibilityId === x.id)
            .length
      );
    },
    setRemunerations(state, action: PayloadAction<Remuneration[]>) {
      state.remunerations = action.payload.filter(
        (x) =>
          !state.employeeRemunerations.filter((y) => y.remunerationId === x.id)
            .length
      );
    },
    setVaccinationStatuses(state, action: PayloadAction<VaccinationStatus[]>) {
      state.vaccinationStatuses = action.payload;
    },
  },
});

export default employeeModalSlice.reducer;
export const employeeModalActions = employeeModalSlice.actions;
