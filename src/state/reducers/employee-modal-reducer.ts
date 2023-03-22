import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Guid } from 'guid-typescript';
import CustomReturn from '../../models/client-model/CustomReturn';
import BloodType from '../../models/entities/BloodType';
import CivilStatus from '../../models/entities/CivilStatus';
import Position from '../../models/entities/Position';
import EducationalAttainment from '../../models/entities/EducationalAttainment';
import Eligibility from '../../models/entities/Eligibility';
import Employee from '../../models/entities/Employee';
import EmployeeEligibility from '../../models/entities/EmployeeEligibility';
import Gender from '../../models/entities/Gender';
import NatureOfEmployment from '../../models/entities/NatureOfEmployment';
import Office from '../../models/entities/Office';
import VaccinationStatus from '../../models/entities/VaccinationStatus';
import ModeOfResignation from '../../models/entities/ModeOfResignation';
import { toAmount } from '../../helper';

interface State {
  employee: Employee;
  offices: Office[];
  modeOfResignations: ModeOfResignation[];
  natureOfEmployments: NatureOfEmployment[];
  bloodTypes: BloodType[];
  allPositions: Position[];
  civilStatuses: CivilStatus[];
  genders: Gender[];
  educationalAttainments: EducationalAttainment[];
  vaccinationStatuses: VaccinationStatus[];
  positions: Position[];
  eligibilities: Eligibility[];
  employeeEligibilities: EmployeeEligibility[];
  isModalShow: boolean;
}

const employeeInitialState: Employee = {
  id: 0,
  idNumber: '',
  modeOfResignationId: undefined,
  resignationDate: undefined,
  firstName: '',
  lastName: '',
  middleName: '',
  extension: '',
  fullName: '',
  officeId: 0,
  positionId: 0,
  natureOfEmploymentId: 0,
  employmentDate: new Date(),
  birthDate: new Date(),
  genderId: 0,
  bloodTypeId: 0,
  residenceAddress: '',
  contactNumber: '',
  emailAddress: '',
  gsisNo: '',
  philHealthNo: '',
  pagIbigNo: '',
  sssNo: '',
  tinNo: '',
  isActive: true,
  educationalAttainmentId: 0,
  skills: '',
  vaccinationStatusId: 0,
  civilStatusId: 0,
  height: '',
  weight: '',
  salary: 0.0,
  tempSalary: '',
  salaryGrade: 0,
  step: 0,
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
};

const employeeModalSlice = createSlice({
  name: 'employee-modal',
  initialState: initialState,
  reducers: {
    setEmployee(state, action: PayloadAction<Employee | undefined>) {
      state.employee = action.payload ?? employeeInitialState;
      state.employee = {
        ...state.employee,
        tempSalary: toAmount(state.employee.salary?.toString()),
        hasSalaryGrade: state.employee.natureOfEmployment?.hasSalaryGrade,
      };
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
    },
    setAllPositions(state, action: PayloadAction<Position[]>) {
      state.allPositions = action.payload;
    },
    updateEmployee(state, action: PayloadAction<CustomReturn>) {
      state.employee = {
        ...state.employee,
        [action.payload.elementName]: action.payload.value,
      };

      if (action.payload.elementName === 'natureOfEmploymentId') {
        state.employee = {
          ...state.employee,
          hasSalaryGrade: state.natureOfEmployments
            .slice()
            .filter((x) => x.id === +action.payload.value)?.[0]?.hasSalaryGrade,
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
      let position = state.positions
        .slice()
        .filter((x) => x.id === +action.payload)[0];
      state.employee = {
        ...state.employee,
        position: position,
        positionId: position.id,
      };
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
    },
    setOffices(state, action: PayloadAction<Office[]>) {
      state.offices = action.payload;

      state.positions =
        action.payload
          .filter((x) => x.id === state.employee.officeId)?.[0]
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
      state.eligibilities = action.payload;
    },
    setVaccinationStatuses(state, action: PayloadAction<VaccinationStatus[]>) {
      state.vaccinationStatuses = action.payload;
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
  },
});

export default employeeModalSlice.reducer;
export const employeeModalActions = employeeModalSlice.actions;
