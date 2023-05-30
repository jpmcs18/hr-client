import { EmployeeEnd } from '../endpoints';
import Employee from '../models/entities/Employee';
import EmployeeEligibility from '../models/entities/EmployeeEligibility';
import EmployeeRemuneration from '../models/entities/EmployeeRemuneration';
import SearchResult from '../models/response-model/SearchResult';
import { httpDelete, httpGet, httpPost, httpPut } from './base';

export async function searchEmployee(
  key: string,
  page: number,
  isRegular?: boolean,
  officeId?: number,
  positionId?: number,
  genderId?: number
): Promise<SearchResult<Employee> | undefined> {
  var query = '?page=' + page;
  if (!!key) {
    query += '&key=' + encodeURI(key);
  }
  if (officeId !== undefined) {
    query += '&officeId=' + officeId;
  }
  if (positionId !== undefined) {
    query += '&positionId=' + positionId;
  }
  if (genderId !== undefined) {
    query += '&genderId=' + genderId;
  }
  if (isRegular !== undefined) {
    query += '&isRegular=' + isRegular;
  }
  return await httpGet<SearchResult<Employee>>(EmployeeEnd.Search + query);
}

export async function getEmployees(): Promise<Employee[] | undefined> {
  return await httpGet<Employee[]>(EmployeeEnd.GetList);
}

export async function insertEmployee(
  employee: Employee,
  eligibilities: EmployeeEligibility[],
  remunerations: EmployeeRemuneration[]
): Promise<Employee | undefined> {
  return await httpPost<Employee>(EmployeeEnd.Insert, {
    employee: {
      ...employee,
      position: undefined,
      office: undefined,
    },
    eligibilities,
    remunerations,
  });
}

export async function updateEmployee(
  employee: Employee,
  newEligibilities: EmployeeEligibility[],
  updatedEmployeeEligibilities: EmployeeEligibility[],
  employeeEligibilityIdsToDelete: number[],
  newRemunerations: EmployeeRemuneration[],
  updatedEmployeeRemunerations: EmployeeRemuneration[],
  employeeRemunerationIdsToDelete: number[]
): Promise<boolean | undefined> {
  return await httpPut(EmployeeEnd.Update + '/' + employee.id, {
    employee,
    newEligibilities,
    updatedEmployeeEligibilities,
    employeeEligibilityIdsToDelete,
    newRemunerations,
    updatedEmployeeRemunerations,
    employeeRemunerationIdsToDelete,
  });
}

export async function deleteEmployee(id: number): Promise<boolean | undefined> {
  return await httpDelete(EmployeeEnd.Delete + '/' + id);
}

export async function promoteEmployee(
  employeeId: number,
  natureOfEmploymentId: number,
  appointmentDate: Date,
  officeId: number,
  positionId: number,
  detailedOfficeId?: number | undefined,
  detailedPositionId?: number | undefined,
  salaryGrade?: number | undefined,
  step?: number | undefined,
  salary?: number | undefined
): Promise<boolean | undefined> {
  return await httpPost<boolean>(EmployeeEnd.Promote, {
    employeeId,
    natureOfEmploymentId,
    appointmentDate,
    officeId,
    positionId,
    detailedOfficeId,
    detailedPositionId,
    salaryGrade,
    step,
    salary,
  });
}
