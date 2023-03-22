import { EmployeeEnd } from '../endpoints';
import Employee from '../models/entities/Employee';
import EmployeeEligibility from '../models/entities/EmployeeEligibility';
import SearchResult from '../models/response-model/SearchResult';
import { httpDelete, httpGet, httpPost, httpPut } from './base';

export async function searchEmployee(
  key: string,
  page: number
): Promise<SearchResult<Employee> | undefined> {
  var query = '?page=' + page;
  if (!!key) {
    query += '&key=' + encodeURI(key);
  }
  return await httpGet<SearchResult<Employee>>(EmployeeEnd.Search + query);
}

export async function getEmployees(): Promise<Employee[] | undefined> {
  return await httpGet<Employee[]>(EmployeeEnd.GetList);
}

export async function insertEmployee(
  employee: Employee,
  eligibilities: EmployeeEligibility[]
): Promise<Employee | undefined> {
  return await httpPost<Employee>(EmployeeEnd.Insert, {
    employee: {
      ...employee,
      position: undefined,
      office: undefined,
    },
    eligibilities,
  });
}

export async function updateEmployee(
  employee: Employee,
  newEligibilities: EmployeeEligibility[],
  updatedEmployeeEligibilities: EmployeeEligibility[],
  employeeEligibilityIdsToDelete: number[]
): Promise<boolean | undefined> {
  return await httpPut(EmployeeEnd.Update + '/' + employee.id, {
    employee,
    newEligibilities,
    updatedEmployeeEligibilities,
    employeeEligibilityIdsToDelete,
  });
}

export async function deleteEmployee(id: number): Promise<boolean | undefined> {
  return await httpDelete(EmployeeEnd.Delete + '/' + id);
}
