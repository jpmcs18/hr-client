import { EmployeeEnd } from '../endpoints';
import Employee from '../entities/Employee';
import SearchResult from '../response-model/SearchResult';
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
  dasignation: Employee
): Promise<Employee | undefined> {
  return await httpPost<Employee>(EmployeeEnd.Insert, dasignation);
}

export async function updateEmployee(
  dasignation: Employee
): Promise<boolean | undefined> {
  return await httpPut(EmployeeEnd.Update + '/' + dasignation.id, dasignation);
}

export async function deleteEmployee(id: number): Promise<boolean | undefined> {
  return await httpDelete(EmployeeEnd.Delete + '/' + id);
}
