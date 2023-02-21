import { EmployeeEnd } from '../endpoints';
import Employee from '../entities/Employee';
import SearchResult from '../response-model/SearchResult';
import { httpGet } from './base';

export async function searchEmployee(
  name: string,
  page: number
): Promise<SearchResult<Employee> | undefined> {
  var query = '?page=' + page;
  if (name !== undefined) {
    query = '&name=' + encodeURI(name);
  }
  return await httpGet<SearchResult<Employee>>(EmployeeEnd.Search + query);
}
