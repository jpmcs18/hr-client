import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Guid } from 'guid-typescript';
import CustomReturn from '../../models/client-model/CustomReturn';
import BloodType from '../../models/entities/BloodType';
import CivilStatus from '../../models/entities/CivilStatus';
import Designation from '../../models/entities/Designation';
import EducationalAttainment from '../../models/entities/EducationalAttainment';
import Eligibility from '../../models/entities/Eligibility';
import Employee from '../../models/entities/Employee';
import EmployeeEligibility from '../../models/entities/EmployeeEligibility';
import Gender from '../../models/entities/Gender';
import NatureOfEmployment from '../../models/entities/NatureOfEmployment';
import Office from '../../models/entities/Office';
import VaccinationStatus from '../../models/entities/VaccinationStatus';

interface State {
  employee: Employee;
  offices: Office[];
  natureOfEmployments: NatureOfEmployment[];
  bloodTypes: BloodType[];
  civilStatuses: CivilStatus[];
  genders: Gender[];
  educationalAttainments: EducationalAttainment[];
  vaccinationStatuses: VaccinationStatus[];
  designations: Designation[];
  eligibilities: Eligibility[];
  newEligibilities: number[];
  deletedEmployeeEligibility: number[];
  employeeEligibilities: EmployeeEligibility[];
  isModalShow: boolean;
}

const employeeInitialState: Employee = {
  id: 0,
  firstName: '',
  lastName: '',
  middleName: '',
  extension: '',
  fullName: '',
  officeId: undefined,
  designationId: undefined,
  natureOfEmploymentId: undefined,
  employmentDate: undefined,
  yearsInService: undefined,
  birthDate: undefined,
  age: undefined,
  genderId: undefined,
  bloodTypeId: undefined,
  residenceAddress: undefined,
  contactNumber: '',
  emailAddress: '',
  gsisNo: '',
  philHealthNo: '',
  pagIbigNo: '',
  sssNo: '',
  tinNo: '',
  isActive: undefined,
  educationalAttainmentId: undefined,
  skills: '',
  vaccinationStatusId: undefined,
  civilStatusId: undefined,
  height: '',
  weight: '',
};

const initialState: State = {
  employee: employeeInitialState,
  offices: [],
  designations: [],
  isModalShow: false,
  natureOfEmployments: [],
  bloodTypes: [],
  civilStatuses: [],
  genders: [],
  educationalAttainments: [],
  vaccinationStatuses: [],
  eligibilities: [],
  newEligibilities: [],
  deletedEmployeeEligibility: [],
  employeeEligibilities: [],
};

const employeeModalSlice = createSlice({
  name: 'employee-modal',
  initialState: initialState,
  reducers: {
    setEmployee(state, action: PayloadAction<Employee | undefined>) {
      state.employee = action.payload ?? employeeInitialState;
      state.newEligibilities = [];
      state.deletedEmployeeEligibility = [];
      state.employeeEligibilities =
        state.employee.employeeEligibilities
          ?.slice()
          ?.map((x) => {
            return { ...x, tempId: Guid.create().toString(), deleted: false };
          })
          .sort((a, b) =>
            a.eligibility!.description! < b.eligibility!.description! ? -1 : 1
          ) ?? [];
    },
    updateEmployee(state, action: PayloadAction<CustomReturn>) {
      console.log(action.payload);
      state.employee = {
        ...state.employee,
        [action.payload.elementName]: action.payload.value,
      };
      console.log(state.employee);
    },
    updateOffice(state, action: PayloadAction<string>) {
      let office = state.offices
        .slice()
        .filter((x) => x.id === +action.payload)[0];
      state.employee = {
        ...state.employee,
        officeId: office.id,
        office: office,
        designation: undefined,
        designationId: undefined,
      };
      state.designations =
        office.designations?.map((x) => x.designation!) ?? [];
    },
    updateDesignation(state, action: PayloadAction<string>) {
      let designation = state.designations
        .slice()
        .filter((x) => x.id === +action.payload)[0];
      state.employee = {
        ...state.employee,
        designation: designation,
        designationId: designation.id,
      };
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.isModalShow = action.payload;
    },
    setOffices(state, action: PayloadAction<Office[]>) {
      state.offices = action.payload;

      state.designations =
        action.payload
          .filter((x) => x.id === state.employee.officeId)?.[0]
          ?.designations?.map((x) => x.designation!) ?? [];
    },
    addNewEligibility(state, action: PayloadAction<string>) {
      state.newEligibilities.push(+action.payload);
      state.employeeEligibilities.push({
        employeeId: state.employee.id,
        eligibility: state.eligibilities.filter(
          (x) => x.id === +action.payload
        )[0],
        eligibilityId: +action.payload,
        id: 0,
        tempId: Guid.create().toString(),
        deleted: false,
      });
      state.eligibilities = state.eligibilities.filter(
        (x) => x.id !== +action.payload
      );
    },
    deleteEligibility(state, action: PayloadAction<EmployeeEligibility>) {
      if (action.payload.id > 0) {
        state.deletedEmployeeEligibility.push(action.payload.id);
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
        state.newEligibilities = state.newEligibilities.filter(
          (x) => x !== action.payload.eligibilityId
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
  },
});

export default employeeModalSlice.reducer;
export const employeeModalActions = employeeModalSlice.actions;
