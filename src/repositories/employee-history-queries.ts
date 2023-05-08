import { EmployeeHistoryEnd } from '../endpoints';
import EmployeeHistory from '../models/entities/EmployeeHistory';
import SearchResult from '../models/response-model/SearchResult';
import { httpDelete, httpGet, httpPost, httpPut } from './base';

export async function getEmployeeHistories(
  employeeId: number,
  page: number
): Promise<SearchResult<EmployeeHistory> | undefined> {
  var query = `?id=${employeeId}&page=${page}`;
  return await httpGet<SearchResult<EmployeeHistory>>(
    EmployeeHistoryEnd.Search + query
  );
}

export async function insertEmployeeHistory(
  employeeHistory: EmployeeHistory
): Promise<EmployeeHistory | undefined> {
  return await httpPost<EmployeeHistory>(
    EmployeeHistoryEnd.Insert,
    employeeHistory
  );
}

export async function updateEmployeeHistory(
  employeeHistory: EmployeeHistory
): Promise<boolean> {
  return await httpPut(
    EmployeeHistoryEnd.Update + '/' + employeeHistory.id,
    employeeHistory
  );
}

export async function deleteEmployeeHistory(id: number): Promise<boolean> {
  return await httpDelete(EmployeeHistoryEnd.Delete + '/' + id);
}
